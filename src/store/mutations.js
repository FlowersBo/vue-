/**
 * Created by Flowers博爵 on 2018/11/19.
 */
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  REDUCE_FOOT_COUNT,
  ADD_FOOT_COUNT,
  CLEAR_CART
} from './mutations-types'
export default{
  [RECEIVE_ADDRESS](state,{address}){
  state.address=address
  },
  [RECEIVE_CATEGORYS](state,{categorys}){
    state.categorys=categorys
  },
  [RECEIVE_SHOPS](state,{shops}){
    state.shops=shops
  },
  [RECEIVE_USER](state,{user}){
    state.user=user
  },
  [RESET_USER](state){
    state.user={}
  },
  //mock
  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },
  
  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },
  
  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },
  //food食物更新 购物车
  [ADD_FOOT_COUNT](state,{food}) {
    if(food.count){
      food.count++
    }else{
      // food.count=1 新添加的属性没有数据绑定==>不会更新界面
      Vue.set(food, 'count', 1)
      state.cartFoods.push(food)
    }
  },
  
  [REDUCE_FOOT_COUNT](state,{food}) {
    if(food.count) {
      food.count--
      if(food.count===0){
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    }
  },
  [CLEAR_CART](state) {
    //清空food中的count
    state.cartFoods.forEach(food=>food.count=0)
    state.cartFoods = []
  },
}
