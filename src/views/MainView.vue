<template>
  <div>
    <el-container>
      <el-aside width="200px" class="aside">
        <nav-left></nav-left>
      </el-aside>
      <el-container >
        <el-header class="header">
          <top-header></top-header>
        </el-header>
        <el-main class="main">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavLeft from '@/components/NavLeft.vue';
import TopHeader from "@/components/TopHeader.vue"
export default {
  components: { NavLeft, TopHeader},
  data(){
    return{

    }
  }

};
</script>

<style lang="less" scoped>
.header{
  background-color: #fff;
  line-height: 55px;
  box-shadow: 0px 2px 5px 1px rgba(0,21,41,0.3);
}
.aside{
  background: #001529;
  height: 100vh;}  // vh是以一个单位，将高度100等分，100vh就算取100份。当父级是body的时候，对于高度百分比不管用
.main{
  height: 70vh;
  background: #e9eef3;
}
</style>
