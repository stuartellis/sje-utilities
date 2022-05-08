# ARM Templates

To deploy with PowerShell:

```powershell
New-AzResourceGroupDeployment -ResourceGroupName test01-rg -TemplateFile ./azurerm/detached-ubuntu-vm/detached-ubuntu-vm.json  -TemplateParameterFile ./azurerm/detached-ubuntu-vm/detached-ubuntu-vm.parameters.json -DeploymentName test-ubuntu-10
```
