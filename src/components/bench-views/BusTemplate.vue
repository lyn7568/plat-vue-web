<template>
  <ul>
    <li class="list-item">
      <div class="list-head"></div>
      <div class="list-info">
        <div class="list-tit list-tig">
          北京科大材料分析检测中心限公司
          <em class="authicon icon-com"></em>
        </div>
        <ul class="list-tag">
          <li>企业类型</li>
          <li>所属行业 | 所属行业 | 所属行业</li>
        </ul>
      </div>
      <div class="dele">
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </div>
    </li>
    <div class="taglist">
      <el-pagination background layout="prev, pager, next" :total="100">
      </el-pagination>
    </div>
  </ul>
</template>
