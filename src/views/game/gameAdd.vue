<template>
  <el-dialog title="添加游戏" :visible.sync="visible" width="30%">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="游戏名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="游戏类型">
        <el-select v-model="form.genre" placeholder="请选择活动区域">
          <el-option
            v-for="type in gameTypes"
            :key="type"
            :label="type"
            :value="type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="游戏尺寸">
        <el-input v-model="form.size"></el-input>
      </el-form-item>

      <el-form-item label="游戏封面">
        <el-input v-model="form.src"></el-input>
        <el-upload
          class="upload-demo"
          :multiple="false"
          action="http://127.0.0.1:3000/upload"
          list-type="picture"
          :on-success="onUploadSuccess"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="hide">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { addGame } from '@/api/game'

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
        src: '',
        size: '',
        genre: ''
      },
      visible: false
    }
  },

  methods: {
    onUploadSuccess(res) {
      if (res.data) {
        this.form.src = res.data
      }
    },
    async onSubmit() {
      const ret = await addGame(this.form)
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