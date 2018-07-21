以前对于input上传的优化处理
以前是直接就是将input上传按钮利用opacity:0;,将按钮透明了放在美化好的按钮上面

vue利用ref绑定好dom然后点击美化好的标签即可出发上传
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
<template>
    <div @click='inputClick'></div>
    <input ref="input" type="file" style="display:none;" />
</template>
<script>
    methods: {
        //利用当前方法即可直接调用
        inputClick() {
            this.refs.input.click();
        }
    }
</script>
