package main

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/sashabaranov/go-openai"
	"io"
	"log"
	"net/http"
)

func withGPT(w http.ResponseWriter, r *http.Request) {
	const maxBodySize = 1 << 24 // 16MB
	r.Body = http.MaxBytesReader(w, r.Body, maxBodySize)

	body, err := io.ReadAll(r.Body)
	if err != nil {
		log.Println("error reading request body: ", err)
		handleError(w, "Request body too large.", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	var reqBody RequestBody
	err = json.Unmarshal(body, &reqBody)
	if err != nil {
		handleError(w, "Error parsing request body", http.StatusBadRequest)
		return
	}

	if reqBody.Model == "" {
		reqBody.Model = flags.model
	}

	msg, err := chat(&reqBody)
	if err != nil {
		log.Println("error generating response: ", err)
		handleError(w, fmt.Sprintf("Error generating response"), http.StatusInternalServerError)
		return
	}

	handleSuccess(w, Message{Role: "assistant", Content: msg}, http.StatusOK)
}

func chat(reqBody *RequestBody) (string, error) {
	var messages []openai.ChatCompletionMessage
	for _, message := range reqBody.Messages {
		messages = append(messages, openai.ChatCompletionMessage{
			Role:    message.Role,
			Content: message.Content,
		})
	}

	resp, err := openaiClient.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			// Model:    reqBody.Model,
			Model:    openai.GPT3Dot5Turbo,
			Messages: messages,
		},
	)

	if err != nil {
		return "", err
	}

	return resp.Choices[0].Message.Content, nil
}
