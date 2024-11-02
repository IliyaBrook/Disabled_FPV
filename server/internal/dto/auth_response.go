package dto

type AuthResponse struct {
	ID    string `json:"id"`
	Email string `json:"email"`
	Token string `json:"token"`
	Error string `json:"error,omitempty"`
}

func NewAuthResponse(id, email, token, error string) *AuthResponse {
	return &AuthResponse{
		ID:    id,
		Email: email,
		Token: token,
		Error: error,
	}
}
