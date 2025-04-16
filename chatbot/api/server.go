package api

import (
	"fmt"
	"net/http"
	"os"
	"strings"

	"chatbot/data"
	"chatbot/ollama"

	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

const CONTEXT_WINDOW = 2

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

func updateContext(context []string, msg string) []string {

	if len(context) == CONTEXT_WINDOW {
		return append(context[1:], msg)
	} else {
		return append(context, msg)
	}
}

func handleConnection(conn *websocket.Conn, SID string) {
	defer conn.Close()

	client := ollama.NewClient("http://localhost:11434", "gemma3:4b")
	context := []string{}

	for {
		msgType, p, err := conn.ReadMessage()
		if err != nil {
			fmt.Fprintln(os.Stderr, err)
			return
		}

		fmt.Printf("%s||\tUser: %s\n", SID, strings.TrimRight(string(p), "\n"))

		// res, err := client.Prompt(ollama.Message{Role: "system", Content: fmt.Sprintf("Context: %s", strings.Join(context, "\n"))},
		// 	ollama.Message{Role: "user", Content: string(p)})

		resChan, err := client.StreamPrompt(
			ollama.Message{Role: "system", Content: fmt.Sprintf("Role: %s", data.Prompt)},
			ollama.Message{Role: "system", Content: fmt.Sprintf("Context: %s", strings.Join(context, "\n"))},
			ollama.Message{Role: "user", Content: string(p)})

		if err != nil {
			fmt.Println(err)
			return
		}

		context = updateContext(context, fmt.Sprintf("User: %s", string(p)))

		var fullRes string

		fmt.Printf("%s||\tHost: ", SID)

		for res := range resChan {
			if res.Done {
				context = updateContext(context, fmt.Sprintf("System: %s", fullRes))
				fmt.Print("\n")
				break
			}

			resStr := res.Message.Content
			fmt.Print(resStr)
			fullRes += resStr

			if err = conn.WriteMessage(msgType, []byte(resStr)); err != nil {
				fmt.Fprintln(os.Stderr, err)
				return
			}
		}

		if err = conn.WriteMessage(msgType, []byte("<END>")); err != nil {
			fmt.Fprintln(os.Stderr, err)
			return
		}

	}
}

func AcceptConnection(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		return
	}

	go handleConnection(conn, uuid.NewString())
}
