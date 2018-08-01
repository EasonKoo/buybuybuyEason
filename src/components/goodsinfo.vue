<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div v-if="this.imglist.length!=0" class="pic-box">
                                <ProductZoomer :baseImages="images" :base-zoomer-options="containerRoundOptions"></ProductZoomer>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <div class="el-input-number el-input-number--small">
                                                    <span role="button" class="el-input-number__decrease" :class="{'is-disabled':clickCount==1}">
                                                        <i class="el-icon-minus" v-on:click="clickCount==1?clickCount=1:clickCount--"></i>
                                                    </span>
                                                    <span role="button" class="el-input-number__increase">
                                                        <i class="el-icon-plus" v-on:click="clickCount==goodsinfo.stock_quantity?clickCount=goodsinfo.stock_quantity:clickCount++"></i>
                                                    </span>
                                                    <div class="el-input el-input--small">
                                                        <!---->
                                                        <input autocomplete="off" size="small" type="text" rows="2" max="60" min="1" validateevent="true" class="el-input__inner"
                                                            role="spinbutton" aria-valuemax="60" aria-valuemin="1" aria-valuenow="1"
                                                            aria-disabled="false" v-model="clickCount">
                                                        <!---->
                                                        <!---->
                                                        <!---->
                                                    </div>
                                                </div>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button @click="cartAdd" class="buy">立即购买</button>
                                                <button @click="cartAdd" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a v-on:click="isShowDesc=true" href="javascript:;" :class={selected:isShowDesc}>商品介绍</a>
                                        </li>
                                        <li>
                                            <a v-on:click="isShowDesc=false" href="javascript:;" :class={selected:!isShowDesc}>商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <div v-html="goodsinfo.content" class="tab-content entry" :style="{display: isShowDesc?'block':'none'}">

                            </div>
                            <div class="tab-content" :style="{display: !isShowDesc?'block':'none'}">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea v-model.trim="commentText" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input v-on:click="submitComment" id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="commentList.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in commentList" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | cutTime}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>

                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                            <Page :total="totalCount" show-elevator show-sizer :current=pageIndex :page-size=pageSize placement="top" @on-change="changePageIndex($event)"
                                                @on-page-size-change="changePageSize($event)" :page-size-opts="[5,10,15,20]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/goodsinfo/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/90" class="">{{item.title}}</a>
                                            <span>{{item.add_time | cutTime}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BackTop></BackTop>
        <!-- 放一张图片 -->
        <img :src="imglist[0].original_path" v-if="imglist.length!=0" class="firstImage" style="display: none">
    </div>

</template>
<script>
    //引入模块
    import ProductZoomer from 'vue-product-zoomer'
    //引入jquery
    import $ from "jquery"
    export default {
        name: "goodsinfo",
        data: function () {
            return {
                goodsinfo: {},
                hotgoodslist: [],
                imglist: [],
                isShowDesc: true,
                images: {
                    normal_size: []
                },
                clickCount: 1,
                containerRoundOptions: {
                    zoomFactor: 4,
                    pane: 'container-round',
                    hoverDelay: 300,
                    namespace: 'inline-zoomer',
                    move_by_click: true,
                    scroll_items: 5,
                    choosed_thumb_border_color: "#bbdefb"
                },
                pageSize: 5,
                pageIndex: 1,
                commentText: "",
                commentList: [],
                totalCount: 0,

            }
        },
        watch: {
            //监听$route这个值的变化
            $route(to, from) {

                // console.log(this);

                this.setData();

            }
        },
        methods: {

            setData() {

                this.imglist = [];
                this.images.normal_size = [];


                this.axios.get("/site/goods/getgoodsinfo/" + this.$route.params.id)
                    .then((response) => {
                        //console.log(response);
                        //console.log(response);
                        this.goodsinfo = response.data.message.goodsinfo;
                        this.hotgoodslist = response.data.message.hotgoodslist
                        this.imglist = response.data.message.imglist;
                        //console.log(this.imglist);
                        this.imglist.forEach((v, i) => {
                            this.images.normal_size.push({
                                id: v.id,
                                url: v.original_path
                            })
                        })

                    })

            },
            getComment() {
                this.axios.get(
                        `site/comment/getbypage/goods/${this.$route.params.id}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
                    )
                    .then((response) => {
                        //console.log(response);
                        this.commentList = response.data.message;
                        this.totalCount = response.data.totalcount
                    })
            },
            changePageIndex(page) {
                // console.log(page);
                this.pageIndex = page;

                this.getComment()
            },
            changePageSize(size) {
                this.pageSize = size;
                this.getComment()
            },
            submitComment() {
                // console.log("提交啦");

                if (this.commentText.length != 0) {
                    this.axios.post(`site/validate/comment/post/goods/${this.$route.params.id}`, {
                            "commenttxt": this.commentText
                        })
                        .then((response) => {
                            console.log(response);
                            if (response.data.status == 0) {
                                this.getComment();
                                this.commentText = "";
                            }
                        })
                    this.$Message.sucess('评论提交成功');

                } else {
                    this.$Message.error('对方不想理你,并像你丢了一堆bug');
                }
            },
            cartAdd() {
                // console.log(this);这里面this指向也是vue这个组件
                //获取到当前按钮的位置
                let obj = $("#buyButton .add").offset();
                let offset = $('.icon-cart').offset();
                //把位置赋值给原来的图片
                $(".firstImage").show().css(obj).addClass("rotate").animate(offset, 1000, function () {
                    $(".firstImage").removeClass("rotate").hide()
                })
                // console.log( $(".firstImage").offset());
                //隐藏了之后额偏位移都是top为0 left也为0
                //触发修改的函数
                // console.log(this.$route.params.id);
                let id = this.$route.params.id;
                //console.log(id);
                //console.log(this.clickCount);

                this.$store.commit('increment', {
                    goodId: id,
                    goodNum: this.clickCount
                })
            }
        },
        created() {
            //  console.log(this);
            //发起ajax请求,拿到数据,
            this.setData();
            this.getComment();

        },

        //注册组件
        components: {
            ProductZoomer
        }

    }
</script>
<style lang="scss">
    @import url("../../node_modules/font-awesome/css/font-awesome.min.css");
    /* 组件不能设置样式,要在页面上去看了之后才可以知道,然后再给样式 */

    .inline-zoomer-zoomer-box {
        width: 368px;

    }

    .control-box {
        height: 88px;
        img {
            height: 88px;
            width: 88px;
        }
    }


    .control-box .control i {
        text-align: center;
    }

    .firstImage {
        position: absolute;
        width: 40px;
        top: 0;
        left: 1200px;
    }

    .firstImage.rotate {
        transform: scale(.5, .5) rotateZ(3600deg);
        opacity: 0.4;
        /* 哪个属性变了就写哪个 */
        transition: transform 1s, opacity 1s
    }
</style>