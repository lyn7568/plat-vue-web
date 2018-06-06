<template>
  <div class="demandIssue content-wrapper">
    <el-form :model="ruleFormDem" :rules="rules" ref="ruleFormDem" class="form-main">
      <el-form-item label="需求主题" prop="demandTit">
        <el-input v-model="ruleFormDem.demandTit" placeholder="请用一句话概括您的需求"></el-input>
      </el-form-item>
      <el-form-item label="需求内容" prop="demandDesc">
        <el-input type="textarea" :rows="4" v-model="ruleFormDem.demandDesc" placeholder="请描述您的需求背景、具体问题、对专家的要求等等"></el-input>
      </el-form-item>
      <el-col :span="12">
        <CityPick :widthselect="148" :prov="ruleFormDem.province" :city="ruleFormDem.city" v-on:selectProv="getSelectProv($event)" v-on:selectCity="getSelectCity($event)"></CityPick>
        <!-- <el-form-item label="所在城市" prop="citys">
          <el-cascader
            :options="optionsCity"
            v-model="ruleFormDem.citys"
            class="shortW"
            placeholder="请选择所在的城市">
          </el-cascader>
        </el-form-item> -->
      </el-col>
      <el-col :span="12">
        <el-form-item label="需求有效期" prop="lastDate">
          <el-date-picker
            v-model="ruleFormDem.lastDate"
            type="date" class="shortW"
            format="yyyy-MM-dd"
            placeholder="请选择截止日期"
            :picker-options="pickerOptions0">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="预计合作周期" prop="longTime">
          <el-select v-model="selectLongTime" placeholder="请选择预计合作周期" class="shortW">
            <el-option
              v-for="item in longTime"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              @current-change="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="费用预算" prop="costRange">
          <el-select v-model="selectCostRange" placeholder="请选择预算范围" class="shortW">
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
        <el-form-item label="联系人" prop="linkman">
          <el-input v-model="ruleFormDem.linkman" placeholder="请填写您的姓名" class="shortW"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="您所在的企业名称" prop="orgName">
          <el-input v-model="ruleFormDem.orgName" placeholder="建议填写与营业执照一致的企业名称" class="shortW"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="联系电话" prop="linkTel">
          <el-input v-model="ruleFormDem.linkTel" placeholder="请输入您的手机号码，可用于登录科袖网" class="shortW"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="图形验证码" prop="imgVerifyCode">
          <el-input v-model="ruleFormDem.imgVerifyCode" placeholder="请输入图形验证码" class="shortW code-btn">
          <img slot="append" :src="imgVcUrl" @click="changeImgVc" /></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="短信验证码" prop="msgVerifyCode">
          <el-input v-model="ruleFormDem.msgVerifyCode" placeholder="请输入短信验证码" class="shortW">
            <el-button slot="append" :disabled="phoneCodeBol" @click="getPhoneCode">
              <span v-if="sendMsgDisabled">{{seconds + '秒后获取'}}</span>
              <span v-if="!sendMsgDisabled">获取验证码</span>
            </el-button>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24" ><el-form-item style="height:20px"></el-form-item></el-col>
      <el-col :span="24" >
        <el-form-item style="text-align:center">
          <el-button type="primary" @click="submitForm('ruleFormDem')" style="padding: 12px 50px">立即发布</el-button><br/>
          <el-checkbox checked disabled>我已阅读并同意<a :href="kexiuLink + '/privacy.html'">《科袖用户协议》</a></el-checkbox>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  // import {
  //   provinceAndCityData,
  //   CodeToText
  // } from 'element-china-area-data'; // TextToCode

  import Cookies from 'js-cookie';
  import httpUrl from '@/libs/http';
  import util from '@/libs/util';

  var validPhone = (rule, value, callback) => {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
    if (!value) {
      callback(new Error('请输入你的手机号码'));
    } else if (!reg.test(value)) {
      callback(new Error('请输入正确的手机号码'));
    } else {
      callback();
    };
  };

  export default {
    data() {
      return {
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        kexiuLink: util.ekexiuUrl,
        platSource: '',
        phoneCodeBol: false,
        sendMsgDisabled: false,
        seconds: 60,
        phoneResBack: '',
        imgVcUrl: httpUrl.kxQurey.sign.imgVC,
        // optionsCity: provinceAndCityData,
        selectCostRange: '',
        selectLongTime: '',
        longTime: util.Dictionary.durationTime,
        costRange: util.Dictionary.costRange,
        ruleFormDem: {
          demandTit: '',
          demandDesc: '',
          province: '',
          city: '',
          lastDate: '',
          linkman: '',
          orgName: '',
          linkTel: '',
          imgVerifyCode: '',
          msgVerifyCode: ''
        },
        rules: {
          demandTit: [
            { required: true, message: '请填写需求主题', trigger: 'blur' }
          ],
          demandDesc: [
            { required: true, message: '请填写需求内容', trigger: 'blur' },
            { max: 1000, message: '不得超过1000个字', trigger: 'blur' }
          ],
          province: [
            { required: true, message: '请填写所在省', trigger: 'blur' }
          ],
          city: [
            { required: true, message: '请填写所在城市', trigger: 'blur' }
          ],
          lastDate: [
            { required: true, message: '请选择截止日期', trigger: 'blur' }
          ],
          linkman: [
            { required: true, message: '请填写您的姓名', trigger: 'blur' },
            { max: 10, message: '不得超过10个字', trigger: 'blur' }
          ],
          orgName: [
            { required: true, message: '请填写您所在的企业名称', trigger: 'blur' },
            { max: 50, message: '不得超过50个字', trigger: 'blur' }
          ],
          linkTel: [
            { required: true, validator: validPhone, trigger: 'blur' }
          ],
          imgVerifyCode: [
            { required: true, message: '请输入图形验证码', trigger: 'blur' }
          ],
          msgVerifyCode: [
            { required: true, message: '请输入短信验证码', trigger: 'blur' }
          ]
        }
      };
    },
    created() {
      this.platSource = Cookies.get('platSource');
    },
    methods: {
      getSelectProv(prov) {
        this.ruleFormDem.province = prov;
      },
      getSelectCity(city) {
        this.ruleFormDem.city = city;
      },
      getPhoneCode() {
        if (this.ruleFormDem.linkTel && this.ruleFormDem.imgVerifyCode) {
          this.$axios.get(httpUrl.kxQurey.sign.msgVC, {
            params: {
              phone: this.ruleFormDem.linkTel,
              vcode: this.ruleFormDem.imgVerifyCode
            }
          }).then((res) => {
            if (res.success) {
              console.log(res);
              this.phoneResBack = res.data;
              this.clickMsgVc();
            } else {
              if (res.code === 20001) {
                this.$message.error('图形验证码错误');
                this.changeImgVc();
              };
            };
          });
        } else {
          this.$message({
            message: '请输入手机号和图形验证码',
            type: 'warning'
          });
        }
      },
      clickMsgVc() {
        let me = this;
        me.sendMsgDisabled = true;
        me.phoneCodeBol = true;
        let interval = window.setInterval(function() {
         if ((me.seconds--) <= 0) {
          me.seconds = 60;
          me.sendMsgDisabled = false;
          me.phoneCodeBol = false;
          window.clearInterval(interval);
         }
        }, 1000);
      },
      changeImgVc() {
        this.imgVcUrl = httpUrl.kxQurey.sign.imgVC + '?' + new Date().getTime();
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let paramsData = {
              'title': this.ruleFormDem.demandTit,
              'descp': this.ruleFormDem.demandDesc,
              'province': this.ruleFormDem.province,
              'city': this.ruleFormDem.city,
              'invalidDay': util.dateFormatter(this.ruleFormDem.lastDate, false, true),
              'cost': this.selectCostRange,
              'duration': this.selectLongTime,
              'name': this.ruleFormDem.linkman,
              'orgName': this.ruleFormDem.orgName,
              'contactNum': this.ruleFormDem.linkTel,
              'vc': this.ruleFormDem.msgVerifyCode,
              'state': this.phoneResBack,
              'source': this.platSource
            };
            console.log(paramsData);
            this.$axios.post(httpUrl.hQuery.demand.add, paramsData).then((res) => {
              if (res.success) {
                this.$alert('我们已收到您的需求，马上为您对接合适的专家和专业机构，您可以登录科袖网与对方做进一步沟通。', '需求发布成功！', {
                  confirmButtonText: '进入科袖网，发现更多服务和资源',
                  type: 'success',
                  center: true,
                  cancelButtonText: '取消',
                  callback: action => {
                    if (action === 'confirm') {
                      window.open(util.ekexiuUrl, '科袖网首页');
                    };
                  }
                });
                this.$emit('dialogChanged', false);
              } else {
                this.$message({
                  message: '需求发布失败，请重新发布！',
                  type: 'warning'
                });
              };
              console.log(res);
            }).catch(error => {
              console.log(error);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.demandIssue
  padding-top:10px
  .form-main
    width:100%
    .form-line
      border-top:1px dashed #ccc
      margin-bottom:20px
  .shortW
    width:300px
  .code-btn
    .el-input-group__append
      padding:0
      overflow:hidden
      img
        width:100px
        height:38px
        cursor: pointer
  .el-checkbox__label
    a
      color:#c0c4cc
</style>
