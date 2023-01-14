<template>
  <div>
    <el-dialog
      :title="title"
      :visible="visibles"
      width="50%"
      :before-close="hide"
    >
      <el-row :gutter="20">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
        >
          <el-col :span="12">
            <el-form-item label="客户名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="起始城市" prop="start">
              <el-input v-model="ruleForm.start"></el-input>
            </el-form-item>
            <el-form-item label="目的城市" prop="end">
              <el-input v-model="ruleForm.end"></el-input>
            </el-form-item>
            <el-form-item label="货物名称" prop="cargo">
              <el-input v-model="ruleForm.cargo"></el-input>
            </el-form-item>
            <el-form-item label="数量" prop="count">
              <el-input v-model="ruleForm.count"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位" prop="unit">
              <el-select v-model="ruleForm.unit" placeholder="请选择">
                <el-option
                  v-for="item in option1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="运费" prop="price">
              <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>
            <el-form-item label="订单来源" prop="from">
              <el-select v-model="ruleForm.from" placeholder="请选择">
                <el-option
                  v-for="item in option2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否支付" prop="pay">
              <el-select v-model="ruleForm.pay" placeholder="请选择">
                <el-option
                  v-for="item in option3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hide">取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { post } from "@/utils/http";
import {mapMutations, mapState} from "vuex"
export default {
  props: ["visibles"],
  data(){
    return{
      title:"新建订单",
      ruleForm:{
        name:"",
        start:"",
        end:"",
        cargo:"",
        count:"",
        unit:"",
        price:"",
        from:"",
        pay:""
      },
      rules:{
        name:[
          {required: true, message: '请输入客户名称', trigger: 'blur'}
        ],
        start:[{required: true, message: '请输入起始城市', trigger: 'blur'}],
        end:[{required: true, message: '请输入目的城市', trigger: 'blur'}],
        cargo:[{required: true, message: '请输入货物名称', trigger: 'blur'}],
        count:[
          {required: true, message: '请输入数量', trigger: 'blur'},
          {pattern:/^\d+$/,message:"数量只能输入纯数字",trigger:'blur'}
        ],
        unit:[{required: true, message: '请选择单位', trigger: 'blur'}],
        price:[
          {required: true, message: '请输入运费', trigger: 'blur'},
          {pattern:/^\d+$/,message:"运费只能输入纯数字",trigger:'blur'}
        ],
        from:[{required: true, message: '请选择订单来源', trigger: 'blur'}],
        pay:[{required: true, message: '请选择是否支付', trigger: 'blur'}]
      },
      option1:[
        {
          value: '选项1',
          label: '方'
        },
        {
          value: '选项2',
          label: '吨'
        },
      ],
      option2:[
        {
          value: '选项1',
          label: '移动端'
        },
        {
          value: '选项2',
          label: 'pc端'
        },
      ],
      option3:[
        {
          value: '选项1',
          label: '已支付'
        },
        {
          value: '选项2',
          label: '未支付'
        },
      ],
      
    }
  },
  computed:{
    ...mapState(["row"])
  },
  methods: {
    ...mapMutations(["clearRow"]),
    hide() {
      this.$emit("hide");
      this.$refs.ruleForm.resetFields()
      this.clearRow()
          
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            post("/addOrder",this.ruleForm).then(res=>{
              console.log(1,res)
              let {message}=res
              this.$message({
              message: message,
              type: 'success'
              });
              this.hide()
              this.$emit("reload")
            })
          } 
        });
      },
  },
  watch:{
    visibles(){
      this.ruleForm=this.row
      console.log()
      this.title=this.row.name?"编辑订单":"新建订单"
    }
  }
};
</script>

<style lang="less" scoped>
</style>