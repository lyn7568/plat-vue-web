<template>
  <div class="newsmMain">
    <div class="newsRight">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <div class="search-wrapper" align="right">
          <el-button type="primary" icon="el-icon-edit" @click="handerAdd">发布需求</el-button>
        </div>
        <el-tab-pane v-for="item in navbarArray" :key="item.index" :label="item.text" :name="item.suoIndex" v-loading="loadingPane">
          <div class="con-box" v-if="demandList && demandList.length && item.suoIndex===activeName">
            <div class="con-item" v-for="dem in demandList" :key="dem.index">
              <baseDemand :itemSingle="dem"></baseDemand>
              <div class="dele">
                <el-button v-if="dem.state===1&&overdueShow(dem.invalidDay)" type="primary" size="mini" @click.stop="handerDelay(dem.id)">延期</el-button>
                <el-button v-if="dem.state===1" type="primary" size="mini" @click.stop="handerUpdate(dem.id)">修改</el-button>
                <el-button v-if="dem.state===2||dem.state===3" type="danger" size="mini" @click.stop="handerDel(dem.id)">删除</el-button>
              </div>
            </div>
            <div class="pagination-container">
              <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page.sync="pageNo"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
          </div>
          <defaultPage v-else></defaultPage>
        </el-tab-pane>
      </el-tabs>
    </div>
    <demandIssue ref="demandIssue" :operateM="operateM"></demandIssue>
    <delayDate ref="demandDelay"></delayDate>
    <BackTop></BackTop>
  </div>
</template>
<script>
  import { delayDay } from '@/libs/util';
  import { loginStatus } from '@/libs/loginStatus';
  import baseDemand from './BaseDemand';
  import demandIssue from './DemandIssue';
  import delayDate from './delayDate';
  export default {
    data() {
      return {
        activeName: '0',
        navbarArray: [
          {
            suoIndex: '0',
            text: '所有需求',
            wtype: '',
            order: 'createTime'
          }, {
            suoIndex: '1',
            text: '发布中',
            wtype: '1',
            order: 'createTime'
          }, {
            suoIndex: '2',
            text: '已过期',
            wtype: '',
            order: ''
          }, {
            suoIndex: '3',
            text: '已完成',
            wtype: '2',
            order: 'overTime'
          }, {
            suoIndex: '4',
            text: '已关闭',
            wtype: '3',
            order: 'closeTime'
          }
        ],
        pageSize: 10,
        pageNo: 1,
        total: 0,
        operateM: {},
        demandList: [],
        ifDefault: false,
        loadingPane: false,
        curTime: (new Date()).toISOString().substring(0,10).replace(/-/g, '')
      };
    },
    components: {
      baseDemand,
      demandIssue,
      delayDate
    },
    created() {
      this.queryDeamadList();
    },
    methods: {
      overdueShow(day) {
        return delayDay(day) || this.curDate < day
      },
      handleClick() {
        this.pageNo = 1
        this.total = 0
        this.demandList = []
        this.queryDeamadList();
      },
      queryDeamadList() {
        var that = this
        that.loadingPane = true
        var nav = that.navbarArray[that.activeName]
        if (that.activeName === '2') {
          that.$axios.get('/ajax/demand/pq/expired', {
            invalidDay: that.curTime,
            state: 1,
            actived: 1,
            pageSize: that.pageSize,
            pageNo: that.pageNo
          }, function(res) {
            that.loadingPane = false
            if (res.success && res.data) {
              const obj = res.data.data
              if (obj.length > 0) {
                that.total = res.data.total
                that.demandList = obj
              } else {
                that.loadingPane = false
                that.ifDefault = true;
              }
            }
          })
        } else {
          that.$axios.get('/ajax/demand/pq', {
            invalidDay: nav.wtype === '1' ? that.curTime : '',
            order: nav.order,
            state: nav.wtype,
            actived: 1,
            pageSize: that.pageSize,
            pageNo: that.pageNo
          }, function(res) {
            that.loadingPane = false
            if (res.success) {
              const obj = res.data.data
              if (obj.length > 0) {
                that.total = res.data.total
                that.demandList = obj
              } else {
                that.loadingPane = false
                that.ifDefault = true;
              }
            }
          })
        }
      },
      handleCurrentChange(val) {
        this.pageNo = val
        this.queryDeamadList()
      },
      handerAdd() {
        this.operateM = { tit: '发布需求' }
        this.$refs.demandIssue.parentFun()
      },
      handerDelay(id) {
        this.$refs.demandDelay.parentFun(id)
      },
      handerUpdate(id) {
        this.operateM = { tit: '修改需求' }
        this.$refs.demandIssue.parentFun(id)
      },
      handerDel(id) {
        var that = this
        this.$cofirm('删除后，该需求将不能恢复，您确定要删除吗？', '删除需求', {
          type: 'warning'
        }).then(() => {
          that.$axios.post('/ajax/demand/delete', {
            id: id
          }).then((res) => {
            if (res.success) {
              that.handleClick()
            }
          });
        }).catch(() => {});
      }
    }
  };
</script>
<style>
  .con-item{
    position:relative;
    cursor: pointer;
  }
  .con-item:hover{
    background: #EEEEEE;
  }
  .con-item:hover .dele{
    display: block;
  }
  .con-item .dele{
    display: none;
    position: absolute;
    right: 10px;
    z-index: 20;
    top: 40%;
  }
  .con-item .colorRed{
    color: #F56C6C
  }
</style>
