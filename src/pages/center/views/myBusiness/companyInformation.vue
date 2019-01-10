<template>
  <div>
    <el-tabs>
      <el-tab-pane label="企业信息"></el-tab-pane>
    </el-tabs>
    <div class="content-container">
      <div class="main-info">
        <el-form :model="formObj" :rules="rulesObj" ref="formObj" label-width="86px" class="update-wrapper demo-ruleForm" v-loading="formLoading">
          <el-row :gutter="25">
            <el-col :span="17">
              <el-row :gutter="20" class="update-main">
                <el-col :span="24">
                  <el-form-item label="企业名称" prop="name">{{formObj.name}}</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="创立年份" prop="foundYear">
                    <el-date-picker
                      :editable="false"
                      v-model="formObj.foundYear"
                      type="year"
                      value-format="yyyy"
                      placeholder="请选择企业的创立年份">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="官方网址" prop="url">
                    <el-input v-model="formObj.url" placeholder="如: www.ekexiu.xom"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="企业规模" prop="size">
                    <el-select v-model="formObj.size" placeholder="请选择员工数量范围">
                      <el-option
                        v-for="item in numRanger"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        @current-change="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="企业类型" prop="type">
                    <el-select v-model="formObj.type" placeholder="请选择最符合的一项">
                      <el-option
                        v-for="item in compType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        @current-change="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="所在城市" prop="addr">
                    <cityPicker @paren="toshow" :addrCode="formObj.addr"></cityPicker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="企业邮编" prop="zipCode">
                    <el-input v-model="formObj.zipCode" placeholder="请填写企业邮编" maxlength="20"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="企业地址" prop="location">
                    <el-input v-model="formObj.location" placeholder="请填写企业详细地址" maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系人" prop="linkman">
                    <el-input v-model="formObj.linkman" placeholder="请填写企业联系人" maxlength="10"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12"><el-form-item class="space-form-item"></el-form-item></el-col>
                <el-col :span="12">
                  <el-form-item label="联系电话" prop="linkphone">
                    <el-input v-model="formObj.linkphone" placeholder="请填写办公电话" maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系邮箱" prop="linkemail">
                    <el-input v-model="formObj.linkemail" placeholder="请填写联系邮箱" maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="客服电话" prop="servicePhone">
                    <el-input v-model="formObj.servicePhone" placeholder="请填写客服电话" maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12"><el-form-item class="space-form-item"></el-form-item></el-col>
                <el-col :span="12">
                  <el-form-item label="工作时间" prop="operateTime">
                    <el-input v-model="formObj.operateTime" placeholder="请填写客服工作时间" maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="客服邮箱" prop="serviceEmail">
                    <el-input v-model="formObj.serviceEmail" placeholder="请填写客服邮箱" maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="所属行业">
                    <dynamicTags :tagInfo="tagIndustry" :dyStr="keywordObj[1]" v-on:turnTags="turnIndustryTags($event)" ref="tagComponent"></dynamicTags>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="专注领域">
                    <dynamicTags :tagInfo="tagSubject" :dyStr="keywordObj[2]" v-on:turnTags="turnSubjectTags($event)"></dynamicTags>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="企业简介" prop="descp">
                    <el-input type="textarea" :rows="8" v-model="formObj.descp" placeholder="请填写一个简单的介绍，让大家更好地了解您的企业" maxlength="5000"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="企业资质">
                    <dynamicTags :tagInfo="tagProve" :dyStr="keywordObj[3]" v-on:turnTags="turnProveTags($event)"></dynamicTags>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="供应商领域">
                    <dynamicTags :tagInfo="tagSubjectG" :dyStr="keywordObj[4]" v-on:turnTags="turnSubjectGTags($event)"></dynamicTags>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="客户领域">
                    <dynamicTags :tagInfo="tagSubjectC" :dyStr="keywordObj[5]" v-on:turnTags="turnSubjectCTags($event)"></dynamicTags>
                  </el-form-item>
                </el-col>
                <el-col :span="24" class="el-btn-col">
                  <el-form-item class="el-btn-col-box">
                    <el-button type="primary" @click="submitForm('formObj')">保存修改</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="7">
              <uploadFile :upImgsStr="formObj.logo" :uploadImg="uploadImg" @uploadfun="uploadfun"></uploadFile>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <BackTop></BackTop>
  </div>
</template>

