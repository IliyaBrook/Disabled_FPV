package dto

func NewAuthResponse(resp AuthResponse) *AuthResponse {
	return &resp
}

type AuthResponse struct {
	ID    string `json:"id"`
	Email string `json:"email"`
	Token string `json:"token"`
	Role  string `json:"role,omitempty"`
	Error string `json:"error,omitempty"`
}

type ErrorResponse struct {
	Message string `json:"message"`
}

type PopulateRequest struct {
	Populate []string `json:"populate,omitempty"`
}
