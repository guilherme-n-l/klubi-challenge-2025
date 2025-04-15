package ollama

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"
)

const TIMEOUT = 2 * time.Minute

var httpClient = &http.Client{Timeout: TIMEOUT}

type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type Request struct {
	Model    string    `json:"model"`
	Messages []Message `json:"messages"`
	Stream   bool      `json:"stream"`
}

type Response struct {
	Model              string    `json:"model"`
	CreatedAt          time.Time `json:"created_at"`
	Message            Message   `json:"message"`
	Done               bool      `json:"done"`
	TotalDuration      int64     `json:"total_duration"`
	LoadDuration       int       `json:"load_duration"`
	PromptEvalCount    int       `json:"prompt_eval_count"`
	PromptEvalDuration int       `json:"prompt_eval_duration"`
	EvalCount          int       `json:"eval_count"`
	EvalDuration       int64     `json:"eval_duration"`
}

type Client struct {
	URL   string
	Model string
}

func NewClient(url string, model string) *Client {
	return &Client{
		URL:   strings.TrimRight(url, "/") + "/api/chat",
		Model: model,
	}
}

func (c *Client) buildRequest(body []byte) (*http.Request, error) {
	req, err := http.NewRequest(http.MethodPost, c.URL, bytes.NewReader(body))
	if err != nil {
		return &http.Request{}, err
	}

	req.Header.Set("Content-Type", "application/json")

	return req, nil
}

func (c *Client) Prompt(stream bool, msgs ...Message) (Response, error) {
	req := Request{Model: c.Model, Messages: msgs, Stream: stream}

	reqBody, err := json.Marshal(&req)
	if err != nil {
		return Response{}, err
	}

	httpReq, err := c.buildRequest(reqBody)
	if err != nil {
		return Response{}, err
	}

	httpRes, err := httpClient.Do(httpReq)
	if err != nil {
		return Response{}, err
	}
	defer httpRes.Body.Close()

	var res Response
	err = json.NewDecoder(httpRes.Body).Decode(&res)
	if err != nil {
		return Response{}, err
	}

	if httpRes.StatusCode != 200 {
		body, _ := io.ReadAll(httpReq.Body)
		return Response{}, fmt.Errorf("Status code: %d, Body: %s\n", httpRes.StatusCode, body)
	}

	return res, nil
}
