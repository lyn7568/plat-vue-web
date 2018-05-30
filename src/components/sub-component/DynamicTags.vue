<template>
  <el-form-item :label="lableTit" prop="dynamicTags" ref="tagComponent">
    <el-tag
      :key="tag"
      v-for="tag in dynamicTags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)">
      {{tag}}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ {{tagInfo.placeholder}}</el-button>
  </el-form-item>
</template>

<script>
  export default {
    props: {
      tagInfo: {
        type: Object
      }
    },
    data() {
      return {
        lableTit: ''
      };
    },
    computed: {
    },
    data() {
      return {
        inputVisible: false,
        inputValue: '',
        dynamicTags: ['标签一', '标签二', '标签三']
      };
    },
    methods: {
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus">
  .el-tag + .el-tag
    margin-left: 10px
  .button-new-tag
    margin-left: 10px
    height: 32px
    line-height: 30px
    padding-top: 0
    padding-bottom: 0
  .input-new-tag
    width: 90px
    margin-left: 10px
    vertical-align: bottom
</style>
