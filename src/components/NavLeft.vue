<template>
  <div>
    <h1 class="itemColor">邦达货运物流平台</h1>
    <el-menu 
    :unique-opened="true"
    :router="true"
    background-color="#001529"
    text-color="#fff"
    >
        <menu-index v-for="(value,index) in infoMenu" :menu="value" :key="index"></menu-index>
    </el-menu>
  </div>
</template>

<script>
import MenuIndex from "./MenuIndex.vue"
import {get} from "@/utils/http"
export default {
    data(){
        return{
            infoMenu:[]
        }
    },
    created(){
        this.getMenu()
    },
    methods:{
       async getMenu(){
           let {data}=await get("/menu")
           console.log(data)
           this.infoMenu=data 

        }
    },
    components:{
        MenuIndex
    }
};
</script>

<style lang="less" scoped>
.itemColor{color: #fff;text-align: center;line-height: 50px;}
</style>