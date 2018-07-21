什么是node，node能干啥，node能学好不？
这个问题开始写了之后就开始问自己，但是由于对于node是真的没有深入的去学习过，导致说不出口，大概就了解了能爬虫能写接口，其他应用场景也不是
很了解了还是得一步一步的来，等学完基础或者做出一些东西来了更好回答当前这个问题；

开始学习
特点:NODE是事件驱动，非阻塞I/O
非阻塞I/O

INPUT 和OUTPUT的简写

阻塞：I/O时进程休眠等待I/O完成后进行下一步（自上而下执行的意思，等待当前执行才开始下一步）

非阻塞：I/O时函数立即返回，进程不等待I/O完成

最大的包管理

环境
调试方法

1
console.log("This is test")
执行node --inspect-brk test.js
打开谷歌，输入chrome://inspect，enter后直接点击打开的node Debugger调试
点击左下角的Line , Column 可以格式化代码
点击箭头可以继执行
CommonJS

每个文件是一个模块，有自己的作用域
在模块内部module变量代表模块本身
module.exports属性代表模块对外的接口
requuire规则

/ 表示绝对路径， ./表示相对于当前文件的
支持 js,json,node拓展名，不写依次尝试（建议写上）
不写路径认为是build-in模块（node.js自带模块）或者各级node_modules内的第三方模块
所有语句会被执行
module被加载的时候执行，加载后缓存（不会重新加载，引用缓存,可以同时引入相同的两个来测试，第二个不会被加载）
在一般情况下，需要将所有的东西写在变量或者函数中，而不是立即执行；
一旦出现某个模块被循环加载，就只输出已经执行的部分，还未执行的部分不会输出
对第七条的解释

moduleA.js

1
2
3
4
5
6
module.exports.test = 'A';

const modB = require('./05_moduleB');
console.log('modA:',modB.test);

module.exports.test = 'AA';
moduleB.js

1
2
3
4
5
6
module.exports.test = 'A';

const modB = require('./05_moduleB');
console.log('modA:',modB.test);

module.exports.test = 'AA';
main.js

1
2
3
4
5
6
const modA = require('./05_moduleA');
//不会重新加载
const modB = require('./05_moduleB');
//完全输出
console.log(modA.test);
console.log(modB.test);
当执行main.js的时候会输出的只有部分的值，后面打印的才是完全加载的部分，由于require会缓存，则main.js第二条是不会被加载的

node_modules

新版的node.js 会抹平依赖，安装到了同级;
老版本会安装多层，会有很多层的node_modules;
新版提高了些性能相比老版本