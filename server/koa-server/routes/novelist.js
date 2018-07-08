const router = require('koa-router')()
//引入数据库moogoose模型
const categoryDTO = require('../../database/model/category')
router.prefix('/v1')
categoryDTO.categoryList.find({}, async (err, doc) => {
    router.get('/novelList', function (ctx, next) {
        ctx.body = "wuyu";
    })
})

module.exports = router