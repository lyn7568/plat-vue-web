<template>
  <el-dialog :title="operateM.tit" :visible.sync="dialogFormVisible" width="700px" :close-on-click-modal="false" @close="closeDialog">
    <div class="tip-show" v-if="!demandId">
      <div class="tip-h2">1. 发布需求  →  2. 为您对接专家或机构  →  3. 在线沟通  →  4. 开展合作，解决您的需求</div>
    </div>
    <div class="demandIssue content-wrapper">
      <el-form :model="ruleFormDem" :rules="rules" ref="ruleFormDem" class="form-main">
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="需求主题" prop="title">
              <el-input v-model="ruleFormDem.title" maxlength="50" placeholder="请用一句话概括您的需求"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="需求内容" prop="descp">
              <el-input type="textarea" :rows="4" v-model="ruleFormDem.descp" maxlength="1000" placeholder="请描述您的需求背景、具体问题、对专家的要求等等"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所在城市" prop="city">
              <el-col :span="24">
                <cityPicker @paren="toshow" @parenStr="toshowStr" :addrCode="ruleFormDem.city"></cityPicker>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="需求有效期" prop="invalidDay">
              <el-date-picker
                v-model="ruleFormDem.invalidDay"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyyMMdd"
                :default-value="defaultDate"
                :editable="false"
                placeholder="请选择截止日期"
                :picker-options="pickerOptions0">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预计合作周期" prop="duration">
              <el-select v-model="ruleFormDem.duration" placeholder="请选择预计合作周期" @change="changeDuration">
                <el-option
                  v-for="item in longTime"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="费用预算" prop="cost">
              <el-select v-model="ruleFormDem.cost" placeholder="请选择预算范围" @change="changeCost">
                <el-option
                  v-for="item in costRange"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24"><div class="form-line"></div></el-col>
          <el-col :span="12">
            <el-form-item label="需求方名称" prop="linkOrg">
              <el-input v-model="ruleFormDem.linkOrg" placeholder="建议填写您的企业名称" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="linkPhone">
              <el-input v-model="ruleFormDem.linkPhone" placeholder="请输入您的联系电话" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" ><el-form-item style="height:20px"></el-form-item></el-col>
          <el-col :span="24" >
            <el-form-item align="center">
              <el-button type="primary" @click="submitForm('ruleFormDem')" style="padding: 12px 50px">保存</el-button><br/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
  import queryDict from '@/libs/queryDict'
  import cityPicker from '@/components/CityPicker'

  export default {
    props: ['operateM'],
    data() {
      var delayValidate = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择截止日期'))
        } else {
          let curDate = (new Date()).toISOString().substring(0, 10).replace(/-/g, '')
          if (curDate > value) {
            callback(new Error('已过期，请重新选择'))
          } else {
            callback()
          }
        }
      }
      return {
        dialogFormVisible: false,
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now()
          }
        },
        defaultDate: Date.now(),
        demandId: '',
        longTime: [],
        costRange: [],
        cityRange: [],
        ruleFormDem: {
          title: '',
          descp: '',
          city: '',
          invalidDay: '',
          linkPhone: '',
          linkOrg: '',
          cost: '',
          duration: '',
          cityStr: '',
          costStr: '',
          durationStr: ''
        },
        rules: {
          title: [
            { required: true, message: '请填写需求主题', trigger: 'blur' }
          ],
          descp: [
            { required: true, message: '请填写需求内容', trigger: 'blur' },
            { max: 1000, message: '不得超过1000个字', trigger: 'blur' }
          ],
          city: [
            { required: true, message: '请选择所在城市', trigger: 'blur' }
          ],
          invalidDay: [
            { required: true, validator: delayValidate, trigger: 'blur' }
          ],
          linkOrg: [
            { required: true, message: '请填写您所在的企业名称', trigger: 'blur' },
            { max: 50, message: '不得超过50个字', trigger: 'blur' }
          ],
          linkPhone: [
            { required: true, message: '请填写您的联系电话', trigger: 'blur' }
          ]
        }
      };
    },
    components: {
      cityPicker
    },
    created() {
      this.getDictoryData()
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
            that.costRange.push({ value: item.code, label: item.caption })
          })
        }) // 费用预算
        queryDict.applyDict('HZZQ', function(dictData) {
          dictData.map(item => {
            that.longTime.push({ value: item.code, label: item.caption })
          })
        }) // 合作周期
      },
      parentFun(id) {
        var that = this
        if (id) {
          this.demandId = id
          this.getDemandInfo()
        } else {
          this.ruleFormDem = {}
          const curphone = localStorage.getItem('curphone')
          const curcomp = localStorage.getItem('curcomp')
          this.ruleFormDem.linkPhone = (curphone && curphone !== 'undefined') ? curphone : ''
          this.ruleFormDem.linkOrg = (curcomp && curcomp !== 'undefined') ? curcomp : ''
        }
        setTimeout(function() {
          that.dialogFormVisible = true
        }, 0)
      },
      getDemandInfo() {
        var that = this
        that.$axios.get('/ajax/demand/qo', {
          id: that.demandId
        }, function(res) {
          if (res.success) {
            const obj = res.data
            if (obj.cost) {
              let costMM = that.costRange.find((item)=>{
                return item.value === obj.cost
              })
              obj.costStr = costMM.label
            }
            if (obj.duration) {
              let durationMM = that.longTime.find((item)=>{
                return item.value === obj.duration
              })
              obj.durationStr = durationMM.label
            }
            if (obj.city) {
              obj.cityStr = that.cityRange[obj.city]
            }
            that.ruleFormDem = obj
          }
        })
      },
      submitForm(formName) {
        var that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var obj = this.ruleFormDem
            let paramsData = {
              title: obj.title,
              descp: obj.descp,
              city: obj.city,
              invalidDay: obj.invalidDay,
              linkPhone: obj.linkPhone,
              linkOrg: obj.linkOrg,
              cost: obj.cost,
              duration: obj.duration,
              cityStr: obj.cityStr,
              costStr: obj.costStr,
              durationStr: obj.durationStr
            }
            if (that.demandId) {
              const paramsId = { id: that.demandId }
              const objPar = Object.assign(paramsId, paramsData)
              that.$axios.put('/ajax/demand/modify', objPar, function(res) {
                if (res.success) {
                  that.$message({
                    message: '修改成功',
                    type: 'success'
                  })
                  setTimeout(function() {
                    that.dialogFormVisible = false
                    if (!that.operateM.flag) {
                      that.$parent.handleClick()
                    }
                  }, 0)
                }
              })
            } else {
              that.$axios.post('/ajax/demand/publish', paramsData, function(res) {
                if (res.success) {
                  that.$alert('我们已收到您的需求，马上为您对接专家和机构，您可以在【我的需求】中查看。', '需求发布成功！', {
                    type: 'success',
                    center: true,
                    callback: action => {
                      if (action === 'confirm') {
                        setTimeout(function() {
                          that.dialogFormVisible = false
                          if (!that.operateM.flag) {
                            that.$parent.handleClick()
                            that.closeDialog()
                          }
                        }, 0)
                      }
                    }
                  })
                }
              })
            }
          } else {
            return false
          }
        })
      },
      changeDuration(val) {
        let obj = {}
        obj = this.longTime.find((item)=>{
          return item.value === val
        })
        this.ruleFormDem.durationStr = obj.label
      },
      changeCost(val) {
        let obj = {}
        obj = this.costRange.find((item)=>{
          return item.value === val
        })
        this.ruleFormDem.costStr = obj.label
      },
      toshow(value) {
        this.ruleFormDem.city = value
      },
      toshowStr(value) {
        this.ruleFormDem.cityStr = value
      },
      closeDialog() {
        this.dialogFormVisible = false
        this.$refs['ruleFormDem'].resetFields()
        this.$refs['ruleFormDem'].clearValidate()
      }
    }
  };
</script>
<style scoped>
.tip-show {
    background: #409eff;
    text-align: center;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin: -30px -20px 10px;
    padding: 20px;
    color: #fff;
}
.cityParent {
    position: relative;
    z-index: 2;
}
.el-form-item__content {
    line-height: 40px;
    position: relative;
    font-size: 14px;
}
.demandIssue{
  padding: 10px;
}
.demandIssue .form-main{
  width:100%
}
.demandIssue .form-main .form-line{
  border-top:1px dashed #ccc;
  margin-bottom:20px;
}
.demandIssue .el-select{
  width:100%;
}
</style>
