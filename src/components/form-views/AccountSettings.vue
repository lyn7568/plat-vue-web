<template>
  <div class="newsmMain">
    <div class="newsLeft">
      <ul>
        <li>工作台</li>
        <li>密码修改</li>
        <li class='band'>账号绑定</li>
      </ul>
    </div>
    <div class="newsRight">
      <el-tabs >
        <el-tab-pane label="当前密码">
          <div class="updataPa">
            <el-form label-width="100px" class="demo-ruleForm" size="medium" :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2">
              <el-form-item label="当前密码" prop="loginPass">
                <el-input type="password" auto-complete="off" v-model="ruleForm2.loginPass"></el-input><span class="forgetPass">忘记密码？</span>
              </el-form-item>
              <el-form-item label="新密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <el-row>
              <el-button type="primary" size="medium" class="save" @click="submitForm('ruleForm2')" :disabled="ruleForm2.diab">保存</el-button>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import httpUrl from '@/libs/http';
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (this.ruleForm2.pass !== '' && this.ruleForm2.checkPass !== '' && this.ruleForm2.loginPass !== '') {
          this.ruleForm2.diab = false;
        }
        if (value.length < 6) {
          callback(new Error('密码由6-24个字符组成，区分大小写'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass3 = (rule, value, callback) => {
        if (this.ruleForm2.pass !== '' && this.ruleForm2.checkPass !== '' && this.ruleForm2.loginPass !== '') {
          this.ruleForm2.diab = false;
        }
        if (value.length < 6) {
          callback(new Error('密码由6-24个字符组成，区分大小写'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (this.ruleForm2.pass !== '' && this.ruleForm2.checkPass !== '' && this.ruleForm2.loginPass !== '') {
          this.ruleForm2.diab = false;
        }
        if (value.length < 6) {
          callback(new Error('密码由6-24个字符组成，区分大小写'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入不一致，请重新输入'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          loginPass: '',
          diab: true
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          loginPass: [
            { validator: validatePass3, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      open() {
        this.$confirm('密码修改成功！', '提示', {
          confirmButtonText: '确定',
          type: 'success',
          showCancelButton: false,
          center: true
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post(httpUrl.hQuery.sign.modifypw, {
              id: Cookies.get('platId'),
              npw: this.ruleForm2.pass,
              opw: this.ruleForm2.loginPass
            }).then((res) => {
              if (res.success) {
                if (res.data === 1) {
                  this.open();
                  this.$refs[formName].resetFields();
                }
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../bench-views/workCommon';
  @import '../bench-views/Siderbar.styl'
  .newsmMain
    .updataPa
      display: flex
      flex-direction: column;
      align-items: center
      margin-top: 50px
      .save
        padding: 10px 50px
        margin-top: 20px
        position: relative
        left: 20px
      .el-form-item
        position: relative
        width: 400px
        .forgetPass
          color: $mainColor
          position: absolute
          top: 0
          right: -80px
    .newsLeft
      .band
        margin-top: 0px
        border-top: none
</style>
