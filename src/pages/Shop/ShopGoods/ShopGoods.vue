<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="leftUl">
          <li class="menu-item" v-for="(good, index) in goods" :key="index"
              :class="{current:index===currentIndex}"
          @click="clickItem(index)">
            <span class="text bottom-border-1px">
               <img class="icon"  v-show="good.icon"  :src=good.icon>
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="RightUl">
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index">
                <div class="icon">
                  <img width="57" height="57"
                       :src=food.icon>
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                    <span class="now">￥{{food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CortControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart/>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'
  import CortControl from '../../../components/CortControl/CortControl.vue'
  import ShopCart from '../../../components/ShopCart/ShopCart.vue'
  export default {
    data(){
      return{
        scrollY:0,//右侧滑动距离
        tops:[] // 右侧分类li标签的top值
      }
    },
    computed:{
      ...mapState(['goods']),
      //当前分类的下标
      currentIndex(){
        const {scrollY, tops}=this
       const index= tops.findIndex((top,index)=>{
          return scrollY >= top && scrollY < tops[index+1]
       })
       if( this.index!==index&&this.leftScroll){
          //保存最新的index
          this.index=index
         //将左侧列表选这项尽量置顶
         this.leftScroll.scrollToElement(this.$refs.leftUl.children[index],200)
       }
       return index
      },
    },
    mounted(){
      this.$store.dispatch('getShopGoods',()=>{
        this.$nextTick(()=>{
          this._initScroll()
          this._initTops()
        })
      })
    },
    methods:{
      //初始化滚动对象
      _initScroll(){
          //左侧列表滑动
            this.leftScroll= new BScroll('.menu-wrapper',{
            click:true
          })
          //右侧列表滑动
          this.rightScroll=new BScroll('.foods-wrapper',{
            probeType:1,
            click:true
          })
        //绑定scroll监听事件
        this.rightScroll.on('scroll',({x,y})=>{
            this.scrollY=Math.abs(y)
          })
        //绑定scrollEnd监听事件
        this.rightScroll.on('scrollEnd',({x,y})=>{
          this.scrollY=Math.abs(y)
        })
        },
      //初始化tops
      _initTops(){
        const tops=[]
        let top=0
        tops.push(top)
        const lis=this.$refs.RightUl.getElementsByClassName('food-list-hook')
        Array.prototype.slice.call(lis).forEach(li=>{
         top+=li.clientHeight
          tops.push(top)
        })
        //跟新tops
        this.tops=tops
      },
      //给左侧分类绑定点击监听
      clickItem(index){
        //获取当前位置
        const y= -this.tops[index]
        //跟新scrollY的位置
        this.scrollY=- y
        //左侧分类变化
        this.rightScroll.scrollTo(0,y,500)
      },
    },
    components:{
      CortControl,
      ShopCart
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>

