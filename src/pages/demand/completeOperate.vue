<template>
  <el-dialog :title="showStep ? '确认完成' : '需求完成'" class="dialog-box"
    :visible.sync="operDialogVisible" width="420px"
    :close-on-click-modal="false"
    @close="closedDiloag">
    <el-form ref="formOne" :model="formOne" :rules="formOneRules" class="step-01" v-if="showStep" v-loading="stepOneLoading">
      <p class="tip-txt">请选择最终合作方，可多选：</p>
      <el-form-item class="con-txt" v-if="demandButtExperts && demandButtExperts.length>0">
        <el-checkbox-group v-model="formOne.selectExperts" :min="1" @change="handleCheckedChange">
          <el-checkbox v-for="item in demandButtExperts" :key="item.index" :label="item.id">{{item.name + (item.orgName ? '，'+item.orgName : '')}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <div class="el-btn-col">
        <div class="el-btn-col-box" align="center">
          <el-button type="primary" @click="nextStep">确定</el-button>
          <el-button type="info" @click="closedDiloag">取消</el-button>
        </div>
      </div>
    </el-form>
    <el-form ref="formTwo" :model="formTwo" :rules="formTwoRules" class="step-02" v-if="!showStep" v-loading="stepTwoLoading">
      <p class="tip-txt">很荣幸解决了您的需求，希望您可以对我们的工作提出意见或建议：</p>
      <el-form-item>
        <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="formTwo.textval"> </el-input>
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
        formOne: {
          selectExperts: []
        },
        formOneRules: {
          selectExperts: [{ required: true, message: '至少选择一个合作方', trigger: 'blur'}]
        },
        formTwo: {
          textval: []
        },
        formTwoRules: {
          textval: [{ required: true, message: '请填写意见或建议', trigger: 'blur'}]
        },
        demandButtExperts: []       
      }
    },
    methods: {
      openDiag(id) {
        if (id) {
          this.demandId = id
          this.buttExpert()
        }
        this.formOne.selectExperts = []
        this.formTwo.textval = ''
        this.operDialogVisible = true
        this.showStep = true
      },
      buttExpert() {
        var that = this
        this.$axios.get('/ajax/demand/pro', {
          id: that.demandId,
          actived: 0
        }, (res) => {
          if (res.success) {
            var $info = res.data;
            var arr = []
            for (let i = 0; i < $info.length; ++i) {
              arr.push($info[i].uid)
            }
            if (arr.length) {
              that.$axios.getk('/ajax/professor/qm', {
                id: arr
              }, function(data) {
                if (data.success && data.data) {
                  if (data.data.length > 0) {
                    that.demandButtExperts = data.data
                  }
                }
              })
            }
          }
        })
      },
      nextStep() {
        var that = this
        this.$refs['formOne'].validate((valid) => {
          if (valid) {
            that.stepOneLoading = true
            this.$axios.post('/ajax/demand/confirm', {
              id: that.demandId,
              uid: that.formOne.selectExperts
            }, function(res) {
              that.stepOneLoading = false
              if (res.success) {
                that.showStep = false
                that.$parent.cooperateExpert()
                that.$parent.getdemandInfo()
              }
            })
          } else {
            return false;
          }
        })
      },
      handleCheckedChange(val) {
        this.formOne.selectExperts = val
      },
      submitReq() {
        var that = this
        this.$refs['formTwo'].validate((valid) => {
          if (valid) {
            that.stepTwoLoading = true
            that.$axios.post('/ajax/feedback', {
              target: that.demandId,
              type: 1,
              cnt: that.formTwo.textval
            }, function(res) {
              that.stepTwoLoading = false
              if (res.success) {
                that.showStep = false
                that.operDialogVisible = false
              }
            })
          } else {
            return false;
          }
        })
      },
      closedDiloag() {
        if (!this.showStep) {
          this.$refs['formTwo'].resetFields();
          this.$refs['formTwo'].resetFields();
        } else {
          this.$refs['formOne'].resetFields();
          this.$refs['formOne'].resetFields(); 
        }
        this.operDialogVisible = false
        this.$parent.getdemandInfo()
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
  margin-bottom: 10px;
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
