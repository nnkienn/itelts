import json
from typing import Dict, Any
from openai import OpenAI
from config import MODE, OPENAI_API_KEY, GPT_MODEL, MODEL_VERSION, calibrate
from schemas.json_schema import IELTS_WRITING_JSON_SCHEMA

# ============== MOCK (FREE) ==============
def grade_writing_mock(prompt: str, essay: str) -> Dict[str, Any]:
    """
    Trả kết quả giả lập để test flow Nest ↔ Python.
    Không gọi GPT, không tốn tiền.
    """
    wc = len(essay.split())
    raw_band = 6.5 if wc >= 200 else 5.5   # ví dụ: dài hơn → band nhỉnh hơn
    return {
        "modelVersion": MODEL_VERSION,
        "overallBand": calibrate(raw_band),   # áp calibration
        "criteria": { "taskResponse":6.0, "coherence":6.5, "lexical":6.0, "grammar":6.5 },
        "feedback": "Bài viết rõ ý, cần đa dạng hoá từ vựng và tránh lặp cấu trúc.",
        "annotations": [
          {"type":"grammar","rule":"SVA","start":10,"end":16,"before":"he go","after":"he goes","explain":"third-person singular"},
          {"type":"vocab","rule":"Repetition","start":100,"end":104,"before":"good","after":"effective / beneficial","explain":"tránh lặp từ"}
        ],
        "metrics": {"wordCount": wc},
        "aiProvider": "mock",
        "tokensPrompt": 0,
        "tokensOutput": 0,
        "costUsd": 0.0
    }

# ============== REAL (OpenAI) ==============
_client = None
def _get_openai():
    """Tạo OpenAI client một lần (singleton)."""
    global _client
    if _client is None:
        _client = OpenAI(api_key=OPENAI_API_KEY)
    return _client

SYSTEM = "You are an IELTS Writing examiner. Output must follow the provided JSON Schema."

def grade_writing_real(prompt: str, essay: str) -> Dict[str, Any]:
    """
    Gọi GPT thật bằng Structured Outputs (ép đúng schema 100%).
    """
    client = _get_openai()
    resp = client.responses.create(
        model=GPT_MODEL,
        temperature=0.2,
        response_format={
            "type":"json_schema",
            "json_schema":{
                "name":"IeltsWritingResult",
                "schema": IELTS_WRITING_JSON_SCHEMA,
                "strict": True
            }
        },
        input=[
            {"role":"system","content": SYSTEM},
            {"role":"user","content": f"Prompt: {prompt or ''}\nEssay:\n{essay}"}
        ],
    )
    data = json.loads(resp.output_text)          # JSON hợp lệ theo schema

    # Bổ sung/Audit
    data["modelVersion"] = MODEL_VERSION
    data["overallBand"] = calibrate(data["overallBand"])
    data.setdefault("metrics", {}).setdefault("wordCount", len(essay.split()))
    data["aiProvider"] = f"openai:{GPT_MODEL}"
    return data

def grade_writing(prompt: str, essay: str) -> Dict[str, Any]:
    """Chọn mock hay real dựa vào MODE trong .env."""
    return grade_writing_real(prompt, essay) if MODE == "real" else grade_writing_mock(prompt, essay)
