package main

import (
	"encoding/json"
	"errors"
	"flag"
	"net/http"
	"strings"
)

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	// We need to allow the Authorization header to be sent to the backend.
	(*w).Header().Set("Access-Control-Allow-Headers", "*")
	(*w).Header().Set("Access-Control-Max-Age", "86400")
}

func verifyToken(token string) bool {
	return token == flags.token
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

func readFlags(f *Flags) error {
	flag.StringVar(&f.port, "p", ":8080", "listen port")
	flag.StringVar(&f.token, "t", "", "authorization token for the API")
	flag.StringVar(&f.model, "m", "gpt-3.5-turbo", "default gpt model to use")
	flag.StringVar(&f.tlsCert, "c", "", "path to SSL certificate")
	flag.StringVar(&f.tlsKey, "k", "", "path to SSL private key")
	flag.Parse()

	// verify that both tlsCert and tlsKey are specified or not specified
	if !((f.tlsCert == "" && f.tlsKey == "") || (f.tlsCert != "" && f.tlsKey != "")) {
		return errors.New("both -c and -k must be specified or not specified")
	}

	if f.token == "" {
		return errors.New("authorization token must be specified")
	}

	if !strings.HasPrefix(f.port, ":") {
		f.port = ":" + f.port
	}

	return nil
}
