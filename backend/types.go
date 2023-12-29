package main

type ResponseBody struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type RequestBody struct {
	Model    string         `json:"model"`
	Messages []ResponseBody `json:"messages"`
}

type Message struct {
	Message string `json:"message"`
}

type Error struct {
	Error string `json:"error"`
}
