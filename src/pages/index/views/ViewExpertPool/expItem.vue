<template>
  <div class="block-container" v-if="platSixExps && platSixExps.length">
    <template v-if="num">
      <eItem v-for="item in platSixExps" :key="item.index" :itemSinger="item"></eItem>
    </template>
    <template v-else>
      <template v-show="!ifDefault" v-if="pageUserData.length">
        <eItem v-for="item in pageUserData" :key="item.index" :itemSinger="item"></eItem>
        <Loading v-show="loadingModalShow" :loadingComplete="loadingComplete" :isLoading="isLoading" v-on:upup="searchLower"></Loading>
      </template>
      <defaultPage v-show="ifDefault"></defaultPage>
    </template>
  </div>
</template>

<script>
  import { formatOfft, ImageUrl, defaultSet, autho } from '@/libs/util';
  import eItem from './item'

  export default {
    props: {
      num: {
        type: Number
      }
    },
    data() {
      return {
        platId: process.env.PLAT_ID,
        userData: [],
        loadingModalShow: true,
        loadingComplete: false,
        isFormSearch: false,
        isLoading: false,
        ifDefault: false,
        pageSize: 30,
        pageNo: 1
      };
    },
    computed: {
      platSixExps() {
        var pt = this.userData
        var str = []
        if (this.num && pt.length > this.num) {
          for (let i = 0; i < this.num; ++i) {
            str[i] = pt[i]
          }
        } else {
          str = pt
        }
        return str
      },
      pageUserData() {
        return this.userData.slice(0, this.pageNo * this.pageSize)
      }
    },
    components: {
      eItem
    },
    created() {
      this.buttedProfessors();
    },
    methods: {
      buttedProfessors() {
        var that = this
        that.$axios.get('http://www.xttjpt.cn:88/ajax/professor/sync', {pid: that.platId}, (res) => {
          that.$axios.get('/ajax/professor/list', {}, (res) => {
            if (res.success) {
              var $data = res.data;
              var arr = []
              var hdata = { num: 1, data: $data }
              if ($data.length > 0) {
                for (let i = 0; i < $data.length; ++i) {
                  hdata.num++
                  arr[i] = $data[i].id;
                  hdata.num--
                }
                hdata.num--
                if (hdata.num === 0 && arr.length) {
                  that.$axios.getk('/ajax/professor/qm', {
                    id: arr
                  }, function(data) {
                    if (data.success && data.data) {
                      var obj = data.data
                      if (obj.length > 0) {
                        for (let m = 0; m < obj.length; ++m) {
                          obj[m].img = defaultSet.img.expert
                          if (obj[m].hasHeadImage) {
                            obj[m].img = ImageUrl(('head/' + obj[m].id + '_l.jpg'), true)
                          }
                          obj[m].auth = autho(obj[m].authType, obj[m].orgAuth, obj[m].authStatus)
                          obj[m].offt = formatOfft(obj[m], true)
                        }
                        setTimeout(() => {
                          that.$parent.loadingState = false
                          for (let j = 0; j < obj.length; ++j) {
                            for (let n = 0; n < $data.length; ++n) {
                              if (obj[j].id === $data[n].id) {
                                if ($data[n].level) {
                                  obj[j].level = $data[n].level
                                } else {
                                  obj[j].level = 99999
                                }
                              }
                            }
                          }
                          obj.sort(function(a, b) {
                            return a.level > b.level ? 1 : (a.level === b.level ? 0 : -1)
                          })
                          if (obj.length <= that.pageSize) {
                            that.loadingModalShow = false
                            that.loadingComplete = true
                            that.isFormSearch = true
                            that.isLoading = false
                            that.ifDefault = false
                          }
                          that.userData = obj
                        }, 1000)
                      }
                    }
                  })
                }
              } else {
                that.ifDefault = true
                that.$parent.loadingState = false
              }
            }
          })
        }) 
      },
      searchLower() {
        if (this.loadingModalShow && !this.isLoading) {
          this.pageNo++
        }
        if (this.pageUserData.length < this.pageNo * this.pageSize) {
          this.loadingModalShow = false
          this.loadingComplete = true
          this.isFormSearch = true
          this.isLoading = false
          this.ifDefault = false
        }
      }
    }
  };
</script>
