# Ansible

## Azure

To create a resource group in Azure:

    ansible-playbook --connection=local ./ansible/azure/deploy_resource_group.yml --extra-vars "@ansible/vars/az_rg_sandbox_0010.yml"

To destroy a resource group in Azure:

    ansible-playbook --connection=local ./ansible/azure/destroy_resource_group.yml --extra-vars "@ansible/vars/az_rg_sandbox_0010.yml"

To deploy an ARM template for a Virtual Machine in Azure:

    ansible-playbook --connection=local ./ansible/azure/deploy_windows_vm.yml --extra-vars "@ansible/vars/az_vm_win_2019.yml"

To run a playbook on a Windows system:

    export no_proxy=*
    ansible-playbook -ki ansible/inventory/azure.ini ./ansible/windows/update_windows.yml
