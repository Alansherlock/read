//引入定义好的mangoose，开启Schema;
var mongoose = require('../db'),
    Schema = mongoose.Schema;


var categoryList = new Schema({
    novelTypeList: {
        type: Array,
        default: []
    },
});
var categoryList = mongoose.model('categoryList', categoryList);
module.exports = {
    categoryList
};