# GPTBot Backend

- Single executable file
- Supports authorization via HTTP header

## Build

1. `git clone https:github.com/shwezhu/gptbot.git`
2. `cd gptbot/backend`
3. `go install .`
4. run `gptbot` in your terminal:

```bash
go build -o server
# ./server <:port> <token> <model>
./server :8080 raven1132 gpt-3.5-turbo
```

## API

**POST /api/chat**

Headers: `Authorization: <USER_TOKEN>`

Request Body:
    
```json
{
"messages": [
    {
    "role": "system",
    "content": "You are a helpful assistant."
    },
    {
    "role": "user",
    "content": "hello, tell me a joke."
    }
]
}
```

Response:

```json
{
    "role":"<string>",
    "content":"<string>"
}
```

Or error:

```json
{
    "error": "<string>"
}
```

**Example**

```shell
❯ curl shaowenzhu.top:8080/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: raven1132" \
  -d '{
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful assistant."
      },
      {
        "role": "user",
        "content": "你好"
      }
    ]
  }'
{"role":"assistant","content":"你好！有什么我可以帮助你的吗？"}
```
