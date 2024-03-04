package main

import "net/http"

func NewServer() *Server {
	server := &Server{mux: http.NewServeMux()}
	server.routes()
	return server
}

type Server struct {
	mux *http.ServeMux
}

func (s *Server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	// Handle CORS preflighted request sent by browser.
	if (*r).Method == "OPTIONS" {
		return
	}

	s.mux.ServeHTTP(w, r)
}
