# ARM Templates

To deploy with PowerShell:

```powershell
New-AzResourceGroupDeployment -ResourceGroupName test01-rg -TemplateFile arm/templates/detached-ubuntu-vm.json -DeploymentName test-ubuntu-05
```
