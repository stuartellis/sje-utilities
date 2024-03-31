# SPDX-FileCopyrightText: 2024-present Stuart Ellis <stuart@stuartellis.name>
#
# SPDX-License-Identifier: MIT
#
# Recipes for container tasks

container_image_cpu := if arch() == 'aarch64' { 'arm64' } else { if arch() == 'x86_64' { 'amd64' } else { error('Unsupported operating system') } }
container_image_os := "linux"
container_tool := "docker"

# Remove unused container images
[no-cd]
clean:
    @echo "Removing unused containers and images..."
    @{{ container_tool }} container prune -f
    @{{ container_tool }} image prune -f
