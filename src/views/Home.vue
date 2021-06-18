<template>
  <div>
    <div id="player" class="home"></div>
    <ul class="action-list">
      <li @click="clickIcon(i)" v-for="(item, i) in iconList" :key="i">
        <p class="al-icon"><i :class="item.icon"></i></p>
        <p class="al-label">{{ item.label }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { initData, removeAllCovering, addCustomPOI } from "@u/3d";
import { cameraList, policeList } from "./view-data/home";
export default {
  components: {},
  data() {
    return {
      iconList: [
        {
          label: "监控",
          icon: "el-icon-video-camera",
        },
        {
          label: "警察",
          icon: "el-icon-s-custom",
        },
        {
          label: "事件",
          icon: "el-icon-warning",
        },
      ],
    };
  },
  mounted() {
    this.cloudRender = initData("player", this.handleResponseFunction);
  },
  methods: {
    clickIcon(index) {
      switch (index) {
        case 0:
          this.setMyPoi();
          break;
        case 1:
          this.setMyPolicePoi();
          break;
        case 2:
          this.cloudRender.SuperAPI("StartGetCoord", {
            coord_type: 0, //坐标类型(0:经纬度坐标, 1:cad坐标)
            cad_mapkey: "", //CAD基准点Key值, 项目中约定
            coord_z_type: 0, //坐标高度类型(0:相对3D世界表面；1:相对3D世界地面；2:相对3D世界海拔; 注:cad坐标无效)
          });
          break;
        default:
          break;
      }
    },
    setMyPoi() {
      const dt = cameraList.map((c) => ({
        id: c.id, //POI id
        coord: c.coord, //POI点的坐标
        coord_z: 10, //高度(单位:米)
        marker: {
          images: [
            {
              normal_url:
                "file:///F:/project/wisdom-camp/src/assets/images/camera.png", //normal时图片url地址
              activate_url:
                "file:///F:/project/wisdom-camp/src/assets/images/camera.png", //hover, active时图片url地址
            },
          ],
        },
        label: {
          content: [
            {
              text: [c.label, "ffffffff", "12"], //[文本内容, HEXA颜色, 文本大小]
              text_offset: "10,4", //文本框左上角相对于label中bg_offset左上角的margin偏移(x,y 单位:像素), 注:x为正向右, y为正向下
            },
          ],
        },
        window: {
          url: " http://192.168.1.191:8008/victor",
          //本地地址一: "file:///D:/xxx/echarts.html",    D: 云渲染所在盘符
          size: "510,310", //window大小(宽,高 单位:像素)
          offset: "30,50", //window左上角相对于marker的中心点(coord坐标中心点)的偏移(x,y 单位:像素), 注: x为正向右, y为正向上
        },
      }));
      addCustomPOI(this.cloudRender, dt);
    },
    setMyPolicePoi() {
      const dt = policeList.map((c) => ({
        id: c.id, //POI id
        coord: c.coord, //POI点的坐标
        marker: {
          images: [
            {
              normal_url:
                "file:///F:/project/wisdom-camp/src/assets/images/police.png", //normal时图片url地址
              activate_url:
                "file:///F:/project/wisdom-camp/src/assets/images/police.png", //hover, active时图片url地址
            },
          ],
        },
        label: {
          bg_size: "170,70", //label大小(宽, 高 单位:像素)
          content: [
            {
              text: ["姓名：", "ff40E0D0", "12"], //[文本内容, HEXA颜色, 文本大小]
              text_offset: "20,15", //文本框左上角相对于label中bg_offset左上角的margin偏移(x,y 单位:像素), 注:x为正向右, y为正向下
            },
            {
              text: [c.name, "ffffffff", "12"],
              text_offset: "70,15",
            },
            {
              text: ["警号：", "ff40E0D0", "12"],
              text_offset: "20,40",
            },
            {
              text: [c.number, "ffffffff", "12"],
              text_offset: "70,40",
            },
          ],
        },
      }));
      addCustomPOI(this.cloudRender, dt);
    },
    handleResponseFunction(data) {
      console.log("收到的事件: " + data);
      const jsonObject =
        typeof data === "object"
          ? JSON.parse(JSON.stringify(data))
          : JSON.parse(data);
      switch (jsonObject.func_name) {
        case "beginPlay":
          // 云渲染连接成功 do Something
          break;

        case "APIAlready":
          // 3D世界加载完成 do Something
          removeAllCovering(this.cloudRender, ["poi", "path"]);
          break;

        case "OnAddPathSuccess":
          // 添加路径成功 do Something
          break;

        case "OnAddPathFailed":
          // 添加路径失败 do Something
          break;

        case "OnUpdatePathCoordSuccess":
          // 更新路径数据点成功 do Something
          break;

        case "OnUpdatePathCoordFailed":
          // 更新路径数据点失败 do Something
          break;

        case "OnFocusPathEnd":
          // 聚焦路径结束 do Something
          break;

        case "OnPathClick":
          // 点击路径 do Something
          break;
        case "OnSuperAPI_Error_Catch":
          // 错误捕捉 do Something
          // "args": {
          //   "error_type": "SuperAPI JSon Body Field Error",
          //   "error_information": "id"
          // }
          break;

        //更多func_name类型 回调通知, 详见各API事件
      }
      return data;
    },
  },
};
</script>
<style lang="scss" scoped>
.action-list {
  position: fixed;
  left: 50%;
  bottom: 50px;
  transform: translate(-50%, -50%);
  display: flex;
  .al-icon {
    width: 60px;
    height: 60px;
    border-radius: 60px;
    background-color: greenyellow;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 60px;
    > i {
      font-size: 30px;
      color: #fff;
    }
  }
  .al-label {
    width: 60px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    margin-top: 20px;
  }
}
</style>
