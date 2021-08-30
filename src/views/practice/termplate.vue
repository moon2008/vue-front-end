<template class="topicContent" v-for="(item,questionIndex) in singleq" :key="item.id"
  v-show="questionIndex===questionID">
  <!--单选题-->
  <!-- v-if="item.type===`isRadio` && item.value" :key="item.id"-->
  <div class="radio-type">
    <div style="padding-bottom: 5px;">{{ questionIndex + 1 }}、({{ item.score }}分) {{item.question}}</div>
    <el-radio-group v-model="topicContent.radioItem">
      <el-radio v-if="item.optionA" label="A">A. {{item.optionA}}</el-radio>
      <el-radio v-if="item.optionB" label="B">B. {{item.optionB}}</el-radio>
      <el-radio v-if="item.optionC" label="C">C. {{item.optionC}}</el-radio>
      <el-radio v-if="item.optionD" label="D">D. {{item.optionD}}</el-radio>
    </el-radio-group>
  </div>
  <!--多选题-->
  <div v-if="item.type===`isCheckbox` && item.value" :key="item.type" class="checkbox-type">
    <div style="padding-bottom: 5px;">({{score}}分) {{topicTitle}}</div>
    <el-checkbox-group v-model="topicContent.checkedItem">
      <el-checkbox v-for="item in optionChecked" :label="item.value" :key="item.value">{{item.label}}
      </el-checkbox>
    </el-checkbox-group>
  </div>
  <!--填空题-->
  <div v-if="item.type===`isBlank` && item.value" :key="item.type" class="blank-type">({{score}}分)
    <span style="padding-bottom: 5px;"
      v-for="(item,index) in blankTitle.split('_').slice(0, blankTitle.split('_').length-1)" :key="index">
      <span>{{item}}{{"_______"}}</span>
    </span>
    <span>{{blankTitle.split('_')[blankTitle.split('_').length-1]}}</span>
    <div style="display: flex;flex-wrap: wrap;padding-top: 15px">
      <span v-for="(resultItem,resultIndex) in blankTitle.split('').filter(item => item === '_')" :key="resultIndex+100"
        style="padding-right: 15px">
        <span style="color: #666666;">第{{resultIndex+1}}空答案：</span>
        <!-- <a-input style="width: 180px" placeholder="请输入..."></a-input> -->
      </span>
    </div>
  </div>
  <!--简答题-->
  <div v-if="item.type===`isAnswer` && item.value" :key="item.type" class="answer-type">
    <div style="padding-bottom: 5px;">({{score}}分) {{topicTitle}}</div>
    <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 5}" placeholder="请输入..."
      v-model="topicContent.answerItem" style="padding-top: 10px"></el-input>
  </div>
</template>
