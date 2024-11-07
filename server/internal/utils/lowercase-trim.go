package utils

import "strings"

func LowercaseTrim(text string) string {
	return strings.ToLower(strings.TrimSpace(text))
}
