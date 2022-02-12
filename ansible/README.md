# Ansible

## Azure

### Resource Groups

To create a resource group in Azure:

    ansible-playbook --connection=local ./ansible/azure/deploy_resource_group.yaml --extra-vars "@ansible/vars/az_rg_sandbox_0010.yml"

To destroy a resource group in Azure:

    ansible-playbook --connection=local ./ansible/azure/destroy_resource_group.yaml --extra-vars "@ansible/vars/az_rg_sandbox_0010.yml"

### Deploy an ARM Template to a Resource Group

To deploy an ARM Template to a resource group:

     ansible-playbook --connection=local ./ansible/azure/deploy_arm_template.yaml --extra-vars "resource_group_name=sandbox-vnet-0010 template_file_path='../../arm/networking/network-security-group.json' parameters_file_path='../../arm/networking/network-security-group-params.json' location='UK South'"

### Virtual Machines

To deploy an ARM template for a Storage Account in Azure:

    ansible-playbook --connection=local ./ansible/azure/deploy_storage_account.yaml --extra-vars "@ansible/vars/az_storage_sandbox_0010.yml"

To deploy an ARM template for a Virtual Machine in Azure:

    ansible-playbook --connection=local ./ansible/azure/deploy_windows_vm.yaml --extra-vars "@ansible/vars/az_vm_win_2019_standalone.yml"

To run a playbook on a remote Windows system:

    export no_proxy=*
    ansible-playbook -ki ansible/inventory/azure.ini ./ansible/windows/update_windows.yaml
