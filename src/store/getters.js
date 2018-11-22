/**
 * Created by Flowers博爵 on 2018/11/19.
 */
export default{
  //购物车food总数量
  totalCount(state){
    return state.cartFoods.reduce((pre,food)=> pre+food.count,0)
},
  //购物车food总价格
  totalPrice(state){
    return state.cartFoods.reduce((pre,food)=> pre+food.count*food.price,0)
  },
}
