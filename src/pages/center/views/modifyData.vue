<template>
  <div>
    <el-tabs>
      <el-tab-pane label="修改资料"></el-tab-pane>
    </el-tabs>
    <div class='formHeadFormBox'>
      <div class='formBox'>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm">
          <el-col :span="12">
            <el-form-item label="用户名" prop="account">
              <el-input v-model="ruleForm2.account" auto-complete="off" placeholder="请输入用户名" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="name">
              <el-input v-model="ruleForm2.name" auto-complete="off" placeholder="请输入真实姓名" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-select v-model="ruleForm2.sex" placeholder="请选择性别" style="width: 100%">
                <el-option label="男" value="0"></el-option>
                <el-option label="女" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职位" prop="job">
              <el-input v-model.number="ruleForm2.job" placeholder="请输入职位" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="所在机构" prop="comp">
              <el-input v-model.number="ruleForm2.comp" placeholder="请输入所在机构" maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="linkPhone">
              <el-input v-model.number="ruleForm2.linkPhone" placeholder="请输入联系电话" maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="联系邮箱" prop="email">
              <el-input v-model="ruleForm2.email" placeholder="请输入联系邮箱" maxlength="100"></el-input>
            </el-form-item>
            <el-form-item label="所在城市" prop="addr">
              <cityPicker @paren="toshow" :addrCode="ruleForm2.addr"></cityPicker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="head">
              <uploadFile :uploadImg="uploadImg" v-on:uploadfun="uploadfun" :upImgsStr="upImgsStr"></uploadFile>
            </el-form-item>
          </el-col>
          <el-col :span="24" class="el-btn-col">
            <el-form-item class="el-btn-col-box">
              <el-button type="primary" @click="submitForm('ruleForm2')">保存修改</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import uploadFile from '@/components/uploadFile'
  import cityPicker from '@/components/CityPicker'
  export default {
    data() {
      return {
        upImgsStr: '',
        uploadImg: {
          url: '/ajax/user/head',
          width: '200px',
          height: '200px',
          tip: '上传头像'
        },
        ruleForm2: {
          account: '',
          name: '',
          sex: '',
          job: '',
          comp: '',
          linkPhone: '',
          email: '',
          addr: '',
          head: ''
        },
        rules2: {
          account: [
            { message: '请输入用户名', trigger: 'blur', required: true }
          ],
          email: [
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
          ]
        }
      };
    },
    components: {
      uploadFile,
      cityPicker
    },
    created() {
      let id = localStorage.getItem('userid');
      this.$axios.get('/ajax/sys/user/get', {id}, res => {
        if (res.success && res.data) {
          const response = res.data;
          this.ruleForm2 = {
            account: response.account,
            name: response.name,
            sex: response.sex,
            job: response.job,
            comp: response.comp,
            linkPhone: response.linkPhone,
            email: response.email,
            addr: response.addr,
            head: response.head
          }
          this.upImgsStr = response.head
        }
      })
    },
    methods: {
      submitForm(formName) {
        var that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.$axios.post('/ajax/sys/user', this.ruleForm2, res => {
              if (res.success) {
                that.$message({
                  message: '资料修改成功',
                  type: 'success'
                })
                that.$axios.get('/ajax/sys/refresh', {}, function(data) {
                  if (data.success) {
                    that.$store.dispatch('GetUserInfo')
                  }
                })
              } else {
                that.$store.dispatch('FedLogOut').then(res => {
                  that.$message.error('登录状态失效，请重新登录')
                  that.$router.push({ path: '/#/loginPlat' })
                })
              }
            })
          } else {
            return false;
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      uploadfun(value) {
        this.ruleForm2.head = value
      },
      toshow(value) {
        this.ruleForm2.addr = value
      }
    }
  }
</script>
