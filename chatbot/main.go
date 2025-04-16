package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"chatbot/api"
)

var PORT = os.Getenv("SERVER_PORT")

func main() {
	http.HandleFunc("/ws", api.AcceptConnection)

	fmt.Println("Serving in :" + PORT)
	log.Fatal(http.ListenAndServe(":" + PORT, nil))
}
