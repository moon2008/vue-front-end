<!-- 考试倒计时组件 -->
<template>
  <div class="time">
    <p>{{timerHours}}:{{timerMinutes}}:{{timerSeconds}}</p>
  </div>
</template>

<script>
  export default {
    name: "Time",
    props: ["status", "examtime"],
    data() {
      return {
        hours: "",
        seconds: "",
        minutes: "",
        timer: null
      };
    },
    watch: {
      status(v) {
        if (v) {
          clearInterval(this.timer);
          this.$emit("show");
        }
      }
    },
    methods: {
      // 倒计时
      timing() {
        this.timer = setInterval(() => {
          if (this.seconds == 0 & this.minutes > 0) {
            this.seconds = 59;
            this.minutes--;
          } else if (this.minutes == 0 && this.hours > 0) {
            this.minutes = 59;
            this.hours--;
          } else if (this.minutes == 0 && this.seconds == 0 && this.hours == 0) {
            this.seconds = 0;
            clearInterval(this.timer);
            this.$emit("show");
            this.$message.warning({
              message: "考试时间到，自动交卷！",
              offset: 380,
              duration: 1000
            });
          } else {
            this.seconds--;
          }
        }, 1000);
      }
    },
    created() {
      this.minutes = this.examtime.minutes;
      this.seconds = this.examtime.seconds;
      this.hours = this.examtime.hours;
    },
    mounted() {
      this.timing();
    },
    computed: {
      timerSeconds() {
        return this.seconds < 10 ? "0" + this.seconds : "" + this.seconds;
      },
      timerMinutes() {
        return this.minutes < 10 ? "0" + this.minutes : "" + this.minutes;
      },
      timerHours() {
        return this.hours < 10 ? "0" + this.hours : "" + this.hours;
      }
    },
    destroyed() {
      // 退出后清除计时器
      if (this.timer) {
        clearInterval(this.timer);
      }
    }
  };

</script>


<style scoped lang="scss">
</style>
