package commands

import "github.com/spf13/cobra"

var (
	rootCmd = &cobra.Command{
		Use:           "exile-tools",
		Short:         "data mining tools for path of exile 2",
		Long:          ``,
		SilenceErrors: true,
		SilenceUsage:  true,
	}
)

func Execute() error {
	return rootCmd.Execute()
}

func init() {
	rootCmd.AddCommand(cmdUnpack)
	rootCmd.AddCommand(cmdConvert)
}
