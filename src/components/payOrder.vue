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
                                <li class="active">
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
                    <div class="cart-box">
                        <el-form status-icon :model="orderInfo" :rules="rules" ref="orderInfo" label-width="100px" class="demo-ruleForm">
                            <h2 class="slide-tit">
                                <span>1、收货地址</span>
                            </h2>
                            <div id="orderForm" name="orderForm" url="">
                                <!-- 自己新增的表单元素 element-ui中的 -->
                                <el-form-item label="收货人姓名" prop="accept_name">
                                    <el-input style="width:500px" v-model="orderInfo.accept_name"></el-input>
                                </el-form-item>
                                <el-form-item label="所属地区">
                                    <VDistpicker :province="orderInfo.area.province.value" :city="orderInfo.area.city.value" :area="orderInfo.area.area.value"></VDistpicker>
                                </el-form-item>
                                <el-form-item label="收货地址" prop="address">
                                    <el-input style="width:500px" v-model="orderInfo.address"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号" prop="mobile">
                                    <el-input style="width:500px" v-model="orderInfo.mobile"></el-input>
                                </el-form-item>
                                <el-form-item label="邮箱" prop="email">
                                    <el-input style="width:500px" v-model="orderInfo.email"></el-input>
                                </el-form-item>
                                <el-form-item label="邮编" prop="post_code">
                                    <el-input style="width:200px" v-model="orderInfo.post_code"></el-input>
                                </el-form-item>
                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <label>
                                            <el-radio v-model="orderInfo.payment_id" label="6">支付方式</el-radio>
                                            <em>手续费：0.00元</em>
                                        </label>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <el-radio-group v-model="orderInfo.express_id" @change="change($event)">
                                            <el-radio label="1">顺丰(20元)</el-radio>
                                            <el-radio label="2">圆通(10元)</el-radio>
                                            <el-radio label="3">中通(8元)</el-radio>
                                        </el-radio-group>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr v-for="(item, index) in goodsList" :key="item.id">
                                            <td width="68">
                                                <router-link :to="'/goodsinfo/'+item.id">
                                                    <img :src=item.img_url class="img">
                                                </router-link>
                                            </td>
                                            <td>
                                                <router-link :to="'/goodsinfo/'+item.id">
                                                    {{item.title}}
                                                </router-link>
                                            </td>

                                            <td>
                                                <span class="red">
                                                    {{item.sell_price}}
                                                </span>
                                            </td>
                                            <td align="center">{{item.buycount}}</td>
                                            <td>
                                                <span class="red">
                                                    {{item.buycount*item.sell_price}}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <dt>订单备注(100字符以内)</dt>
                                            <dd>
                                                <textarea name="message" class="input" v-model="orderInfo.message" style="height:35px;"></textarea>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">{{orderInfo.goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">{{orderInfo.expressMoment}}</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">
                                                {{totalAmount}}
                                            </label>
                                        </p>
                                        <p class="btn-box">
                                            <a class="btn button" href="/cart.html">返回购物车</a>
                                            <a id="btnSubmit" class="btn submit" @click="submit('orderInfo')">确认提交</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    // 导入 省市联动
    import VDistpicker from "v-distpicker";
    export default {
        created() {
            //声明周期函数
            // console.log(this.$route.params.ids);
            let ids = this.$route.params.ids
            //把值保存在数据中
            this.orderInfo.goodsids = ids;
            //调接口,
            this.axios.get("site/validate/order/getgoodslist/" + ids)
                .then((response) => {
                    //console.log(response);

                    response.data.message.forEach((v) => {
                        v.buycount = this.$store.state.buyGood[v.id];
                    })
                    this.goodsList = response.data.message;
                    //把商品总数量保存data中
                    this.goodsList.forEach((v) => {
                        this.orderInfo.goodsAmount += (v.buycount * v.sell_price)
                    })
                    //console.log(this.goodsList);

                    //把商品的键值对保存在数据中
                    this.goodsList.forEach((v) => {
                        this.orderInfo.cargoodsobj[v.id] = v.buycount;
                    })

                })




        },
        data: function () {
            // 自定义的验证规则
            // value 输入的值
            // rule 规则
            // callback 回调
            var validateMobile = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入手机号"));
                } else {
                    // 定义正则规则
                    let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
                    // 验证
                    if (reg.test(value)) {
                        // 对
                        callback();
                    } else {
                        // 错
                        callback(new Error("请输入正确的手机号"));
                    }
                }
            };
            var validateEmail = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("邮箱不能为空"));
                } else {
                    // 定义正则规则
                    let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                    // 验证
                    if (reg.test(value)) {
                        // 对
                        callback();
                    } else {
                        // 错
                        callback(new Error("请输入正确的邮箱地址"));
                    }
                }
            };
            var validatePostCode = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("邮编"));
                } else {
                    // 定义正则规则
                    let reg = /^[1-9]\d{5}(?!\d)$/;
                    // 验证
                    if (reg.test(value)) {
                        // 对
                        callback();
                    } else {
                        // 错
                        callback(new Error("请输入正确的邮编"));
                    }
                }
            };

            return {
                goodsList: [],
                orderInfo: {
                    goodsAmount: 0,
                    expressMoment: 20,
                    accept_name: "常威",
                    address: "甲岸桥底4号下水道5号床铺下铺",
                    area: {
                        province: {
                            code: "430000",
                            value: "湖南省"
                        },
                        city: {
                            code: "430400",
                            value: "衡阳市"
                        },
                        area: {
                            code: "430422",
                            value: "衡南县"
                        }
                    },
                    mobile: 18888888888,
                    email: "alwaysV@github.com",
                    post_code: "518000",
                    payment_id: "6",
                    express_id: "1",
                    message: "快点发货",
                    goodsids: "",
                    cargoodsobj: {}
                },
                rules: {
                    accept_name: [{
                            required: true,
                            message: "请输入收件人姓名",
                            trigger: "blur"
                        },
                        {
                            min: 2,
                            message: "长度在 2 到 10 个字符",
                            trigger: "blur"
                        }
                    ],
                    address: [{
                            required: true,
                            message: "请输入收货地址",
                            trigger: "change"
                        },
                        {
                            min: 2,
                            message: "请输入的详细一些哦",
                            trigger: "change"
                        }
                    ],
                    mobile: [{
                        validator: validateMobile,
                        trigger: "change"
                    }],
                    email: [{
                        validator: validateEmail,
                        trigger: "change"
                    }],
                    post_code: [{
                        validator: validatePostCode,
                        trigger: "change"
                    }]
                }
            };
        },
        methods: {
            change(value) {
                //子组件向父组件传值
                //动态的改变data的值,vue从响应式的从底层来渲染图层的
                switch (value) {
                    case "1":
                        this.orderInfo.expressMoment = 20
                        break;
                    case "2":
                        this.orderInfo.expressMoment = 10
                        break;
                    case "3":
                        this.orderInfo.expressMoment = 8
                        break;

                    default:
                        break;
                }


            },
            submit(formName) {
                //验证表单
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //点击提交,发起请求,获得数据
                        this.axios.post("site/validate/order/setorder", this.orderInfo)
                            .then((response) => {
                                //console.log(response);
                                if (response.data.status == 0) {
                                    //提交成功,需要清空购物车的数据,只需要改仓库里的值
                                    let ids = this.$route.params.ids
                                    let idsArr = ids.split(",")
                                    //console.log(idsArr);
                                    idsArr.forEach((v) => {
                                        this.$store.commit("del", v)
                                    })
                                    //跳到支付页
                                    this.$router.push("/cash/" + response.data.message.orderid)

                                }
                            })
                    } else {
                        this.$Message.error("请将信息填写完整")
                    }
                });


            }
        },
        computed: {
            totalCount() {
                let total = 0;
                this.goodsList.forEach((v) => {
                    total += v.buycount
                })
                return total
            },
            totalAmount() {

                return (this.orderInfo.goodsAmount + this.orderInfo.expressMoment)
            }
        },
        // 注册组件
        components: {
            VDistpicker
        }
    };
</script>
<style scoped>
</style>