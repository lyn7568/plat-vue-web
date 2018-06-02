<template>
  <ul>
    <li class="list-item" v-for="(item, index) in dataList" :key="index" @click="kexiuExpert(item.id)">
      <div class="list-head" :style="{ backgroundImage: 'url('+ imageDis(item)+')'}"></div>
      <div class="list-info">
        <div class="list-tit list-tig">
          {{(item.forShort) ? item.forShort : item.name}}
          <em class="authicon icon-com" v-bind:class="{ active: (item.authStatus == 3)}"></em>
          {{keyValue}}
        </div>
        <ul class="list-tag">
          <li>{{(item.orgType == 2) ? '上市企业' : ''}}</li>
          <li>{{(item.industry) ? item.industry.split(',').join(' | ') : '' }}</li>
        </ul>
      </div>
      <div class="dele" v-show="(flag == 1)">
        <el-button type="danger" icon="el-icon-delete" circle @click.stop="delet(item.id)"></el-button>
      </div>
    </li>
    <defaultPage v-show="ifDefault"></defaultPage>
    <div class="taglist" v-show="!ifDefault">
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="10" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </ul>
</template>

<script type="text/ecmascript-6">
  import Cookies from 'js-cookie';
  import httpUrl from '@/libs/http';
  import util from '@/libs/util';
  export default {
    props: ['keyValue', 'url', 'flag'],
    data() {
      return {
        ifDefault: false,
        expertParameters: {},
        dataList: [],
        total: 0,
        orgDefaultImage: util.defaultSet.img.org,
        orgImageAddId: util.ImageUrl('org/', true),
        platId: ''
      };
    },
    watch: {
      keyValue: function () {
        this.expertParameters.key = this.keyValue;
        this.expertList();
      }
    },
    created() {
      this.platId = Cookies.get('platId');
      this.expertParameters = {
        pid: this.platId,
        pageSize: 10,
        pageNo: 1
      };
      if (this.flag === 1) {
        this.expertParameters.key = this.keyValue;
      }
      this.expertList();
    },
    methods: {
      imageDis: function (item) {
        return (item.hasOrgLogo) ? this.orgImageAddId + item.id + '.jpg' : this.orgDefaultImage;
      },
      expertList() {
        this.dataList = [];
        this.$axios.get(util.ekexiuUrl + this.url, {
          params: this.expertParameters
        }).then((res) => {
          if (res.success) {
            this.dataList = res.data.data;
            if (res.data.data.length === 0) {
              this.ifDefault = true;
            } else {
              this.ifDefault = false;
            }
            this.total = res.data.total;
          }
        });
      },
      kexiuExpert(id) {
        window.open(util.defaultSet.link.org + id);
      },
      handleCurrentChange(val) {
        this.expertParameters.pageNo = val;
        this.expertList();
      },
      delet(id, index) {
        this.$axios.post(httpUrl.hQuery.residentOrgs.del, {
              pid: this.platId,
              oid: id
          }).then((res) => {
            if (res.success) {
              this.dataList.splice(index, 1);
            }
          });
        }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  ul
    .list-tag
      cursor: pointer
</style>
