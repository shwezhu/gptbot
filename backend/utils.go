package main

import (
	"encoding/json"
	"net/http"
	"os"
)

func verifyToken(token string) bool {
	return token == os.Args[2]
}

func handleError(response http.ResponseWriter, message string, status int) {
	response.Header().Set("Content-Type", "application/json")
	response.WriteHeader(status)
	_ = json.NewEncoder(response).Encode(Error{Error: message})
}

func handleSuccess(response http.ResponseWriter, message Message, status int) {
	response.Header().Set("Content-Type", "application/json")
	response.WriteHeader(status)
	_ = json.NewEncoder(response).Encode(message)
}
