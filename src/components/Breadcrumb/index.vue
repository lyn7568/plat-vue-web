<template>
  <el-breadcrumb class="app-breadcrumb" separator=">">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if="item.meta.title">
        <span v-if="item.redirect==='noredirect'||index===levelList.length-1" class="no-redirect">{{item.meta.title}}</span>
        <router-link v-else :to="item.redirect||item.path" replace>{{item.meta.title}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  created() {
    this.getBreadcrumb();
  },
  data() {
    return {
      levelList: null
    };
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (!first.meta.hidden) {
        if (first && first.name !== 'home') {
          matched = [{path: '/home', meta: { title: '首页' }}].concat(matched);
        }
      }
      this.levelList = matched;
    }
  }
};
</script>

<style scoped>
  .app-breadcrumb.el-breadcrumb{
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
  }
  .app-breadcrumb.el-breadcrumb .no-redirect{
    color: #97a8be;
    cursor: text;
  }
</style>
