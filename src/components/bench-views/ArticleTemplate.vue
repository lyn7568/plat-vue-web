<template>
  <div class="searchList">
    <ul>
      <li class="list-item" v-for="(item, index) in dataList" :key="index" @click="kexiuExpert(item)">
        <div class="list-head" :style="{ backgroundImage: 'url('+ imageDis(item)+')'}" ></div>
        <div class="list-info">
          <div class="list-tit">{{item.articleTitle}}</div>
          <ul class="list-tag" v-if="flag!=1">
            <li>{{item.company}}</li>
            <li>发布于 {{comTime(item.publishTime)}}</li>
            <li>阅读量 {{item.pageViews}}</li>
            <li>赞 {{item.articleAgree}}</li>
            <li>留言 {{item.leverNumber}}</li>
          </ul>
          <ul class="list-tag" v-if="(flag==1) && (item.status==1)">
            <li>发布于 {{comTime(item.publishTime)}}</li>
            <li>阅读量 {{item.pageViews}}</li>
            <li>赞 {{item.articleAgree}}</li>
            <li>留言 {{item.leverNumber}}</li>
          </ul>
          <ul class="list-tag" v-if="(flag==1) && (item.status==2)">
            <li v-show="item.status">修改于{{comTime(item.modifyTime)}}</li>
            <li class="coRed">草稿</li>
            <li class="coRed">将在 {{comTime(item.modifyTime)}}定时发布</li>
          </ul>
          <ul class="list-tag" v-if="(flag==1) && (item.status==0)">
            <li v-show="item.status">修改于{{comTime(item.modifyTime)}}</li>
            <li class="coRed">草稿</li>
          </ul>
        </div>
        <div class="dele" v-if='flag === 1'>
          <el-button type="primary" size="small" v-if="(item.status == 0 || item.status == 2)" @click.stop="revise(item)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" circle  @click.stop="delet1(item.articleId, index)"></el-button>
        </div>
        <div class="dele" v-else-if='flag === 2'>
          <el-button type="danger" icon="el-icon-delete" circle @click.stop="delet(item.articleId, index)"></el-button>
        </div>
        <div class="dele" v-else-if='flag === 3'>
          <el-button type="primary" size="small" @click.stop="add(item)">{{item.addText}}</el-button>
        </div>
      </li>
    </ul>
    <defaultPage v-show="ifDefault"></defaultPage>
    <div class="taglist" v-show="!ifDefault">
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
    props: ['keyValue', 'url', 'flag', 'addA', 'Delele'],
    data() {
      return {
        expertParameters: {},
        dataList: [],
        total: 0,
        orgDefaultImage: util.defaultSet.img.article,
        orgImageAddId: util.ImageUrl('article/'),
        platId: '',
        addText: '添加',
        ifDefault: false
      };
    },
    watch: {
      keyValue: function () {
        this.expertParameters.key = this.keyValue;
        this.expertList();
      },
      addA: function () {
        this.expertList();
      },
      Delele: function () {
        this.expertList();
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
        this.expertParameters.status = [0, 1, 2];
      } else {
        this.expertParameters.pid = this.platId;
      }
      this.expertList();
    },
    methods: {
      revise(item) {
        this.$router.push({path: '/PublishArticle?arId=' + item.articleId});
      },
      imageDis: function (item) {
        return (item.articleImg) ? this.orgImageAddId + item.articleImg : this.orgDefaultImage;
      },
      comTime: util.dateChange,
      expertList() {
        this.$axios.get(httpUrl.utilUrl + this.url, {
          params: this.expertParameters
        }).then((res) => {
          if (res.success) {
            this.dataList = res.data.data;
            this.total = res.data.total;
            if (res.data.data.length === 0) {
              this.ifDefault = true;
            }
            for (let i = 0; i < res.data.data.length; i++) {
              res.data.data[i].addText = this.addText;
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
         this.$axios.get(httpUrl.utilUrl + '/leavemsg/count', {
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
          this.$axios.get(httpUrl.utilUrl + '/org/' + $data.ownerId, {
            }).then((res) => {
            if (res.success) {
              $data.company = (res.data.forShort) ? res.data.forShort : res.data.name;
              this.$forceUpdate();
            }
         });
      },
      kexiuExpert(item) {
        if (item.status === '0' || item.status === '2') {
          this.$router.push({path: '/PublishArticle?arId=' + item.articleId});
        } else {
          window.open(util.defaultSet.link.article + item.articleId);
        }
      },
      handleCurrentChange(val) {
        this.expertParameters.pageNo = val;
        this.expertList();
      },
      delet(id, index) {
        this.$alert('确认删除该文章', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
          callback: action => {
            if (action === 'confirm') {
              this.$axios.post(httpUrl.hQuery.orgTrends.del, {
                  pid: this.platId,
                  aid: id
                }).then((res) => {
                  if (res.success) {
                    this.dataList.splice(index, 1);
                    this.$emit('isLogFn', '2');
                  }
              });
            };
          }
        });
      },
      delet1(id, index) {
        this.$alert('确认删除该文章', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
          callback: action => {
            if (action === 'confirm') {
              this.$axios.post(httpUrl.kxQurey.article.del, {
                articleId: id
              }).then((res) => {
                if (res.success) {
                  this.dataList.splice(index, 1);
                }
              });
            }
          }
        });
      },
      add(item) {
        this.$axios.post(httpUrl.hQuery.orgTrends.add, {
              pid: this.platId,
              aid: item.articleId
          }).then((res) => {
            if (res.success) {
              item.addText = '已添加';
              this.$forceUpdate();
              this.$emit('isLogFn', '1');
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
