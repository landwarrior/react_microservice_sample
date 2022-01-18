# react_microservice_sample

フロントはReact、バックエンドはfastifyでマイクロサービスのサンプルを作りたいリポジトリ

### 環境

Windows11でVagrantを使ってAlmaLinuxを立ち上げた上で、Dockerを使って環境を立ち上げます。

1. コマンドプロンプトを立ち上げ、カレントディレクトリに Vagrantfile がある状態にして `vagrant up` する
1. `vagrant ssh` で AlmaLinux にログインする
1. `cd /vagrant` でディレクトリを移動し、ファイルが見れることを確認する
1. `./provisioning.sh` を実行し、初期構築する

mysql の docker イメージ作成。

1. `cd /vagrant/mysql`
1. `docker build -t mysql_test .`

コンテナの単独起動と init.sql の実行。  
init.sql をコンテナの外から実行したらうまくいかなかったので、コンテナ内に送り込んでコンテナ内で実行するようにしています。

1. `docker run -d --rm -p3306:3306 --name mysql_test mysql_test`
1. `docker exec -it mysql_test /bin/bash`
1. `mysql -uroot -proot < /var/sql/init.sql`
1. `exit`

backend の docker イメージ作成。  
既存 DB に対する構築方法が出来ておらず、今はまだ ENTRYPOINT の設定により `prisma migrate` で DB やテーブルを構築するようにしている。

1. `cd /vagrant/backend`
1. `docker build -t backend_test .`

frontend の docker イメージ作成。

1. `cd /vagrant/frontend`
1. `docker build -t frontend_test .`

Docker Swarm 初期化。  
Vagrantfile で VM の IP アドレスを `192.168.33.70` にしているので以下のようになる

```
docker swarm init --advertise-addr 192.168.33.70
```

Docker Swarm サービス起動

```
docker stack deploy --with-registry-auth -c /vagrant/docker-stack-local.yml test
```

### バックエンドAPIの使い方

データ検索

```
curl http://192.168.33.70:3000/users
```

データ登録

```
curl http://192.168.33.70:3000/users -XPUT -H"content-type:application/json" -H"login-user: hoge" -d'{"user_id": 1, "user_name": "hoge", "sex": "male", "job": "hogehoge"}'
```

データ更新

```
curl http://192.168.33.70:3000/users/1 -XPOST -H"content-type:application/json" -H"login-user: hoge" -d'{"user_name": "fuga", "sex": "male", "job": "fugafuga"}'
```
