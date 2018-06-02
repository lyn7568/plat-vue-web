<template>
  <div class="updateInfo">
    <div class="content-wrapper block-wrapper">
      <el-form :model="ruleFormUpdate" :rules="rules" ref="ruleFormUpdate" label-width="80px" class="update-wrapper demo-ruleForm">
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
            <el-input v-model="ruleFormUpdate.linkman" class="shortW" placeholder="请填写平台联系人姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="tel">
            <el-input v-model="ruleFormUpdate.tel" placeholder="请填写联系电话"></el-input>
          </el-form-item>
          <el-form-item label="联系邮箱" prop="mail">
            <el-input v-model="ruleFormUpdate.mail" placeholder="请填写联系邮箱"></el-input>
          </el-form-item>
          <el-form-item label="所在城市" prop="selectedOptions">
            <el-cascader
              :options="optionsCity"
              v-model="selectedOptions"
              class="shortW"
              placeholder="请选择所在的城市">
            </el-cascader>
          </el-form-item>
          <el-form-item label="联系地址" prop="address">
            <el-input v-model="ruleFormUpdate.address" placeholder="如：北京市海淀区学院路方兴大厦"></el-input>
          </el-form-item>
          <el-form-item label="官方网址" prop="website">
            <el-input v-model="ruleFormUpdate.website" placeholder="如：www.ekexiu.com"></el-input>
          </el-form-item>
          <dynamicTags :tagInfo="tagInfo" :dyStr="ruleFormUpdate.industry" v-on:turnTags="turnTags($event)" :dynamicTagsLength="10"></dynamicTags>
          <el-form-item label="平台介绍" prop="desc">
            <el-input type="textarea" :rows="8" v-model="ruleFormUpdate.desc" placeholder="请填写一个简单的介绍，让大家更好地了解平台"></el-input>
          </el-form-item>
          <el-form-item></el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleFormUpdate')">保存</el-button>
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

  import dynamicTags from '../sub-component/DynamicTags';

  export default {
    props: {
      plat: {
        type: Object
      }
    },
    data() {
      return {
        tagInfo: {
          lableTit: '面向行业',
          placeholder: '请填写园区面向的行业，如：互联网/智能制造/新材料'
        },
        plf_user: '',
        plf_name: '',
        imageUrl: '', // 临时地址
        imgName: '', // 图片的name
        uploadUrl: httpUrl.hQuery.baseInfo.upload,
        optionsCity: provinceAndCityData,
        selectedOptions: [],
        dynamicTags: [],
        isShowAdd: true,
        inputVisible: false,
        inputValue: '',
        ruleFormUpdate: {
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
      turnTags(msg) {
        this.ruleFormUpdate.industry = msg;
      },
      getPlatInfo(id) {
        this.$axios.get(httpUrl.hQuery.baseInfo.query, {
          params: {
            id: id
          }
        }).then((res) => {
          console.log(res);
          let str = res.data;
          this.plf_name = str.name;
          this.imageUrl = util.ImageUrl('platform' + str.logo);
          this.imgName = str.logo;
          this.ruleFormUpdate.linkman = str.linkman;
          this.ruleFormUpdate.tel = str.linkphone;
          this.ruleFormUpdate.mail = str.linkemail;
          if (str.province) {
            Vue.set(this.selectedOptions, 0, TextToCode[str.province].code);
          }
          if (str.city) {
            Vue.set(this.selectedOptions, 1, TextToCode[str.province][str.city].code);
          }
          this.ruleFormUpdate.address = str.addr;
          this.ruleFormUpdate.website = str.url;
          if (str.industry) {
            this.ruleFormUpdate.industry = str.industry;
            this.dynamicTags = str.industry.split(',');
            if (this.dynamicTags.length === 10) {
              this.isShowAdd = false;
            }
          }
          this.ruleFormUpdate.desc = str.descp;
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$refs.uploadLogo.submit(); // 确认上传图片

            let paramsData = {
              'id': this.plf_user,
              'name': this.plf_name,
              'linkman': this.ruleFormUpdate.linkman,
              'logo': this.imgName,
              'linkphone': this.ruleFormUpdate.tel,
              'linkemail': this.ruleFormUpdate.mail,
              'province': CodeToText[this.selectedOptions[0]],
              'city': CodeToText[this.selectedOptions[1]],
              'addr': this.ruleFormUpdate.address,
              'url': this.ruleFormUpdate.website,
              'industry': this.ruleFormUpdate.industry,
              'descp': this.ruleFormUpdate.desc
            };
            this.$axios.post(httpUrl.hQuery.baseInfo.update, paramsData).then((res) => {
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
      // upload img
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.imgName = res.data[0].uri;
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
        this.ruleFormUpdate.industry = this.dynamicTags.join(',');
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
        this.ruleFormUpdate.industry = this.dynamicTags.join(',');
        this.inputVisible = false;
        this.inputValue = '';
      }
      // add tag
    },
    components: {
      dynamicTags
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.updateInfo
  .update-wrapper
    display:flex
    .update-logo
      width:280px
      .avatar-uploader
        .el-upload
          center-items(280px,187px)
          border: 1px dashed #d9d9d9
          cursor: pointer
          position: relative
          &:hover
            border-color: $mainColor
          .avatar-uploader-icon
            font-size: 40px
            color: #8c939d
            width: 280px
            height: 187px
            line-height: 187px
            text-align: center
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
