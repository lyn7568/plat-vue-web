<template>
  <div class="browse-main">
    <div class="block-wrapper">
      <div class="wrapper-left left-main">
        <div class="content-wrapper">
          <div class="inner-wrapper">
            <div class="headcon-box detail-box">
              <div class="show-info">
                <div class="info-tit info-tit-big">{{demandInfo.title}}</div>
                <div class="info-operate">
                    <span>需求方：{{demandInfo.linkOrg}}</span>
                    <span>当前状态：{{stateShow}}</span>
                    <span>发布时间：{{TimeTr(demandInfo.createTime)}}</span>
                    <span v-if="demandInfo.state===2">完成时间：{{TimeTr(demandInfo.overTime)}}</span>
                    <span v-if="demandInfo.state===3">关闭时间：{{TimeTr(demandInfo.closeTime)}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="inner-wrapper">
            <div class="content">
              <el-row :gutter="10" class="rel-detail">
                <el-col :span="24" v-html="demandInfo.descp" style="margin-bottom: 10px"></el-col>
                <el-col :span="6" v-if="demandInfo.city">
                  所在城市：{{cityRange[demandInfo.city]}}
                </el-col>
                <el-col :span="6" v-if="demandInfo.duration">
                  预计周期：{{longTime[demandInfo.duration]}}
                </el-col>
                <el-col :span="6" v-if="demandInfo.cost">
                  费用预算：{{costRange[demandInfo.cost]}}
                </el-col>
                <el-col :span="6" v-if="demandInfo.invalidDay">
                  有效期至：{{TimeTr(demandInfo.invalidDay)}}
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="inner-wrapper" v-if="cooperateExperts && cooperateExperts.length>0">
            <div class="content-title">
              <span>合作方</span>
            </div>
            <div>
              <div class="con-item" v-for="item in cooperateExperts" :key="item.index">
                <baseExpert v-if="item.owner" :itemSingle="item.owner"></baseExpert>
                <div class="dele">
                  <contactChat :cantactOptions="{pid: item.uid}"></contactChat>
                  <collectCo :watchOptions="{oid: item.uid, type: 1}"></collectCo>
                </div>
              </div>
            </div>
          </div>
          <div class="inner-wrapper">
            <el-collapse v-model="collapseName" v-if="demandButtExperts && demandButtExperts.length>0">
              <el-collapse-item :title="`已为您对接${buttCount}位专家`" name="1">
                <div class="con-item" v-for="item in demandButtExperts" :key="item.index">
                  <baseExpert v-if="item.owner" :itemSingle="item.owner"></baseExpert>
                  <div class="dele">
                    <contactChat :cantactOptions="{pid: item.uid}"></contactChat>
                    <collectCo :watchOptions="{oid: item.uid, type: 1}"></collectCo>
                  </div>
                  <div class="leavemsg">
                    <div>留言：{{item.descp}}</div>
                    <span>{{item.assTime}}</span>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
            <div v-else class="content-title">正在为您对接专家...</div>
          </div>
          <div class="inner-wrapper" v-if="buttonShow">
            <div class="btn-need">
              <el-button type="primary" :disabled="completeDisable" @click="completeOper">需求已完成</el-button>
              <el-button type="info" class="close-btn" @click="closeOper">关闭该需求</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <completeOperate ref="operateComplete"></completeOperate>
    <closeOperate ref="operateClose"></closeOperate>
    <BackTop></BackTop>
  </div>
</template>

<script>
  import { urlParse, commenTime, TimeTr } from '@/libs/util'
  import queryDict from '@/libs/queryDict'
  import queryBase from '@/libs/queryBase'

  import baseExpert from '@/components/subTemplate/BaseExpert'
  import contactChat from '@/components/ContactChat'
  import collectCo from '@/components/CollectCo'

  import completeOperate from './completeOperate'
  import closeOperate from './closeOperate'
  export default {
    data() {
      return {
        collapseName: ['1'],
        completeDisable: false,
        demandInfo: '',
        demandId: '',
        TimeTr: TimeTr,
        costRange: [],
        longTime: [],
        cityRange: [],
        demandButtExperts: '',
        cooperateExperts: '',
        buttCount: 0
      };
    },
    created() {
      this.getDictoryData()
      this.demandId = urlParse('id')
      if (this.demandId) {
        this.getdemandInfo()
        this.buttExpert()
        this.cooperateExpert()
        this.rebackCount()
      }
    },
    computed: {
      stateShow() {
        let state = this.demandInfo.state
        let curTime = this.curTime
        let msg = '发布中'
        if (state === 1) {
          msg = '发布中'
          if (curTime > this.demandInfo.invalidDay) {
            msg = '已过期'
          }
        } else if (state === 2) {
          msg = '已完成'
        } else if (state === 3) {
          msg = '已关闭'
        }
        return msg
      },
      buttonShow() {
        let state = this.demandInfo.state
        return state === 1
      }
    },
    components: {
      baseExpert,
      collectCo,
      contactChat,
      completeOperate,
      closeOperate
    },
    methods: {
      getDictoryData() {
        const that = this
        queryDict.applyDict('XZQH', function(dictData) {
          dictData.map(item => {
            that.cityRange[item.code] = item.caption
          })
        }) // 城市
        queryDict.applyDict('FYYS', function(dictData) {
          dictData.map(item => {
            that.costRange[item.code] = item.caption
          })
        }) // 费用预算
        queryDict.applyDict('HZZQ', function(dictData) {
          dictData.map(item => {
            that.longTime[item.code] = item.caption
          })
        }) // 合作周期
      },
      getdemandInfo() {
        this.$axios.get('/ajax/demand/qo', {
          id: this.demandId
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            this.demandInfo = $info;
          };
        });
      },
      completeOper() {
        this.$refs.operateComplete.openDiag(this.demandId)
      },
      closeOper() {
        this.$refs.operateClose.openDiag(this.demandId)
      },
      buttExpert() {
        var that = this
        this.$axios.get('/ajax/demand/pro', {
          id: this.demandId
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            for (let i = 0; i < $info.length; ++i) {
              if ($info[i].assTime){
                $info[i].assTime = commenTime($info[i].assTime)
              }
              (function(item) {
                queryBase.getProfessor(item.uid, function(sc, value) {
                  if (sc) {
                    item.owner = value
                    that.$forceUpdate()
                  }
                })
              })($info[i])
            }
            this.demandButtExperts = $info;
          }
        })
      },
      rebackCount() {
        var that = this
        this.$axios.get('/ajax/demand/pro/count', {
          id: that.demandId
        }, function(res) {
          if (res.success) {
            if (res.data > 0) {
              that.buttCount = res.data
            } else {
              that.completeDisable = true
            }
          }
        })
      },
      cooperateExpert() {
        var that = this
        this.$axios.get('/ajax/demand/pro', {
          id: that.demandId,
          actived: 1
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            var arr = []
            for (let i = 0; i < $info.length; ++i) {
              queryBase.getProfessor($info[i].uid, function(sc, value) {
                if (sc) {
                  $info[i].owner = value
                  that.$forceUpdate()
                }
              })
            }
            that.cooperateExperts = $info
          }
        })
      },
    }
  };
