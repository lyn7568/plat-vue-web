<template>
  <div>
    <el-tabs>
      <el-tab-pane label="修改密码"></el-tab-pane>
    </el-tabs>
    <div class="formBoxCenter">
      <a href="#/findPwd">忘记密码？</a>
      <div class="boxCenter">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="原密码" prop="opw">
            <el-input type="password" v-model="ruleForm2.opw" auto-complete="off" placeholder="请输入原密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="npw">
            <el-input type="password" v-model="ruleForm2.npw" auto-complete="off" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item label="再次输入" prop="npwCheck">
            <el-input type="password" v-model="ruleForm2.npwCheck" placeholder="请确认新密码"></el-input>
          </el-form-item>
          <el-form-item style="text-align:center">
            <el-button type="primary" @click="submitForm('ruleForm2')">保存修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      const reg = /^[a-zA-Z0-9]{6,24}$/;
      var checkOpw = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入原密码'));
        } else {
          if (!reg.test(value)) {
            callback(new Error('密码由6-24个数字和字母组成，区分大小写'));
          } else {
            callback();
          }
        }
      };
      var validateNpw = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请设置您的新密码'));
        } else {
          if (!reg.test(value)) {
            callback(new Error('密码由6-24个数字和字母组成，区分大小写'));
          } else {
            if (this.ruleForm2.npwCheck !== '') {
              this.$refs.ruleForm2.validateField('npwCheck');
            }
            callback();
          }
        }
      };
      var validateNpwCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码确认'));
        } else if (!reg.test(value)) {
          callback(new Error('密码由6-24个数字和字母组成，区分大小写'));
        } else {
          if (value !== this.ruleForm2.npw) {
            callback(new Error('两次输入不一致，请重新输入!'));
          } else {
            callback();
          }
        }
      };
      return {
        ruleForm2: {
          opw: '',
          npw: '',
          npwCheck: ''
        },
        rules2: {
          npw: [
            { validator: validateNpw, trigger: 'blur', required: true }
          ],
          npwCheck: [
            { validator: validateNpwCheck, trigger: 'blur', required: true }
          ],
          opw: [
            { validator: checkOpw, trigger: 'blur', required: true }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/ajax/sys/user/changepasswd', this.ruleForm2, res => {
              if (res.success) {
                if (res.data) {
                  this.$message({
                    message: '密码修改成功',
                    type: 'success'
                  });
                } else if (res.data === 0) {
                  this.$message.error('旧密码输入错误，请重新输入');
                } else {
                  this.$message.error('登录账号与密码不匹配');
                }
              }
            });
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>

<style scoped>
  .formBoxCenter {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .formBoxCenter .boxCenter {
    width: 450px;
    position: relative;
  }
  .formBoxCenter a {
    position: absolute;
    top: 114px;
    right: 140px;
    color: #2693ec;
  }
</style>
