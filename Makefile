# === Chatbot Backend Config ===
CHATBOT_DFILE=./chatbot/docker/Dockerfile
CHATBOT_IMG=klubi-chatbot
CHATBOT_TAG=latest
CHATBOT_PORT=8000
OLLAMA_MODEL=gemma3:4b
OLLAMA_URL=http://host.docker.internal:11434

# === Frontend Config ===
FRONTEND_DIR=./frontend

# === Build and Run Chatbot ===
build-chatbot:
	docker build \
		--build-arg SERVER_PORT=$(CHATBOT_PORT) \
		-t $(CHATBOT_IMG):$(CHATBOT_TAG) \
		-f $(CHATBOT_DFILE) .

run-chatbot:
	docker run --rm -d \
		--add-host=host.docker.internal:host-gateway \
		-p $(CHATBOT_PORT):$(CHATBOT_PORT) \
		-e SERVER_PORT=$(CHATBOT_PORT) \
		-e OLLAMA_MODEL=$(OLLAMA_MODEL) \
		-e OLLAMA_URL=$(OLLAMA_URL) \
		$(CHATBOT_IMG):$(CHATBOT_TAG)

# === Build and Run Frontend ===
build-frontend:
	cd $(FRONTEND_DIR) && bun install && bun run build

run-frontend:
	cd $(FRONTEND_DIR)/dist && bun run serve

# === Build and Run All ===
build-all: build-chatbot build-frontend

run-all: run-chatbot run-frontend

all: build-all run-all

.DEFAULT_GOAL := all
.PHONY: \
	build-chatbot run-chatbot \
	build-frontend run-frontend \
	build-all run-all all

