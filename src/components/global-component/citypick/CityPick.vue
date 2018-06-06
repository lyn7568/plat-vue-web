<template>
  <el-col :span="24" class="cityParent">
    <el-form-item label="所在城市" prop="province">
      <el-col :span="24">
        <el-select :style="{width: widthselect + 'px'}"
         v-model="selectProv"
         placeholder="请选择所在省/直辖市"
         v-on:change="getProv($event)">
          <el-option
            v-for="item in provs"
            :label="item.text"
            :value="item.text"
            :key="item.index">
          </el-option>
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item prop="city" class="cityChild"
      :style="{left: labelW ? (widthselect + labelW + 6 + 'px'):(widthselect + 6 + 'px')}">
      <el-select :style="{width: widthselect + 'px', marginLeft: labelW ? (-labelW +'px'): 0}"
         v-model="selectCity"
         placeholder="请选择所在城市"
         v-on:change="getCity($event)">
        <el-option
          v-for="item in citys"
          :label="item.text"
          :value="item.text"
          :key="item.index">
        </el-option>
      </el-select>
    </el-form-item>
  </el-col>
</template>

<script type="text/ecmascript-6">
  import cityData from './city-data.js';

  export default {
    props: {
      prov: {
        type: String
      },
      city: {
        type: String
      },
      widthselect: {
        type: Number
      },
      labelW: {
        type: Number
      }
    },
    data() {
      return {
        provs: cityData,
        citys: [],
        selectProv: '',
        selectCity: ''
      };
    },
    watch: {
      prov() {
        if (this.prov) {
          this.selectProv = this.prov;
        };
      },
      city() {
        if (this.city) {
          this.selectCity = this.city;
        };
      }
    },
    methods: { // 二级联动选择地区
      getProv: function (prov) {
        let tempCity = [];
        this.citys = [];
        this.selectCity = '';
        for (var val of this.provs) {
          if (prov === val.text) {
            tempCity = val.children;
          };
        };
        this.citys = tempCity;
        this.$emit('selectProv', this.selectProv);
        this.$emit('selectCity', this.selectCity);
      },
      getCity: function (city) {
        console.log(city);
        console.log(this.selectCity);
        this.$emit('selectProv', this.selectProv);
        this.$emit('selectCity', this.selectCity);
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus">
  .cityParent
    position:relative
    z-index:2
    .cityChild
      position:absolute
      bottom:0
      z-index:1
</style>
