package main

import (
	"net/http"
)

func authenticatedOnly(f func(response http.ResponseWriter, request *http.Request)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Check if "Authorization" in Header.
		if r.Header["Authorization"] == nil {
			handleError(w, "API key not provided", http.StatusUnauthorized)
			return
		}

		// Check if API key is valid.
		if !verifyToken(r.Header["Authorization"][0]) {
			handleError(w, "Invalid API key", http.StatusUnauthorized)
			return
		}

		// Next handler.
		f(w, r)
	}
}
