<template>
  <div>  
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(value,index) in a" :key="index">{{value}}</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(value,index) in b" :key="index">{{value}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
    props:["a","b"],
};
</script>

<style lang="less" scoped>
</style>