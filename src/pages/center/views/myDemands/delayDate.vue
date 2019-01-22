<template>
  <el-dialog title="请设置需求有效期" :visible.sync="delayDialogVisible"
  :close-on-click-modal="false"
  @close="closedDiloag" width="420px">
    <div class="demandIssue content-wrapper">
      <el-date-picker style="margin-bottom:40px"
        v-model="invalidDay"
        type="date"
        format="yyyy-MM-dd"
        value-format="yyyyMMdd"
        :editable="false"
        placeholder="请选择截止日期"
        :picker-options="pickerOptions0">
      </el-date-picker>
      <div class="el-btn-col">
        <div class="el-btn-col-box" align="center">
          <el-button type="primary" @click="submitReq">确定</el-button>
          <el-button type="info" @click="closedDiloag">关闭</el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    data() {
      return {
        delayDialogVisible: false,
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        invalidDay: ''
      };
    },
    created() {
    },
    methods: {
      parentFun(id) {
        var that = this
        if (id) {
          this.demandId = id
        }
        setTimeout(function() {
          that.delayDialogVisible = true
        }, 0)
      },
      submitReq() {
        var that = this
        if (!that.invalidDay) {
          that.$message({
            message: '需求有效期不能为空',
            type: 'warning'
          })
          return
        }
        that.$axios.post('/ajax/demand/delay', {
          id: that.demandId,
          day: that.invalidDay
        }, function(res) {
          if (res.success) {
            that.$message({
              message: '需求有效期设置成功',
              type: 'success'
            })
            setTimeout(function() {
              that.delayDialogVisible = false
              that.$parent.handleClick()
            }, 0)
          }
        })
      },
      closedDiloag() {
        this.delayDialogVisible = false
      }
    }
  }
</script>
<style scoped>
.el-form-item__content {
    line-height: 40px;
    position: relative;
    font-size: 14px;
}
.demandIssue{
  padding: 10px;
}
</style>
