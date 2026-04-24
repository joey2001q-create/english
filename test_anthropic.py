from anthropic import Anthropic

client = Anthropic(
    api_key="sk-of-SrIyKYAEGqJriyHIihxFDTNvRKvJNVHCUeujGGvAUiBPBVAPycYsxGfhfOnfAvtN",
    base_url="https://api.ofox.ai/anthropic",
)

message = client.messages.create(
    model="anthropic/claude-sonnet-4.6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "生命的意义是什么？"}],
)
print(message.content[0].text)
