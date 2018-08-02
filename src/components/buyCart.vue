<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <!-- 这里是需要渲染的结构 -->
                                <tr v-for="(item, index) in cartList" :key="item.id">
                                    <td width="48" align="center">
                                        <el-switch v-model="item.isSelected" active-color="#409eff" inactive-color="#555555">
                                        </el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <div class="shopInfo">
                                            <img :src="item.img_url" alt="" style="width: 50px; height: 50px; margin-right: 10px;">
                                            <span>{{item.title}}</span>
                                        </div>
                                    </td>
                                    <td width="84" align="left">{{item.sell_price}}</td>
                                    <td width="104" align="center">
                                        <!-- <el-input-number @change="updata($event,index)" v-model="item.buycount" size="mini" :min="1" :max="10" label="描述文字"></el-input-number> -->
                                        <numControl @change="change($event,index)" :count="item.buycount" :max="10" :min="1"></numControl>
                                    </td>
                                    <td width="104" align="left">{{item.buycount*item.sell_price}}</td>
                                    <td width="54" align="center">
                                        <el-button type="text" @click="open(index)">删除</el-button>
                                    </td>
                                </tr>
                                <tr v-if="cartList.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{totalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalMoney}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                            <!-- <router-link to="/payOrder">
                                <button class="submit" onclick="formSubmit(this, '/', '/shopping.html');">立即结算</button>
                            </router-link> -->
                            <!-- 不能直接跳转页面,要带值过去吧 -->
                            <button class="submit" @click="formSubmit">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    //引入组件
    import numControl from "./buyCart-component.vue";
    export default {

        data: function () {
            return {
                cartList: [],
            }
        },
        //调用接口 拿数据
        created() {
            //console.log(this.$store.state.buyGood);

            let buyList = this.$store.state.buyGood
            let ids = "";
            for (const key in buyList) {
                ids += key
                ids += ","
            }
            ids = ids.slice(0, -1);
            //console.log(ids);

            this.axios.get(`site/comment/getshopcargoods/${ids}`)
                .then((response) => {
                    //console.log(this.cartList);
                    response.data.message.forEach(v => {
                        v.buycount = buyList[v.id]
                        v.isSelected = true;
                    });
                    this.cartList = response.data.message
                   // console.log(this.cartList);

                })
        },
        computed: {
            totalCount: function () {
                let totalQuantity = 0;
                this.cartList.forEach((v) => {
                    if (v.isSelected) totalQuantity += v.buycount
                })
                return totalQuantity
            },
            totalMoney: function () {
                let totalPrice = 0;
                this.cartList.forEach((v) => {
                    if (v.isSelected) totalPrice += v.buycount * v.sell_price
                })
                return totalPrice
            },

        },
        methods: {
            updata(value, index) {
                // console.log(value);
                // console.log(index);
                //拿到索引对应的id
                let id = this.cartList[index].id;
                //删除数组
                this.$store.commit('updateData', {
                    goodId: id,
                    goodNum: value
                })

            },
            open(index) {
                this.$confirm('您确认移除该商品吗, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    //同步到vuex
                    this.$store.commit("del", this.cartList[index].id)
                    this.cartList.splice(index, 1)

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            change(num, index) {
                //可以获取数量和索引
                console.log(num, index);
                //先修改仓库的值
                this.$store.commit("updateData", {
                    goodId: this.cartList[index].id,
                    goodNum: num,
                })

            },
            formSubmit() {
                //获取被选中的id
                let ids = "";
                this.cartList.forEach((v) => {
                    if (v.isSelected == true) {
                        ids += v.id;
                        ids += ","
                    }
                })
                if(ids==""){
                    this.$Message.error("你倒是选一个啊")
                    return;
                }else{

                ids = ids.slice(0, -1)       
                //console.log(ids);
                this.$router.push("/payOrder/"+ids)
                }
            }

        },
        components: {
            numControl
        }
    }
</script>
<style lang="scss">
    .el-message-box__message p {
        text-align: center;
    }

    #count {
        display: flex;
        span {
            width: 30px;
            height: 30px;
            border: 1px solid #000;
            text-align: center;
            line-height: 30px;
            font-size: 18px;
            cursor: pointer;
            &:first-child {
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;

            }
            &:last-child {
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;

            }
        }
        input {
            width: 80px;
            border: 1px solid #000;
            text-align: center;
            margin: 0px -1px;
        }
    }
</style>