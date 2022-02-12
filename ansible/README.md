# Ansible

## Azure

### Resource Groups

To create a resource group in Azure:

    ansible-playbook --connection=local ./ansible/azure/deploy_resource_group.yml --extra-vars "@ansible/vars/az_rg_sandbox_0010.yml"

To destroy a resource group in Azure:

    ansible-playbook --connection=local ./ansible/azure/destroy_resource_group.yml --extra-vars "@ansible/vars/az_rg_sandbox_0010.yml"

### Networking

To create a network security group in Azure:

    ansible-playbook --connection=local ./ansible/azure/deploy_network_security_group.yml --extra-vars "@ansible/vars/az_nsg_sandbox_0010.yml"

To create a virtual network in Azure:

    ansible-playbook --connection=local ./ansible/azure/deploy_vnet.yml --extra-vars "@ansible/vars/az_vnet_sandbox_0010.yml"

### Virtual Machines

To deploy an ARM template for a Storage Account in Azure:

    ansible-playbook --connection=local ./ansible/azure/deploy_storage_account.yml --extra-vars "@ansible/vars/az_storage_sandbox_0010.yml"

To deploy an ARM template for a Virtual Machine in Azure:

    ansible-playbook --connection=local ./ansible/azure/deploy_windows_vm.yml --extra-vars "@ansible/vars/az_vm_win_2019_standalone.yml"

To run a playbook on a remote Windows system:

    export no_proxy=*
    ansible-playbook -ki ansible/inventory/azure.ini ./ansible/windows/update_windows.yml
