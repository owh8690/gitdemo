<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(value, index) in breadList" :key="index">{{
        value
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="mt">
      <el-row>
        <el-col :span="6">
          <el-input placeholder="请输入订单号/客户名称" v-model="data.keyword">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="8" :offset="10" >
          <el-row :gutter="5" class="tr">
            <el-col :span="6" >
              <el-button type="primary" @click="dialogVisible = true">新建订单</el-button>
            </el-col >
            <el-col :span="6" >
              <el-button :disabled="!select.length" @click="operate(1)">审核</el-button>
            </el-col >
            <el-col :span="6">
              <el-button :disabled="!select.length">修改</el-button>
            </el-col>
            <el-col :span="6">
              <el-button :disabled="!select.length" @click="operate(3)">作废</el-button>
            </el-col>
          </el-row>          
        </el-col>
      </el-row>
    </el-card>
    <el-card class="mt">
      <el-table 
      :data="tableData" 
      style="width: 100%" 
      v-loading="loading"
      height="510"
      @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
        <el-table-column prop="id" label="订单号" fixed="left" ></el-table-column>
        <el-table-column prop="status" label="状态" width="100px" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">待审核</span>
            <span v-else-if="scope.row.status==2">已审核</span>
            <span v-else-if="scope.row.status==3">审核通过</span>
            <span v-else>审核拒绝</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="下单时间" width="100px"></el-table-column>
        <el-table-column prop="name" label="客户名称" width="100px"></el-table-column>
        <el-table-column prop="start" label="起始城市" width="100px"></el-table-column>
        <el-table-column prop="end" label="目的城市" width="100px"></el-table-column>
        <el-table-column prop="cargo" label="货物名称" width="100px"></el-table-column>
        <el-table-column prop="count" label="数量" width="100px"></el-table-column>
        <el-table-column prop="unit" label="单位" width="100px"></el-table-column>
        <el-table-column prop="price" label="运费" width="100px"></el-table-column>
        <el-table-column prop="from" label="订单来源" width="100px" align="center"></el-table-column>
        <el-table-column prop="pay" label="是否支付" width="100px">
          <template slot-scope="scope">
            {{scope.row.pay==1?"已支付":"未支付"}}
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="100px">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" size="mini">删除</el-button>
           </template>
        </el-table-column>
      </el-table>
      <el-pagination
      class="mt fr mb"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="data.page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="data.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
    <order-moudle 
    :visibles="dialogVisible"
    @hide="dialogVisible=false" 
    @reload="orderList"
    >
    </order-moudle>
  </div>
</template>

<script>
import breadCrumb from "../../mixins/breadCrumb";
import { post } from "@/utils/http";
import OrderMoudle from "./OrderMoudle.vue"
import{mapMutations} from "vuex"
export default {
  mixins: [breadCrumb],
  data(){
    return{ 
      dialogVisible:false, 
      loading:false, 
      total:0,
      tableData: [],
      data:{
        keyword:"",
        page:1,
        pageSize:10
      },
      select:[]
    }
  },
  components:{OrderMoudle},
  created(){
    this.orderList()
  },
  methods:{
    async orderList(){
      this.loading=true
      let {data} =  await post("/orderList",this.data)
      console.log(data)
      this.tableData=data.list
      this.total=data.total
      this.loading=false
    },
    handleSizeChange(pageSize){
      console.log(pageSize)
      this.data.pageSize=pageSize
      this.orderList()
    },
    handleCurrentChange(page){
      this.data.page=page
      this.orderList()
    },
    handleSelectionChange(selection){
      console.log(selection)
      this.select=selection
    },
    operate(type){
      let img= this.select.map(res=>res.id).toString()
      if(type==1){
        this.$notify({
          title: img,
          message: "已审核"
        });
      }else if(type==3){
        this.$notify({
          title: img,
          message: "已作废"
        });
      }

    },
    ...mapMutations(["getRow"]),
    edit(row){
      console.log(row)
      this.getRow(row)
      this.dialogVisible=true
    }


  }
};
</script>

<style lang="less" scoped>

</style>