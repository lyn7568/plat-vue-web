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
            <el-form label-width="100px" class="demo-ruleForm" size="medium">
              <el-form-item label="当前密码">
                <el-input type="password" auto-complete="off"></el-input><span class="forgetPass">忘记密码？</span>
              </el-form-item>
              <el-form-item label="新密码">
                <el-input type="password" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" >
                <el-input type="password"  auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <el-row>
              <el-button type="primary" size="medium" class="save">保存</el-button>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {

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
