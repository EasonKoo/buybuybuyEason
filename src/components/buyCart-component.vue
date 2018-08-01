<template>
    <div id="count">
        <span @click="del">-</span>
        <input type="text" v-model="myCount">
        <span @click="add">+</span>
    </div>
</template>
<script>
    export default {
        props: ["min", "max", "count"],
        data: function () {
            return {
                myCount: 0
            }
        },
        created() {
            // 重新保存一份副本
            this.myCount = this.count;
        },
        methods: {
            del() {
                if (this.myCount == this.min) {
                    return;
                }
                this.myCount--;
                this.$emit("change",this.myCount);
            },
            add() {
                if (this.myCount == this.max) {
                    return;
                }
                this.myCount++;
                //登录时的状态
                this.$emit("change",this.myCount);
            }
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