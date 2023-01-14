<template>
  <div>
    <bread-crumb :b="breadList"></bread-crumb>
    <el-card class="mt">
      <el-row :gutter="10">
        <el-col :span="21">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-input
                v-model="data.waybillNo"
                placeholder="请输入运单号"
              ></el-input>
            </el-col>
            <el-col :span="8">
              <el-input
                v-model="data.name"
                placeholder="请输入客户名称"
              ></el-input>
            </el-col>
            <el-col :span="8">
              <el-date-picker
                v-model="date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 100%"
              >
              </el-date-picker>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="3">
          <el-row class="tr">
            <el-col :span="12">
              <el-button type="primary" @click="billList">查询</el-button>
            </el-col>
            <el-col :span="12">
              <el-button type="primary" @click="billList">重置</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="mt">
      <el-radio-group v-model="data.status" @input="billList">
        <el-radio-button label="1">全部订单</el-radio-button>
        <el-radio-button label="2">装货中</el-radio-button>
        <el-radio-button label="3">运输中</el-radio-button>
        <el-radio-button label="4">订单异常</el-radio-button>
      </el-radio-group>
    </el-card>
    <el-card class="mt">
      <el-table
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
        height="510px"
      >
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column
          prop="no"
          label="订单号"
          width="100"
          align="center"
          fixed="left"
        ></el-table-column>
        <el-table-column
          prop="date"
          label="下单时间"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="客户名称"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="cargo"
          label="货物名称"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="count"
          label="件数"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="start"
          label="起始城市"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="end"
          label="目的城市"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="price"
          label="运费"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="needRecive"
          label="接货"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.needRecive == 1 ? "需要" : "不需要" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="plateNumber"
          label="车牌号"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="driver"
          label="司机"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="tel"
          label="电话"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column prop="percent" label="进度" width="150" align="center">
          <template slot-scope="scope">
            <el-progress :percentage="scope.row.percent"></el-progress>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="detail(scope.row.no)"
              >详情</el-button
            >
            <el-button type="text">修改</el-button>
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
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import BreadCrumb from "./BreadCrumb.vue";
import { post } from "@/utils/http";
import { mapState } from 'vuex';

export default {
  data() {
    return {
      a:1,
      breadList: this.$route.meta.breadCrumb || [],
      total: 0,
      loading: false,
      data: {
        waybillNo: "",
        name: "",
        status: 1,
      },
      date: [],
      pageData: {
        page: 1,
        pageSize: 10,
      },
      tableData: [],
    };
  },
  created() {
    this.billList();
  },
  activated(){
    if(!this.isFromDetail){
      this.billList()
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log("局部后置守卫触发了")
    if (to.path == "/waybill/detail") {
      from.meta.keepAlive = true;
    } else {
      // 如果去的不是详情页，就要清除缓存。
      this.clearCache()
    }
    next();
  },
  computed:mapState(["isFromDetail"]),
  methods: {
    async billList() {
      this.loading = true;
      console.log("date", this.date);
      var moment = require("moment");
      let startDate = this.date.length
        ? moment(this.date[0]).format("YYYY-MM-DD")
        : "";
      let endDate = this.date.length
        ? moment(this.date[1]).format("YYYY-MM-DD")
        : "";
      this.data.waybillNo = "";
      this.data.name = "";
      this.date = [];
      let { data } = await post("/waybillList", {
        ...this.data,
        ...this.pageData,
        startDate,
        endDate,
      });
      this.tableData = data.list;
      this.total = data.total;
      this.loading = false;
    },
    handleSizeChange(pageSize) {
      console.log(pageSize);
      this.pageData.pageSize = pageSize;
      this.billList();
    },
    handleCurrentChange(page) {
      this.pageData.page = page;
      this.billList();
    },
    detail(no) {
      this.$router.push({ path: "/waybill/detail", query: { no } });
    },
    clearCache() {
    //清除当前页面缓存的封装函数
    let vnode = this.$vnode;
    let parentVnode = vnode && vnode.parent;
    if (
      parentVnode &&
      parentVnode.componentInstance &&
      parentVnode.componentInstance.cache
    ) {
      var key =
        vnode.key == null
          ? vnode.componentOptions.Ctor.cid +
            (vnode.componentOptions.tag
              ? `::${vnode.componentOptions.tag}`
              : "")
          : vnode.key;
      var cache = parentVnode.componentInstance.cache;
      var keys = parentVnode.componentInstance.keys;
      if (cache[key]) {
        this.$destroy(); // remove key
        if (keys.length) {
          var index = keys.indexOf(key);
          if (index > -1) {
            keys.splice(index, 1);
          }
        }
        cache[key] = null;
      }
    }
  },
  },
  components: {
    BreadCrumb,
  },
};
</script>
<style lang="less" scoped>
</style>