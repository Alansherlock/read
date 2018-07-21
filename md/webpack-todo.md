
搭建开始
新建文件夹 webpack-todo

1
2
3
4
5
6
7
8
// 进入该文件夹
cd webpack-todo

// 项目初始化
npm init 

// 下载一些必要的文件，所有的都是用 -D来执行
npm i webpack vue-loader vue css-loader -D
webpack.config.js书写
在根目录新建webpack.config.js,开始配置webpack；
由于是使用了webpack4,因此vue-loader需要是以插件的形式来引入到配置环境当中
webpack.config.js

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
const path = require('path')
//webpack4需要引入作为插件使用，区别于2.x,3.x版本
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {   
    mode: "development",
    entry: path.join(__dirname,'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname,'dist')
    },
    module: {
        rules: [
            {
                test:/.css$/,
                loader:'css-loader'
            },
            {
                test:/.vue$/,
                loader:'vue-loader'
            }
        ],
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}
配置webpack打包命令,即npm run build
配置package.json的webpack打包命令,即npm run build

1
2
3
4
5

"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "webpack --config webpack.config.js"
}
书写index.js
1
2
3
4
5
6
7
8
import Vue from 'vue'
import App from './app.vue'

const root  = document.createElement('div');
document.body.appendChild(root);
new Vue({
    render:(h)=> h(App)
}).$mount(root)
app.vue书写
新建src做为代码书写目录，开始书写app.vue;
由于是以vue结尾的文件，因此我们需要配置vue-loader,来识别该文件
由于我们代码里面使用了css-loader,因此需要下载css-loader来解析
app.vue

<template>
    <div id="test">{{text}}</div>
</template>

<script>
export default {
    data() {
        return{
            text:"abc"
        }
    }
}
</script>

<style>
    #test {
        color:red;
    }
</style>
