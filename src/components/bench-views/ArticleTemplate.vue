<template>
  <div class="searchList">
    <ul>
      <li class="list-item" v-for="(item, index) in dataList" :key="index" @click="kexiuExpert(item.articleId)">
        <div class="list-head" :style="{ backgroundImage: 'url('+ imageDis+')'}" ></div>
        <div class="list-info">
          <div class="list-tit">{{item.articleTitle}}</div>
          <ul class="list-tag" v-if="flag!=1">
            <li>{{item.company}}</li>
            <li>发布于 {{timeChage(item)}}</li>
            <li>阅读量 {{item.pageViews}}</li>
            <li>赞 {{item.articleAgree}}</li>
            <li>留言 {{item.leverNumber}}</li>
          </ul>
          <ul class="list-tag" v-if="(flag==1) && (item.status==1)">
            <li>发布于</li>
            <li>阅读量 {{item.pageViews}}</li>
            <li>赞 {{item.articleAgree}}</li>
            <li>留言 {{item.leverNumber}}</li>
          </ul>
          <ul class="list-tag" v-if="(flag==1) && (item.status==2)">
            <li v-show="item.status">修改于{{timeChage(item)}}</li>
            <li class="coRed">草稿</li>
            <li class="coRed">将在 定时发布</li>
          </ul>
          <ul class="list-tag" v-if="(flag==1) && (item.status==0)">
            <li v-show="item.status">修改于</li>
            <li class="coRed">草稿</li>
          </ul>
        </div>
        <div class="dele" v-if="flag === 1">
          <el-button type="primary" size="small" v-if="(item.status == 0 || item.status == 2)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" circle  @click="dele(item.articleId,index)></el-button>
        </div>
        <div class="dele" v-else-if="flag === 2">
          <el-button type="danger" icon="el-icon-delete" circle @click="dele(item.articleId,index)"></el-button>
        </div>
        <div class="dele" v-else-if="flag === 2">
          <el-button type="primary" size="small" @click.once="add(item.articleId)">{{addText}}</el-button>
        </div>
      </li>
    </ul>
    <div class="taglist">
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="10" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Cookies from 'js-cookie';
  import httpUrl from '@/libs/http';
  import util from '@/libs/util';
  export default {
    props: ['keyValue', 'url', 'flag'],
    data() {
      return {
        expertParameters: {},
        dataList: [],
        total: 0,
        orgDefaultImage: util.defaultSet.img.article,
        orgImageAddId: util.ImageUrl('article/', true),
        platId: '',
        addText: '添加'
      };
    },
    watch: {
      keyValue: function () {
        this.expertParameters.key = this.keyValue;
        this.expertList();
      }
    },
    computed: {
      imageDis: function (item) {
        return (item.hasOrgLogo) ? this.orgImageAddId + item.articleImg  : this.orgDefaultImage;
      }
    },
    created() {
      this.platId = Cookies.get('platId');
      this.expertParameters = {
        key: this.keyValue,
        pageSize: 10,
        pageNo: 1
      };
      if (this.flag === 1) {
        this.expertParameters.ownerId = this.platId;
        this.expertParameters.articleType = 3;
      } else {
        this.expertParameters.pid = this.platId;
      }
      this.expertList();
    },
    methods: {
      timeChage(item) {
        var nowTimg = new Date();
        var startTime = (item.status !== 1) ? item.modifyTime : item.publishTime;
          if (item.status == 2) {
            startTime = item.publishTime;
          }
          if (nowTimg.getFullYear() === startTime.substring(0, 4)) {
            return startTime.substring(4, 6).replace(/\b(0+)/gi, '') + '月' + startTime.substring(6, 8).replace(/\b(0+)/gi, '') + '日 ' + startTime.substring(8, 10) + ':' + startTime.substring(10, 12);
          } else {
            return startTime.substring(0, 4) + "年" + startTime.substring(4, 6).replace(/\b(0+)/gi, '') + '月' + startTime.substring(6, 8).replace(/\b(0+)/gi, '') + '日 ' + startTime.substring(8, 10) + ':' + startTime.substring(10, 12);
          }
      },
      expertList() {
        this.dataList = [];
        this.$axios.get(util.ekexiuUrl + this.url, {
          params: this.expertParameters
        }).then((res) => {
          if (res.success) {
            this.dataList = [];
            this.dataList = res.data.data;
            this.total = res.data.total;
            for (let i=0 ; i< res.data.data.length; i++) {
              if (this.flag !== 1) {
                this.leaveWordTotal(res.data.data[i]);
                this.companyName(res.data.data[i]);
              } else {
                if (res.data.data[i].status === 1) {
                  this.leaveWordTotal(res.data.data[i]);
                }
              }
            }
          }
        });
      },
      leaveWordTotal($data) {
         this.$axios.get(util.ekexiuUrl + '/ajax/leavemsg/count', {
          params: {
            sid: $data.articleId,
            stype: 1
          }
        }).then((res) => {
          if (res.success) {
            $data.leverNumber = res.data;
            this.$forceUpdate();
          }
        });
      },
      companyName($data) {
          this.$axios.get(util.ekexiuUrl + '/ajax/org/' + $data.ownerId, {
            }).then((res) => {
            if (res.success) {
              $data.company = (res.data.forShort) ? res.data.forShort : res.data.name;
              this.$forceUpdate();
            }
         });
      },
      kexiuExpert(id) {
        window.open(util.defaultSet.link.article + id);
      },
      handleCurrentChange(val) {
        this.expertParameters.pageNo = val;
        this.expertList();
      },
      dele(id, index) {
        this.$axios.post(httpUrl.hQuery.orgTrends.del, {
            params: {
              pid: this.platId,
              aid: id
            }
          }).then((res) => {
            if (res.success) {
              this.dataList.splice(index, 1);
            }
          });
      },
      add(id) {
        this.$axios.post(httpUrl.hQuery.orgTrends.add, {
            params: {
              pid: this.platId,
              aid: id
            }
          }).then((res) => {
            if (res.success) {
              this.addText = '已添加';
            }
          });
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/listitem';
    .list-item
      cursor: pointer
      &:hover
        background: #EEEEEE
      &:hover .dele
        display: block
      .dele
        display: none
        position: absolute
        right: 10px
    .coRed
      color: red
</style>
