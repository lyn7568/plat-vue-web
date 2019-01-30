<template>
  <div class="upload-box">
    <div class="el-upload-list el-upload-list--picture-card">
      <div class="el-upload-list__item is-success" v-for="(imgIt,imgIndex) in imageUrl" :key="imgIt.index" :style="{ width: uploadImg.width, height: uploadImg.height }">
        <img class="flex-img__image" :src="imgIt" :style="{ maxWidth: uploadImg.width, maxHeight: uploadImg.height }">
        <label class="el-upload-list__item-status-label">
          <i class="el-icon-upload-success el-icon-check"></i>
        </label>
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-delete">
            <i class="el-icon-delete" @click.stop="handleRemove(imgIndex)"></i>
          </span>
        </span>
      </div>
    </div>
    <el-upload class="avatar-uploader" :action="uploadImg.url" v-show="!plusShow" :show-file-list="false" :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload" :style="{ width: uploadImg.width, height: uploadImg.height }">
      <i class="el-icon-plus avatar-uploader-icon" :style="{ width: uploadImg.width, height: uploadImg.height, lineHeight: uploadImg.height }">
        <div slot="tip" class="el-upload__tip" align="center" :style="{ width: uploadImg.width }">
          <div>{{uploadImg.tip || ''}}</div>
          <div>PNG/JPG/JPEG格式<br />2M以内</div>
        </div>
      </i>
    </el-upload>
  </div>
</template>

<script>
  /* 使用说明
   * imgsArr: [], // 数据动态回显图片数组
   * uploadImg: {
   *  url: uploadLogo, // upload--action
   *  tip: '上传平台LOGO图片', // 上传图片的提示tip
   *  width: '280px',
   *  height: '200px',
   *  limit: 3 //最多可以传输数量
   * }
  */
  import { strToArr, arrToStr } from '@/libs/util'
  export default {
    props: ['upImgsStr', 'uploadImg'],
    data() {
      return {
        imageUrl: strToArr(this.upImgsStr) || []
      }
    },
    watch: {
      upImgsStr(value) {
        this.imageUrl = strToArr(value)
      },
      imageUrl(value) {
        const list = arrToStr(value)
        this.$emit('uploadfun', list)
      }
    },
    computed: {
      limitNum() {
        return this.uploadImg.limit || 1
      },
      plusShow() { // 当图片多于N张的时候，就隐藏上传框
        if (this.imageUrl) {
          return this.imageUrl.length >= this.limitNum
        } else {
          return false
        }
      }
    },
    methods: {
      handleRemove(index) {
        this.imageUrl.splice(index, 1)
      },
      handleAvatarSuccess(res) {
        this.imageUrl.push(res.data.uri)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isPNG = file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG && !isPNG) {
          this.$message.error('只能上传jpg/jpeg/png格式的图片，请重新上传')
        }
        if (!isLt2M) {
          this.$message.error('图片大小不能超过2MB，请重新上传')
        }
        return (isJPG || isPNG) && isLt2M
      }
    }
  }
</script>
<style>
  .upload-box {
    display: flex;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-upload--picture-card {
    width: 100%;
    height: 100%;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    text-align: center;
  }
  .el-icon-plus:before {
    bottom: 10%;
    position: relative;
  }
  .avatar {
    display: block;
  }
  .el-upload__tip {
    position: absolute;
    bottom: 12%;
    padding: 10px;
    line-height: 16px;
    z-index: 0;
  }
  .el-upload-list--picture-card {
    overflow: hidden;
  }
  .el-upload-list--picture-card .el-upload-list__item {
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
  }
  .el-upload-list--picture-card .el-upload-list__item-thumbnail {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
</style>
