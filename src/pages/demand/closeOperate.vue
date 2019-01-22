<template>
  <el-dialog :title="showStep ? '关闭需求' : '请选择关闭原因'" class="dialog-box"
    :visible.sync="operDialogVisible" width="420px"
    :close-on-click-modal="false"
    @close="closedDiloag">
    <el-form class="step-01" v-if="showStep" v-loading="stepOneLoading">
      <p class="tip-txt">关闭后，该需求将不能被专家和机构看到。<br />您确定要关闭吗？</p>
      <div class="el-btn-col">
        <div class="el-btn-col-box" align="center">
          <el-button type="primary" @click="closedDiloag">取消</el-button>
          <el-button type="info" @click="nextStep">确定</el-button>
        </div>
      </div>
    </el-form>
    <el-form ref="formTwo" :model="formTwo" class="step-02" v-if="!showStep" v-loading="stepTwoLoading">
      <el-form-item class="con-txt">
        <el-checkbox-group v-model="formTwo.selectReasons" @change="handleCheckedChange">
          <el-checkbox label="1">没有对接合适的专家和机构</el-checkbox>
          <el-checkbox label="2">没有联系上对接的专家和机构</el-checkbox>
          <el-checkbox label="3">已通过其他渠道解决</el-checkbox>
          <el-checkbox label="4">其他：</el-checkbox>
        </el-checkbox-group>
        <el-input v-show="textareaShow" style="margin-bottom: 10px;" type="textarea" :rows="2" placeholder="请填写其他原因" v-model="formTwo.textval"> </el-input>
      </el-form-item>
      <div class="el-btn-col">
        <div class="el-btn-col-box" align="center">
          <el-button type="primary" @click="submitReq">确定</el-button>
          <el-button type="info" @click="closedDiloag">关闭</el-button>
        </div>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        operDialogVisible: false,
        showStep: true,
        stepOneLoading: false,
        stepTwoLoading: false,
        textareaShow: false,
        demandId: '',
        formTwo: {
          selectReasons: [],
          textval: ''
        }     
      }
    },
    methods: {
      openDiag(id) {
        if (id) {
          this.demandId = id
        }
        this.formTwo.selectReasons = []
        this.formTwo.textval = ''
        this.operDialogVisible = true
        this.showStep = true
      },
      nextStep() {
        var that = this
        that.stepOneLoading = true
        this.$axios.post('/ajax/demand/close', {
          id: that.demandId
        }, function(res) {
          that.stepOneLoading = false
          if (res.success && res.data) {
            that.showStep = false
            that.$parent.getdemandInfo()
          } else {
            that.$message.error('关闭需求操作失败，请重试')
          }
        })
      },
      handleCheckedChange(val) {
        if (val.indexOf('1') > -1) {
          this.textareaShow = true
          for (let i = 0; i < val.length; ++i) {
            if (val[i] === '1') {
              val[i] === this.formTwo.textval
            }
          }
        } else {
          this.textareaShow = false
        }
        this.formTwo.selectReasons = val
      },
      submitReq() {
        var that = this
        var selectR = that.formTwo.selectReasons
        var textR = that.formTwo.textval
        if (selectR.indexOf('1') > -1) {
          if (textR === '') {
            that.$message({
              message: '请填写其他关闭原因',
              type: 'warning'
            })
            return
          } else {
            for (let i = 0; i < selectR.length; ++i) {
              if (selectR[i] === '1') {
                selectR[i] = textR
              }
            }
          }
        }
        that.stepTwoLoading = true
        this.$axios.post('/ajax/demand/close/reason', {
          id: that.demandId,
          reason: selectR
        }, function(res) {
          that.stepTwoLoading = false
          if (res.success) {
            that.showStep = false
            that.closedDiloag()
          } else {
            that.$message.error('关闭需求操作失败，请重试')
          }
        })
      },
      closedDiloag() {
        this.operDialogVisible = false
        if (!this.showStep) {
          this.$refs['formTwo'].resetFields()
          this.$refs['formTwo'].clearValidate()
        }
      }
    }
  }
</script>
<style>
.dialog-box .el-dialog__body{
  padding: 10px 20px 20px;
}
.dialog-box .el-button {
  padding: 12px 60px;
}
.dialog-box .tip-txt{
  line-height: 20px;
  font-size: 14px;
  margin-bottom: 20px;
}
.dialog-box .con-txt{
  padding: 2px 10px;
  background: #f1f1f1;
}
.dialog-box .con-txt .el-checkbox-group .el-checkbox{
  width:100%;
}
.dialog-box .con-txt .el-checkbox-group .el-checkbox + .el-checkbox {
  margin-left:0;
}
</style>
