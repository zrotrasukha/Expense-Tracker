#!/bin/bash

echo "🛠️ Building frontend..."
cd ../client
bun install
bun run build

echo "🚚 Moving dist to server/client/dist"
rm -rf ../server/client/dist
mkdir -p ../server/client/dist
cp -r dist/* ../server/client/dist

echo "✅ Frontend build done!"
