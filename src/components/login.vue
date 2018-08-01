<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <div class="input-box">
                            <input id="txtUserName" v-model="UserName" name="txtUserName" type="text" placeholder="用户名/手机/邮箱" maxlength="50">
                        </div>
                        <div class="input-box">
                            <input id="txtPassword" v-model="password" name="txtPassword" type="password" placeholder="输入登录密码" maxlength="16">
                        </div>
                        <div class="btn-box">
                            <input id="btnSubmit" @click="submit" name="btnSubmit" type="submit" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                UserName: "",
                password: ""
            }
        },
        methods: {
            submit() {
                this.axios.post("site/account/login", {
                        user_name: this.UserName,
                        password: this.password
                    })
                    .then((response) => {
                        // console.log(response);
                        //如果验证成功
                        if (response.data.status == 0) {
                            //修改页面结构
                            this.$Message.success("登录成功")
                           // this.$store.state.isLogin = true;
                           this.$store.commit("changeLogin",true)
                            //逻辑是哪里来那你去
                            //编程式样的导航
                            this.$router.push(this.$store.state.fromPath)
                        } else {
                            this.$Message.error(response.data.message)
                        }

                    })
            }
        }
    }
</script>
<style>
</style>