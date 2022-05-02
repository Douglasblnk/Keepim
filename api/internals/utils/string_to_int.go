package utils

import "strconv"

func StringToInt(value string) (int, error) {
	i, err := strconv.ParseInt(value, 10, 0)

	if err != nil {
		return 0, err
	}

	return int(i), nil
}