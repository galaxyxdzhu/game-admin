<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img
            :src="avatar"
            class="user-avatar"
            style="border: 1px solid #ccc"
          />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> Home </el-dropdown-item>
          </router-link>

          <el-dropdown-item divided @click.native="showPassWordDialog">
            <span style="display: block">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog title="修改密码" :visible.sync="visible" width="30%">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="用户名">
          <el-input v-model="form.username" disabled></el-input>
        </el-form-item>

        <el-form-item prop="password" label="新密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即修改</el-button>
          <el-button @click="visible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import avatarImage from '@/assets/images/avatar.jpeg'
import { changePassword } from '@/api/user'
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    const validator = (rule, value, callback) => {
      if (value.length < 6) {
        return callback(new Error('密码长度不得低于6位数'))
      }
      return callback()
    }
    return {
      form: {
        username: 'admin',
        password: ''
      },
      rules: {
        password: [
          { required: true, message: '密码为必填项', trigger: 'blur' },
          {
            validator,
            trigger: 'blur'
          }
        ]
      },
      visible: false,
      avatar: avatarImage
    }
  },
  computed: {
    ...mapGetters(['sidebar'])
  },
  methods: {
    showPassWordDialog() {
      this.visible = true
    },
    onSubmit() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          const ret = await changePassword(this.form)
          if (ret) {
            this.visible = false
            this.$message.success('修改成功')
            setTimeout(() => {
              this.logout()
            }, 1000)
          }
        }
      })
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
