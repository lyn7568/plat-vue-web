<template>
  <div class="login">
    <router-link to="home" class="logo-wrapper"></router-link>
    <div class="form-wrapper">
      <div class="form-contain">
        <p class="form-title">登录</p>
        <ul class='table-panel'>
          <li class="table-panel-single"><a href="#/loginPlat">密码登录</a></li>
          <li class="table-panel-single tablePanelActive">邀请码登录</li>
        </ul>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="email">
            <el-input v-model="ruleForm.email" placeholder="请输入邮箱地址"></el-input>
          </el-form-item>
          <el-form-item prop="inviteCode">
            <el-input type="password" v-model="ruleForm.inviteCode" placeholder="请输入邀请码" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="isDisabl" :loading="logining" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
       data() {
        return {
          logining: false,
          isDisabl: false,
          ruleForm: {
            email: '',
            inviteCode: ''
          },
          rules: {
            email: [
              { required: true, message: '请输入您的邮箱地址', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
            ],
            inviteCode: [
              { required: true, message: '请输入邀请码', trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.logining = true;
              this.$axios.post('/ajax/sys/inviteLogin', this.ruleForm, res => {
                this.logining = false;
                if (res.success) {
                  if (res.data) {
                    this.$router.push({path: 'enterRegister', query: { id: res.data.id, orgName: res.data.name }});
                  } else {
                    this.$message.error('邮箱或邀请码错误，请重新输入');
                  }
                } else {
                  const errorMsg = {
                    '-60001': '该账号已激活，请直接登录'
                  }
                  if (errorMsg[res.code]) {
                    this.$message.error(errorMsg[res.code]);
                  }
                }
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
  @import './style.scss';
</style>
