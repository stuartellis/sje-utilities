# Bicep

These are [Bicep](https://docs.microsoft.com/en-us/azure/azure-resource-manager/bicep/) files for deploying to Azure.

To do a dry-run, use *what-if*:

    results=$(az deployment group what-if --resource-group ExampleGroup --template-file "what-if-after.bicep" --no-pretty-print)

To deploy a Bicep file to a resource group:

    az deployment group create --resource-group <resource-group-name> --template-file <path-to-bicep>
