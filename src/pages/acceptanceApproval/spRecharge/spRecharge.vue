<template>
  <section>
    <el-form label-width="150px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="企业名称:"></el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="渠道"></el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="企业类型"></el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="企业状态"></el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="付费类型:"></el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="信控等级"></el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="计费号码"></el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="账户余额"></el-form-item>
        </el-col>
      </el-row>


    </el-form>
  </section>
</template>

<script>
  export default {
    name: "sp-recharge"
  }
</script>

<style scoped>

</style>
