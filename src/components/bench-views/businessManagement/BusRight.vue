<template>
  <div class="listMain">
    <div class="search">
      <div class="search-wrapper">
        <el-input placeholder="输入关键词" v-model="inValue"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
    </div>
    <div class="searchList">
      <BusTemplate :url='url' :keyValue='keyValue' :flag='1'></BusTemplate>
    </div>
  </div>
</template>

<script>
  import BusTemplate from '../BusTemplate.vue';
  export default {
    data() {
      return {
        keyValue: '',
        url: '/ajax/platform/info/pqResidentOrgs',
        inValue: ''
      };
    },
    components: {
      BusTemplate
    },
    methods: {
      search() {
        this.keyValue = this.inValue;
      }
    }
  };
</script>
