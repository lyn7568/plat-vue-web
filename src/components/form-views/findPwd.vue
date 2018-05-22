<template>
  <div class="login">
    <div class="logo-wrapper"></div>
    <div class="form-wrapper">
      <div class="form-contain">
        <p class="form-title">找回密码</p>
        <div class="step-wrapper">
          <el-steps :active="stepVal" finish-status="success" align-center>
            <el-step title="输入邮箱"></el-step>
            <el-step title="接收密码找回邮件"></el-step>
            <el-step title="重置密码"></el-step>
          </el-steps>
        </div>

        <div class="step-contain">
          <el-form v-show="!isStepShow" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item prop="mail">
              <el-input v-model="ruleForm.mail" placeholder="请输入邮箱账号"></el-input>
            </el-form-item>
            <el-form-item></el-form-item>
            <el-form-item>
              <el-button type="primary" :disabled="isDisabl" @click="nextStep">下一步</el-button>
              <el-button type="text" @click="goLogin">又想起来了</el-button>
            </el-form-item>
          </el-form>
          <el-form v-show="isStepShow" class="demo-ruleForm">
            <el-form-item>
              <p class="importTip">密码找回邮件已发送至：<br />
                <span class="mainTip" id="emailShow">jdksgjksdgjsdhgs</span>
              </p>
              <p class="smallTip">请您在10分钟内登录您的企业邮箱，接收邮件，<br />点击链接后即可重置密码。</p>
            </el-form-item>
            <el-form-item></el-form-item>
            <el-form-item>
              <el-button type="primary" @click="goToMail">登录邮箱</el-button>
            </el-form-item>
          </el-form>
          <el-form v-show="!isStepShow" :model="ruleForm2" :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
            <el-form-item prop="pass">
              <el-input type="password" v-model="ruleForm2.pass" placeholder="请设置您的新密码" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input type="password" v-model="ruleForm2.checkPass" placeholder="请再次输入密码确认" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item></el-form-item>
            <el-form-item>
              <el-button type="primary" :disabled="isDisabl" @click="resetPwd">重置密码</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
     data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请设置您的新密码'));
        } else if (value.length < 6 || value.length > 24) {
         callback(new Error('密码由6-24个字符组成，区分大小写'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码确认'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致，请重新输入!'));
        } else {
          callback();
        }
      };
      return {
        stepVal: 0,
        isStepShow: true,
        isDisabl: false,
        ruleForm: {
          mail: ''
        },
        rules: {
          mail: [
            { required: true, message: '请输入邮箱账号', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
          ]
        },
        ruleForm2: {
          pass: '',
          checkPass: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      nextStep() {
        return this.stepVal++ > 2;
      },
      resetPwd(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            this.$router.push({path: '/WorkHome'});
          } else {
            return false;
          }
        });
      },
      goLogin() {
        this.$router.push({path: '/loginPlat'});
      },
      goToMail() {
        this.$router.push({path: '/loginPlat'});
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './style';
</style>
