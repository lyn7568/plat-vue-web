<template>
  <el-dialog :title="operateM.tit" :visible.sync="userDialogVisible" width="750px">
    <el-form :model="formObj" :rules="rulesObj" ref="formObj" label-width="80px" class="update-wrapper demo-ruleForm">
      <el-row :gutter="20" class="update-main">
        <el-col :span="24">
            <el-form-item label="产品图片" prop="img">
            <uploadFile :upImgsStr="formObj.img" :uploadImg="uploadImg" @uploadfun="uploadfun"></uploadFile>
            </el-form-item>
        </el-col>
        <el-col :span="24">
            <el-form-item label="产品名称" prop="name">
            <el-input v-model="formObj.name" placeholder="请填写产品名称" maxlength="30"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="24">
            <el-form-item label="关键词">
            <dynamicTags :dyStr="keywordObj" :tagInfo="tagKeyword" @turnTags="turnKeywordTags"></dynamicTags>
            </el-form-item>
        </el-col>
        <el-col :span="24">
            <el-form-item label="产品简介" prop="cnt">
            <el-input type="textarea" :rows="4" v-model="formObj.cnt" placeholder="请填写产品简介" maxlength="250"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="24">
            <el-form-item label="厂商型号" prop="spec">
            <el-input v-model="formObj.spec" placeholder="请填写厂商型号" maxlength="50"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="产地" prop="producingArea">
            <el-input v-model="formObj.producingArea" placeholder="请填写产地" maxlength="50"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="官方价格" prop="price">
            <el-input v-model="formObj.price" placeholder="请填写官方价格" maxlength="50"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="24">
            <el-form-item label="性能参数" prop="parameter">
            <el-input type="textarea" :rows="6" v-model="formObj.parameter" placeholder="请填写产品性能参数" maxlength="1000"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="24">
            <el-form-item label="详情描述" prop="descp">
            <el-input type="textarea" :rows="8" v-model="formObj.descp" placeholder="请填写产品详情描述" maxlength="5000"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="24" class="el-btn-col">
          <el-form-item class="el-btn-col-box">
            <el-button type="primary" @click="submitForm('formObj')">保存</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
  import cityPicker from '@/components/CityPicker'
  import dynamicTags from '@/components/DynamicTags'
  import uploadFile from '@/components/uploadFile'

  export default {
    props: ['operateM'],
    data() {
      return {
        userDialogVisible: false,
        companyId: '',
        productId: '',
        tagKeyword: {
          lableTit: '关键词',
          placeholder: '请填写相关的关键词，如：腐蚀防护、石墨烯、纳米材料',
          limitCount: 10,
          tagsNum: 5
        },
        keywordObj: [],
        formLoading: true,
        formObj: {
          name: '',
          img: '',
          logo: '',
          cnt: '',
          descp: '',
          spec: '',
          producingArea: '',
          price: '',
          parameter: '',
          createTime: '',
          keyword: []
        },
        rulesObj: {
          img: [{ required: true, message: '请输入产品图片', trigger: 'blur' }],
          name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
          cnt: [{ required: true, message: '请输入产品简介', trigger: 'blur' }]
        },
        uploadImg: {
          url: '/ajax/product/logo',
          tip: '上传产品图片',
          width: '200px',
          height: '200px',
          limit: 3
        }
      }
    },
    components: {
      dynamicTags,
      cityPicker,
      uploadFile
    },
    watch: {
      userDialogVisible(val) {
        !val && setTimeout(() => {
          this.$refs['formObj'].resetFields()
          this.$refs['formObj'].clearValidate()
        }, 0)
      }
    },
    methods: {
      parentFun(id) {
        var that = this
        if (id) {
          this.productId = id
          this.getProductInfo()
          this.getProductKeyword()
        } else {
          this.formObj = {
            name: '',
            img: '',
            logo: '',
            cnt: '',
            descp: '',
            spec: '',
            producingArea: '',
            price: '',
            parameter: '',
            createTime: '',
            keyword: []
          }
        }
        setTimeout(function() {
          that.userDialogVisible = true
        }, 0)
      },
      getProductInfo() {
        var that = this
        that.$axios.get('/ajax/product/qo', {
          id: that.productId
        }, function(res) {
          that.formLoading = false
          if (res.success) {
            const obj = res.data
              that.formObj = {
              name: obj.name,
              img: obj.img,
              logo: obj.logo,
              cnt: obj.cnt,
              descp: obj.descp,
              spec: obj.spec,
              producingArea: obj.producingArea,
              price: obj.price,
              parameter: obj.parameter,
              createTime: obj.createTime
            }
          }
        })
      },
      getProductKeyword() {
        var that = this
        that.$axios.get('/ajax/product/qo/keyword', {
          id: that.productId
        }, function(res) {
          if (res.success && res.data) {
            const str = res.data
            var objKey = []
            if (str.length > 0) {
              str.map(item => {
                objKey.push(item.keyword)
              })
            }
            that.keywordObj = objKey
            that.formObj.keyword = objKey
          }
        })
      },
      submitForm(formName) {
        var that = this
        that.$refs[formName].validate((valid) => {
          if (valid) {
            const form = that.formObj
            const paramsData = {
              companyId: that.operateM.cid,
              name: form.name,
              img: form.img,
              logo: form.logo,
              cnt: form.cnt,
              spec: form.spec,
              descp: form.descp,
              producingArea: form.producingArea,
              price: form.price,
              parameter: form.parameter,
              keyword: JSON.stringify(form.keyword)
            }
            if (that.productId) {
              const paramsId = { id: that.productId }
              const obj = Object.assign(paramsId, paramsData)
              that.$axios.put('/ajax/product/update', obj, function(res) {
                if (res.success) {
                  that.$message({
                    message: '修改成功',
                    type: 'success'
                  })
                  setTimeout(function() {
                    that.userDialogVisible = false
                    that.$parent.getProductlist()
                  }, 0)
                }
              })
            } else {
              that.$axios.post('/ajax/product/insert', paramsData, function(res) {
                if (res.success) {
                  that.$message({
                    message: '发布成功',
                    type: 'success'
                  })
                  setTimeout(function() {
                    that.userDialogVisible = false
                    that.$parent.getProductlist()
                  }, 0)
                }
              })
            }
          } else {
            window.scroll(0, 0)
            return false
          }
        })
      },
      turnKeywordTags(msg) {
        this.formObj.keyword = msg
      },
      uploadfun(value) {
        this.formObj.img = value
      }
    }
  }
</script>
