<template>
  <div>
    <el-tabs>
      <el-tab-pane label="修改密码"></el-tab-pane>
    </el-tabs>
    <div class="formBoxCenter">
         <a href="#/findPwd">忘记密码？</a>
        <div class="boxCenter">
          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="原密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" autocomplete="off" placeholder="请输入原密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="再次输入" prop="age">
                <el-input v-model.number="ruleForm2.age"></el-input>
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
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
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

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .formBoxCenter
    display:flex
    align-items: center
    justify-content: center
    .boxCenter
      width: 450px
      position: relative
    a
      position: absolute
      top: 60px
      right: 140px
      color: #409EFF
</style>
