<template>
  <div class="workbench">
    <div class="content-wrapper block-wrapper">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="update-wrapper demo-ruleForm">
        <div class="update-logo">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            ref="uploadLogo"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="update-tip">PNG/JPG/JPEG格式<br>大小2M以内</div>
        </div>
        <div class="update-main">
          <div class="update-title">{{plf_name}}</div>
          <el-form-item label="联系人" prop="linkman">
            <el-input v-model="ruleForm.linkman" class="shortW" placeholder="请填写平台联系人姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="tel">
            <el-input v-model="ruleForm.tel" placeholder="请填写联系电话"></el-input>
          </el-form-item>
          <el-form-item label="联系邮箱" prop="mail">
            <el-input v-model="ruleForm.mail" placeholder="请填写联系邮箱"></el-input>
          </el-form-item>
          <el-form-item label="所在城市" prop="selectedOptions">
            <el-cascader
              :options="optionsCity"
              v-model="selectedOptions"
              @change="handleChange" class="shortW"
              placeholder="请选择所在的城市">
            </el-cascader>
          </el-form-item>
          <el-form-item label="联系地址" prop="address">
            <el-input v-model="ruleForm.address" placeholder="如：北京市海淀区学院路方兴大厦"></el-input>
          </el-form-item>
          <el-form-item label="官方网址" prop="website">
            <el-input v-model="ruleForm.website" placeholder="如：www.ekexiu.com"></el-input>
          </el-form-item>
          <el-form-item label="面向行业" prop="industry">
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" v-show="isShowAdd" size="small" @click="showInput">+ 请填写园区面向的行业，如：互联网/智能制造/新材料</el-button>
          </el-form-item>
          <el-form-item label="平台介绍" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc" placeholder="请填写一个简单的介绍，让大家更好地了解平台"></el-input>
          </el-form-item>
          <el-form-item></el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            <el-button @click="resetForm">取消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import {
    provinceAndCityData,
    CodeToText,
    TextToCode
  } from 'element-china-area-data';

  import Cookies from 'js-cookie';
  import util from '@/libs/util';
  import httpUrl from '@/libs/http';

  export default {
    props: {
      plat: {
        type: Object
      }
    },
    data() {
      return {
        plf_user: '',
        plf_name: '',
        imageUrl: '', // 临时地址
        imgName: '', // 图片的name
        uploadUrl: httpUrl.workbench.uploadImg,
        optionsCity: provinceAndCityData,
        selectedOptions: [],
        dynamicTags: [],
        isShowAdd: true,
        inputVisible: false,
        inputValue: '',
        ruleForm: {
          linkman: '',
          tel: '',
          mail: '',
          address: '',
          website: '',
          industry: '',
          desc: ''
        },
        rules: {
          linkman: [
            { required: true, message: '请填写平台联系人姓名', trigger: 'blur' },
            { max: 10, message: '不得超过10个字', trigger: 'blur' }
          ],
          tel: [
            { required: true, message: '请填写联系电话', trigger: 'blur' },
            { max: 50, message: '不得超过50个字', trigger: 'blur' }
          ],
          mail: [
            { required: true, message: '请填写联系邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
            { max: 50, message: '不得超过50个字', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请填写平台介绍', trigger: 'blur' },
            { max: 1000, message: '不得超过1000个字', trigger: 'blur' }
          ],
          address: [
            { max: 50, message: '不得超过50个字', trigger: 'blur' }
          ],
          website: [
            { max: 50, message: '不得超过50个字', trigger: 'blur' }
          ]
        }
      };
    },
    computed: {
    },
    created() {
      this.plf_user = Cookies.get('plf_user');
      this.getPlatInfo(this.plf_user);
    },
    methods: {
      getPlatInfo(id) {
        this.$axios.get(httpUrl.workbench.platBase, {
          params: {
            id: id
          }
        }).then((res) => {
          console.log(res);
          let str = res.data;
          this.plf_name = str.name;
          this.imageUrl = util.orgLogoUrl(str.logo);
          this.imgName = str.logo;
          this.ruleForm.linkman = str.linkman;
          this.ruleForm.tel = str.linkphone;
          this.ruleForm.mail = str.linkemail;
          if (str.province) {
            Vue.set(this.selectedOptions, 0, TextToCode[str.province].code);
          }
          if (str.city) {
            Vue.set(this.selectedOptions, 1, TextToCode[str.province][str.city].code);
          }
          this.ruleForm.address = str.addr;
          this.ruleForm.website = str.url;
          if (str.industry) {
            this.ruleForm.industry = str.industry;
            this.dynamicTags = str.industry.split(',');
            if (this.dynamicTags.length === 10) {
              this.isShowAdd = false;
            }
          }
          this.ruleForm.desc = str.descp;
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$refs.uploadLogo.submit(); // 确认上传图片

            let paramsData = {
              'id': this.plf_user,
              'name': this.plf_name,
              'linkman': this.ruleForm.linkman,
              'logo': this.imgName,
              'linkphone': this.ruleForm.tel,
              'linkemail': this.ruleForm.mail,
              'province': CodeToText[this.selectedOptions[0]],
              'city': CodeToText[this.selectedOptions[1]],
              'addr': this.ruleForm.address,
              'url': this.ruleForm.website,
              'industry': this.ruleForm.industry,
              'descp': this.ruleForm.desc
            };
            this.$axios.post(httpUrl.workbench.updateInfo, paramsData).then((res) => {
              this.$message({
                message: '平台信息修改成功！',
                type: 'success'
              });
              Cookies.set('plf_logo', this.imgName);
              this.$router.push({path: '/WorkHome'});
            }).catch(error => {
              console.log(error);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$router.push({path: '/WorkHome'});
      },
      // cityPicker
      handleChange (value) {
        console.log(value);
      },
      // cityPicker
      // upload img
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.imgName = 'platform' + res.data[0].uri;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG && !isPNG) {
          this.$message.error('请上传PNG/JPG/JPEG格式的图片');
        }
        if (!isLt2M) {
          this.$message.error('上传logo大小不能超过 2MB!');
        }
        return (!isJPG || !isPNG) && isLt2M;
      },
      // upload img
      // add tag
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        this.ruleForm.industry = this.dynamicTags.join(',');
        if (this.dynamicTags.length < 10) {
          this.isShowAdd = true;
        }
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue.length > 15) {
          this.$message.error('面向行业不得超过15个字,添加失败！');
        }
        if (this.dynamicTags.length === 10) {
          this.isShowAdd = false;
        }
        if (inputValue && inputValue.length < 15 && this.dynamicTags.length < 10) {
          this.dynamicTags.push(inputValue);
        }
        this.ruleForm.industry = this.dynamicTags.join(',');
        this.inputVisible = false;
        this.inputValue = '';
      }
      // add tag
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .update-wrapper
    display:flex
    .update-logo
      width:280px
      .avatar-uploader
        .el-upload
          display:flex
          align-items:center
          border: 1px dashed #d9d9d9
          border-radius: 6px
          cursor: pointer
          position: relative
          width: 280px
          height: 187px
          overflow: hidden
          &:hover
            border-color: $mainColor
          .avatar-uploader-icon
            font-size: 40px
            color: #8c939d
            width: 280px
            height: 187px
            line-height: 187px
            text-align: center
          .avatar
            max-width: 280px
            max-height: 187px
            display: block
      .update-tip
        margin-top:15px
        text-align:center
        font-size:14px
        color:$secondaryFont
    .update-main
      flex:1 0 280px
      padding-left:25px
      .update-title
        font-size:30px
        line-height:54px
        margin-bottom:16px
        padding-left:10px

      .el-tag + .el-tag
        margin-left: 10px
      .button-new-tag
        height: 32px
        line-height: 30px
        padding-top: 0
        padding-bottom: 0
      .input-new-tag
        width: 90px
        margin-left: 10px
        vertical-align: bottom
    .shortW
      width:300px
</style>
