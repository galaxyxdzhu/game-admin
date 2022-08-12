<template>
  <el-dialog title="添加容量" :visible.sync="visible" width="30%">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="名义容量">
        <el-input v-model="form.normalSize"></el-input>
      </el-form-item>
      <el-form-item label="实际容量">
        <el-input v-model="form.actualSize"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="hide">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { addSize } from '@/api/sizes'
export default {
  props: {
    gameTypes: {
      type: Array,
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

  methods: {
    async onSubmit() {
      const ret = await addSize(this.form)
      if (ret.code) {
        this.$emit('updateSuccess')
        this.$message.success('添加成功')
      } else {
        this.$message.success('添加失败')
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