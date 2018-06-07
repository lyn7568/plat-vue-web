<template>
  <div class="publishArticle block-wrapper main-content">
    <div class="wrapper-left content-wrapper">
      <el-form :model="ruleFormArt" :rules="rules" ref="ruleFormArt" class="form-main">
        <el-form-item class="upload-fa">
          <div class="update-rw">
            <div class="up">
              <h2><span>* </span>上传文章封面图片</h2>
              PNG/JPG/JPEG格式，大小2M以内
            </div>
          </div>
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            ref="uploadLogo"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload" prop="imageUrl">
            <div v-if="ruleFormArt.imageUrl" :style="{backgroundImage: 'url(' + ruleFormArt.imageUrl + ')'}" class="avatar"></div>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <input type="hidden" v-model="articleId">
        <el-form-item label="文章标题" prop="artTit">
          <el-input v-model="ruleFormArt.artTit" placeholder="请填写文章标题"></el-input>
        </el-form-item>
        <dynamicTags :tagInfo="tagInfo" :dyStr="ruleFormArt.industry" v-on:turnTags="turnTags($event)" :dynamicTagsLength="5"></dynamicTags>
        <el-form-item label="文章正文">
          <UE :id="artUe" :contentText="ruleFormArt.artDesc" ref="ueBox"></UE>
        </el-form-item>
        <el-form-item></el-form-item>
      </el-form>
    </div>
    <div class="wrapper-right">
      <el-row class="content-wrapper operate-box">
        <el-col :span="8" @click.native="articleAdd('ruleFormArt')">
          <em class="operateicon icon-issue"></em>
          <p style="color:#28b8fa">发布</p>
        </el-col>
        <el-col :span="8" @click.native="clickTiming('ruleFormArt')">
          <em class="operateicon icon-timeissue"></em>
          <p>定时发布</p>
        </el-col>
        <el-col :span="8" @click.native="articleDraft('ruleFormArt', 2)">
          <em class="operateicon icon-preview"></em>
          <p>预览</p>
        </el-col>
        <el-col :span="8" @click.native="articleDraft('ruleFormArt', 1)">
          <em class="operateicon icon-draft"></em>
          <p>存草稿</p>
        </el-col>
        <el-col :span="8" class="nodelete" v-show="!ifDelete">
          <em class="operateicon icon-delete"></em>
          <p>删除</p>
        </el-col>
        <el-col :span="8" v-show="ifDelete" @click.native="articleDelete">
          <em class="operateicon icon-delete"></em>
          <p>删除</p>
        </el-col>
      </el-row>
    </div>

    <!-- timing -->
    <el-dialog title="文章定时发布" :visible.sync="dialogFormVisible" width="400px">
      <el-form>
        <el-form-item label="请设置文章发布的时间：">
          <el-date-picker
            v-model="timingDate"
            type="datetime"
            default-time="12:00:00"
            :picker-options="pickerOptions0"
            :default-value="defaultTime" :placeholder="placeTime" format="yyyy-MM-dd HH:mm:ss" style="width:100%">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="articleTiming">确 定</el-button>
      </div>
    </el-dialog>

    <BackTop></BackTop>
  </div>
</template>

