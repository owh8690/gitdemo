<template>
    <div>
        <bread-crumb :a="breadList"></bread-crumb>
        
    </div>
</template>

<script>
import BreadCrumb from './BreadCrumb.vue'
    export default {
        data(){
            return{
                breadList:this.$route.meta.breadCrumb || []
            }
        },
        components:{
            BreadCrumb      
        }
    }
</script>

<style lang="less" scoped>

</style>