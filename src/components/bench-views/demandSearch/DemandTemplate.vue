<template>
  <div class="listMain">
    <div class="search">
      <div class="search-wrapper">
        <el-input placeholder="输入关键词" v-model="searchValue" maxlength=50></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
    </div>
    <div class="select">
      <div class="week">
        <span class="weekText">周期：</span>
        <el-select v-model="value" placeholder="请选择" @change="changeDate">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="week">
        <span class="weekText">预算：</span>
        <el-select v-model="budgetValue" placeholder="请选择" @change="changeBudget">
          <el-option
            v-for="item in budget"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="week" v-if="flag==1">
        <span class="weekText">排序：</span>
        <el-select v-model="sortValue" placeholder="请选择" @change="changeSort">
          <el-option
            v-for="item in sort"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="searchList">
      <ul>
        <li class="list-item" v-for="(item, index) in dataList" :key="index" @click="kexiuExpert(item.id)">
          <div class="list-info">
            <div class="list-tit list-tig">{{item.title}}</div>
            <ul class="list-tag">
              <li>{{item.orgName}}</li>
              <li>发布于 {{comTime(item.createTime)}}</li>
              <li>浏览量 {{item.pageViews}}</li>
            </ul>
            <ul class="list-tag list-tagl">
              <li>{{item.descp}}</li>
            </ul>
            <ul class="list-tag list-tagy">
              <li>所在城市：{{item.city}}</li>
              <li v-if="item.duration !== '0'">预计周期：{{options[item.duration].label}}</li>
              <li v-if="item.cost !== '0'">费用预算：{{budget[item.cost].label}}</li>
              <li :class="{ coRed: sty(item)}" v-if="flag==1">有效期至：{{timeCh(item)}}</li>
              <li class="coGreen" v-if="flag==2">有效期至：{{timeCh(item)}}</li>
            </ul>
          </div>
        </li>
      </ul>
      <defaultPage v-show="ifDefault"></defaultPage>
      <div class="taglist" v-show="!ifDefault">
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="10" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
   import Cookies from 'js-cookie';
   import httpUrl from '@/libs/http';
   import util from '@/libs/util';
   export default {
     props: ['flag'],
     data() {
       return {
         ifDefault: false,
         expertParameters: {},
         dataList: [],
         total: 0,
         platId: '',
         searchValue: '',
         isActive: '',
         options: util.workComm.durationTime,
         value: '',
         budget: util.workComm.costRange,
         budgetValue: '',
         sort: [{
           value: '1',
           label: '最新发布'
         }, {
           value: '0',
           label: '即将到期'
         }],
         sortValue: ''
       };
     },
     computed: {
      // optionsNew: function() {
      //   let arr = util.Dictionary.durationTime;
      //   arr.unshift({
      //     value: '',
      //     label: '全部'
      //   });
      //   return arr;
      // },
      // budgetNew: function() {
      //   let arr = util.Dictionary.costRange;
      //   arr.unshift({
      //     value: '',
      //     label: '全部'
      //   });
      //   console.log(arr)
      //   return arr;
      // }
     },
     created() {
      this.platId = Cookies.get('platId');
      this.expertParameters = {
        source: 'xttjpt',
        key: this.searchValue,
        pageSize: 10,
        pageNo: 1
      };
      if (this.flag === 2) {
        this.expertParameters.byCreateTime = 2;
        this.expertParameters.state = 2;
      } else {
        this.expertParameters.byCreateTime = 1;
        this.expertParameters.state = 1;
      }
      this.expertList();
    },
    methods: {
      search() {
        this.expertParameters.key = this.searchValue;
        this.expertList();
      },
      sty(item) {
        var nowDate = new Date();
        var year = nowDate.getFullYear();
        var month = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
        var day = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate();
        var day1 = new Date(year + '-' + month + '-' + day);
        var day2 = new Date(item.invalidDay.substr(0, 4) + '-' + item.invalidDay.substr(4, 2) + '-' + item.invalidDay.substr(6, 2));
        if ((day2 - day1) / (1000 * 60 * 60 * 24) < 7) {
             return true;
        }
        return false;
      },
      timeCh(item) {
        if (item.invalidDay.substr(4, 1) === '0') {
          if (item.invalidDay.substr(6, 1) === '0') {
            return item.invalidDay.substr(0, 4) + '年' + item.invalidDay.substr(5, 1) + '月' + item.invalidDay.substr(7, 1) + '日';
          } else {
            return item.invalidDay.substr(0, 4) + '年' + item.invalidDay.substr(5, 1) + '月' + item.invalidDay.substr(6, 2) + '日';
          }
        } else {
          return item.invalidDay.substr(0, 4) + '年' + item.invalidDay.substr(4, 2) + '月' + item.invalidDay.substr(6, 2) + '日';
        }
      },
      changeDate(p) {
        if (p === '') {
          this.$delete(this.expertParameters, 'duration');
        } else {
          this.expertParameters.duration = p;
        }
        this.expertList();
      },
      changeBudget(p) {
        if (p === '') {
          this.$delete(this.expertParameters, 'cost');
        } else {
          this.expertParameters.cost = p;
        }
        this.expertList();
      },
      changeSort(p) {
        this.expertParameters.byCreateTime = p;
        this.expertList();
      },
      comTime: util.commenTime,
      expertList() {
        this.dataList = [];
        this.$axios.get(httpUrl.hQuery.demand.nopq, {
          params: this.expertParameters
        }).then((res) => {
          if (res.success) {
            this.dataList = res.data.data;
            if (res.data.data.length === 0) {
              this.ifDefault = true;
            } else {
              this.ifDefault = false;
            }
            this.total = res.data.total;
          }
        });
      },
      kexiuExpert(id) {
        window.open(util.defaultSet.link.demand + id);
      },
      handleCurrentChange(val) {
        this.expertParameters.pageNo = val;
        this.expertList();
      }
    }
   };
</script>
