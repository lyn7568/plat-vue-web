<template>
  <div class="linkage">
    <el-row>
      <el-col :span="12">
        <el-select
          v-model="sheng"
          @change="choseProvince"
          placeholder="省/直辖市">
          <el-option
            v-for="item in provinceArr"
            :key="item.id"
            :label="item.value"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="12">
        <el-select
          v-model="shi"
          @change="choseCity"
          placeholder="所在城市">
          <el-option
            v-for="item in cityArr"
            :key="item.id"
            :label="item.value"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import queryDict from '@/libs/queryDict'
export default {
  props: ['addrCode'],
  data() {
    return {
      firstFlag: false,
      provinceArr: [],
      cityArr: [],
      sheng: '',
      shi: ''
    }
  },
  watch: {
    addrCode: function() {
      var that = this
      setTimeout(function() {
        that.initpsq()
      }, 100)
    }
  },
  created() {
    this.getCityData()
  },
  methods: {
    getCityData: function() {
      var that = this
      queryDict.applyDict('XZQH', function(dictData) {
        if (dictData && dictData.length > 0) {
          var data = dictData.sort((obj1, obj2) => {
            return obj1.code - obj2.code
          })
          that.provinceArr = {}
          data.map(item => {
            if (item.code.match(/0000$/)) {
              that.provinceArr[item.code] = { id: item.code, value: item.caption, children: {} }
            } else if (item.code.match(/00$/)) {
              var p = that.provinceArr[item.code.slice(0, 2) + '0000']
              if (p) {
                p.children[item.code] = { id: item.code, value: item.caption }
                if (!p.defaultChild) {
                  p.defaultChild = p.children[item.code]
                }
              } else {
                that.provinceArr[item.code.slice(0, 2) + '0000'] = { id: item.code.slice(0, 2) + '0000', value: item.caption, children: {}}
                var pr = that.provinceArr[item.code.slice(0, 2) + '0000']
                pr.children[item.code] = { id: item.code, value: item.caption }
                if (!pr.defaultChild) {
                  pr.defaultChild = pr.children[item.code]
                }
              }
            }
          })
        } else {
          console.log(dictData.status)
        }
      })
    },
    choseProvince: function(e) {
      var p = this.provinceArr[e]
      this.cityArr = p.children
      this.shi = p.defaultChild.value
      this.E = p.defaultChild.id
      this.sheng = p.value
      this.$emit('paren', this.E)
      this.$emit('parenStr', this.shi)
    },
    choseCity: function(e) {
      var p = this.provinceArr[e.slice(0, 2) + '0000'].children[e]
      this.shi = p.value
      this.E = p.id
      this.$emit('paren', this.E)
      this.$emit('parenStr', this.shi)
    },
    initpsq: function() {
      if (!this.addrCode) {
        this.sheng = ''
        this.shi = ''
        return
      }
      const s = this.addrCode.substring(0, 2) + '0000'
      const si = this.addrCode.substring(0, 4) + '00'
      if (this.provinceArr) {
        var p = this.provinceArr[s]
        this.sheng = p.value
        this.shi = p.children[si].value
      }
    }
  }
}
</script>
