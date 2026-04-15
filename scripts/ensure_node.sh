#!/bin/bash

# Configuration
NODE_VERSION="v22.13.1"
NODE_DIST="node-$NODE_VERSION-linux-x64"
NODE_URL="https://nodejs.org/dist/$NODE_VERSION/$NODE_DIST.tar.xz"
INSTALL_DIR="/home/theophiledequecker/portfolio-clean/.node_env"

echo "Checking Node.js in $INSTALL_DIR..."

if [ ! -d "$INSTALL_DIR/bin" ]; then
    echo "Node.js not found. Downloading $NODE_VERSION..."
    mkdir -p "$INSTALL_DIR"
    curl -sL "$NODE_URL" | tar -xJ -C "$INSTALL_DIR" --strip-components=1
    if [ $? -eq 0 ]; then
        echo "Node.js $NODE_VERSION installed successfully in $INSTALL_DIR."
    else
        echo "Failed to download/extract Node.js."
        exit 1
    fi
else
    echo "Node.js $NODE_VERSION is already installed."
fi

# Export PATH for current subshell
export PATH="$INSTALL_DIR/bin:$PATH"

# Verify
node -v
npm -v
