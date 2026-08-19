package main

import (
	"authService/app"
	"fmt"
)

func main() {
	cfg := app.Config{
		Addr: ":3001",
	}
	app := app.Application{
		Config: cfg,
	}
	app.Run()
	fmt.Println("go run")
}
