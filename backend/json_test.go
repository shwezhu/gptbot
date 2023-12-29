package main

import (
	"bytes"
	"encoding/json"
	"testing"
)

// BenchmarkEncodeMap benchmarks encoding a map to JSON
func BenchmarkEncodeMap(b *testing.B) {
	message := "an error message"
	for i := 0; i < b.N; i++ {
		stream := new(bytes.Buffer)
		_ = json.NewEncoder(stream).Encode(map[string]string{"error": message})
	}
}

// BenchmarkEncodeStruct benchmarks encoding a struct to JSON
func BenchmarkEncodeStruct(b *testing.B) {
	message := "an error message"
	for i := 0; i < b.N; i++ {
		stream := new(bytes.Buffer)
		_ = json.NewEncoder(stream).Encode(struct {
			Error string `json:"error"`
		}{Error: message})
	}
}
