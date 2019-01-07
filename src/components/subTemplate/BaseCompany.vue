<template>
  <a class="list-item" :href="'company.html?id='+companyInfo.id" target="_blank">
    <div class="list-head">
      <div class="item-pic-org">
        <img :src="companyInfo.logo">
      </div>
    </div>
    <div class="list-info">
      <div class="list-tit list-topic">{{companyInfo.name}}</div>
      <div class="list-desc" v-if="objKey">{{objKey.join(' | ')}}</div>
    </div>
  </a>
</template>

<script>
  import { defaultSet } from '@/libs/util';
  export default {
    props: {
      itemSingle: {
        type: Object
      }
    },
    data() {
      return {
        objKey: []
      }
    },
    computed: {
      companyInfo() {
        var obj = this.itemSingle
        if (obj.compId) {
          obj.id = obj.compId
        }
        if (!obj.logo) {
          obj.logo = defaultSet.img.org
        }
        return obj
      }
    },
    created() {
      this.getCompanyKeyword()
    },
    methods: {
      getCompanyKeyword() {
        var that = this
        that.$axios.get('/ajax/company/qo/keyword', {
          id: that.companyInfo.id,
          type: 1
        }, function(res) {
          if (res.success && res.data) {
            const str = res.data
            if (str.length > 0) {
              str.map(item => {
                that.objKey.push(item.value)
              })
            }
          }
        })
      }
    }
  };
</script>
