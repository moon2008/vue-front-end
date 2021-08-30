<template>
  <!-- <draggable v-model="myArray" group="people" @start="drag=true" @end="drag=false" item-key="id" tag="transition-group">
    <template #item="{element}">
      <div>{{element.name}}</div>
    </template>
  </draggable> -->
  <!-- @change="log" -->
  <div class="row">
    <div class="col-3">
      <h3>Draggable 1</h3>
      <draggable class="list-group" :list="list1" group="people" itemKey="name">
        <template #item="{ element, index }">
          <div class="list-group-item">{{ element.name }} {{ index }}</div>
        </template>
      </draggable>
    </div>

    <div class="col-3">
      <h3>Draggable 2</h3>
      <draggable class="list-group" :list="list2" group="people" itemKey="name">
        <template #item="{ element, index }">
          <div class="list-group-item">{{ element.name }} {{ index }}</div>
        </template>
      </draggable>
    </div>

    <!-- <rawDisplayer class="col-3" :value="list1" title="List 1" />

    <rawDisplayer class="col-3" :value="list2" title="List 2" /> -->
  </div>
  <div>
    <h1>联系我们</h1>
  </div>
</template>

<script>
  import draggable from "vuedraggable";
  import rawDisplayer from "@/components/content/raw-displayer"
  export default {
    name: "ConnectUs",
    display: "Two Lists",
    order: 1,
    components: {
      draggable,
      rawDisplayer
    },
    data() {
      return {
        list1: [

        ],
        list2: [{
            name: "选项1",
            id: 1
          },
          {
            name: "选项2",
            id: 2
          },
          {
            name: "选项3",
            id: 3
          },
          {
            name: "选项4",
            id: 4
          },
          {
            name: "选项5",
            id: 5
          },
          {
            name: "选项6",
            id: 6
          },
          {
            name: "选项7",
            id: 7
          }
        ]
      };
    },
    methods: {
      // add: function() {
      //   this.list.push({ name: "Juan" });
      // },
      // replace: function() {
      //   this.list = [{ name: "Edgard" }];
      // },
      // clone: function(el) {
      //   return {
      //     name: el.name + " cloned"
      //   };
      // },
      // log: function(evt) {
      //   window.console.log(evt);
      // }
    }
  };

</script>

<style scoped>

</style>
