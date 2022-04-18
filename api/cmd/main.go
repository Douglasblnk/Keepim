package main

import (
	"log"
	"photokeep-api/api/rest"
	"photokeep-api/internals/database"

	"github.com/joho/godotenv"
)

func init() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("cannot load config:", err)
	}

	if err := database.InitDB(); err != nil {
		log.Fatal("cannot connect to DB", err)
	}
}

func main() {
	rest.InitServer()
}