package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"github.com/joho/godotenv"
	"time"
)

type Response struct {
	Choices []struct {
		Message struct {
			Content string `json:"content"`
		} `json:"message"`
	} `json:"choices"`
}

func main() {
	// Get API Key
	start := time.Now()

    // r := new(big.Int)
    // fmt.Println(r.Binomial(1000, 10))

    
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
		return
	}

	groqAPIKey := os.Getenv("GROQ_API_KEY")
	if groqAPIKey == "" {
		fmt.Println("Error: GROQ_API_KEY is not set")
		return
	}

	// Define request data
	data := map[string]interface{}{
		"messages": []map[string]string{
			{"role": "user", "content": "Explain the importance of fast language models"},
		},
		"model": "llama-3.3-70b-versatile",
	}
	jsonData, _ := json.Marshal(data)

	// Create HTTP request
	req, err := http.NewRequest("POST", "https://api.groq.com/openai/v1/chat/completions", bytes.NewBuffer(jsonData))
	if err != nil {
		fmt.Println("Error creating request:", err)
		return
	}

	// Set headers
	req.Header.Set("Authorization", "Bearer "+groqAPIKey)
	req.Header.Set("Content-Type", "application/json")

	// Send request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error sending request:", err)
		return
	}
	defer resp.Body.Close()

	// Read response
	
	fmt.Println(resp.Body)
	body, _ := ioutil.ReadAll(resp.Body)

	var parsedResponse Response
	err = json.Unmarshal([]byte(body), &parsedResponse)
	if err != nil {
		fmt.Println("Error parsing JSON:", err)
		return
	}

	// Extract and print the message content
	if len(parsedResponse.Choices) > 0 {
		fmt.Println(parsedResponse.Choices[0].Message.Content)
	} else {
		fmt.Println("No choices found in the response")
	}

	elapsed := time.Since(start)
    fmt.Printf("Binomial took %s", elapsed)
	
	// firstChoice, ok := result["choices"].([]interface{})
	// if !ok {
	// 	fmt.Println("Invalid choice format")
	// 	return
	// }
	// fmt.Println(firstChoice[0])

	// message, ok := firstChoice["message"].([]interface{})
	// if !ok {
	// 	fmt.Println("Message field not found")
	// 	return
	// }
	// fmt.Println(message)

	// content, ok := message["content"].(string)
	// if !ok {
	// 	fmt.Println("Content field not found")
	// 	return
	// }
	// fmt.Println(content)
	// Print formatted JSON
	// prettyJSON, _ := json.MarshalIndent(result, "", "  ")
	// fmt.Println(prettyJSON)
	// var prettyJSON bytes.Buffer
	// err = json.Indent(&prettyJSON, body, "", "    ")
	// if err != nil {
	// 	fmt.Println("Error formatting JSON:", err)
	// 	fmt.Println("Raw Response:", string(body))
	// 	return
	// }

	// fmt.Println("Formatted JSON Response:\n", prettyJSON.String())


}
