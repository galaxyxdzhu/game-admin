<template>
  <el-dialog title="添加平台" :visible.sync="visible" width="30%">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="平台名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="平台封面">
        <el-input v-model="form.src"></el-input>
        <el-upload
          class="upload-demo"
          :multiple="false"
          action="http://127.0.0.1:3000/upload"
          list-type="picture"
          :on-success="onUploadSuccess"
        >
          <el-button size="small" type="text">点击上传</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">更新</el-button>
        <el-button @click="hide">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { updatePlatform } from '@/api/platform'
export default {
  props: {
    platform: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      form: {
        name: '',
        src: ''
      },
      visible: false
    }
  },
  watch: {
    platform: {
      immediate: true,
      handler(val) {
        this.form = { ...val }
      }
    }
  },

  methods: {
    onUploadSuccess(res) {
      if (res.data) {
        this.form.src = res.data
      }
    },
    async onSubmit() {
      const ret = await updatePlatform(this.form)
      if (ret.code) {
        this.$emit('updateSuccess')
        this.$message.success('更新成功')
      } else {
        this.$message.error('更新失败')
      }
      this.hide()
    },
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    }
  }
}
</script>

<style>
</style>