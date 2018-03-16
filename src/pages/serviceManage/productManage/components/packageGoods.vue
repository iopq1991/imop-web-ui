<template>
  <section class="package-goods-container">
    <el-form label-width="150px">
      <div class="title">
        <v-title title="基本信息"></v-title>
      </div>
      <div class="line"></div>
      <el-form-item label="商品名称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="所属渠道">
        <Platform :showCity="false"/>
      </el-form-item>
      <el-form-item label="所属业务">
        <el-select class="business"></el-select>
        <el-select class="business m-l-20"></el-select>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input type="textarea" style="width:440px;"></el-input>
      </el-form-item>
      <div class="title">
        <v-title title="商品内容"></v-title>
      </div>

      <div class="title">
        <v-title title="其他信息"></v-title>
      </div>
      <div class="line"></div>
      <el-form-item label="上架时间">
        <el-radio-group>
          <el-radio>立即上架</el-radio>
          <el-radio>预约上架</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="下架时间">
        <el-date-picker type="date" v-model="formData.time"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button>取消</el-button>
        <el-button type="primary">保存</el-button>
        <el-button type="primary">上架</el-button>
      </el-form-item>
    </el-form>
    <el-dialog>
      <el-table>

      </el-table>
    </el-dialog>
  </section>
</template>

<script>
  export default {
    name: "package-goods"
  }
</script>

<style scoped lang="scss">
  .package-goods-container {
    padding: 40px;
    .line {
      height: 1px;
      background: #ddd;
      margin: 20px 0;
    }
  }
</style>

<style lang="scss">
  .package-goods-container {
    .el-input__inner {
      width: 320px;
    }
    .platformSelector-contianer {
      > input {
        width: 320px !important;
      }
    }
    .business {
      .el-input__inner {
        width: 150px;
      }
    }
  }
</style>
