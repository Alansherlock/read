vue+axios 上传七牛云图片


图片上传
${base}为项目路径
QiNiu.upUrl为自己项目的七牛云线上地址
Base64.encode(setImgKey()为key值做处理，便于以后删除不是生产服的线上图片
具体可以参考七牛云官网
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
//获取七牛云上传token,此处是后台写的接口获取的token的接口
export const getUploadToken = params => {
    return axios.get(`${base}/v1/api/public/getUploadToken`, {params: {...params}}, config);
};

//上传图片的接口
export const upDetailImg = (params, con) => {
    function setImgKey() {
        const storeId = JSON.parse(sessionStorage.getItem('isLogin')).userId;
        const date = +new Date() + '';
        return storeId + '_' + _env + '_' + md5(storeId + date);
    }

    return axios.post(QiNiu.upUrl + '/putb64/-1/key/' + Base64.encode(setImgKey()) + '/', params, con)
},
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
28
29
30
imgUpload(e) {
    //当前的项目的APPID，来获取七牛上传的token
    let params = {
        appId: "c4805e2dcc"
    };
    const file = e.target.files;//拿到当前上传的文件数组；
    for (let i = 0; i < file.length; i++) {//可以对该数组中上传的每一个文件进行文件的大小判断进而做限制
        if (file[i].size > 5000000) {
            return false;
        }
        //在执行当前接口获取token的同时new 一个FromData，然后执行需要上传的参数，从而将图片上传；
        getUploadToken(params).then(res => {
            this.img_name.token = res.data.uptoken;
            var params2 = new FormData();
            params2.append("file", file[i]);
            params2.append("token", res.data.uptoken);
            params2.append("key", this.setImgKey());
            upDetailImgs(params2, {}).then(result => {
                const _imgUrl =config.qiniu.baseUrl + result.data.key;
                this.img_list.push(_imgUrl);
            });
        });
    }
},
//md5图片上传Key的拼接，获取的是当前的用户Id，以及当前时间，拼接成一个唯一的key值；在以后自己的获取中，如果没有做这个七牛也会随机的生成key，不必拼接；
setImgKey() {
  const storeId = JSON.parse(sessionStorage.getItem("isLogin")).userId;
  const date = +new Date() + "";
  return storeId + "_" + _env + "_" + md5(storeId + date);
},
以上就是在项目中用到的图片上传的一个函数；

1
2
3
4
5
input type = 'file',input的类型为文件类型

accept = 'image/png,image/jpeg,image/jpg,image/gif',限制图片的上传类型，

file[i].size，限制图片的上传大小，在设置了多选之后，file为一个数组，因此，需要用for循环对每一个进行判断
