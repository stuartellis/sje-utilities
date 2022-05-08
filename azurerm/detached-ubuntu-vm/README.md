# ARM Templates

To deploy with PowerShell:

```powershell
New-AzResourceGroupDeployment -ResourceGroupName test0030-vm-rg -TemplateFile ./azurerm/detached-ubuntu-vm/detached-ubuntu-vm.json  -TemplateParameterFile ./azurerm/detached-ubuntu-vm/detached-ubuntu-vm.parameters.json -DeploymentName test-ubuntu-20
```
