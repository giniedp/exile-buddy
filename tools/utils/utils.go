package utils

import (
	"fmt"
	"log"
	"time"
)

func Must[T any](obj T, err error) T {
	if err != nil {
		panic(err)
	}
	return obj
}

func ToErr(err interface{}, msg string) error {
	if err == nil {
		return nil
	}
	switch e := err.(type) {
	case error:
		return e
	default:
		return fmt.Errorf("%s: %v", msg, e)
	}
}

func PanicIfErr(err interface{}, msg string) {
	if e := ToErr(err, msg); e != nil {
		panic(e)
	}
}

func TimeStart() time.Time {
	return time.Now()
}

func TimeTrack(start time.Time, name string) {
	elapsed := time.Since(start)
	log.Printf("%s took %s", name, elapsed)
}
