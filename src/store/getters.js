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
  //评论总数
  ratingsCount(state){
    return state.ratings.length
  },
  //评论满意总数
  positiveRatingsCount(state){
    return state.ratings.reduce((pre,rating)=>pre+(rating.rateType===0? 1: 0),0)
  }
}
