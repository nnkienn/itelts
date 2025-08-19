# nạp biến môi trường (.env) + hàm hiệu chỉnh điểm
import os
from dotenv import load_dotenv

load_dotenv()

MODE = os.getenv("MODE", "mock").lower()           # "mock" | "real"
AI_INTERNAL_TOKEN = os.getenv("AI_INTERNAL_TOKEN", "super-secret")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GPT_MODEL = os.getenv("GPT_MODEL", "gpt-4o-mini")

MODEL_VERSION = os.getenv("MODEL_VERSION", "w-2025.08.1")
CALIB_A = float(os.getenv("CALIB_A", "0.95"))
CALIB_B = float(os.getenv("CALIB_B", "0.20"))

def calibrate(band: float) -> float:
    """điều chỉnh band theo hệ số A,B rồi kẹp trong [0,9]"""
    x = CALIB_A * float(band) + CALIB_B
    return max(0.0, min(9.0, round(x, 1)))
