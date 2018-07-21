简单的静态资源的基本配置是在config文件中的loader

配置时候注意转义点.
include:[]
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
const config = {
    module: {
        rules: [
            {
                test:/\.css$/,
                loader:'css-loader'
            },
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ],
                include: []
            },
            //配置处理小的图片
            {
                test:/\.(gif|jpg|jpeg|png|svg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:1024,
                            name:'[name].[ext]'
                        }
                    }
                ]
            }
        ],
    },
}
css预处理器loader引入,顺序按照这种处理器loader在后面，然后css-loader>style-loader

1
2
3
4
5
6
7
8
9
//添加css预处理器
{
    test:/\.styl/,
    use:[
        'style-loader',
        'css-loader',
        'stylus-loader'
    ]
},
热更新配置是利用一个webpack 的插件来配置，在这里我们由于用的是同一份webpack.config.js，所有我们需要区分好生产环境和开发环境；
npm i webpack-dev-server  cross-env -D,利用cross-env来设置好使用哪个环境

如果不下载cross-env需要利用set配置好window或者是mac系统
1
2
3
4
5
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "cross-env NODE_ENV=production webpack --config webpack.config.js",
  "dev": "cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js"
},
书写的时候将利用配置好的启动项来判断是哪个环境
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
const isDev = process.env.NODE.ENV === 'development'
const config = {
    // ....
}

if(isDev) {
    //调试时，使代码映射正常代码
    config.devTool = '#cheap-module-eval-source-map'
    config.devServer = {
        port:8081,
        //利用0.0.0.0的好处是可以在任意设备上进行热更新
        host:'0.0.0.0',
        //显示错误
        overlay :{
            errors:true
        },
        //启动该项则只更新代码，而输入的那些页面上的数据不会随着代码的改变而消失
        hot: true
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}

module.exports = config