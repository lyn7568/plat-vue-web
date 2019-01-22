<template>
  <a class="list-item list-item-info" :href="'demand.html?id='+demandInfo.id" target="_blank">
    <div class="list-info">
      <div class="list-tit">{{demandInfo.title}}</div>
      <ul class="list-tag">
        <li>发布于 {{TimeTr(demandInfo.createTime)}}</li>
        <li>回复 {{count}}</li>
        <li v-if="expiredShow" class="colorRed">已于 {{TimeTr(demandInfo.invalidDay)}} 过期</li>
        <li v-if="!expiredShow && overdueShow" class="colorRed">即将于 {{TimeTr(demandInfo.invalidDay)}} 过期</li>
        <li v-if="demandInfo.state===2">已于 {{TimeTr(demandInfo.overTime)}} 完成</li>
        <li v-if="demandInfo.state===3">已于 {{TimeTr(demandInfo.closeTime)}} 关闭</li>
      </ul>
    </div>
  </a>
</template>

<script>
  import { delayDay, TimeTr } from '@/libs/util';
  export default {
    props: {
      itemSingle: {
        type: Object
      }
    },
    data() {
      return {
        curDate: (new Date()).toISOString().substring(0,10).replace(/-/g, ''),
        count: 0,
        TimeTr: TimeTr
      };
    },
    computed: {
      demandInfo() {
        var obj = this.itemSingle
        return obj
      },
      expiredShow() {
        return this.demandInfo.state === 1 && this.curDate > this.demandInfo.invalidDay
      },
      overdueShow() {
        return this.demandInfo.state === 1 && delayDay(this.demandInfo.invalidDay)
      }
    },
    created() {
      if (this.demandInfo.id) {
        this.rebackCount()
      }
    },
    methods: {
      rebackCount() {
        var that = this
        this.$axios.get('/ajax/demand/pro/count', {
          id: that.demandInfo.id
        }, function(res) {
          if (res.success) {
            that.count = res.data
          }
        })
      }
    }
  };
</script>
