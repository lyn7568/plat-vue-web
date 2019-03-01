<template>
  <div class="block-container" v-if="platThreeOrgs && platThreeOrgs.length">
    <template v-if="num">
      <oItem v-for="item in platThreeOrgs" :key="item.index" :itemSinger="item"></oItem>
    </template>
    <template v-else>
      <template v-show="!ifDefault" v-if="pageOrgData.length">
        <oItem v-for="item in pageOrgData" :key="item.index" :itemSinger="item"></oItem>
        <Loading v-show="loadingModalShow" :loadingComplete="loadingComplete" :isLoading="isLoading" v-on:upup="searchLower"></Loading>
      </template>
      <defaultPage v-show="ifDefault"></defaultPage>
    </template>
  </div>
</template>

<script>
  import { ImageUrl, defaultSet } from '@/libs/util';
  import oItem from './item'

  export default {
    props: {
      num: {
        type: Number
      }
    },
    data() {
      return {
        orgData: [],
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
      platThreeOrgs() {
        var pt = this.orgData
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
      pageOrgData() {
        return this.orgData.slice(0, this.pageNo * this.pageSize)
      }
    },
    components: {
      oItem
    },
    created() {
       this.ResidentOrgs();
    },
    methods: {
      ResidentOrgs() {
        var that = this
        that.$axios.get('/ajax/org/list', {}, (res) => {
          if (res.success) {
            var $data = res.data;
            var arr = []
            var hdata = { num: 1, data: $data }
            if ($data.length > 0) {
              for (let i in $data) {
                hdata.num++
                arr[i] = $data[i].id;
                hdata.num--
              }
              hdata.num--
              if (hdata.num === 0 && arr.length) {
                that.$axios.getk('/ajax/org/qm', {
                  id: arr
                }, function(data) {
                  if (data.success && data.data) {
                    var obj = data.data
                    if (obj.length > 0) {
                      for (let m = 0; m < obj.length; ++m) {
                        obj[m].logo = defaultSet.img.org
                        if (obj[m].hasOrgLogo) {
                          obj[m].logo = ImageUrl(('org/' + obj[m].id + '.jpg'), true)
                        }
                        if (obj[m].industry) {
                          obj[m].industry = obj[m].industry.replace(/,/g, ' | ')
                        }
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
                        that.orgData = obj
                      }, 1000);
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
      },
      searchLower() {
        if (this.loadingModalShow && !this.isLoading) {
          this.pageNo++
        }
        if (this.pageOrgData.length <= this.pageNo * this.pageSize) {
          this.loadingModalShow = false
          this.loadingComplete = true
          this.isFormSearch = true
          this.isLoading = false
          this.ifDefault = false
        }
      }
    }
  }
</script>
