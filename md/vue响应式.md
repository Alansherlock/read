看过尤大的vue文档就能知道响应式原理运用的是Object.defineProperty()这个方法；
具体的这个方法的解析，可以查看MDN中对Object.defineProperty()的解析，

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
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>简单实现vue响应式</title>
</head>

<body>
    <div class="p"></div>
    <script>
    //首先，我们都会围绕着Object.defineProperty，因此这个方法必不可少
    // 1. 我们先定义一个函数来接受（data对象，对象的key，对象key值，关于set方法的回调）
    function defineReactive(obj,key,val,cb,newval) {
        Object.defineProperty(obj,key,{
            enumerable:true,//表示可枚举的，如果为false，则在利用for...in...的时候是找不到该属性的
            configurable:true,//true该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。
            get: ()=>{
                // console.log(val);
                return val;
            },
            set: newval => {
                 //当key被写入新值的时候可以去改变，接着触发我们定义的cd();   
                if(newval!==val) {
                    val = newval;
                }
                cb();
            } 
        })
    }
    // 定义一个类名为Vue的
    class Vue{
        constructor(options) {
            console.log(1);
            this._data = options.data;
            observe(this._data,options.render);
        }
    }
    let app = new Vue({
        el: '#app',
        data: { 
            text: 'text',
            text2: 'text2' 
        },
        render(){ 
            console.log('this'); 
        }
    })
    function observe(value,cb) {
        Object.keys(value).forEach((key) => {
            // console.log(value);
            defineReactive(value, key, value[key] , cb)})                      
    } 
    app._data.text2 = 'ceshi'; //更改text2;
    console.log(app._data.text2);
    document.querySelector(".p").append(app._data.text2+'---'+app._data.text);
    </script>
</body>
</html>