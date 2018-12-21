<template>
  <div class="login">
    <div class="logo-wrapper"></div>
    <div class="form-wrapper">
      <div class="form-contain">
        <p class="form-title">登录</p>
        <ul class='table-panel'>
          <li class="table-panel-single tablePanelActive">密码登录</li>
          <li class="table-panel-single"><a href="#/inviteCodeLogin">邀请码登录</a></li>
        </ul>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item prop="pw">
            <el-input type="password" v-model="ruleForm.pw" placeholder="请输入登录密码" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item></el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="isDisabl" :loading="logining" @click="submitForm('ruleForm')">登录</el-button>
            <el-button type="text" @click="goBackPwd">忘记密码？</el-button>
            <span class='existing-account registerButton'>还没有账号<a href="#/register">立即注册</a></span>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import httpUrl from '@/libs/http';
  export default {
     data() {
      return {
        logining: false,
        isDisabl: false,
        ruleForm: {
          phone: '',
          pw: ''
        },
        rules: {
          mail: [
            { required: true, message: '请输入邮箱账号', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
          ],
          pass: [
            { required: true, message: '请输入登录密码', trigger: 'blur' },
            { min: 6, max: 24, message: '密码由6-24个字符组成，区分大小写', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.logining = true;
            let paramsData = {
              'email': this.ruleForm.mail,
              'pw': this.ruleForm.pass
            };
            this.$axios.post(httpUrl.hQuery.sign.login, paramsData).then(res => {
              this.logining = false;
              console.log(res);
              if (res.success) {
                this.$router.push({path: '/WorkHome'});
              } else {
                let errorCode = [{
                  code: -600001,
                  msg: '用户不存在'
                }, {
                  code: -600002,
                  msg: '密码不正确'
                }, {
                  code: -600003,
                  msg: '平台信息不存在'
                }, {
                  code: -600004,
                  msg: '用户被禁用'
                }];
                for (let i = 0; i < errorCode.length; i++) {
                  if (res.code === errorCode[i].code) {
                    this.$message.error(errorCode[i].msg);
                    return;
                  };
                };
              }
            }).catch(error => {
              console.log(error);
            });
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
  @import './style.scss';
</style>
