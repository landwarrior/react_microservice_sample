#!/bin/bash

set -e

# ts-node-dev でコンテナを起動してコンテナ内のファイルを書き換えたらコンテナの再起動は不要なはずだが、うまくいっていない
cp -pr /var/temp/backend/src /var/app/node/
cp -pr /var/temp/backend/prisma /var/app/node/
