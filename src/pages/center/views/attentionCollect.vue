<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane v-for="item in navbarArray" :key="item.index" :label="item.text" :name="item.wtype" v-loading="loadingPane">
      <div v-if="watchList && watchList.length">
        <div class="con-item" v-if="item.wtype===activeName && activeName==='1'">
          <baseExpert v-for="watc in watchList" :key="watc.index" :itemSingle="watc"></baseExpert>
          <div class="dele">
            <el-button type="danger" size="mini" @click.stop="handerDel(watc)">移除</el-button>
          </div>
        </div>
        <div class="con-item" v-if="item.wtype===activeName && activeName==='2'">
          <baseOrg v-for="watc in watchList" :key="watc.index" :itemSingle="watc"></baseOrg>
          <div class="dele">
            <el-button type="danger" size="mini" @click.stop="handerDel(watc)">移除</el-button>
          </div>
        </div>
        <div class="con-item" v-if="item.wtype===activeName && activeName==='3'">
          <baseService v-for="watc in watchList" :key="watc.index" :itemSingle="watc"></baseService>
          <div class="dele">
            <el-button type="danger" size="mini" @click.stop="handerDel(watc)">移除</el-button>
          </div>
        </div>
        <div class="con-item" v-if="item.wtype===activeName && activeName==='4'">
          <baseResource v-for="watc in watchList" :key="watc.index" :itemSingle="watc"></baseResource>
          <div class="dele">
            <el-button type="danger" size="mini" @click.stop="handerDel(watc)">移除</el-button>
          </div>
        </div>
        <div class="con-item" v-if="item.wtype===activeName && activeName==='5'">
          <baseResult v-for="watc in watchList" :key="watc.index" :itemSingle="watc"></baseResult>
          <div class="dele">
            <el-button type="danger" size="mini" @click.stop="handerDel(watc)">移除</el-button>
          </div>
        </div>
      </div>
      <defaultPage v-else></defaultPage>
      <div class="pagination-container" v-if="watchList && watchList.length">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="pageNo"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import { loginStatus } from '@/libs/loginStatus';
  import baseExpert from '@/components/subTemplate/BaseExpert';
  import baseOrg from '@/components/subTemplate/BaseOrg';
  import baseService from '@/components/subTemplate/BaseService';
  import baseResource from '@/components/subTemplate/BaseResource';
  import baseResult from '@/components/subTemplate/BaseResult';
  export default {
    data() {
      return {
        activeName: '1',
        navbarArray: [
          {
            text: '专家',
            wtype: '1',
            url: '/ajax/professor/qm'
          }, {
            text: '机构',
            wtype: '2',
            url: '/ajax/org/qm'
          }, {
            text: '服务',
            wtype: '3',
            url: '/ajax/ware/qm'
          }, {
            text: '资源',
            wtype: '4',
            url: '/ajax/resource/qm'
          }, {
            text: '专利',
            wtype: '5',
            url: '/ajax/ppatent/qm'
          }
        ],
        pageSize: 10,
        pageNo: 1,
        total: 0,
        watchList: [],
        ifDefault: false,
        loadingPane: false
      };
    },
    components: {
      baseExpert,
      baseOrg,
      baseService,
      baseResource,
      baseResult
    },
    created() {
      this.queryWatchList();
    },
    methods: {
      handleClick() {
        this.pageNo = 1
        this.total = 0
        this.watchList = []
        this.queryWatchList();
      },
      queryWatchList() {
        var that = this
        that.loadingPane = true
        loginStatus(function () {
          that.$axios.get('/ajax/collection/pq', {
            type: that.activeName,
            pageSize: that.pageSize,
            pageNo: that.pageNo
          }, function(res) {
            if (res.success && res.data) {
              var arr = []
              const $info = res.data.data
              if ($info.length > 0) {
                var hdata = { num: 1, data: $info }
                for (let i in $info) {
                  hdata.num++
                  arr[i] = $info[i].oid;
                  hdata.num--
                }
                hdata.num--
                that.total = res.data.total
                if (hdata.num === 0 && arr.length > 0) {
                  that.$axios.getk(that.navbarArray[that.activeName - 1].url, {
                    id: arr
                  }, function(data) {
                    that.loadingPane = false
                    if (data.success && data.data) {
                      if (data.data.length > 0) {
                        that.watchList = data.data
                        that.$forceUpdate()
                      }
                    }
                  })
                }
              } else {
                that.loadingPane = false
                that.ifDefault = true;
              }
            }
          })
        })
      },
      handleCurrentChange(val) {
        this.pageNo = val
        this.queryWatchList()
      },
      handerDel(watc) {
        var that = this;
        var Id = ''
        switch (that.activeName) {
          case '1':
           Id = watc.professorId
           break
          case '2':
           Id = watc.orgId
           break
          case '3':
           Id = watc.id
           break
          case '4':
           Id = watc.resourceId
           break
          case '5':
           Id = watc.id
           break
        }
        loginStatus(function () {
          that.$axios.post('/ajax/collection/delete', {
            oid: Id,
            type: that.activeName
          }, function(res) {
            if (res.success) {
              if (res.data) {
                that.handleClick()
                that.$message({
                  message: `已移除`,
                  type: 'success'
                })
              }
            }
          })
        })
      }
    }
  };
</script>
<style scoped>
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
</style>
