<template>
  <div class="newsmMain">
    <div class="newsLeft">
      <ul>
        <li>工作台</li>
        <li  @click="passxiu">密码修改</li>
        <li class='band bg' @click="mailUp">账号绑定</li>
      </ul>
    </div>
    <div class="newsRight">
      <el-tabs >
        <el-tab-pane label="账号绑定">
          <div class="updataPa">
            <div class="mailTitle">您可以使用以下方式登录账户</div>
            <div class="mailUpdata">
              <span class="el-icon-message"></span>已绑定邮箱 {{mailUpadate(mail)}}
              <el-button type="primary" class="upGeng" @click="dialogFormVisible = true">更换</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="提示" :visible.sync="dialogFormVisible" class="diog">
      <div class="boxText">验证邮箱，完成账号绑定</div>
      <div class="boxBody">
        <el-input v-model="emailName" auto-complete="off" @blur="cblur" @focus="titler = ''"></el-input>
        <p>{{titler}}</p>
      </div>
      <div class="foobox">
        <el-button type="primary" @click="cblur(1)">发送验证邮件</el-button>
      </div>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dias" class="diog">
      <div class="boxText">验证邮件已发送至：</div>
      <ul>
        <li class="gren">{{emailName}}</li>
        <li>请您在10分钟内登录您的邮箱，接收邮件，</li>
        <li>点击链接后即可完成绑定。</li>
      </ul>
      <div class="foobox">
        <el-button type="primary" @click="loginMail">登录邮箱</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import util from '@/libs/util';
  import httpUrl from '@/libs/http';
  export default {
    data() {
      return {
        mail: Cookies.get('plf_email'),
        platId: Cookies.get('plf_user'),
        dialogFormVisible: false,
        emailName: '',
        titler: '',
        dias: false
      };
    },
    methods: {
      passxiu() {
        this.$router.push({ path: '/AccountSettings' });
      },
      mailUp() {
        this.$router.push({ path: '/BindAccount' });
      },
      loginMail() {
        var url = this.emailName.split('@')[1];
        if (util.mailHash[url] === undefined) {
          location.href = 'http://mail.' + url;
        } else {
          location.href = util.mailHash[url];
        }
      },
      cblur(ar) {
        if (util.regular(this.emailName.trim(), 'mail')) {
          this.$axios.get(httpUrl.utilUrl + '/platform/checkEmail', {
            params: {
              email: this.emailName
            }
          }).then((res) => {
            if (res.success) {
              if (res.data === false) {
                  this.titler = '该邮箱已绑定账户，请使用其他邮箱';
              } else {
                    if (ar === 1) {
                      this.dialogFormVisible = false;
                      this.$axios.post(httpUrl.utilUrl + '/platform/reqBindMail', {
                          id: this.platId,
                          mail: this.emailName,
                          url: httpUrl.platUrl + '/upMail?sc'
                      }).then((res) => {
                        if (res.success) {
                          this.dias = true;
                        }
                      });
                    }
              }
            }
          });
        } else {
           this.titler = '请输入正确的邮箱地址。';
        }
      },
      mailUpadate(emailset) {
        var emailCookieshow;
        var emailq = emailset.replace(/@.*/, '');
        var emailh = emailset.replace(emailq, '');
        if (emailq.length >= 6) {
          emailCookieshow = emailq.substring(emailq.length - 4, 0) + '****' + emailh;
        }
        if (emailq.length === 5) {
          emailCookieshow = emailq.substring(emailq.length - 3, 0) + '***' + emailh;
        }
        if (emailq.length === 4) {
          emailCookieshow = emailq.substring(emailq.length - 2, 0) + '**' + emailh;
        }
        if (emailq.length === 3) {
          emailCookieshow = emailq.substring(emailq.length - 1, 0) + '*' + emailh;
        }
        if (emailq.length < 3) {
          emailCookieshow = emailq + emailh;
        }
        return emailCookieshow;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../bench-views/workCommon';
  @import '../bench-views/Siderbar.styl';
  .newsmMain
    .updataPa
      display: flex
      flex-direction: column;
      align-items: center
      margin-top: 50px
      .mailTitle
        color: $secondaryFont
      .mailUpdata
        margin-top: 50px
        color: $commonFont
        .el-icon-message
          padding: 3px
          border-radius: 50%
          border:1px solid $mainColor
          color: $mainColor
          margin-right: 30px
        .upGeng
          margin-left: 50px
          padding: 12px 40px
    .newsLeft
      .bg
        background-color: $mainColor
        color: #fff
      .band
        margin-top: 0px
        border-top: none
    .diog
      .el-dialog
        width: 410px
        .boxText
          text-align: center
          margin-bottom: 10px
          margin-top: 15px
        ul
          text-align: center
          .gren
            color: green
            margin: 10px 0 20px 0;
        .boxBody
          text-align: center
          .el-input
            width: 300px
          p
            color: red
      .foobox
        text-align: center
        margin-top: 30px
        .el-button
          width: 200px
</style>
