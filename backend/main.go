package main

import (
	"github.com/sashabaranov/go-openai"
	"log"
	"net/http"
	"os"
)

var openaiClient *openai.Client

func main() {
	if len(os.Args) != 4 {
		log.Fatalf("usage: %s <port> <authorization-key> <default-model>", os.Args[0])
	}
	if os.Getenv("OPENAI_API_KEY") == "" {
		log.Fatalf("OPENAI_API_KEY not set in environment variables")
	}

	openaiClient = openai.NewClient(os.Getenv("OPENAI_API_KEY"))

	mux := http.NewServeMux()
	mux.HandleFunc("/api/chat", authenticatedOnly(withGPT))

	log.Println("Listening on ", os.Args[1])
	err := http.ListenAndServe(os.Args[1], mux)
	if err != nil {
		log.Fatalf("error listening and serving: %v", err)
	}
}
