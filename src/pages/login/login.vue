<template>
  <div class="login-container">
    <div class="login">
      <section class="title">
        <h1>综合管理运营</h1>
        <p>世界上的公司分两种，第一种是“酷公司”，而除此以外
        <p/>
        <p>的我们只能称之为“其它公司”</p>
      </section>
      <el-form class="login-form" size="large" :mode="formData">
        <h1>管理员登录</h1>
        <el-form-item>
          <el-input placeholder="管理员手机号" v-model="formData.mobile"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="密码" type="password" v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="手机验证码" v-model.number="formData.code" style="width:180px;margin-right:9px;"></el-input>
          <el-button type="primary">获取手机验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn" @click="login">登录</el-button>
        </el-form-item>
        <el-form-item class="text-right">
          <a class="find">找回密码</a>
        </el-form-item>
      </el-form>
    </div>

    <footer>
      <p class="text-center badge"><i></i>沪公网安备 31011502002252号 <span style="margin-left:50px;">ICP证：沪10032707</span>
      </p>
    </footer>
  </div>
</template>

<script>
  import {Common__getMenuList} from '@/api/common';
  import {getStorage, setStorage} from '@/assets/js/utils';

  export default {
    name: 'login',
    data() {
      return {
        formData: {
          mobile: '15898909877',
          password: '123456',
          code: '1234',
          type: 2,
          source: '2'
        }
      }
    },
    methods: {
      async login() {
        let xhr = new XMLHttpRequest();
        xhr.open("post", process.env.SSO);
        xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        xhr.send(JSON.stringify(this.formData));
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status == 200) {
              const result = JSON.parse(xhr.responseText);
              const token = result.data.token;
              setStorage('loginToken', token);
              this.$router.push('/index');
            }

          }
        };
        //this.$router.push('/index');
        // try {
        //   const menuList = await Common__getMenuList();
        //   if (menuList.code === "200") {
        //     const headMenu = menuList.data.data;
        //     this.$store.commit("common/STOE_SET_MENUS", headMenu);
        //     this.$router.push('/index');
        //   }
        //
        // } catch (e) {
        //
        // }
      }
    }
  }
</script>

<style scoped lang="scss">
  .login-container {
    .login {
      position: relative;
      height: 640px;
      top: -20px;
      background: #fff url('~@/assets/images/login.png') no-repeat center center;
      .title {
        color: #fff;
        margin-left: 10%;
        padding-top: 110px;
        h1 {
          font-weight: normal;
          font-size: 40px;
          line-height: 100px;
        }
        p {
          font-size: 20px;
          line-height: 35px;
        }
      }
      .login-form {
        width: 380px;
        height: 400px;
        padding: 30px;
        background: #fff;
        position: absolute;
        right: 10%;
        top: 75px;
        h1 {
          font-weight: normal;
          font-size: 18px;
          margin-bottom: 40px;
        }
        .btn {
          width: 100%;
        }
        .find {
          color: #269ef7;
        }
      }
    }
    .badge {
      i {
        display: inline-block;
        background: url('~@/assets/images/badge.png') no-repeat center bottom;
        width: 20px;
        height: 19px;
        vertical-align: middle;
      }

      margin-top: 10px;
    }
  }

</style>
