<template>
  <div class="container p-0" id="app">
    <v-dialog></v-dialog>
    <modal :width="'450px'" :height="'auto'" name="confirmBuy">
        <credit-consignee-info @confirm-buy="confirmBuy"></credit-consignee-info>
    </modal>
    <div class="card mt-1">
        <div class="card-body">
            <div class="d-flex justify-content-end mb-3 c-black">
                <div class="mr-5">
                    <span class="text-muted">姓名：</span>
                    <span class="font-weight-bold">原恺彬</span>
                </div>
                <div>
                    <span class="text-muted">剩余积分：</span>
                    <span class="font-weight-bold">{{100}}</span>
                </div>
            </div>
            <!-- <div class="d-flex justify-content-start flex-wrap goods-container">
                @foreach($goods as $g)
                <goods-item :goods='@json($g)' @button-click="buttonClick"></goods-item>
                @endforeach
            </div> -->
        </div>
    </div>
</div>
</template>

<script>
  import '@/assets/disk/css/all.css' ;
  import { getusersData } from '@/network/question';
  export default {
    name: 'Score',
    data() {
      return {
        score:0,
        tableData: [],
        userData: {}
      }
    },
    created() {
      this.getData();
      this.selectScore();
    },
    methods: {
      getData() {
        getusersData().then(res => {
          console.log(res);
          this.tableData = res
        }).catch(err => {
          console.log('-------------error------------')
          console.log(err)
        });
        // this.tableData = [];
      },
      selectScore() {
        // this.userData = this.tableData[0];
        // this.score = this.userData.score;
      }
    },
    mounted() {
    
    }
  }

</script>

<style scoped>

  .score-show {
    font-size: 3.6rem;
    margin: 2rem 0;
  }

  .red {
    color: #F56C6C;
  }

  .yellow {
    color: #E6A23C
  }

  .green {
    color: #67C23A;
  }

</style>
