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
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'bindCompany'
    ]),
    routes() {
      var aRouter = this.$router.options.routes
      var dRouter = []
      if (!this.bindCompany) {
        for (let i = 0; i < aRouter[0].children.length; ++i) {
          var Ltm = []
          if (aRouter[0].children[i].name !== 'myBuseiness') {
            Ltm.push(aRouter[0].children[i])
          }
        }
        dRouter.push(Ltm)
      } else {
        dRouter = aRouter
      }
      return dRouter
    }
  }
}
</script>
