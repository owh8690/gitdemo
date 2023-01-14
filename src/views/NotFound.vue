<template>
  <div class="color">
    <el-empty 
    description="页面去火星了~" 
    image="https://rcsdigital.com.au/wp-content/uploads/2017/12/404-errors.png"
    :image-size="1000"
    >
      <el-button type="primary">
        <router-link to="/" > 返回首页</router-link>
      </el-button>
    </el-empty>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.color{
    background: #EBEEF5;
    
}
</style>