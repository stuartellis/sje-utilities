# ARM Templates

To deploy with PowerShell:

```powershell
New-AzResourceGroupDeployment -ResourceGroupName exp-vnet-0010-rg -TemplateFile ./azurerm/public-vnet/public-vnet.json  -TemplateParameterFile ./azurerm/public-vnet/public-vnet.parameters.json -DeploymentName vnet-public-0030
```
