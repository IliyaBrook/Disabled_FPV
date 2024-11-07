package dto

type PopulateRequest struct {
	Populate []string `json:"populate,omitempty"`
}
