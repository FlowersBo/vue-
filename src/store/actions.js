/**
 * Created by Flowers博爵 on 2018/11/19.
 */
/*
 Vuex最核心的管理对象
 */
import {
  reqAddress,
  reqShops,
  reqFoodCategorys
} from '../api'
import {
  RECEIVE_SHOPS,
  RECEIVE_CATEGORYS,
  RECEIVE_ADDRESS
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
}