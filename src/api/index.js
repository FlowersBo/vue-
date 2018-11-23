/*
包含n个接口请求函数的模块
函数的返回值是promise对象
 */
import ajax from './ajax'
const BASE = '/api'//开发环境
/*const BASE = '' *///生产环境
// 1、根据经纬度获取位置详情
export const reqAddress = (longitude, latitude) => ajax(BASE+`/position/${latitude},${longitude}`)

// 2、获取食品分类列表
export const reqFoodCategorys = () => ajax(BASE+'/index_category')

//3、根据经纬度获取商铺列表
export const reqShops = ({longitude, latitude}) => ajax(BASE+ '/shops', {latitude, longitude})
//4发送短信验证码
export const reqSendCode=(phone)=>ajax(BASE+'/sendcode',{phone})
// 5.手机号码验证登陆
export const reqSmsLogin=(phone,code)=>ajax(BASE+'/login_sms',{phone,code},'POST')
// 6.用户密码验证登陆
export const reqPwdLogin=({name,pwd,captcha})=>ajax(BASE+'/login_pwd',{name,pwd,captcha},'POST')
// 7.获取用户会话接口
export const reqUserInfo=()=>ajax(BASE+'/userinfo')
// 8.退出登录
export const reqLogout=()=>ajax(BASE+'/logout')

/*mock*/
export const reqShopGoods=()=>ajax('/goods')
export const reqShopRatings=()=>ajax('/ratings')
export const reqShopInfo=()=>ajax('/info')
