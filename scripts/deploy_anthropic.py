#!/usr/bin/env python3
"""
Safe deployment script for Anthropic Claude via Python SDK.
This script reads credentials from environment variables to avoid
hard-coding secrets in the repository.

Environment variables:
- ANTHROPIC_API_KEY: your Anthropic API key
- ANTHROPIC_BASE_URL: (optional) base URL for the API, defaults to
  https://api.ofox.ai/anthropic
"""
import os
import sys
from typing import Optional


def load_config() -> tuple[str, str]:
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    base_url = os.environ.get("ANTHROPIC_BASE_URL", "https://api.ofox.ai/anthropic")
    return api_key, base_url


def run(api_key: str, base_url: str) -> int:
    from anthropic import Anthropic

    client = Anthropic(api_key=api_key, base_url=base_url)

    try:
        message = client.messages.create(
            model="anthropic/claude-sonnet-4.6",
            max_tokens=1024,
            messages=[{"role": "user", "content": "生命的意义是什么？"}],
        )
    except Exception as e:
        print(f"Error calling Anthropic API: {e}", flush=True)
        return 1

    # Normalize output across possible response shapes
    content = None
    if hasattr(message, "content"):
        content = message.content
    elif isinstance(message, (list, tuple)) and len(message) > 0:
        first = message[0]
        content = getattr(first, "text", None) or getattr(first, "content", None)

    if isinstance(content, list) and len(content) > 0:
        # content[0] may be an object with a text attribute
        first = content[0]
        text = getattr(first, "text", None)
        if text is not None:
            print(text)
            return 0
        # fallback to string
        print(str(first))
        return 0
    if isinstance(content, str):
        print(content)
        return 0

    # Fallback: try to stringify the whole response
    print(message)
    return 0


def main(argv: Optional[list[str]] = None) -> int:
    api_key, base_url = load_config()
    if not api_key:
        print("Error: ANTHROPIC_API_KEY environment variable not set.", flush=True)
        return 2
    return run(api_key, base_url)


if __name__ == "__main__":
    sys.exit(main())
