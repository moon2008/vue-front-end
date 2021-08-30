<template>
  <div>
    <Carousel></Carousel>
    <comExam></comExam>
    <Record></Record>
  </div>
</template>

<script>
import Carousel from "./Carousel.vue";
import comExam from "./comExam.vue";
import Record from "./Record.vue";
export default {
  name: "Home",
  components: {
    Carousel,
    comExam,
    Record,
  },
};
</script>

<style scoped>
</style>
