//引入当前对应模块
const categoryDTO = require('../database/model/category')
//引入爬虫
const superagent = require('superagent');
//引入类JQ解析工具cheerio
const cheerio = require('cheerio');
//引入追书神器地址（分类）
const reptileUrl = "http://m.zhuishushenqi.com/category/";
//开始爬虫
superagent.get(reptileUrl).end(async (err, res) => {
    // 抛错拦截
    if (err) {
        console.log(err);
        throw Error(err);
    }
    /**
     * res.text 包含未解析前的响应内容
     * 我们通过cheerio的load方法解析整个文档，就是html页面所有内容，可以通过console.log($.html());在控制台查看
     */
    let $ = cheerio.load(res.text);
    // console.log(res.text);
    let novelType = [];
    await $('.page-category-wraper .category-section').map(function (i, elem) {
        //将要插入的数据
        let novelTypeObj = {};
        //添加标题
        $('.page-category-wraper .category-section h4').eq(i).text();
        novelTypeObj.title = $('.page-category-wraper .category-section h4').eq(i).text();
        //添加当前列表
        let arr = [];
        $('.page-category-wraper .category-section').eq(i).find('.category-list a .name').map(function(j,elem) {         
            // console.log($('.category-section').eq(i).find('.category-list a .name').eq(j).text(),j);
            arr.push(
                {
                    title: $('.category-section').eq(i).find('.category-list a .name').eq(j).text(),
                    count: $('.category-section').eq(i).find('.category-list a .count').eq(j).text()
                }
            );
        });
        novelTypeObj.novelList = arr;
        // console.log(JSON.stringify(novelTypeObj));
        novelType.push(novelTypeObj);
    });
    // console.log(JSON.stringify(novelType));
    await saveData(novelType);
});
//这里遇到的问题是写入数据应该用一个对象包住，然后利用model已经定义好的来传参
let saveData = (novelType) => {
    categoryDTO.categoryList.create({
                novelTypeList: novelType
            }, function (err, doc) {
        console.log(doc)
    })
}