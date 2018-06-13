import { ajax } from './ajax'

const api = {
  category: '/v1/novelList'
};

// 获取分类列表
const category = (data) => ajax.get(api.category, data);

module.exports = {
  category
}
