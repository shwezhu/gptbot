package main

import "net/http"

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
