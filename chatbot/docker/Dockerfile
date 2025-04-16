# Building binary
FROM golang:1.24.2 AS builder

WORKDIR /app

COPY chatbot/ ./

RUN go mod download

RUN CGO_ENABLED=0 GOOS=linux go build -o /klubi


# Main image
FROM alpine:latest

ARG SERVER_PORT=8000

WORKDIR /app

ENV OLLAMA_MODEL=gemma3:4b
ENV OLLAMA_URL=http://localhost:11434
ENV SERVER_PORT=${SERVER_PORT}

COPY chatbot/data/data.json ./data/

RUN apk --no-cache add libc6-compat

COPY --from=builder /klubi ./klubi

CMD ["./klubi"]
