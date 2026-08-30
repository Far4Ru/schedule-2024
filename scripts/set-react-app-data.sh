#!/usr/bin/env bash

set -euo pipefail

if [[ $# -lt 1 || $# -gt 2 ]]; then
    echo "Usage: $0 <data.json> [env-file]" >&2
    exit 1
fi

json_path=$1
env_path=${2:-.env}
variable_name=REACT_APP_DATA

if [[ ! -f "$json_path" ]]; then
    echo "JSON file not found: $json_path" >&2
    exit 1
fi

# GNU base64's -w 0 produces a single line without wrapping.
encoded=$(base64 -w 0 "$json_path")
new_line="${variable_name}=${encoded}"

env_directory=$(dirname "$env_path")
mkdir -p "$env_directory"
temporary_file=$(mktemp "${env_directory}/.env.tmp.XXXXXX")
trap 'rm -f "$temporary_file"' EXIT

if [[ -f "$env_path" ]]; then
    awk -v name="$variable_name" -v replacement="$new_line" '
        BEGIN { replaced = 0 }
        index($0, name "=") == 1 {
            if (!replaced) {
                print replacement
                replaced = 1
            }
            next
        }
        { print }
        END {
            if (!replaced) print replacement
        }
    ' "$env_path" > "$temporary_file"
else
    printf '%s\n' "$new_line" > "$temporary_file"
fi

mv "$temporary_file" "$env_path"
trap - EXIT

echo "Updated ${variable_name} in ${env_path}"
echo "Source: ${json_path}"
echo "Base64 characters: ${#encoded}"
