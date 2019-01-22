<template>
  <div class="newsmMain">
    <div class="newsRight">
      <el-tabs v-model="activeName">
        <el-tab-pane label="企业产品" name="first">
          <div class="search-wrapper" align="right">
            <el-button type="primary" icon="el-icon-edit" @click="handerAdd">发布产品</el-button>
          </div>
          <div class="con-box" v-if="platProducts.length" v-loading="tableLoading">
            <div class="con-item" v-for="item in platProducts" :key="item.index">
              <baseProduct :itemSingle="item" :showTime="true"></baseProduct>
              <div class="dele">
                <el-button type="primary" size="mini" @click.stop="handerUpdate(item.id)">修改</el-button>
                <el-button type="danger" size="mini" @click.stop="handerDel(item.id)">删除</el-button>
              </div>
            </div>
            <div class="pagination-container">
              <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page.sync="pageNo"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
          </div>
          <defaultPage v-else></defaultPage>
        </el-tab-pane>
      </el-tabs>
    </div>
    <publishProduct ref="publishProduct" :operateM="operateM" @dialogChanged="dialogChanged"></publishProduct>
    <BackTop></BackTop>
  </div>
</template>

<script>
  import { TimeTr } from '@/libs/util'
  import publishProduct from './publishProduct.vue';
  import baseProduct from '@/components/subTemplate/BaseProduct.vue';

  export default {
    data() {
      return {
        activeName: 'first',
        operateM: {},
        pageSize: 10,
        pageNo: 1,
        total: 0,
        platProducts: [],
        tableLoading: true
      };
    },
    components: {
      baseProduct,
      publishProduct
    },
    computed: {
      ...Vuex.mapGetters([
        'bindCompany'
      ])
    },
    created() {
      this.getProductlist();
    },
    methods: {
      getProductlist() {
        var that = this
        this.$axios.get('/ajax/product/pq', {
          companyId: that.bindCompany,
          pageSize: that.pageSize,
          pageNo: that.pageNo
        }, function(res) {
          that.tableLoading = false
          if (res.success && res.data) {
            const obj = res.data.data
            if (obj.length > 0) {
              for (let i = 0; i < obj.length; ++i) {
                if (obj[i].createTime) {
                  obj[i].createTime = `发布于${TimeTr(obj[i].createTime)}`
                }
              }
              that.total = res.data.total
              that.platProducts = obj
            } else {
              that.pageNo = 1
              that.total = 0
              that.platProducts = []
            }
          } else {
            that.pageNo = 1
            that.total = 0
            that.platProducts = []
          }
        })
      },
      handleCurrentChange(val) {
        this.pageNo = val
        this.getProductlist()
      },
      dialogChanged() {
        this.pageNo = 1
        this.total = 0
        this.platProducts = []
        this.getProductlist()
      },
      handerAdd() {
        this.operateM = { tit: '发布产品', cid: this.bindCompany }
        this.$refs.publishProduct.parentFun()
      },
      handerUpdate(id) {
        this.operateM = { tit: '修改产品', cid: this.bindCompany }
        this.$refs.publishProduct.parentFun(id)
      },
      handerDel(id) {
        var that = this
        this.$cofirm('删除后，该产品将不能恢复，您确定要删除吗？', '删除产品', {
          type: 'warning'
        }).then(() => {
          that.$axios.post('/ajax/product/delete', {
            id: id
          }).then((res) => {
            if (res.success) {
              that.dialogChanged();
            }
          });
        }).catch(() => {});
      }
    }
  };
</script>

<style scoped>
  .con-box{
    margin: 0 -15px;
  }
  .con-box .con-item{
    position:relative;
    cursor: pointer;
  }
  .con-box .con-item .dele{
    display: none;
    position: absolute;
    right: 20px;
    z-index: 20;
    top: 40%;
  }
  .con-box .con-item:hover{
    background: #EEEEEE;
  }
  .con-box .con-item:hover .dele{
    display: block;
  }
</style>
