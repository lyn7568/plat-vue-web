<template>
  <div class="login">
    <div class="logo-wrapper"></div>
    <div class="form-wrapper">
      <form class="form-contain">
        <p class="form-title">登录平台工作台</p>
        <ul class="form-ul">
          <li>
            <input type="email" class="frmtype" hidden autocomplete="off"/>
            <input type="email" class="frmtype companyEmail" placeholder="请输入邮箱账号" autocomplete="off"/>
            <div class="frmmsg">333</div>
          </li>
          <li>
            <input type="password" class="frmtype" placeholder="请输入登录密码"/>
            <div class="frmmsg msgLog2"><span></span></div>
          </li>
          <li>
            <button type="button" disabled class="frmtype btnModel">登录</button>
            <router-link to="workBench">wwww</router-link>
            <router-link class="fontLink" to="">忘记密码？</router-link>
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './style';
</style>
