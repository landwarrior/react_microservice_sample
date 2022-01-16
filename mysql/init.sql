create database test;
use test;
create table users (
    user_id int not null,
    user_name varchar(30) not null,
    age int,
    sex varchar(10),
    hobby varchar(1000),
    job varchar(1000),
    primary key (user_id)
)
;
