FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD=root

RUN touch /etc/mysql/conf.d/charactor.cnf
RUN echo "[mysqld]" > /etc/mysql/conf.d/charactor.cnf
RUN echo "character_set_server = utf8mb4" >> /etc/mysql/conf.d/charactor.cnf
RUN echo "collation_server = utf8mb4_bin" >> /etc/mysql/conf.d/charactor.cnf
RUN echo "[client]" >> /etc/mysql/conf.d/charactor.cnf
RUN echo "default-character-set = utf8mb4" >> /etc/mysql/conf.d/charactor.cnf

COPY init.sql /var/sql/

EXPOSE 3306

CMD ["mysqld"]
