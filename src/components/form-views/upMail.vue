<template>
  <div class="login">
    <div class="logo-wrapper"></div>
    <div class="form-wrapper">
      <div class="form-contain">
        <p class="form-title">账号绑定</p>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="pass">
            <el-input type="password" v-model="ruleForm.pass" placeholder="请输入登录密码" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item></el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="isDisabl" :loading="logining" @click="submitForm('ruleForm')">绑定邮箱</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import httpUrl from '@/libs/http';
  import util from '@/libs/util';
  export default {
     data() {
      return {
        logining: false,
        isDisabl: false,
        ruleForm: {
          pass: ''
        },
        rules: {
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
              'code': util.urlParse('sc'),
              'pw': this.ruleForm.pass
            };
            this.$axios.post(httpUrl.hQuery.sign.bindMail, paramsData).then(res => {
              this.logining = false;
              console.log(res);
              if (res.success) {
                 this.$alert('您可以使用该邮箱登录您的账户了', '恭喜您，您的邮箱绑定成功', {
                  center: true,
                  type: 'success',
                  confirmButtonText: '重新登录',
                  callback: action => {
                    this.$router.push({path: '/#/loginPlat'});
                  }
                });
              } else {
                this.$alert('小提示：邮件内的链接有效时长为10分钟', '很抱歉，当前的链接已失效！', {
                  center: true,
                  type: 'warning'
                });
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

<style lang="stylus" rel="stylesheet/stylus">
  @import './style';
</style>
