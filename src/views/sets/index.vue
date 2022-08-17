<template>
  <div class="setting-container">
    <ul>
      <li>
        <div class="name">web表格显示:</div>
        <div class="value">
          <el-radio-group v-model="tableIndex" @change="handleChange">
            <el-radio label="1">表格</el-radio>
            <el-radio label="2">图片</el-radio>
            <el-radio label="3">全部</el-radio>
          </el-radio-group>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getSetting, updateSetting } from '@/api/settings'
export default {
  data() {
    return {
      tableIndex: 1
    }
  },
  created() {
    this.getSetting()
  },
  methods: {
    handleChange() {
      this.updateSetting()
    },
    async getSetting() {
      const ret = await getSetting({ name: 'table_view' })
      if (ret) {
        this.tableIndex = ret.data.value
      }
    },
    async updateSetting() {
      const ret = await updateSetting({
        name: 'table_view',
        value: this.tableIndex
      })
      if (ret.code) {
        this.$message.success('更新成功')
      } else {
        this.$message.error('更新失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  .name {
    width: 200px;
  }
}
</style>