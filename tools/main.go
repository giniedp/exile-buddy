package main

import (
	"exile-buddy/tools/commands"
	"exile-buddy/tools/utils"
	"log"
)

func main() {
	utils.InitEnvFile()
	err := commands.Execute()
	if err != nil && err.Error() != "" {
		log.Println(err)
	}

}
