<template>
  <div>
    <el-tabs>
      <el-tab-pane label="修改资料"></el-tab-pane>
    </el-tabs>
    <div class='formHeadFormBox'>
      <div class='formBox'>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="pass">
                <el-input v-model="ruleForm2.pass" autocomplete="off" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="checkPass">
                <el-input v-model="ruleForm2.checkPass" autocomplete="off" placeholder="请输入真实姓名"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-select v-model="ruleForm2.region" placeholder="请选择性别" style="width:100%">
                <el-option label="男" value="shanghai"></el-option>
                <el-option label="女" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="职位" prop="age">
                <el-input v-model.number="ruleForm2.age" placeholder="请输入职位"></el-input>
            </el-form-item>
            <el-form-item label="所在机构" prop="age">
                <el-input v-model.number="ruleForm2.age" placeholder="请输入所在机构"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="age">
                <el-input v-model.number="ruleForm2.age" placeholder="请输入联系电话"></el-input>
            </el-form-item>
            <el-form-item label="联系邮箱" prop="age">
                <el-input v-model.number="ruleForm2.age" placeholder="请输入联系邮箱"></el-input>
            </el-form-item>
            <CityPick ref="cityPick"  :widthselect="206" :prov="ruleForm2.province" :city="ruleForm2.city" v-on:selectProv="getSelectProv($event)" v-on:selectCity="getSelectCity($event)"></CityPick>
            <el-form-item style="text-align:right">
                <el-button type="primary" @click="submitForm('ruleForm2')">保存修改</el-button>
            </el-form-item>
        </el-form>
      </div>
      <div class="headPhotoBox">
        <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <p>上传头像</p>
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
        imageUrl: '',
        ruleForm2: {
          pass: '',
          checkPass: '',
          age: '',
          region: '',
          province: '',
          city: ''
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
     handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        return isJPG && isLt2M;
      },
      getSelectProv(prov) {
        this.ruleForm2.province = prov;
      },
      getSelectCity(city) {
        this.ruleForm2.city = city;
      },
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

<style>
    .formHeadFormBox {
      margin-left: 20px;
      position: relative;
    }
    .formBox {
      width: 500px;
    }
    .headPhotoBox {
      position: absolute;
      right: 90px;
      top: 0px;
    }
    .headPhotoBox p {
        text-align: center;
        line-height: 30px;
        color: #606266;
        font-size: 14px
    }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
