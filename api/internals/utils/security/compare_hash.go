package securityUtils

import "golang.org/x/crypto/bcrypt"

func CompareHash(hash string, s string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(s))

	return err == nil
}
