vue中书写jsx
由于使用elementUI的时候有时候表格的表头需要自定义，因此他给出了书写vue的jsx，有个render-Header的方法

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
// html
<el-table-column prop="waitPurchaseQuantity" :render-header="renderHeaderCheck" label="直接到料" width="120"        align="center">
    <template slot-scope="scope">
        <div class="materiel-header center-block" v-for="(item,index) in scope.row.materialsSkus" :key="index" >
            <el-checkbox v-model="item.directArrive"></el-checkbox>
        </div>
    </template>
</el-table-column>
// js
renderHeader(createElement, { column, $index }) {
    return <div class="table-header">
    {
        this.specific.map(item =>{
            return <div >{item}</div>
        })
    }  
    </div>  
    ;
},
renderHeaderCheck(createElement, { column, $index }) {
    return <div class="materiel-header">
    {
        <el-checkbox onChange={this.checkMateriel} vModel="checked">直接到料</el-checkbox>
    }  
    </div>  
    ;
},
上面的写法则表现出来对jsx写法的基本使用，在使用之前我们还需要根据需要引入jsx 的依赖文件.babelrc
{
  "presets": ["es2015", "stage-2","env"],
  "plugins": ["transform-runtime","transform-vue-jsx","jsx-v-model"],
  "comments": false
}