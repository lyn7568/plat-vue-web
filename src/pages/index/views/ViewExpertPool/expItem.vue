<template>
  <div class="block-container" v-if="userData && userData.length">
    <eItem v-for="item in userData" :key="item.index" :itemSinger="item"></eItem>
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
        userData: []
      };
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
        that.$axios.get('/ajax/professor/list', {}, (res) => {
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
                        that.userData = obj
                      }, 1000);
                    }
                  }
                })
              }
            } else {
              that.$parent.loadingState = false
            }
          }
        })
      }
    }
  };
</script>
