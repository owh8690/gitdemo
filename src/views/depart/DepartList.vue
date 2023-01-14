<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(value, index) in breadList" :key="index">{{
        value
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="mt">
        <el-row :gutter="20">
            <el-col :span="18">
                <el-row :gutter="20" >
                    <el-col :span="12">
                        <el-input placeholder="车牌号"></el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="公司名称"></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="mt" v-show="show">
                    <el-col :span="12">
                        <el-input placeholder="联系人电话"></el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="信用分"></el-input>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="3" >
                <el-dropdown >
                    <span class="el-dropdown-link" @click="fun">
                        {{show?"收起":"放下"}}
                        <i :class= "`el-icon-arrow-${show?'up':'down'} el-icon--right`"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown"></el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <el-col :span="3" class="tc">
                <el-button type="primary">查询</el-button>
            </el-col>
        </el-row>
    </el-card>
  </div>
</template>

<script>
import breadCrumb from "../../mixins/breadCrumb";
export default {
    mixins:[breadCrumb],
    data(){
        return{
            show:false
        }
    },
    methods:{
        fun(){
            this.show=!this.show
        }
    }

};
</script>

<style lang="less" scoped>
    .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    font-size: 15px;
    }
    .el-icon-arrow-down {
    font-size: 18px;
    }
</style>