<template>
  <div class="login">
    <div class="logo-wrapper"></div>
    <div class="form-wrapper">
      <div class="form-contain">
        <p class="form-title">北京科袖科技有限公司</p>
        <p class="form-title">欢迎入驻平台</p>
        <p class="promptText">请先绑定手机并设置密码</p>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input type="password" v-model="ruleForm.pass" placeholder="请输入登录密码" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="mail">
            <el-input v-model="ruleForm.mail" placeholder="请输入短信验证码" class='codeWidth'></el-input>
            <el-button type="primary" class='codeWidth codeButton'>获取短信验证码</el-button>
          </el-form-item>
          <el-form-item>
            <i class="el-icon-check successSelect"></i><span class="protocol">我已阅读并同意<a href='#/userAgreement'>《邢台科技条件平台用户协议》</a></span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="isDisabl" :loading="logining" @click="submitForm('ruleForm')">绑定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <Captcha ref="obj"></Captcha>
  </div>
</template>

<script type="text/ecmascript-6">
  import httpUrl from '@/libs/http';
  import Captcha from './Captcha.vue';
  export default {
     data() {
      return {
        logining: false,
        isDisabl: false,
        ruleForm: {
          mail: '',
          pass: ''
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
    components: {
      Captcha
    },
    mounted() {
      this.$refs.obj.capShow();
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
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import './style';
</style>
