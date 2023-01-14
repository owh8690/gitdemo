<template>
  <div>
    <div>
      <el-carousel :interval="5000" type="card" height="200px">
        <el-carousel-item>
          <el-card :body-style="{ padding: '0px' }">
            <div style="height: 200px">
              <img
                src="https://ts1.cn.mm.bing.net/th/id/R-C.2d63bc27411efe2ac8501f789103d903?rik=WaK8uABMbORn%2bw&riu=http%3a%2f%2fres.ad518.com%2fbg_attach%2f2019%2f03%2f41514.gif&ehk=m9R1sNJtbaGX7V9AnJV7LAa5XaUcgFJgpCkj59%2fMmWU%3d&risl=&pid=ImgRaw&r=0"
                class="image"
              />
            </div>
          </el-card>
        </el-carousel-item>
        <el-carousel-item>
          <el-card :body-style="{ padding: '0px' }">
            <div style="height: 200px">
              <img
                src="https://ts1.cn.mm.bing.net/th/id/R-C.ca5dd3d877bec5541ab6f725f3785e68?rik=QUAl62yGvsGBkg&riu=http%3a%2f%2fpic.baike.soso.com%2fp%2f20140103%2f20140103173942-1235678717.jpg&ehk=Y4SQ2fBUaRMamLp1NQlzOtzP%2bEHNwU6kzUlc7lgb%2fDI%3d&risl=&pid=ImgRaw&r=0"
                class="image"
              />
            </div>
          </el-card>
        </el-carousel-item>
        <el-carousel-item>
          <el-card :body-style="{ padding: '0px' }">
            <div style="height: 200px">
              <img
                src="https://ts1.cn.mm.bing.net/th/id/R-C.db7e4af8de5bc6b5d7492b792e43423c?rik=thd4B6hr4wsI8A&riu=http%3a%2f%2froadshow.cnstock.com%2flist%2fdbgfipo%2fconfig%2fimages%2f1514445299464.jpg&ehk=BmE5h1BeFRrEp%2fVrvnGCBWkRt9sp1dNsQmpxr42L4Hw%3d&risl=&pid=ImgRaw&r=0"
                class="image"
              />
            </div>
          </el-card>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div>
      <el-row :gutter="24">
        <el-col :span="18">
          <el-card>
            <div slot="header">
              <span>进件统计分析</span>
            </div>
            <div ref="analysis" style="height: 240px"></div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div slot="header">
              <span>出件统计分析</span>
            </div>
            <div style="height: 240px" ref="percent"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row :gutter="24" class="mt">
        <el-col :span="12">
          <el-crard>
            <el-timeline>
              <el-timeline-item timestamp="2022/11/1" placement="top">
                <el-card>
                  <h4>审核数据</h4>
                  <p>王五 提交于 2022/11/1 20:46</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2022/11/2" placement="top">
                <el-card>
                  <h4>处理数据</h4>
                  <p>李四 提交于 2022/11/2 19:22</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2022/11/3" placement="top">
                <el-card>
                  <h4>批准数据</h4>
                  <p>张三 提交于 2022/11/3 20:00</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </el-crard>
        </el-col>
        <el-col :span="12">
          <el-crard>
            <el-calendar v-model="value"> </el-calendar>
          </el-crard>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
//数据可视化  生成图表的步骤
// 1 准备一个容器(用来显示图表的，为一个标签或者组件)
// 2 配置图表配置项(用来区分图表的，是最关键的步骤)
// 3 调用方法生成图表(setOption)
import * as echarts from "echarts";
import { get } from "@/utils/http";
export default {
  data() {
    return {
      value: new Date(),
    };
  },
  mounted() {
    this.curveLine();
    this.drawPie();
  },
  methods: {
    async curveLine() {
      // 1 准备一个容器(用来显示图表的，为一个标签或者组件)
      var myChart = echarts.init(this.$refs.analysis);
      let { data } = await get("/line");
      let key = [];
      let value = [];
      for (let item in data) {
        key.push(item);
        value.push(data[item]);
      }
      // 2 配置图表配置项(用来区分图表的，是最关键的步骤)
      const option1 = {
        xAxis: {
          type: "category", // 横轴为类目轴
          boundaryGap: false,
          data: key,
        },
        yAxis: {
          type: "value", // 纵轴为数值轴
        },
        tooltip: {
          trigger: "axis",
        },
        series: [
          {
            data: value,
            type: "line", // 图为折线图
            smooth: true,
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#4696ff", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#fff", // 100% 处的颜色
                  },
                ],
                global: false,
              },
            },
          },
        ],
      };
      // 3 调用方法生成图表(setOption)
      myChart.setOption(option1);
    },
    drawPie() {
      var myChart = echarts.init(this.$refs.percent);
      const option2 = {
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "Statistics",
            type: "pie",
            radius: ["50%", "80%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 16,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "22-06" },
              { value: 735, name: "22-07" },
              { value: 580, name: "22-08" },
              { value: 484, name: "22-09" },
              { value: 300, name: "22-10" },
              { value: 500, name: "22-11" },
              { value: 200, name: "22-12" },
            ],
          },
        ],
      };
      myChart.setOption(option2);
    },
  },
};
</script>

<style lang="less" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #99a9bf;
}
.medium {
  text-align: center;
}
.image {
  width: 100%;
  height: 100%;
  display: block;
}
</style>