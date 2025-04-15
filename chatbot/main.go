package main

import (
	"fmt"
	"log"
	"net/http"

	"chatbot/api"
)

func main() {
	http.HandleFunc("/ws", api.AcceptConnection)

	fmt.Println("Serving in :8000")
	log.Fatal(http.ListenAndServe(":8000", nil))
}
