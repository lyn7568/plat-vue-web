<template>
  <el-form-item :label="tagInfo.lableTit" prop="dynamicTags" ref="tagComponent">
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
      @blur="handleInputConfirm"
    ></el-autocomplete>
    <el-button v-else class="button-new-tag" v-show="isShowAdd" size="medium" @click="showInput">+ {{tagInfo.placeholder}}</el-button>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import httpUrl from '@/libs/http';
  // import util from '@/libs/util';

  export default {
    props: {
      tagInfo: {
        type: Object
      },
      industry: {
        type: String
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
    created() {
      this.dynamicTags = this.industry.split(',');
      if (this.dynamicTags.length === 10) {
        this.isShowAdd = false;
      };
    },
    methods: {
      // add tag
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        this.$emit('turnTags', this.dynamicTags.join(',')); // 传给父组件
        if (this.dynamicTags.length < 10) {
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
          this.$message.error(`${this.tagInfo.lableTit}不得超过15个字,添加失败！`);
        }
        if (this.dynamicTags.length === 10) {
          this.isShowAdd = false;
        }
        if (inputValue && inputValue.length < 15 && this.dynamicTags.length < 10) {
          this.dynamicTags.push(inputValue);
        }
        this.$emit('turnTags', this.dynamicTags.join(',')); // 传给父组件
        this.inputVisible = false;
        this.inputValue = '';
      },
      // add tag

      querySearch(queryString, cb) {
        if (this.inputValue) {
          this.loadAllHotKey(this.inputValue);
          this.restaurants = this.loadAllKeys;
          var restaurants = this.restaurants;
          var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
          // 调用 callback 返回建议列表的数据
          cb(results);
        }
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAllHotKey(key) {
        this.$axios.get(httpUrl.kxQurey.qaHotKey, {
          params: {
            key: key
          }
        }).then((res) => {
          if (res.success) {
            var $info = res.data;
            var oSr = [];
            for (var i = 0; i < Math.min($info.length, 5); i++) {
               oSr.push($info[i].caption);
            };
            this.loadAllKeys = oSr;
            console.log(this.loadAllKeys);
          };
        });
      },
      handleSelect(item) {
        console.log(item);
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
