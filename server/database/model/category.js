//引入定义好的mangoose，开启Schema;
var mongoose = require('../db'),
    Schema = mongoose.Schema;
var Promise = require('es6-promise').Promise;

var categoryList = new Schema({
    novelTypeList: {
        type: Array,
        default: []
    },
});
categoryDTO = function() {}
var categoryList = mongoose.model('categoryList', categoryList);
categoryDTO.prototype = {
    constructor: categoryDTO,
    save: function (obj) {
        return new Promise(function (resolve, reject) {
            var instance = new categoryList(obj);
            instance.save(function (err) {
                if (err) return reject(err);
                resolve();
            });
        });
    },
    delete: function (aid) {
        return new Promise(function (resolve, reject) {
            categoryList.remove({
                id: aid
            }, function (err, data) {
                if (err) return reject(err)
                resolve(d);
            });
        });
    },
    search: function (query) {
        return new Promise(function (resolve, reject) {
            categoryList.find(query, function (err, d) {
                if (err) return reject(err)
                var data = [];
                if (d.length > 0) {                 
                        data.push(d);
                }
                resolve(data);
            });
        });
    }

};
module.exports = {
    categoryList,
    categoryDTO
};