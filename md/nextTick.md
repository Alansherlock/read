input输入限制只能输入小数遇到的问题
改了我半天发现是需要利用到$nextTick,翻开了下vue的文档关于$nextTick的解释，如下：

将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。

要理解的关键概念是DOM是异步更新的。在Vue中更改值时，更改不会立即呈现给DOM。相反，Vue将DOM更新排队，然后在计时器上更新DOM。通常，这种情况发生得如此之快以至于没有什么区别，但是，有时候，你需要在Vue渲染后更新渲染的DOM，你不能立即在方法中做，因为更新没有发生然而。在那些情况下，你会使用nextTick。来自对于$nextTick的理解

为什么会这样？

看了染陌大佬的$nextTick解析中有这样一段

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
<template>
  <div>
    <div>{{number}}</div>
    <div @click="handleClick">click</div>
  </div>
</template>
<script>
export default {
    data () {
        return {
            number: 0
        };
    },
    methods: {
        handleClick () {
            for(let i = 0; i < 1000; i++) {
                this.number++;
            }
        }
    }
}
</script>
当我们按下 click 按钮的时候，number 会被循环增加1000次。

那么按照之前的理解，每次 number 被 +1 的时候，都会触发 number 的 setter 方法，从而根据上面的流程一直跑下来最后修改真实 DOM。那么在这个过程中，DOM 会被更新 1000 次！太可怕了。

Vue.js 肯定不会以如此低效的方法来处理。Vue.js在默认情况下，每次触发某个数据的 setter 方法后，对应的 Watcher 对象其实会被 push 进一个队列 queue 中，在下一个 tick 的时候将这个队列 queue 全部拿出来 run（ Watcher 对象的一个方法，用来触发 patch 操作） 一遍。
因为目前浏览器平台并没有实现 nextTick 方法，所以 Vue.js 源码中分别用 Promise、setTimeout、setImmediate 等方式在 microtask（或是task）中创建一个事件，目的是在当前调用栈执行完毕以后（不一定立即）才会去执行这个事件。
——<–摘自染陌掘金小册–>