<script type="text/ecmascript-6">
  import Cookies from 'js-cookie';
  import httpUrl from '@/libs/http';
  import util from '@/libs/util';

  import dynamicTags from '../../sub-component/DynamicTags';
  import UE from './editorUE';

  export default {
    data() {
      return {
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        plf_user: '',
        tagInfo: {
          lableTit: '关键词',
          placeholder: '请填写相关的关键词，如：腐蚀防护、石墨烯、纳米材料'
        },
        artUe: 'artUeditorId', // uedtior的id
        uploadUrl: httpUrl.kxQurey.cachedFile,
        articleId: '',
        timingDate: '',
        defaultTime: new Date().toISOString(),
        ruleFormArt: {
          artTit: '',
          artDesc: '',
          industry: '',
          imageUrl: '', // 临时地址
          imgName: '' // 图片的name
        },
        rules: {
          artTit: [
            { required: true, message: '请填写文章标题', trigger: 'blur' }
          ]
        },
        dialogFormVisible: false,
        ifDelete: false
      };
    },
    created() {
      this.articleId = util.urlParse('arId');
      if (this.articleId) {
        this.getArticle();
      }
      this.plf_user = Cookies.get('plf_user');
      this.ifDelete = true;
    },
    computed: {
      placeTime: function() {
        let d = new Date();
        return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().replace('T', ' ').replace(/\..+$/, '');
      }
    },
    methods: {
      getArticle() {
        this.$axios.get(httpUrl.kxQurey.article.query, {
          params: {
            articleId: this.articleId
          }
        }).then((res) => {
          if (res.success) {
            this.ruleFormArt.artTit = res.data.articleTitle;
            this.ruleFormArt.imageUrl = util.ImageUrl('article/' + res.data.articleImg, false);
            this.ruleFormArt.industry = res.data.subject;
            this.ruleFormArt.artDesc = res.data.articleContent;
          }
        });
      },
      turnTags(msg) {
        this.ruleFormArt.industry = msg;
      },
      getDataParams(publishTime) {
        this.ruleFormArt.artDesc = this.$refs.ueBox.getUEContent(); // 调用子组件方法
        let $data = {};
        $data.ownerId = this.plf_user;
        $data.articleType = '3';
        $data.articleTitle = this.ruleFormArt.artTit;
        $data.articleContent = this.ruleFormArt.artDesc;
        $data.subject = this.ruleFormArt.industry;
        $data.articleImg = this.ruleFormArt.imgName;
        $data.colNum = '7';
        if (this.articleId) {
          $data.articleId = this.articleId;
        };
        if (publishTime !== '') {
          $data.publishTime = publishTime;
        };
        return $data;
      },
      validImgIfVoid() { // 判断图片是否上传
        if (!this.ruleFormArt.imageUrl) {
          this.$alert('请上传文章封面图片', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
            center: true
          });
          return false;
        }
      },
      articleAdd(formName) { // 发布文章
        this.validImgIfVoid();
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let paramsData = this.getDataParams();
            this.$confirm('确认发布该文章', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              this.$axios.post(httpUrl.kxQurey.article.save, paramsData).then((res) => {
                if (res.success) {
                  this.$alert('文章发布成功！', '提示', {
                    confirmButtonText: '确定',
                    type: 'success',
                    center: true,
                    callback: action => {
                      if (action === 'confirm') {
                        this.$router.push({path: '/ContentManagement'});
                      };
                    }
                  });
                } else {
                  this.$message({
                    message: '文章发布失败，请重新发布！',
                    type: 'warning'
                  });
                };
                console.log(res);
              }).catch(error => {
                console.log(error);
              });
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      clickTiming(formName) {
        this.validImgIfVoid();
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogFormVisible = true;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      articleTiming() { // 定时发布文章
        let opublishTime = util.dateFormatter(this.placeTime, true, true);
        if (this.timingDate) {
          opublishTime = util.dateFormatter(this.timingDate, true, true);
        }
        let paramsData = this.getDataParams(opublishTime);
        this.$axios.post(httpUrl.kxQurey.article.timing, paramsData).then((res) => {
          if (res.success) {
            this.$alert('文章定时发布时间设置成功！', '提示', {
              confirmButtonText: '确定',
              type: 'success',
              center: true,
              callback: action => {
                this.$router.push({path: '/ContentManagement'});
              }
            });
            this.dialogFormVisible = false;
            this.ifDelete = true;
          };
        });
      },
      articleDraft(formName, num) { // 预览文章/存草稿
        this.validImgIfVoid();
        let paramsData = this.getDataParams();
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post(httpUrl.kxQurey.article.draft, paramsData).then((res) => {
              if (res.success) {
                if (num === 1) {
                  this.articleId = res.data;
                  this.$alert('文章已保存草稿', '提示', {
                    confirmButtonText: '确定',
                    type: 'success',
                    center: true,
                    callback: action => {
                      this.$router.push({path: '/ContentManagement'});
                    }
                  });
                } else if (num === 2) {
                  this.articleId = res.data;
                  const {href} = this.$router.resolve({
                      path: '/PreviewArticle',
                      query: {
                        id: res.data
                      }
                  });
                  window.open(href, '_blank');
                }
                this.ifDelete = true;
              } else {
                if (res.code === 90) {
                  this.$alert('由于操作时间过久，上传图片已失效，请重新上传。', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning',
                    center: true
                  });
                } else {
                  this.$alert('文章保存失败！', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning',
                    center: true
                  });
                }
              };
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      articleDelete() { // 删除文章
        this.$confirm('确认删除该文章', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post(httpUrl.kxQurey.article.del, {
            params: {
              articleId: this.articleId
            }
          }).then((res) => {
            if (res.success) {
              this.$router.push({path: '/ContentManagement'});
            }
            console.log(res);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // upload img
      handleAvatarSuccess(res, file) {
        this.ruleFormArt.imageUrl = URL.createObjectURL(file.raw);
        this.ruleFormArt.imgName = res.data[0].cacheKey;
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
      }
      // upload img
    },
    components: {
      dynamicTags,
      UE
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.publishArticle
  .form-main
    width:100%
    .form-line
      border-top:1px dashed #ccc
      margin-bottom:20px
  .el-form-item__label
    float:none
  .shortW
    width:300px
  .code-btn
    .el-input-group__append
      padding:0
      overflow:hidden
      img
        width:100px
        height:38px
        cursor: pointer
  .upload-fa
    position:relative
    .avatar-uploader
      .el-upload
        display:flex
        align-items:center
        justify-content:center
        border: 1px dashed #d9d9d9
        border-radius: 6px
        cursor: pointer
        position: relative
        width: 100%
        height: 190px
        overflow: hidden
        &:hover
          border-color: $mainColor
        .avatar-uploader-icon
          font-size: 40px
          color: #8c939d
          width: 100%
          height: 190px
          line-height: 190px
          text-align: center
        .avatar
          width:100%
          height:190px
          background-size:cover
          background-position:center

    .update-rw
      position:absolute
      display:flex
      justify-content:center
      align-items:center
      text-align:center
      line-height:20px
      width:100%
      top:66%
      color:$secondaryFont
      h2
        font-size:16px
        span
          color:#f56c6c

  .operate-box
    border-top:4px solid #28b8fa
    .el-col-8
      text-align:center
      margin-bottom:12px
      cursor:pointer
      color:$commonFont
      .operateicon
        display:inline-block;
        width:18px;
        height:18px;
        &.icon-issue
          bg-image('/static/comimg/g_article_icon_fabu_hig.png')
        &.icon-timeissue
          bg-image('/static/comimg/g_article_icon_dingshi_nor.png')
        &.icon-preview
          bg-image('/static/comimg/g_article_icon_yulan_nor.png')
        &.icon-draft
          bg-image('/static/comimg/g_article_icon_caogao_nor.png')
        &.icon-delete
          bg-image('/static/comimg/g_article_icon_shanchu_nor.png')

      &:hover
        color:#28b8fa
        .icon-timeissue
          bg-image('/static/comimg/g_article_icon_dingshi_hig.png')
        .icon-preview
          bg-image('/static/comimg/g_article_icon_yulan_hig.png')
        .icon-draft
          bg-image('/static/comimg/g_article_icon_caogao_hig.png')
        .icon-delete
          bg-image('/static/comimg/g_article_icon_shanchu_hig.png')
      &.nodelete
        cursor:auto
        opacity:.6
        &:hover
          color:$commonFont
          .icon-delete
            bg-image('/static/comimg/g_article_icon_shanchu_nor.png')
</style>
