<template>
  <div>
    <el-row type="flex" justify="center" >
      <el-card class="box-card" >
        <div slot="header" class="clearfix">
          <h2>蚂蚁金融后台管理系统</h2>
        </div>
        <div>
            <el-form 
            :model="ruleForm" 
            :rules="rules"
            ref="ruleForm" 
            label-width="80px"
            class="demo-ruleForm"
            >
              <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" type="password" @change="submitForm('ruleForm')"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button 
                type="primary" 
                class="log" 
                style="width:100%;" 
                @click="submitForm('ruleForm')"
                :loading="loading"
                >登录</el-button>
              </el-form-item>  
            </el-form>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import {post} from "../utils/http"
import {setData} from "../utils/auth"
import { mapMutations } from 'vuex'
export default {
  data(){
    return{
      ruleForm:{
        username:"",
        password:"",
        
      },
      rules:{
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern:/^\w{5,8}$/, message: '用户名至少是数字、字母、下划线5到8位组合', trigger: 'blur' }
          ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern:/^\d{6}$/, message: '密码是6位纯数字', trigger: 'blur' }
        ]
      },
      loading:false
    }
  },
  methods:{
    ...mapMutations(["setRole"]),
    submitForm(formName){
      this.$refs[formName].validate((valid)=>{
        if(valid){
          this.loading=true
          console.log(3,valid)
          // axios({
          //   url:"http://localhost:8080/login",
          //   method:"post",
          //   data:{
          //     username:'wzt123',
          //     password:123456
          //   }

          // })
          post("/login",this.ruleForm).then(res=>{
            this.loading=false 
            console.log(1,res)
            setData(res.token)
            this.setRole(res.auth)
            sessionStorage.setItem("name",res.name)
            this.$router.push("/")
          }).catch((error)=>{
            this.loading=false
            console.log(error)
          })
        }
      })
    }     
  }
}
</script>

<style lang="less" scoped>
  .box-card {
    width: 480px;
    margin-top: 200px;
    .clearfix {
      &:after{clear: both}
      text-align: center;
    }
  }

</style>
