<template>
  <div class="login">
    <router-link to="home" class="logo-wrapper"></router-link>
    <div class="form-wrapper">
      <div class="form-contain">
        <p class="form-title">密码重置</p>
        <div class="step-wrapper">
          <el-steps :active="stepVal" finish-status="success" align-center>
            <el-step title="验证手机"></el-step>
            <el-step title="重置密码"></el-step>
          </el-steps>
        </div>

        <div class="step-contain">
          <el-form v-show="stepFisrt" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item prop="phone">
              <el-input v-model="ruleForm.phone" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item prop="vc">
              <el-input v-model="ruleForm.vc" placeholder="请输入短信验证码" class='codeWidth'></el-input>
              <el-button type="primary" class='codeWidth codeButton' @click.stop="buttonCheck" :disabled="isDisabled">{{buttonMsg}}</el-button>
            </el-form-item>
            <el-form-item></el-form-item>
            <el-form-item class="textButton-box">
              <el-button type="primary" :disabled="isDisabl" @click="nextStep('ruleForm')">下一步</el-button>
              <div class='existing-account'>又想起来了<a href="#/loginPlat">返回</a></div>
            </el-form-item>
          </el-form>
          <el-form v-show="!stepFisrt" :model="ruleForm2" :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
            <el-form-item prop="pass">
              <el-input type="password" v-model="ruleForm2.pass" placeholder="请设置您的新密码" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input type="password" v-model="ruleForm2.checkPass" placeholder="请再次输入密码确认" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item></el-form-item>
            <el-form-item>
              <el-button type="primary" :disabled="isDisabl" @click="resetPwd('ruleForm2')">确认</el-button>
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
                this.phoneFlag = true;
                callback();
              } else {
                this.phoneFlag = false;
                callback(new Error('该账号不存在，请重新输入'))
              }
            });
          }
        }
      };
      var validatePass = (rule, value, callback) => {
        const reg = /^[a-zA-Z0-9]{6,24}$/
        if (value === '') {
          callback(new Error('请设置您的新密码'));
        } else if (!reg.test(value)) {
          callback(new Error('密码由6-24个数字和字母组成，区分大小写'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        const reg = /^[a-zA-Z0-9]{6,24}$/
        if (value === '') {
          callback(new Error('请再次输入密码确认'));
        } else if (!reg.test(value)) {
          callback(new Error('密码由6-24个数字和字母组成，区分大小写'));
        } else {
          if (value !== this.ruleForm2.pass) {
            callback(new Error('两次输入密码不一致，请重新输入!'));
          }
          callback();
        }
      };
      return {
        phoneFlag: false,
        isDisabled: false,
        buttonMsg: '获取短信验证码',
        stepVal: 0,
        stepFisrt: true,
        isDisabl: false,
        ruleForm: {
          phone: '',
          vc: ''
        },
        rules: {
          phone: [{ required: true, validator: validatePhone, trigger: 'blur' }],
          vc: [{ required: true, message: '请输入验证码' }]
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
      setInt(num = 60) {
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
          let phone = this.ruleForm.phone;
          this.$axios.post('/ajax/sys/resetpw/phone/msg', {phone}, res => {
          })
          this.setInt();
        }
      },
      nextStep(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.get('/ajax/sys/resetpw/phone/msgCheck', this.ruleForm, res => {
              console.log(res);
              if (res.success) {
                if (res.data) {
                  this.stepFisrt = false;
                  this.stepVal = 1;
                } else {
                  this.$message.error('验验证码错误，请重新输入');
                }
              } else {
                let errorCode = {
                  '-60001': '验证码已过期，请重新获取'
                }
                this.$message.error(errorCode[res.code]);
              }
            });
          } else {
            return false;
          }
        });
      },
      resetPwd(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.pw = this.ruleForm2.pass;
            this.$axios.post('/ajax/sys/resetpw', this.ruleForm, res => {
              if (res.success) {
                this.$alert('您可以使用新密码登录您的账户了', '密码重置成功', {
                  confirmButtonText: '重新登录',
                  type: 'success',
                  center: true,
                  callback: action => {
                    if (action === 'confirm') {
                      this.$store.dispatch('LogOut').then(() => {
                        this.$router.push({ path: '/loginPlat' });
                      });
                    };
                  }
                });
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

<style lang="scss" rel="stylesheet/scss">
  @import './style';
</style>
