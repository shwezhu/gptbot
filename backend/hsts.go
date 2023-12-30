package main

import "net/http"

type Hsts struct {
	mux *http.ServeMux
}

func (h *Hsts) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// Allow CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")
	h.mux.ServeHTTP(w, r)
}
