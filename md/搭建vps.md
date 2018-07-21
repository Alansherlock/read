docker是啥来着
开始的时候，我这个小飞机不是自己搭建的，同事说是学不会的，我就很好奇了，这个时候我通过简单的查看和了解是利用了docker，我做前端的一脸懵逼，只能慢慢百度了解；原来，docker是括号里这个介绍（简介：Docker是一个开源的引擎，可以轻松的为任何应用创建一个轻量级的、可移植的、自给自足的容器。开发者在笔记本上编译测试通过的容器可以批量地在生产环境中部署，包括VMs（虚拟机）、bare metal、OpenStack 集群和其他的基础应用平台。），装完各种奇怪的镜像后，慢慢就懂了，就是个壳，个壳可以往里塞东西；废话不多说，我们现在来了解下关于docker的基本语法；

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
docker images  //查看当前镜像列表，就是有多少个镜像装了

docker ps // 查看当前正在跑的镜像

docker ps -a //包括了未运行的

docker rmi [镜像ID] // 删除当前的镜像，有时候会下载错了

docker rm [容器ID] // 删除容器，就是ps列表里的了

docker run ..

docker start //等等请自行百度，太多了，嘻嘻

docker version
简单的介绍了一些命令行我们进入主题，其实我们是用这几条来搞定的，哈哈哈，emmmmm;

uname -a检查当前系统版本和内核版本（本人版本是16.04）

apt-get install -y docker.io利用Linux安装命令，装docker.io,本人在安装的时候出现了英文，没关系，不懂就翻译；（本人自己在安装的时候提示需要先安装两个依赖，但是在朋友阿里的服务器确是不用的，看着提示来装就好了）

等待安装完毕，现在我们使用下面的命令启动 Docker：systemctl start docker

运行系统引导时启用 docker，命令：systemctl enable docker

拉取镜像安装shadowsocks
shadowsocks镜像地址

先拉取当前镜像，然后直接复制第一条命令

docker pull mritd/shadowsocks

docker run -dt --name ss -p 6443:6443 mritd/shadowsocks -s "-s 0.0.0.0 -p 6443 -m aes-256-cfb 
-k test123 --fast-open"

docker ps查看是否运行成功