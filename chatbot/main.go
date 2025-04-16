// Package main is the entry point for the Klubi challenge 2025 server.
// It sets up an HTTP server that listens for WebSocket connections.
package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"chatbot/api"
)

var PORT = os.Getenv("SERVER_PORT")

// main is the entry point for the application.
// It sets up the HTTP server to handle incoming requests and starts the server on the specified PORT.
// Specifically, it handles WebSocket connections via the "/ws" route, handled by the AcceptConnection function from the api package.
func main() {
	http.HandleFunc("/ws", api.AcceptConnection)

	fmt.Println("Serving in :" + PORT)
	log.Fatal(http.ListenAndServe(":" + PORT, nil))
}
