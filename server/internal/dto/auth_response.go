package dto

type AuthResponse struct {
	ID    string `json:"id"`
	Email string `json:"email"`
	Token string `json:"token"`
	Role  string `json:"role,omitempty"`
	Error string `json:"error,omitempty"`
}

func NewAuthResponse(resp AuthResponse) *AuthResponse {
	return &resp
}
