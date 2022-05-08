# ARM Templates

To deploy with PowerShell:

```powershell
New-AzResourceGroupDeployment -ResourceGroupName exp-vnet-0010-rg -TemplateFile ./azurerm/public-nsg/public-nsg.json  -TemplateParameterFile ./azurerm/public-nsg/public-nsg.parameters.json -DeploymentName nsg-public-0030
```
