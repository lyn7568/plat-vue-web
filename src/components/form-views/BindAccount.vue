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
        <el-tab-pane label="账号绑定">
          <div class="updataPa">
            <div class="mailTitle">您可以使用以下方式登录账户</div>
            <div class="mailUpdata">
              <span class="el-icon-message"></span>已绑定邮箱 lixiao****@ekexiu.com
              <el-button type="primary" class="upGeng" @click="updata">更换</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      updata() {
        alert(1);
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
      .band
        margin-top: 0px
        border-top: none
</style>
