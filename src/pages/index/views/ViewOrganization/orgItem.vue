<template>
  <div class="block-container" v-if="orgData && orgData.length">
    <oItem v-for="item in orgData" :key="item.index" :itemSinger="item"></oItem>
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
        orgData: []
      };
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
                        that.orgData = obj
                      }, 1000);
                    }
                  }
                })
              }
            };
          };
        });
      }
    }
  };
</script>
