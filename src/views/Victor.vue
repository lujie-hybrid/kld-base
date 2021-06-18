<template>
  <div>
    <div id="mse" class="win1"></div>
  </div>
</template>

<script>
import Player from "xgplayer/dist/simple_player";
export default {
  components: {},
  data() {
    return {};
  },
  mounted() {
    const url =
      "//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4";
    this.player = new Player({
      id: "mse",
      url,
      width: 500,
      height: 300,
      videoInit: true,
      ignores: ["fullscreen"],
    });
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.win {
  width: 200px;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50px;
  border: 1px solid #fff;
  color: #fff;
  text-align: center;
  line-height: 100px;
  z-index: 10;
}
</style>
