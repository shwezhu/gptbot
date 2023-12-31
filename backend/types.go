package main

type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type RequestBody struct {
	Model    string    `json:"model"`
	Messages []Message `json:"messages"`
}

type Error struct {
	Error string `json:"error"`
}

type Flags struct {
	port    string
	token   string
	model   string
	tlsKey  string
	tlsCert string
}
