<template>
  <el-dialog title="编辑游戏" :visible.sync="visible" width="30%">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="游戏名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="游戏类型">
        <el-select v-model="form.genre" placeholder="请选择游戏类型">
          <el-option
            v-for="type in gameTypes"
            :key="type.id"
            :label="type.name"
            :value="type.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="游戏平台">
        <el-select v-model="form.platform" placeholder="请选择游戏平台">
          <el-option
            v-for="item in platforms"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="游戏尺寸">
        <el-input v-model="form.size"></el-input>
      </el-form-item>
      <el-form-item label="游戏评分">
        <el-input v-model="form.rate"></el-input>
      </el-form-item>

      <el-form-item label="游戏封面">
        <el-input v-model="form.src"></el-input>
        <el-upload
          class="upload-demo"
          :multiple="false"
          action="/api/upload"
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
import { updateGame } from '@/api/game'
export default {
  props: {
    game: {
      type: Object,
      require: true
    },
    gameTypes: {
      type: Array,
      require: true
    },
    platforms: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      form: null,
      visible: false
    }
  },
  watch: {
    game: {
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
      const ret = await updateGame(this.form)
      if (ret.code) {
        this.$emit('updateSuccess')
        this.$message.success('更新成功')
      } else {
        this.$message.success('更新失败')
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