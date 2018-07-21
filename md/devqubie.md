packjson中的dependencies与devDependencies的区别

npm在安装npm包时，有两个中命令参数可以把他们的信息放在package.json中

–save
–save-dev
–save会把依赖包名称放到dependencies键下，–save-dev放到devDependencies键下
devDependencies 下列出的模块，是我们开发时用的，比如 grunt-contrib-uglify，我们用它混淆 js 文件，它们不会被部署到生产环境。dependencies 下的模块，则是我们生产环境中需要的依赖。