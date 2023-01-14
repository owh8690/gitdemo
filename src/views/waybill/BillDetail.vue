<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(value, index) in breadList" :key="index">{{
        value
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="mt">
      <el-page-header @back="goBack" content="运单列表"></el-page-header>
    </el-card>
    <el-card class="mt" >
      <el-steps  :active="2" finish-status="success">
        <el-step title="运单建立"></el-step>
        <el-step title="进行中"></el-step>
        <el-step title="已完成"></el-step>
      </el-steps>
    </el-card>
    <el-card class="mt">
      <el-descriptions title="用户信息">
        <el-descriptions-item label="司机名">张强</el-descriptions-item>
        <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
        <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
        <el-descriptions-item label="备注">
          <el-tag size="small">公司</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
      </el-descriptions>
      <el-divider></el-divider>
      <el-descriptions title="用户信息">
        <el-descriptions-item label="司机名">李雪</el-descriptions-item>
        <el-descriptions-item label="手机号">16600034501</el-descriptions-item>
        <el-descriptions-item label="居住地">成都市</el-descriptions-item>
        <el-descriptions-item label="备注">
          <el-tag size="small">公司</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
    </el-descriptions>
    <el-divider></el-divider>
      <el-descriptions title="用户信息">
        <el-descriptions-item label="司机名">陈斯</el-descriptions-item>
        <el-descriptions-item label="手机号">121000308790</el-descriptions-item>
        <el-descriptions-item label="居住地">北京市</el-descriptions-item>
        <el-descriptions-item label="备注">
          <el-tag size="small">个人</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
    </el-descriptions>
    <el-divider></el-divider>
    </el-card>
  </div>
  
</template>

<script>
import { mapMutations } from 'vuex';
import breadCrumb from "../../mixins/breadCrumb";
export default {
  mixins: [breadCrumb],
  methods:{
    goBack(){
      this.$router.go(-1)
    },
    ...mapMutations(["changeFromDetail"])

  },
  beforeRouteLeave(to, from, next) {
    if (to.path == "/waybill/list") {
      // 做标记
      this.changeFromDetail(true)
    }else{
      this.changeFromDetail(false)
    }
    next() 
  }
}
</script>

<style lang="less" scoped>
</style>