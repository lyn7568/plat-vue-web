<template>
  <div class="main-content">
    <div class="boxLeft">
      <div class="headPhoto">
        <div class="userInfo">
          <div class="img-div" :style="{backgroundImage: 'url(' + headPhoto + ')'}"></div>
          <p>{{account}}</p>
        </div>
      </div>
      <sidebar></sidebar>
      <div class="exit-menu-item" @click="logout">退出登录</div>
    </div>
    <div class="boxRight">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import Sidebar from './Sidebar';
  import { mapGetters } from 'vuex';
  export default {
    computed: {
      ...mapGetters([
        'bindCompany',
        'headPhoto',
        'account'
      ])
    },
    components: {
      Sidebar
    },
    methods: {
      logout() {
        this.$confirm('您确认要退出登录吗?', '提示', {
          type: 'warning',
          center: true
        }).then(() => {
          this.$store.dispatch('LogOut').then(() => {
            location.href = '/#/loginPlat'
          })
        }).catch(() => {})
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .main-content {
    margin: 20px 0;
    min-height: 500px;
    .boxRight {
      padding:10px 20px;
      float: left;
      width: 880px;
      margin-left: 20px;
      background: #ffffff;
      box-sizing: border-box;
    }
    .boxLeft {
      float: left;
      overflow: hidden;
      width: 200px;
      .headPhoto {
        height: 146px;
        background: #ffffff;
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        .userInfo {
          text-align: center;
          color: #606266;
          p {
            margin-top: 10px;
          }
          .img-div {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin: auto;
            background-size: cover;
          }
        }
      }
      .el-menu {
        border:none;
      }
      .exit-menu-item{
        padding-left: 20px;
        background: #ffffff;
        border-top: 10px solid #f4f6f8;
        box-sizing: content-box;
        height: 56px;
        line-height: 56px;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
</style>
