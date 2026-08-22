package main

import (
	"authService/app"
	"fmt"
)

func main() {
	cfg := app.NewConfig()
	app := app.NewApplication(cfg)
	app.Run()
	fmt.Println("go run")
}
