package main

func (s *Server) routes() {
	s.mux.HandleFunc("/api/chat", authenticatedOnly(withGPT))
}
