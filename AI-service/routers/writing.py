# Router cho endpoint /grade/writing/full
from fastapi import APIRouter, Header, HTTPException
from schemas.writing import GradeRequest, GradeResponse
from services.ai_client import grade_writing
from config import AI_INTERNAL_TOKEN

router = APIRouter(prefix="/grade/writing", tags=["writing"])

def _verify(token: str):
    if token != AI_INTERNAL_TOKEN:
        raise HTTPException(status_code=401, detail="Unauthorized")

@router.post("/full", response_model=GradeResponse)
def grade_writing_full(body: GradeRequest, x_internal_token: str = Header(...)):
    _verify(x_internal_token)                  # chặn call trái phép
    return grade_writing(body.prompt or "", body.text)