</script>

<style lang="scss">
.browse-main .block-wrapper .left-main .inner-wrapper{
  .detail-box{
    .info-operate{
      font-size: 14px;
      justify-content: space-between;
    }
  }
  .con-item{
    position:relative;
    cursor: pointer;
    border: 1px solid #eaeaea;
    margin-bottom: 10px;
    .list-item{
      border: none;
      &::after{
        content: none;
      }
      .list-head{
        @include center-items(60px,60px);
        border-radius: 50%;
      }
    }
    .dele{
      position: absolute;
      display: flex;
      right: 10px;
      z-index: 20;
      top: 30px;
    }
    .leavemsg{
      width: 100%;
      box-sizing: border-box;
      font-size: 14px;
      background: #eaeaea;
      padding: 8px 10px;
      position: relative;
      div {
        padding-right: 170px;
      }
      span{
        position: absolute;
        right: 10px;
        top: 8px;
        z-index: 2;
      }
    }
  }
  .btn-need {
    position:relative;
    padding: 20px;
    text-align: center;
    .el-button{
      padding:12px 60px;
    }
    .close-btn{
      position: absolute;
      right: 0;
      padding:12px 20px;
      top: 20px;
    }
  }
  .el-collapse{
    border:none;
  }
  .el-collapse-item__header{
    font-size: 16px;
    line-height: 30px;
    font-weight: bold;
    color: #303133;
    border:none;
  }
  .el-collapse-item__wrap{
    border: none;
  }
}
</style>
