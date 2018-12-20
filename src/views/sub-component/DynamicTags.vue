<template>
  <el-form-item :label="tagInfo.lableTit" ref="tagComponent">
    <el-tag
      :key="tag"
      v-for="tag in dynamicTags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)">
      {{tag}}
    </el-tag>
    <el-autocomplete
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="medium"
      :fetch-suggestions="querySearch"
      :placeholder="tagInfo.placeholder"
      :trigger-on-focus="false"
      @select="handleSelect"
      @keyup.enter.native="handleInputConfirm"
    >
      <template slot-scope="{ item }">
        <div class="name">{{ item.caption }}</div>
      </template>
    </el-autocomplete>
    <el-button v-else class="button-new-tag" v-show="isShowAdd" size="medium" @click="showInput">+ {{tagInfo.placeholder}}</el-button>
  </el-form-item>
</template>

<script>
  import httpUrl from '@/libs/http';

  export default {
    props: {
      tagInfo: {
        type: Object
      },
      dyStr: {
        type: String
      },
      dynamicTagsLength: {
        type: Number
      }
    },
    data() {
      return {
        inputVisible: false,
        inputValue: '',
        dynamicTags: [],
        isShowAdd: true,
        restaurants: [],
        loadAllKeys: []
      };
    },
    watch: {
      dyStr() {
        if (this.dyStr) {
          this.dynamicTags = this.dyStr.split(',');
          if (this.dynamicTags.length === this.dynamicTagsLength) {
            this.isShowAdd = false;
          };
        };
      }
    },
    methods: {
      // add tag
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        this.$emit('turnTags', this.dynamicTags.join(',')); // 传给父组件
        if (this.dynamicTags.length < this.dynamicTagsLength) {
          this.isShowAdd = true;
        }
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue.length > 15) {
          this.$alert(`${this.tagInfo.lableTit}不得超过15个字,添加失败！`, '提示', {
            confirmButtonText: '确定',
            type: 'warning',
            center: true
          });
          return false;
        }
        for (var i = 0; i < this.dynamicTags.length; i++) {
          if (inputValue === this.dynamicTags[i]) {
            this.$alert('添加的内容不能重复', '提示', {
              confirmButtonText: '确定',
              type: 'warning',
              center: true
            });
            return false;
          }
        }
        if (this.dynamicTags.length === this.dynamicTagsLength) {
          this.isShowAdd = false;
          return false;
        }

        this.dynamicTags.push(inputValue);

        this.$emit('turnTags', this.dynamicTags.join(',')); // 传给父组件
        this.inputVisible = false;
        this.inputValue = '';
      },
      // add tag

      querySearch(queryString, cb) {
        this.$axios.get(httpUrl.kxQurey.qaHotKey, {
          key: queryString
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            var oSr = [];
            for (let i = 0; i < Math.min($info.length, 5); i++) {
              oSr[i] = $info[i];
            };
            this.loadAllKeys = oSr;
            // if (this.loadAllKeys.length === 0) {
            //   this.loadAllKeys = [{caption: '暂无数据'}]
            // };
            cb(this.loadAllKeys);
          };
        });
      },
      handleSelect(item) {
        this.inputValue = item.caption;
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus">
  .el-tag + .el-tag
    margin-left: 10px
  .button-new-tag
    width: 400px
    height: 32px
    line-height: 30px
    padding-top: 0
    padding-bottom: 0
  .input-new-tag
    width: 400px
    vertical-align: bottom
</style>
