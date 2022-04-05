package main

import (
	"log"
	"photokeep-api/api/rest"
	"photokeep-api/internals/configs"
	"photokeep-api/internals/database"
)

func init() {
	if err := configs.InitConfig(); err != nil {
		log.Fatal("cannot load config:", err)
	}

	if err := database.InitDB(); err != nil {
		log.Fatal("cannot connect to DB", err)
	}
}

func main() {
	rest.InitServer()
}