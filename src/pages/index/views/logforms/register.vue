<template>
  <div class="login">
    <router-link to="home" class="logo-wrapper"></router-link>
    <div class="form-wrapper">
      <div class="form-contain">
        <p class="form-title">注册</p>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item prop="pw">
            <el-input type="password" v-model="ruleForm.pw" placeholder="请输入登录密码" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="vc">
            <el-input v-model="ruleForm.vc" placeholder="请输入短信验证码" class='codeWidth'></el-input>
            <el-button type="primary" class='codeWidth codeButton' :disabled='isDisabled' @click="buttonCheck">{{buttonMsg}}</el-button>
          </el-form-item>
          <el-form-item>
            <i class="el-icon-check successSelect"></i><span class="protocol">我已阅读并同意<a href='#/userAgreement'>《邢台科技条件平台用户协议》</a></span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="isDisabl" :loading="logining" @click="submitForm('ruleForm')">注册</el-button>
            <div class='existing-account'>已有账号<a href="#/loginPlat">立即登录</a></div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <Captcha ref="obj" :phone="ruleForm.phone" v-on:touchSetin="touchSetin"></Captcha>
  </div>
</template>

<script type="text/ecmascript-6">
  import Captcha from './Captcha.vue';
  export default {
     data() {
      let validatePhone = (rule, value, callback) => {
        const pattern = /^1[34578]\d{9}$/;
        if (value === '') {
          this.phoneFlag = false;
          callback(new Error('请输入您的手机号码'));
        } else {
          if (!pattern.test(value)) {
            this.phoneFlag = false;
            callback(new Error('请输入正确的手机号码'));
          } else {
            let phone = this.ruleForm.phone;
            this.$axios.get('/ajax/sys/user/exists', { phone }, response => {
              if (response.success && response.data) {
                this.phoneFlag = false;
                callback(new Error('该账号已存在，请直接登录'))
              } else {
                this.phoneFlag = true;
                callback();
              }
            });
          }
        }
      };
      let validatePw = (rule, value, callback) => {
        const reg = /^[a-zA-Z0-9]{6,24}$/
        if (value === '') {
          callback(new Error('请设置您的登录密码'));
        } else {
          if (!reg.test(value)) {
            callback(new Error('密码由6-24个数字和字母组成，区分大小写'));
          } else {
            callback();
          }
        }
      }
      return {
        logining: false,
        isDisabl: false,
        isDisabled: false,
        buttonMsg: '获取短信验证码',
        phoneFlag: false,
        ruleForm: {
          phone: '',
          vc: '',
          pw: ''
        },
        rules: {
          phone: [
            { required: true, validator: validatePhone, trigger: 'blur' }
          ],
          pw: [
            { required: true, validator: validatePw, trigger: 'blur' }
          ],
          vc: [
            { required: true, message: '请输入验证码' }
          ]
        }
      };
    },
    components: {
      Captcha
    },
    methods: {
      touchSetin() {
        this.setInt(60)
      },
      setInt(num) {
        this.isDisabled = true;
        let timer = setInterval(() => {
          this.buttonMsg = `重新获取(${num--}秒)`
          if (num === 0) {
            this.isDisabled = false;
            this.buttonMsg = '获取短信验证码'
            clearInterval(timer);
          }
        }, 1000);
      },
      buttonCheck() {
        this.$refs.ruleForm.validateField('phone')
        if (this.phoneFlag) {
          this.$refs.obj.capShow();
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.logining = true;
            this.$axios.post('/ajax/sys/registe', this.ruleForm, res => {
              this.logining = false;
              if (res.success) {
                this.$store.commit('SET_ACCOUNT', res.data.account);
                this.$store.commit('SET_USERID', res.data.id);
                this.$store.commit('SET_HEADPHOTO', '');
                localStorage.setItem('userid', res.data.id)
                this.$router.push({name: 'home'});
              } else {
                const errorCode = {
                  '-60001': '验证码已过期，请重新获取',
                  '-60002': '验证码错误，请重新输入',
                  '-60003': '该账号已存在，请直接登录'
                };
                this.$message.error(errorCode[res.code]);
              }
            })
          } else {
            return false;
          }
        });
      },
      goBackPwd() {
        this.$router.push({path: '/findPwd'});
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import './style';
</style>
