<template>
  <div id="my-video" class="prism-player"></div>
</template>

<script>
  export default {
    name: "Myvideo",
    data() {
      return {
      }
    },
    // prop: ['source'], 
    mounted() {
      var player = new Aliplayer({
        "id": "my-video",
        "source": "https://video.1kb.site/xf/%EF%BC%88%E4%B8%80%EF%BC%89%20%E9%AB%98%E5%B1%82%E4%BD%8F%E5%AE%85%E5%B0%8F%E5%8C%BA%E7%AF%87%2000_04_00-00_06_40.mp4",
        "width": "500px",
        "height": "300px",
        "autoplay": false,
        "isLive": false,
        // "cover": 
        "rePlay": false,
        "playsinline": true,
        "preload": true,
        "language": "zh-cn",
        "controlBarVisibility": "hover",
        "useH5Prism": true,
        "skinLayout": [{
            "name": "bigPlayButton",
            "align": "cc",
            "x": 30,
            "y": 80
          },
          {
            "name": "errorDisplay",
            "align": "tlabs",
            "x": 0,
            "y": 0
          },
          {
            "name": "infoDisplay"
          },
          {
            "name": "controlBar",
            "align": "blabs",
            "x": 0,
            "y": 0,
            "children": [{
                name: "progress",
                align: "blabs",
                x: 0,
                y: 44
              }, //播放进度条
              {
                name: "playButton",
                align: "tl",
                x: 15,
                y: 12
              }, //播放开始暂停按钮
              {
                name: "timeDisplay",
                align: "tl",
                x: 10,
                y: 7
              }, //播放视频时间
              {
                "name": "fullScreenButton", //全屏按钮
                "align": "tr",
                "x": 10,
                "y": 10
              },
              {
                "name": "volume", //音量
                "align": "tr",
                "x": 5,
                "y": 10
              }
            ]
          }
        ],
      }, function (player) {
        console.log("The player is created");
      });
    }
  }

</script>

<style scoped>

</style>
