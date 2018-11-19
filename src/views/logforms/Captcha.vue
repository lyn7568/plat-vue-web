<template>
<el-dialog title="请完成验证" :visible.sync="dialogFormVisible" width="460px">
  <el-form :model="form">
    <el-form-item>
      <el-input v-model="form.name" autocomplete="off" placeholder="请输入图片验证码" class="imageCode"></el-input>
      <img src="/ajax/PictureVC" class="frmtypeW">
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
</template>
<script>
  export default {
    data() {
      return {
        dialogFormVisible: false,
        form: {
          name: ''
        }
      };
    },
    methods: {
        capShow() {
            this.dialogFormVisible = !this.dialogFormVisible;
        }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .frmtypeW
    float: right
  .imageCode
    width: 70%
  .dialog-footer
    text-align: center
</style>