<script>
  import queryDict from '@/libs/queryDict'

  import cityPicker from '@/components/CityPicker'
  import uploadFile from '@/components/uploadFile'
  import dynamicTags from '@/components/DynamicTags'

  export default {
    data() {
      var checkInterNum = (rule, value, callback) => {
        const reg = /^[0-9]*$/
        if (!value && !reg.test(value)) {
            return callback(new Error('请输入正确邮编'))
        } else {
            callback()
        }
      }
      return {
        companyId: '',
        numRanger: [],
        compType: [],
        keywordObj: {},
        formLoading: false,
        rulesObj: {
          name: [{ required: true, message: '请输入企业全部名称', trigger: 'blur' }],
          descp: [{ required: true, message: '请输入企业简介', trigger: 'blur' }],
          linkman: [{ required: true, message: '请输入企业联系人', trigger: 'blur' }],
          linkphone: [{ required: true, message: '请输入企业联系电话', trigger: 'blur' }],
          linkemail: [
            { required: true, message: '请输入企业联系邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
          ],
          serviceEmail: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }],
          zipCode: [{ validator: checkInterNum, trigger: 'blur' }]
        },
        formObj: {
          name: '',
          logo: '',
          type: '',
          size: '',
          foundYear: '',
          descp: '',
          url: '',
          addr: '',
          location: '',
          zipCode: '',
          servicePhone: '',
          serviceEmail: '',
          operateTime: '',
          linkman: '',
          linkphone: '',
          linkemail: '',
          industry: [],
          subject: [],
          qualification: [],
          fieldOfSupplier: [],
          fieldOfCustomer: []
        },
        tagIndustry: {
          lableTit: '所属行业',
          placeholder: '请填写企业所属的行业，如：制造业、互联网、服务业',
          limitCount: 15,
          tagsNum: 3
        },
        tagSubject: {
          lableTit: '专注领域',
          placeholder: '请填写企业专注的领域，如：腐蚀防护、石墨烯、纳米材料',
          limitCount: 15,
          tagsNum: 20
        },
        tagProve: {
          lableTit: '企业资质',
          placeholder: '请填写企业获得的资质，如：ISO9000认证、高新技术企业认证',
          limitCount: 50,
          tagsNum: 5,
          tagblock: true
        },
        tagSubjectG: {
          lableTit: '供应商领域',
          placeholder: '请填写企业上游所涉及的领域',
          limitCount: 15,
          tagsNum: 10
        },
        tagSubjectC: {
          lableTit: '客户领域',
          placeholder: '请填写企业下游所涉及的领域',
          limitCount: 15,
          tagsNum: 5
        },
        uploadImg: {
          url: '/ajax/company/logo',
          tip: '上传企业LOGO',
          width: '200px',
          height: '140px'
        }
      }
    },
    components: {
      dynamicTags,
      cityPicker,
      uploadFile
    },
    computed: {
      ...Vuex.mapGetters([
        'bindCompany'
      ])
    },
    created() {
      this.getDictoryData()
      if (this.bindCompany) {
        this.companyId = this.bindCompany
        this.formLoading = true
        this.getCompanyInfo()
        this.getCompanyKeyword()
      }
    },
    methods: {
      getDictoryData() {
        const that = this
        queryDict.applyDict('QYGM', function(dictData) {
          dictData.map(item => {
            that.numRanger.push({ value: item.code, label: item.caption })
          })
        }) // 企业规模
        queryDict.applyDict('QYLX', function(dictData) {
          dictData.map(item => {
            that.compType.push({ value: item.code, label: item.caption })
          })
        }) // 企业类型
      },
      getCompanyInfo() {
        var that = this
        that.$axios.get('/ajax/company/qo', {
          id: that.companyId
        }, function(res) {
          that.formLoading = false
          if (res.success) {
            const obj = res.data
            that.formObj = obj
          }
        })
      },
      getCompanyKeyword() {
        var that = this
        that.$axios.get('/ajax/company/qo/keyword', {
          id: that.companyId
        }, function(res) {
          if (res.success && res.data) {
            const str = res.data
            var objKey = {}
            if (str.length > 0) {
              str.map(item => {
                if (!objKey[item.type]) {
                  objKey[item.type] = []
                  objKey[item.type].push(item.value)
                } else {
                  objKey[item.type].push(item.value)
                }
              })
              // console.log(objKey)
            }
            that.keywordObj = objKey
            that.formObj.industry = objKey[1]
            that.formObj.subject = objKey[2]
            that.formObj.qualification = objKey[3]
            that.formObj.fieldOfSupplier = objKey[4]
            that.formObj.fieldOfCustomer = objKey[5]
          }
        })
      },
      submitForm(formName) {
        var that = this
        that.$refs[formName].validate((valid) => {
          if (valid) {
            const form = that.formObj
            const paramsData = {
              id: that.companyId,
              name: form.name,
              logo: form.logo,
              type: form.type,
              size: form.size,
              foundYear: form.foundYear,
              descp: form.descp,
              url: form.url,
              addr: form.addr,
              location: form.location,
              zipCode: form.zipCode,
              servicePhone: form.servicePhone,
              serviceEmail: form.serviceEmail,
              operateTime: form.operateTime,
              linkman: form.linkman,
              linkphone: form.linkphone,
              linkemail: form.linkemail,
              industry: JSON.stringify(form.industry),
              subject: JSON.stringify(form.subject),
              qualification: JSON.stringify(form.qualification),
              fieldOfSupplier: JSON.stringify(form.fieldOfSupplier),
              fieldOfCustomer: JSON.stringify(form.fieldOfCustomer)
            }
            that.$axios.put('/ajax/company/update', paramsData, function(res) {
            if (res.success) {
                that.$message({
                message: '企业信息修改成功',
                type: 'success'
                })
            }
            })
          } else {
            return false
          }
        })
      },
      turnIndustryTags(msg) {
        this.formObj.industry = msg
      },
      turnSubjectTags(msg) {
        this.formObj.subject = msg
      },
      turnProveTags(msg) {
        this.formObj.qualification = msg
      },
      turnSubjectGTags(msg) {
        this.formObj.fieldOfSupplier = msg
      },
      turnSubjectCTags(msg) {
        this.formObj.fieldOfCustomer = msg
      },
      uploadfun(value) {
        this.formObj.logo = value
      },
      toshow(value) {
        this.formObj.addr = value
      }
    }
  }
</script>
<style>
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
  }
</style>
