<template>
  <el-dialog title="添加类型" :visible.sync="visible" width="30%">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="类型名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="hide">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { addGameType } from '@/api/gameType'
export default {
  props: {
    gameTypes: {
      type: Array,
      require: true
    },
    types: {
      type: Array,
      require: true
    }
  },
  data() {
    const duplicationCheck = (rule, value, callback) => {
      const item = this.types.find((item) => item.name === value)
      if (item) {
        return callback(new Error('名称已存在!'))
      }
      return callback()
    }
    return {
      form: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { validator: duplicationCheck, trigger: 'blur' }
        ]
      },
      visible: false
    }
  },

  methods: {
    async onSubmit() {
      const ret = await addGameType(this.form)
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