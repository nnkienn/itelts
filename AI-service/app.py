# Khởi động FastAPI và mount router
from fastapi import FastAPI
from routers.writing import router as writing_router
from config import MODE, GPT_MODEL, MODEL_VERSION

app = FastAPI(title="IELTS AI Service")

@app.get("/health")
def health():
    return {"ok": True, "mode": MODE, "model": GPT_MODEL, "version": MODEL_VERSION}

app.include_router(writing_router)
