<template>
  <div class="container p-0 mt-3 contact" id="app">
    <div class="shadow pt-3 pb-3">
        <div>
            <div>
                <div class="title-sub c-black">在线提交反馈
                    <span>Give us A Feedback OnLine</span>
                </div>
                <p class="mt-2">"尊敬的用户，我们将在收到您反馈的3个工作日内进行处理"</p>
            </div>
            <!-- <form action="" method="post"> -->
                <div class="row">
                    <div class="col-6 form-group pl-5">
                        <label for="" class="c-black">您的名称<em class="text-danger">*</em></label>
                        <input type="text" class="form-control" name="name" placeholder="请输入您的名称" required>

                    </div>
                    <div class="col-6 pr-5 form-group">
                        <label for="" class="c-black">您的电话<em class="text-danger">*</em></label>
                        <input type="text" class="form-control" name="mobile" placeholder="请输入您的电话号码" required>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6 form-group pl-5">
                        <label for="" class="c-black">您的邮箱</label>
                        <input type="text" class="form-control" name="email" placeholder="请输入您的邮箱">
                    </div>
                    <div class="col-6 form-group pr-5">
                        <label for="" class="c-black">您的QQ</label>
                        <input type="text" class="form-control" name="qq" placeholder="请输入您的QQ号码">
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 pl-5 pr-5">
                        <label for="" class="c-black">您的反馈<em class="text-danger">*</em></label>
                        <textarea class="form-control" id="" cols="30" name="content" rows="10" required placeholder="请输入您的反馈"></textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 text-center mt-3">
                        <!-- <button type="submit" class="btn btn-info">点击提交反馈</button> -->
                        <button class="btn btn-info" @click="submit">点击提交反馈</button>
                    </div>
                </div>
            <!-- </form> -->
        </div>
    </div>
</div>
</template>

<script>
  import '@/assets/disk/css/all.css' ;
  export default {
    name: "ConnectUs",
    methods: {
      submit() {
        
      }
    }
  };

</script>

<style scoped>
.c-black{
    color: #121212;
}
.contact .title-sub{
    font-size: 44px;
    height: 90px;
    font-weight: 100;
    line-height: 40px;
    text-align: center;
    margin-top: 30px;
}
.contact .title-sub > span{
    display: block;
    font-size: 22px;
    opacity: 0.87;
}
.contact p{
    font-size: 16px;
    line-height: 30px;
    color: #888;
    text-align: center;
}

</style>
