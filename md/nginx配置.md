nginx 安装及配置
apt-get update

apt-get install nginx

sudo service nginx reload,或者有其他的命令能启动就行

开始找NGINX配置文件，有可能在root目录下的usr/etc,或者usr/local,这两个找找，ps -ef | grep nginx 查找文件夹路径，

vim nginx.conf,进入，点击i,进入编辑，然后在将以下的文件复制进去，以下需要修改的内容有证书编号，还有端口（如果也和我一样就不需要修改8888，其他详细配置请自行百度或者提issue提问我）
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
//配置代理的本地端口地址
upstream hello {
        server 127.0.0.1:8888;
}
server {
        listen 80;
        server_name 67.218.151.13;

        location / {
                proxy_set_header Host  $http_host;
                proxy_set_header X-Real-IP  $remote_addr;
                proxy_set_header X-Forwarded-For  $proxy_add_x_forwarded_for;
                proxy_set_header X-Nginx-proxy true;
                proxy_pass http://hello;
                proxy_redirect off;
        }
}
//配置 https证书，按照阿里云证书下载指南，建立新的代理地址，将location更改为和上面一样
server {
        listen 443;
        server_name localhost;
        ssl on;
        root html;
        index index.html index.htm;
        ssl_certificate   cert/21477828393053.pem;
        ssl_certificate_key  cert/21477828393053.key;
        ssl_session_timeout 5m;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_prefer_server_ciphers on;
        location / {
                proxy_set_header Host  $http_host;
                proxy_set_header X-Real-IP  $remote_addr;
                proxy_set_header X-Forwarded-For  $proxy_add_x_forwarded_for;
                proxy_set_header X-Nginx-proxy true;
                proxy_pass http://hello;
                proxy_redirect off;
        }
}
