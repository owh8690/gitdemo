<template>
  <div>
    <div class="fr">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          欢迎您，{{ info }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">个人中心</el-dropdown-item>
          <el-dropdown-item command="b">修改密码</el-dropdown-item>
          <el-dropdown-item command="c">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="time fr">
      <span>这是你写这个项目的第</span>
      <span class="tips">{{doTime}}</span>
      <span>天</span>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
import { clearData } from "../utils/auth";
import {get} from "../utils/http" 
export default {
  data() {
    return {
      info: sessionStorage.getItem("name"),
      time:""
    };
  },
  created(){
    this.workTime()
  },
  methods: {
    handleCommand(command) {
      console.log(command);
      if (command == "c") {
        clearData();
        this.$router.push("/login");
      }
    },
    workTime(){
      get("/in").then(({time})=>{
        this.time=time
      })
    }
    
  },
  computed:{
    doTime(){
      let time1=new Date()
      let time2=this.time?new Date(this.time):new Date()
      return Math.floor((time1-time2)/1000/60/60/24)
    }
  }
};
</script>

<style lang="less" scoped>
.time {
  margin-right: 40px;
  font-size: 20px;
  .tips{color:#5696ff}
}
</style>