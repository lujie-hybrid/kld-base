// 初始化
import cloudRenderer from "superapi-51world";
import { postAction } from "@/api/action";

export const objFunc = require("lodash/object");

// 初始化3d-51world的对象
export const initData = (id, handleResponseFunction) => {
  const cloudRender = new cloudRenderer(id, 0);
  let cloudurl = "http://192.168.1.191:8889", //云渲染服务地址, 8889:固定端口
    orderID = "4460d4d1"; //渲染口令, 在云渲染客户端上获得
  postAction(`${cloudurl}/Renderers/Any/order`, {
    order: orderID,
    width: window.innerWidth,
    height: window.innerHeight,
  }).then((res) => {
    //启动云渲染
    cloudRender.SuperAPI("StartRenderCloud", res.url);
    //事件注册
    cloudRender.SuperAPI("RegisterCloudResponse", handleResponseFunction);
  });
  return cloudRender;
};

// 删除全部指定类型覆盖物
export const removeAllCovering = (cloudRender, covering_type, callback) => {
  cloudRender.SuperAPI(
    "RemoveAllCovering",
    { covering_type: covering_type || "poi" },
    callback
  );
};

// 镜头FOCUS至全部指定类型的覆盖物
export const focusAllCovering = (cloudRender, covering_type, callback) => {
  cloudRender.SuperAPI(
    "FocusAllCovering",
    { covering_type: covering_type || "poi" },
    callback
  );
};

// 添加自定义POI点
export const addCustomPOI = (cloudRender, poiList, covering_type) => {
  const defaultSetting = {
    coord_type: 0, //坐标类型(0:经纬度坐标, 1:cad坐标)
    cad_mapkey: "", //CAD基准点的Key值, 项目中约定
    coord_z: 0, //高度(单位:米)
    coord_z_type: 0, //坐标高度类型(0:相对3D世界表面; 1:相对3D世界地面; 2:相对3D世界海拔; 注:cad坐标无效)
    always_show_label: true, //是否永远显示label, true:显示label(默认), false:不显示label
    show_label_range: "0,1500", //此POI点显示label的摄像机距离范围(单位米, 范围最小距离, 范围最大距离; 在此范围内显示, 超出范围隐藏label;注意:always_show_label 属性优先于此属性)
    sort_order: false, //是否开启遮挡排序(根据POI真实3D位置开启遮挡排序,注:只与其他开启排序的POI之间进行排序, 开启此排序会消耗性能(最多60个POI同时开启排序)
    state: "initial-state", //与marker之中images中的define_state对应
    marker: {
      size: "30,30", //Marker大小(宽, 高 单位:像素)
      images: [{ define_state: "initial-state" }],
    },
    label: {
      bg_image_url:
        "http://superapi.51hitech.com/doc-static/images/static/LabelBg.png",
      bg_size: "150,26", //label大小(宽, 高 单位:像素)
      bg_offset: "20,30", //整个label左上角相对于marker的中心点(coord坐标中心)的偏移(x,y 单位:像素), 注:x为正向右, y为正向上
    },
  };
  removeAllCovering(cloudRender, covering_type);
  poiList.forEach((p) => {
    const r = objFunc.merge(defaultSetting, p);
    p = r;
    cloudRender.SuperAPI("AddCustomPOI", p);
  });
  setTimeout(() => {
    focusAllCovering(cloudRender, covering_type);
  }, 500);
};
