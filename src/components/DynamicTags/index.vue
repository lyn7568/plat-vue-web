<template>
  <div class="tag-box">
    <div class="tag-btn" v-if="!isShowAdd">
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="medium"
        :maxlength="tagInfo.limitCount"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <!-- <el-autocomplete
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="medium"
        :placeholder="tagInfo.placeholder"
        :trigger-on-focus="false"
        @select="handleSelect"
        :fetch-suggestions="querySearch"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
        <template slot-scope="{ item }">
          <div class="name">{{ item.caption }}</div>
        </template>
      </el-autocomplete> -->
      <el-button v-else class="button-new-tag" size="medium" @click="showInput">+ {{tagInfo.placeholder}}</el-button>
    </div>
    <div class="tag-show" :class="tagInfo.tagblock ? 'tag-block' : ''">
      <div class="tag-item" :key="tag" v-for="(tag,tagIndex) in dynamicTags">
        <el-tag
          closable
          :disable-transitions="false"
          @close="handleClose(tagIndex)">
          {{tag}}
        </el-tag>
      </div>
    </div>
  </div>

</template>

<script>
/* 使用说明
 *  dyStr: [], // 数据动态回显tag数组
 *  tagInfo: {
 *  lableTit: '关键词',
 *  placeholder: '请填写相关的关键词',
 *  limitCount: 10, 每个tag的Word限制
 *  tagsNum: 3 //最多可以传输数量
 * }
*/
// import httpUrl from '@/libs/http'
import { trimStr } from '@/utils'
export default {
  props: ['dyStr', 'tagInfo'],
  data() {
    return {
      dynamicTags: this.dyStr || [],
      inputVisible: false,
      inputValue: ''
      // restaurants: [],
      // loadAllKeys: []
    }
  },
  watch: {
    dyStr(value) {
      var that = this
      setTimeout(function() {
        that.dynamicTags = value
      }, 100)
    },
    dynamicTags(value) {
      const list = value
      this.$emit('turnTags', list)
    },
    inputValue(value) {
      var reg = new RegExp('[,|，]')
      this.inputValue = value.replace(reg, '')
    }
  },
  computed: {
    isShowAdd() {
      if (this.dynamicTags) {
        return this.dynamicTags.length >= this.tagInfo.tagsNum
      } else {
        return false
      }
    }
  },
  methods: {
    // add tag
    handleClose(index) {
      this.dynamicTags.splice(index, 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm(value) {
      const inputValue = trimStr(this.inputValue)
      if (inputValue) {
        if (inputValue.length > this.tagInfo.limitCount) {
          this.$alert(`${this.tagInfo.lableTit}不得超过${this.tagInfo.limitCount}个字，添加失败！`, '提示', {
            confirmButtonText: '确定',
            type: 'warning',
            center: true
          })
          return false
        }
        for (var i = 0; i < this.dynamicTags.length; i++) {
          if (inputValue === this.dynamicTags[i]) {
            this.$alert('添加的内容不能重复', '提示', {
              confirmButtonText: '确定',
              type: 'warning',
              center: true
            })
            this.inputValue = ''
            return false
          }
        }

        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
    // add tag

    // select key tag
    // querySearch(queryString, cb) {
    //   this.$axios.get(httpUrl.kxQurey.qaHotKey, {
    //     key: queryString
    //   }, (res) => {
    //     if (res.success) {
    //       var $info = res.data;
    //       var oSr = [];
    //       for (let i = 0; i < Math.min($info.length, 5); i++) {
    //         oSr[i] = $info[i];
    //       };
    //       this.loadAllKeys = oSr;
    //       // if (this.loadAllKeys.length === 0) {
    //       //   this.loadAllKeys = [{caption: '暂无数据'}]
    //       // };
    //       cb(this.loadAllKeys);
    //     };
    //   });
    // },
    // handleSelect(item) {
    //   this.inputValue = item.caption
    // }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tag-show {
    overflow: hidden;
    padding:5px 0 0;
    margin-bottom:-5px;
    .tag-item{
      float:left;
      .el-tag {
        margin-right:10px;
        margin-bottom:5px;
        min-height: 32px;
        padding: 6px 10px;
        line-height: 20px;
        height:auto;
      }
    }
  }
  .tag-block{
    .tag-item{
      float:none;
      display: block;
      .el-tag {
        margin-left: 0;
        white-space: normal;
      }
    }
  }
  .button-new-tag{
    width:100%;
    height: 38px;
    line-height: 36px;
    padding-top: 0;
    text-align: left;
    padding-bottom: 0;
    color: #c0c4cc;
    overflow:hidden;
  }
  .el-input.input-new-tag{
    width: 100%;
    vertical-align: bottom;
    margin-left: 0;
    overflow:hidden;
  }
</style>
