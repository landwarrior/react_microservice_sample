#!/usr/bin/env bash

set -e

# とりあえず開発ツール関係を入れておく
if ! [[ $(rpm -qa | grep gcc | grep -v libgcc) ]]; then
    echo "  - dnf groupinstall \"Development Tools\""
    sudo dnf groupinstall -y "Development Tools"
fi

# 補完してくれるやつ
if ! [[ $(rpm -qa | grep bash-completion) ]] ; then
    echo "  - dnf install bash-completion"
    sudo dnf install -y bash-completion
fi

# Docker インストール
if ! [[ $(rpm -qa | grep docker) ]] ; then
    yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
    echo "  - dnf install docker-ce docker-ce-cli containerd.io"
    sudo dnf install -y docker-ce docker-ce-cli containerd.io
    sleep 10s
    systemctl start docker
    systemctl enable docker
fi
