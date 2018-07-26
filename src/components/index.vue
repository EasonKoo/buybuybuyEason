<template>
    <div class="index">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="(item, index) in cateList" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="(itemson, index) in item.subcates" :key="itemson.id">
                                                {{itemson.title}}&nbsp;
                                            </span>

                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="(itemson, index) in item.subcates" :key="itemson.id" href="/goods/43.html">手机通讯</a>

                                            </dd>
                                        </dl>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <el-carousel height="341px">
                            <el-carousel-item v-for="(item, index) in sliderList" :key="item.id">
                                <img :src="item.img_url" alt="">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in topList " :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time | cutTime}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- 这个是商品的部分 -->
        <div class="section" v-for="(item, index) in goodList" :key="item.level1cateid" >
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="(itemson, index) in item.level2catelist" :key="itemson.subcateid">{{itemson.subcatetitle}}</a>
                   
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="(itemSon, index) in item.datas" :key="itemSon.artID">
                            <a href="#/site/goodsinfo/87" class="">
                                <div class="img-box">
                                    <img v-lazy="itemSon.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{itemSon.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{itemSon.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{itemSon.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{itemSon.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import axios from "axios";
    import moment from "moment";
    export default {
        //组件里声明数据
        data: function () {
            return {
                cateList: [],
                sliderList: [],
                topList: [],
                goodList:[]
            }
        },
        filters: {
            cutTime(value) {
                return moment(value).format("YYYY年MM月DD日")
            }
        },
        //可以给也可以不给
        beforeMount: function () {
            this.$nextTick(function () {
                // Code that will run only after the
                // entire view has been rendered
                //console.log("哈哈哈");
                axios.get("http://47.106.148.205:8899/site/goods/gettopdata/goods")
                    .then((response) => {
                        //console.log(response);
                        this.cateList = response.data.message.catelist;
                        this.sliderList = response.data.message.sliderlist;
                        this.topList = response.data.message.toplist;

                       // console.dir(this.sliderList);


                    })
                axios.get("http://47.106.148.205:8899/site/goods/getgoodsgroup")
                    .then((response) => {
                        //console.log(response);
                        this.goodList = response.data.message;

                    })



            })
        }
    }
</script>
<style scoped>
    /* 组件不能设置样式,要在页面上去看了之后才可以知道,然后再给样式 */

    .el-carousel img {
        width: 100%;
        height: 100%;
        display: block;
    }
</style>