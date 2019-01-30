<template>
  <div class="login">
    <router-link to="home" class="logo-wrapper"></router-link>
    <div class="form-wrapper">
      <div class="form-contain">
        <p class="form-title">登录</p>
        <ul class='table-panel'>
          <li class="table-panel-single tablePanelActive">密码登录</li>
          <li class="table-panel-single"><el-button type="text" @click="inviteCodeLogin">邀请码登录</el-button></li>
        </ul>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item prop="pw">
            <el-input type="password" v-model="ruleForm.pw" placeholder="请输入登录密码" auto-complete="off" @keydown.native="submitForm('ruleForm')"></el-input>
          </el-form-item>
          <el-form-item></el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="isDisabl" :loading="logining" @click="submitForm('ruleForm')">登录</el-button>
            <el-button type="text" @click="goBackPwd">忘记密码？</el-button>
            <span class='existing-account registerButton'>还没有账号<el-button type="text" @click="register">立即注册</el-button></span>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      let validatePhone = (rule, value, callback) => {
        const pattern = /^1[34578]\d{9}$/;
        if (value === '') {
          callback(new Error('请输入您的手机号码'));
        } else {
          if (!pattern.test(value)) {
            callback(new Error('请输入正确的手机号码'));
          } else {
            let phone = this.ruleForm.phone;
            this.$axios.get('/ajax/sys/user/exists', { phone }, response => {
              if (response.success && response.data) {
                callback();
              } else {
                callback(new Error('该账号不存在，请先注册'))
              }
            });
          }
        }
      };
      let validatePw = (rule, value, callback) => {
        const reg = /^[a-zA-Z0-9]{6,24}$/
        if (value === '') {
          callback(new Error('请输入您的登录密码'));
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
        ruleForm: {
          phone: '',
          pw: ''
        },
        rules: {
          phone: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
          pw: [
            { required: true, validator: validatePw, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.logining = true;
            // this.$axios.post('/ajax/sys/login', this.ruleForm, res => {
            this.$store.dispatch('LoginByAccount', this.ruleForm).then(res => {
              this.logining = false;
              if (res.success) {
                if (res.data == null) {
                  this.$message.error('登录账号与密码不匹配');
                } else {
                  this.$router.push({name: 'home'});
                  this.logining = true;
                }
              } else {
                let errorCode = {
                  '-60001': '该账号不存在，请先注册',
                  '-60002': '登录账号与密码不匹配',
                  '-60003': '该账号状态异常，请联系客服'
                }
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
      },
      register() {
        this.$router.push({path: '/register'});
      },
      inviteCodeLogin() {
        this.$router.push({path: '/inviteCodeLogin'});
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import './style.scss';
</style>
