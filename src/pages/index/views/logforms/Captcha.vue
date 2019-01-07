<template>
  <el-dialog title="请完成验证" :visible.sync="dialogFormVisible" width="460px" @closed="resetCode">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item prop="vc">
        <el-input v-model="form.vc" autocomplete="off" placeholder="请输入图片验证码" class="imageCode"></el-input>
        <img :src="src" class="frmtypeW" @click.stop="refreshImageCode">
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetCode">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    props: ['phone'],
    data() {
      return {
        src: '',
        dialogFormVisible: false,
        form: {
          vc: '',
          phone: ''
        },
        rules: {
          vc: [
            { required: true, message: '请输入验证码' }
          ]
        }
      };
    },
    methods: {
      resetCode() {
        this.$refs.form.resetFields();
        this.dialogFormVisible = false;
      },
      refreshImageCode() {
        this.src = `/ajax/PictureVC?flag=PIC_REG&time=${new Date().getTime()}`;
      },
      capShow() {
        this.refreshImageCode();
        this.dialogFormVisible = !this.dialogFormVisible;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.form.phone = this.phone;
            this.form.vc = this.form.vc.toUpperCase();
            this.$axios.post('ajax/sys/registe/phone/msg', this.form, res => {
              if (res.success) {
                this.$emit('touchSetin');
                this.resetCode();
              } else {
                const errMsg = {
                  '-60001': '验证超时',
                  '-60003': '验证码错误，请重新输入',
                  '0': '一小时内发送短信次数超过限制，请稍后再试'
                }
                this.$message.error(errMsg[res.code]);
                this.refreshImageCode();
              }
            })
          } else {
            return false;
          }
        });
      }
    }
  };
</script>

<style scoped>
  .frmtypeW {
    float: right;
    cursor: pointer;
  }

  .imageCode {
    width: 70%;
  }

  .dialog-footer {
    text-align: center
  }
</style>
