# schemas/writing.py
from pydantic import BaseModel, Field
from typing import Optional, List, Dict

class Criteria(BaseModel):
    taskResponse: Optional[float] = None
    coherence:   Optional[float] = None
    lexical:     Optional[float] = None
    grammar:     Optional[float] = None

class Metrics(BaseModel):
    wordCount: Optional[int] = None

class GradeRequest(BaseModel):
    submission_id: int
    prompt: Optional[str] = None
    text: str = Field(..., min_length=50, description="Essay (>= 50 words)")

class GradeResponse(BaseModel):
    modelVersion: str
    overallBand: float
    criteria: Criteria
    feedback: str
    annotations: List[Dict]   # [{type,rule,start,end,before,after,explain}, ...]
    metrics: Metrics
    aiProvider: Optional[str] = None
    tokensPrompt: Optional[int] = None
    tokensOutput: Optional[int] = None
    costUsd: Optional[float] = None
