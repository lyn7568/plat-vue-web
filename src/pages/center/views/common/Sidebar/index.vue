<template>
  <el-menu
    mode="vertical"
    :default-openeds="['personalCenter', 'myBusiness']"
    :show-timeout="200"
    :default-active="$route.path">
    <sidebar-item v-for="route in routes" :key="route.name" :item="route" :base-path="route.path"></sidebar-item>
  </el-menu>
</template>

<script>
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  watch: {
    bindCompany(val) {
      this.bindCompany = val
    }
  },
  computed: {
    ...Vuex.mapGetters([
      'bindCompany'
    ]),
    routes() {
      var aRouter = this.$router.options.routes
      if (!this.bindCompany) {
        aRouter[0].children.splice(2, 1)
      }
      return aRouter
    }
  }
}
</script>
