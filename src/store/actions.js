/**
 * Created by Flowers博爵 on 2018/11/19.
 */
/*
 Vuex最核心的管理对象
 */
import {
  reqAddress,
  reqShops,
  reqFoodCategorys,
  reqUserInfo,
  reqLogout,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo
} from '../api'
import {
  RECEIVE_SHOPS,
  RECEIVE_CATEGORYS,
  RECEIVE_ADDRESS,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  ADD_FOOT_COUNT,
  REDUCE_FOOT_COUNT
} from './mutations-types'

export default {
  // 异步获取地址信息
  async getAddress ({commit, state}) {
    const {longitude, latitude} = state
    const result = await reqAddress(longitude, latitude)
    // 根据结果提交mutation
    if(result.code===0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }
  },
  
  // 异步获取食品分类列表的异步action
  async getFoodCategorys ({commit}) {
    const result = await reqFoodCategorys()
    // 根据结果提交mutation
    if(result.code===0) {
      const foodCategorys = result.data
      commit(RECEIVE_CATEGORYS, {categorys:foodCategorys})
    }
  },
  
  // 异步获取商家列表的异步action
  async getShops ({commit, state}) {
    const {longitude, latitude} = state
    const result = await reqShops({longitude, latitude})
    // 根据结果提交mutation
    if(result.code===0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },
  // 异步临时会话异步action
  async getUserInfo ({commit}) {
    const result = await reqUserInfo()
    if(result.code===0) {
      const user=result.data
      commit(RECEIVE_USER, {user})
    }
  },
  //同步保存user的action
  saveUser ({commit},user){
  commit(RECEIVE_USER,{user})
  },
  // 异步退出登录异步action
  async logout ({commit}) {
    const result = await reqLogout()
    if(result.code===0) {
      commit(RESET_USER)
    }
  },
  
  //mock
  // 异步获取商家信息
  async getShopInfo({commit}) {
    const result = await reqShopInfo()
    if(result.code===0) {
      const info = result.data
      // info.score = 3.5
      commit(RECEIVE_INFO, {info})
    }
  },

// 异步获取商家评价列表
  async getShopRatings({commit}) {
    const result = await reqShopRatings()
    if(result.code===0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
    }
  },

// 异步获取商家商品列表
  async getShopGoods({commit},cb) {
    const result = await reqShopGoods()
    if(result.code===0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      //提交nutations，更新状态后调用
      typeof cb==='function' && cb()
    }
  },
  //跟新food数量的同步action
  updateFoodCount({commit},{food,isAdd}) {
    if(isAdd){
      commit(ADD_FOOT_COUNT, {food})
    }else{
      commit(REDUCE_FOOT_COUNT, {food})
    }
  },
}
