package utils

import (
	"time"
)

func AddHoursFromNow(hours int) time.Time {
	return time.Now().Add(time.Hour * time.Duration(hours))
}
