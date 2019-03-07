<template>
  <a class="list-item" :href="urlHref" :target="noBlank ? '' : '_blank'">
    <div class="list-head">
      <div class="item-pic-org">
        <img :src="orgInfo.logo">
      </div>
    </div>
    <div class="list-info">
      <div class="list-tit list-topic">{{orgInfo.name}}</div>
      <div class="list-desc" v-if="orgInfo.industry">{{orgInfo.industry}}</div>
    </div>
  </a>
</template>

<script>
  import { ImageUrl, defaultSet } from '@/libs/util';
  export default {
    props: {
      itemSingle: {
        type: Object
      },
      noBlank: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        urlHref: ''
      };
    },
    computed: {
      orgInfo() {
        var obj = this.itemSingle
        if (obj.hasOrgLogo) {
          obj.logo = ImageUrl(('org/' + obj.id + '.jpg'), true)
        } else {
          obj.logo = defaultSet.img.org
        }
        if (obj.industry) {
          obj.industry = obj.industry.replace(/,/, ' | ')
        }
        return obj
      }
    },
    created() {
      if (this.noBlank) {
        this.urlHref = `h5.html#/org?id=${this.orgInfo.id}`;
      } else {
        this.urlHref = `org.html?id=${this.orgInfo.id}`
      }
    },
    methods: {
    }
  };
</script>
