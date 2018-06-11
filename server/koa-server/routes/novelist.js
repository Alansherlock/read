const router = require('koa-router')()
//引入数据库moogoose模型
const categoryDTO = require('../../database/model/category')
router.prefix('/novelList')
categoryDTO.categoryList.find({}, async (err, doc) => {
    router.get('/', function (ctx, next) {
        ctx.body = doc
    })
})

module.exports = router