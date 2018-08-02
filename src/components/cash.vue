<template>
    <h2>{{orderid}}</h2>
</template>
<script>
    export default{
        data(){
            return {
                orderid:","
            }
        },
        created(){
            this.orderid=this.$route.params.id
        }
    }
</script>
<style>

</style>