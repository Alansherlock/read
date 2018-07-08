# wepy+koa2+mangoose


1. mangodb启动时候出现差错，导致原因是不正常退出，生成了mango.lock，删除了就好了
2. 数据库存储不进，是由于Schema写的格式出差错
3. koa需要在node高版本运行，需要安装node版本切换工具
4. 连接数据库在model的时候就已经安装，则连接的时候直接引入model文件即可
5. 爬虫使用的是cheerio和superagent这两个，目前还未写入定时爬取数据
6. 开始的时候引入ajax文件没有配置好promise，引入了wepy提供的启用promise文件后就可以获取到返回的数据了


## mangoose 

启动 `mongod`

##

启动小程序

wepy build --watch

## 启动 koa

node bin/www

## 前端部署koa到线上

### 需要的工具

1. 服务器
2. 由于是小程序，需要域名（阿里云买），https(阿里云云盾里面找到个证书购买免费的)；
3. fileZilla(用于传送文件到服务器)

### 安装一些必要的工具

node,npm,mangodb,nginx,pm2;

mangodb可以直接参考官网`https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#uninstall-mongodb-community-edition`，

node 安装开始
``` js
apt-get update
apt-get install nodejs
apt-get install npm
//记得安装后如果 -v 后没效果，可重启再看，装错版本的话只能是装 n 来重新将node更新到最新的版本
```

nginx 安装开始
``` js
apt-get update
apt-get install nginx
//service nginx reload,或者其他的命令开启 
```
开启nginx的代理请参考我的博客，`https://alansherlock.github.io/`






