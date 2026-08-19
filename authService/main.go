package main

import (
	"authService/app"
	"fmt"
)

func main() {
	cfg := app.NewConfig(":8080")
	app := app.NewApplication(cfg)
	app.Run()
	fmt.Println("go run")
}
