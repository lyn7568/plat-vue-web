<template>
  <div class="demandIssue content-wrapper">
    <div class="login-box content-wrapper" v-show="ifLogin">
      <el-form :model="ruleLogin" :rules="ruleLogins" ref="ruleLogin" class="demo-ruleForm">
        <el-form-item prop="phoneNum">
          <el-input v-model="ruleLogin.phoneNum" placeholder="请输入您的手机号码" class="shortW"></el-input>
        </el-form-item>
        <el-form-item prop="msgVC">
          <el-input v-model="ruleLogin.msgVC" placeholder="请输入短信验证码" class="shortW">
            <el-button slot="append" :disabled="phoneCodeBol" @click="clickMsgVcLogin">
              <span v-if="sendMsgDisabled">{{seconds + '秒后获取'}}</span>
              <span v-if="!sendMsgDisabled">获取短信验证码</span>
            </el-button>
         </el-input>
        </el-form-item>
        <el-form-item></el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="loginKexiu('ruleLogin')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-form v-show="!ifLogin" :model="ruleFormDem" :rules="rules" ref="ruleFormDem" class="form-main">
      <el-form-item label="需求主题" prop="demandTit">
        <el-input v-model="ruleFormDem.demandTit" placeholder="请用一句话概括您的需求"></el-input>
      </el-form-item>
      <el-form-item label="需求内容" prop="demandDesc">
        <el-input type="textarea" :rows="4" v-model="ruleFormDem.demandDesc" placeholder="请描述您的需求背景、具体问题、对专家的要求等等"></el-input>
      </el-form-item>
      <el-col :span="12">
        <CityPick :widthselect="148" :prov="ruleFormDem.province" :city="ruleFormDem.city" v-on:selectProv="getSelectProv($event)" v-on:selectCity="getSelectCity($event)"></CityPick>
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
      <el-col :span="24">
        <div class="link-man">联系人 <span>{{ruleFormDem.linkman}}</span></div>
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
        ifLogin: true,
        kxUserId: '',
        phoneResBackLogin: '',
        phoneCodeBol: false,
        sendMsgDisabled: false,
        seconds: 60,
        kexiuLink: util.ekexiuUrl,
        platSource: '',
        imgVcUrl: httpUrl.kxQurey.sign.imgVC,
        // optionsCity: provinceAndCityData,
        selectCostRange: '',
        selectLongTime: '',
        longTime: util.Dictionary.durationTime,
        costRange: util.Dictionary.costRange,
        ruleLogin: {
          phoneNum: '',
          msgVC: ''
        },
        ruleLogins: {
          phoneNum: [
            { required: true, validator: validPhone, trigger: 'blur' }
          ],
          msgVC: [
            { required: true, message: '请输入短信验证码', trigger: 'blur' }
          ]
        },
        ruleFormDem: {
          demandTit: '',
          demandDesc: '',
          lastDate: '',
          linkman: '',
          orgName: '',
          linkTel: '',
          province: '',
          city: ''
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
      // 短信验证登录科袖
      loginKexiu(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let paramsData = {
              'mobilePhone': this.ruleLogin.phoneNum,
              'validateCode': this.ruleLogin.msgVC,
              'state': this.phoneResBackLogin
            };
            this.$axios.post(httpUrl.kxQurey.sign.msgLogin, paramsData).then((res) => {
              if (res.success) {
                this.kxUserId = res.data.id; // 获取登录用户id
                this.ruleFormDem.linkTel = res.data.mobilePhone;
                this.getUserInfo(res.data.id);
                this.$alert('成功登录科袖网', '提示', {
                  confirmButtonText: '确定',
                  type: 'success',
                  center: true,
                  callback: action => {
                    this.ifLogin = false;
                  }
                });
              };
            });
          }
        });
      },
      userRegisterOk() {
        this.$axios.get(httpUrl.kxQurey.sign.isReg + '?key=' + this.ruleLogin.phoneNum, {
        }).then((res) => {
          if (res.success) {
            if (res.data === true) {
              this.$message({
                message: '该账号不存在，请检查后重试',
                type: 'warning'
              });
            };
            console.log(res);
          };
        });
      },
      getPhoneLogin() {
        this.$axios.get(httpUrl.kxQurey.sign.msgLoginVc, {
          params: {
            mobilePhone: this.ruleLogin.phoneNum
          }
        }).then((res) => {
          if (res.success) {
            console.log(res);
            this.phoneResBackLogin = res.data;
          };
        });
      },
      clickMsgVcLogin() {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (!this.ruleLogin.phoneNum) {
          this.$message({
            message: '请输入你的手机号码',
            type: 'warning'
          });
        } else if (!reg.test(this.ruleLogin.phoneNum)) {
          this.$message({
            message: '请输入正确的手机号码',
            type: 'warning'
          });
        } else {
          this.userRegisterOk();
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
          this.getPhoneLogin();
        };
      },
      // 短信验证登录科袖
      // 获取科袖账户信息
      getUserInfo(id) {
        this.$axios.get(httpUrl.kxQurey.professor.info + id, {

        }).then((res) => {
          if (res.success) {
            let $info = res.data;
            this.ruleFormDem.linkman = $info.name;
            this.ruleFormDem.orgName = $info.orgName;
          }
        });
      },
      // 获取科袖账户信息
      // 发布需求
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
              'orgName': this.ruleFormDem.orgName,
              'contactNum': this.ruleFormDem.linkTel,
              'creator': this.kxUserId,
              'source': this.platSource
            };
            this.$axios.post(httpUrl.kxQurey.demand.add, paramsData).then((res) => {
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
                this.$emit('dialogChangedLogin', false);
              } else {
                this.$message({
                  message: '需求发布失败，请重新发布！',
                  type: 'warning'
                });
              };
              console.log(res);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
    // 发布需求
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
  .link-man
    margin-bottom:10px
    span
      margin-left:15px
</style>
