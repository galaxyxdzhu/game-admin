<template>
  <el-dialog title="添加类型" :visible.sync="visible" width="30%">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="类型名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">更新</el-button>
        <el-button @click="hide">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template> 

<script>
import { updateGameType } from '@/api/gameType'
export default {
  props: {
    gameType: {
      type: Object,
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
  watch: {
    gameType: {
      immediate: true,
      handler(val) {
        this.form = { ...val }
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const ret = await updateGameType(this.form)
          if (ret.code) {
            this.$emit('updateSuccess')
            this.$message.success('更新成功')
          } else {
            this.$message.success('更新失败')
          }
          this.hide()
        }
      })
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