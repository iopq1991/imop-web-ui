<template>
  <section class="goods-list-container">
    <search>
      <div slot="rol_1">
        <el-form-item label="渠道">
          <platfrom :showCity="false"/>
        </el-form-item>
        <el-form-item label="商品编号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="商品状态">
          <el-checkbox-group style="width:150%;">
            <el-checkbox>草稿</el-checkbox>
            <el-checkbox>待上架</el-checkbox>
            <el-checkbox>上架</el-checkbox>
            <el-checkbox>下架</el-checkbox>
            <el-checkbox>删除</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <div slot="rol_2">
        <el-form-item label="上架时间">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input></el-input>
        </el-form-item>
      </div>
      <div slot="rol_3">
        <el-form-item label="下架时间">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="商品类型">
          <el-input></el-input>
        </el-form-item>
      </div>
      <div slot="rol_4">
        <el-form-item label="所属业务">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="周期类型">
          <el-select></el-select>
        </el-form-item>
      </div>
    </search>
    <list/>
  </section>

</template>

<script>
  import Search from '@/components/Search/Search';
  import Platfrom from '@/components/PlatformSelector/platformSelector';
  import List from '@/components/List/List';

  export default {
    name: "goods-list",
    components: {
      Search, Platfrom, List
    }
  }
</script>

<style scoped>

</style>
