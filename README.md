# react_microservice_sample

フロントはReact、バックエンドはfastifyでマイクロサービスのサンプルを作りたいリポジトリ

### 環境

Windows11でVagrantを使ってAlmaLinuxを立ち上げた上で、Dockerを使って環境を立ち上げます。

1. コマンドプロンプトを立ち上げ、カレントディレクトリに Vagrantfile がある状態にして `vagrant up` する
1. `vagrant ssh` で AlmaLinux にログインする
1. `sudo su` で root ユーザに切り替えておく
1. `cd /vagrant` でディレクトリを移動し、 `ls -l` でリポジトリのファイルが見れることを確認する
1. `./provisioning.sh` を実行し、初期構築する

コンテナの単独起動と init.sql の実行。  

1. `docker run -d --rm -e MYSQL_ROOT_PASSWORD=root -p3306:3306 -v /vagrant/mysql/init.sql:/var/sql/init.sql --name mysql_test mysql:8.0 mysqld --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci`
2. `docker exec -it mysql_test /bin/bash`
3. `mysql -uroot -proot < /var/sql/init.sql`
4. `exit`
5. マウントするためのディレクトリを作成しておく  
    `mkdir -p /var/mysql/data`
6. パーミッションを付与しておく  
    `chmod -R 777 /var/mysql`

backend の docker イメージ作成。  
既存 DB に対する構築方法が出来ておらず、今はまだ ENTRYPOINT の設定により `prisma migrate` で DB やテーブルを構築するようにしている。

1. `cd /vagrant/backend`
2. `docker build -t backend_test .`

frontend の docker イメージ作成。

1. `cd /vagrant/frontend`
1. `docker build -t frontend_test .`

Docker Swarm 初期化。  
Vagrantfile で VM の IP アドレスを `192.168.33.70` にしているので以下のようになる

```sh
docker swarm init --advertise-addr 192.168.33.70
```

Docker Swarm サービス起動

```sh
docker stack deploy --with-registry-auth -c /vagrant/docker-stack-local.yml test
```

### バックエンドAPIの使い方

データ検索

```sh
curl http://192.168.33.70:3000/users
```

データ登録

```sh
curl http://192.168.33.70:3000/users -XPOST -H"content-type:application/json" -H"login-user: hoge" -d'{"user_id": 1, "user_name": "hoge", "sex": "male", "job": "hogehoge"}'
```

データ更新

```sh
curl http://192.168.33.70:3000/users/1 -XPUT -H"content-type:application/json" -H"login-user: hoge" -d'{"user_name": "fuga", "sex": "male", "job": "fugafuga"}'
```
