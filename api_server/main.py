from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os
from typing import Optional

app = FastAPI()

# Allow all origins for local development. Tighten in production.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class ClaudeRequest(BaseModel):
    prompt: str
    max_tokens: int = 1024
    model: str = "anthropic/claude-sonnet-4.6"


@app.post("/anthropic/claude")
async def claude_endpoint(req: ClaudeRequest):
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    base_url = os.environ.get("ANTHROPIC_BASE_URL", "https://api.ofox.ai/anthropic")
    if not api_key:
        return {"error": "ANTHROPIC_API_KEY environment variable not set"}

    from anthropic import Anthropic

    client = Anthropic(api_key=api_key, base_url=base_url)
    try:
        message = client.messages.create(
            model=req.model,
            max_tokens=req.max_tokens,
            messages=[{"role": "user", "content": req.prompt}],
        )
    except Exception as e:
        return {"error": str(e)}

    # Normalize output across possible response shapes
    text = None
    content = getattr(message, "content", None)
    if isinstance(content, list) and len(content) > 0:
        first = content[0]
        text = getattr(first, "text", None) or getattr(first, "content", None)
    elif isinstance(content, str):
        text = content
    else:
        text = str(message)
    return {"text": text, "raw": repr(message)}


@app.get("/health")
async def health():
    return {"status": "ok"}
