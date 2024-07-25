#!/bin/bash

# Check if we're in a git repository
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    echo "Error: This is not a git repository."
    exit 1
fi

# Add all changes
git add .

# Prompt for commit message
echo "Enter your commit message:"
read commit_message

# Commit with the provided message
git commit -m "$commit_message"

# Push to the remote repository
git push

echo "Changes have been added, committed, and pushed successfully!"
