package main

import (
	"github.com/sashabaranov/go-openai"
	"log"
	"net/http"
	"os"
	"strings"
)

var openaiClient *openai.Client
var flags = &Flags{}

func main() {
	if os.Getenv("OPENAI_API_KEY") == "" {
		log.Fatalf("OPENAI_API_KEY not set in environment variables")
	}

	openaiClient = openai.NewClient(os.Getenv("OPENAI_API_KEY"))
	if err := readFlags(flags); err != nil {
		log.Fatalf("error reading flags: %v", err)
	}
	
	srv := NewServer()

	log.Println("Listening on ", strings.TrimPrefix(flags.port, ":"))
	if flags.tlsCert != "" && flags.tlsKey != "" {
		log.Fatal(http.ListenAndServeTLS(flags.port, flags.tlsCert, flags.tlsKey, srv))
	} else {
		log.Fatal(http.ListenAndServe(flags.port, srv))
	}
}
