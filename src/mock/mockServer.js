/*
使用mockjs提供mock数据接口
 */
import Mock from 'mockjs'
import data from './data.json'

Mock.setup({
    timeout: '50-150' // 表示响应时间介于 200 和 600 毫秒之间，默认值是'10-100'。
})

// 用户所在地址
Mock.mock(/api\/position\/\w+/, {
    "code": 0,
    "data": {
        "address": "深圳市南山区",
        "city": "深圳市",
        "geohash": "40.10038,116.36867",
        "latitude": "40.10038",
        "longitude": "116.36867",
        "name": "深圳市南山区"
    }
})

// 用户信息
Mock.mock('/api/userinfo', {
    "code": 1,
    "msg": "请先登陆"
})

// 首页导航栏食物类别
Mock.mock('/api/index_category', {
    "code": 0,
    data: data.index_category
})

// 首页商家列表
Mock.mock(/\/api\/shops\?\w+/, {
    "code": 0,
    data: data.index_shops
})

// 发送登录页短信验证码
Mock.mock(/\/api\/sendcode\?phone=\w+/, {
    "code": 0,
    msg: '短信验证码发送成功，请注意查收！',
    smsCode: /[0-9]{6}/
})

// 获取登录页图片验证码
Mock.mock('/api/captcha', {
    code: 0,
    captcha: () => Mock.Random.image('100x40', '#FFF', Mock.Random.color(), Mock.Random.word(4).toUpperCase())
})

// 短信验证登录
Mock.mock('/api/login_sms', 'post', (request) => {
    const phone = JSON.parse(request.body).phone
    return {
        code: 0,
        data: {
            _id: "5a9cd9c6ad5b2d34d42b385d",
            phone: phone,
            name: 'test1'
        }
    }
})

// 账号密码登录
Mock.mock('/api/login_pwd', 'post', (request) => {
    const name = JSON.parse(request.body).name
    return {
        "code": 0,
        "data": {
            "_id": "5a9cd9c6ad5b2d34d42b385d",
            "name": name
        }
    }
})

// 退出登录
Mock.mock('/api/logout', {
    code: 0
})

// 返回goods的接口
Mock.mock('/goods', { code: 0, data: data.goods })
// 返回ratings的接口
Mock.mock('/ratings', { code: 0, data: data.ratings })
// 返回info的接口
Mock.mock('/info', { code: 0, data: data.info })



// export default ???  不需要向外暴露任何数据, 只需要保存能执行即可