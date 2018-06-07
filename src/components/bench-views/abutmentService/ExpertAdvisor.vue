<template>
  <ul>
    <li class="list-item" v-for="(item,index) in dataList" :key="index" @click="kexiuExpert(item.id)">
      <div class="list-head header" :style="{ backgroundImage: 'url('+ item.image +')'}"></div>
      <div class="list-info">
        <div class="list-tit list-tig">{{item.name}} <em class="authicon" :class='item.className'></em></div>
        <ul class="list-tag" v-if="item.offt">
          <li>{{item.offt}}</li>
        </ul>
        <ul class="list-tag headerTag" v-if="item.reserachs">
          <li>研究方向：{{item.reserachs}}</li>
        </ul>
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
    data() {
      return {
        expertParameters: {},
        dataList: [],
        total: 0,
        ifDefault: false
      };
    },
    created() {
      const platId = Cookies.get('plf_user');
      this.expertParameters = {
        pid: platId,
        pageSize: 10,
        pageNo: 1
      };
      this.expertList();
    },
    mounted() {

    },
    methods: {
      expertList() {
        this.dataList = [];
        this.$axios.get(httpUrl.hQuery.buttedProfessors.pq, {
          params: this.expertParameters
        }).then((res) => {
          if (res.success) {
            if (res.data.data.length === 0) {
              this.ifDefault = true;
            } else {
              this.ifDefault = false;
            }
            this.disposeData(res.data.data);
            this.total = res.data.total;
          }
        });
      },
      disposeData($data) {
        this.dataList = $data;
        for (let i = 0; i < $data.length; i++) {
          if ($data[i].title) {
            if ($data[i].orgName) {
              $data[i].offt = $data[i].title + '，' + $data[i].orgName;
            } else {
              $data[i].offt = $data[i].title;
            }
          } else {
            if ($data[i].office) {
              if ($data[i].orgName) {
                $data[i].offt = $data[i].office + '，' + $data[i].orgName;
              } else {
                $data[i].offt = $data[i].office;
              }
            } else {
              $data[i].offt = '';
            }
          }
          $data[i].className = util.autho($data[i].authType, $data[i].orgAuth, $data[i].authStatus);
          if ($data[i].hasHeadImage) {
            $data[i].image = util.ImageUrl('head/' + $data[i].id + '_l.jpg', true);
          } else {
            $data[i].image = util.defaultSet.img.expert;
          }
          this.$axios.get(httpUrl.utilUrl + '/researchArea/' + $data[i].id).then(res => {
            const $info = res.data;
            let arr = [];
            for (let j = 0; j < $info.length; j++) {
              arr.push($info[j].caption);
              if (j === $info.length - 1) {
                $data[i].reserachs = arr.join('，');
                this.$forceUpdate();
              }
            }
            if ($info.lenth === 0) {
              $data[i].reserachs = '';
            }
          });
        }
      },
      kexiuExpert(id) {
        window.open(util.defaultSet.link.expert + id);
      },
      handleCurrentChange(val) {
        this.expertParameters.pageNo = val;
        this.expertList();
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
ul
  .list-item
    cursor: pointer
    .header
      width: 80px
      height: 80px
      border-radius: 50%
    .list-info
      .list-tig
        height: 30px
      .headerTag
        margin-top: 0px
</style>
