<template>
  <div class="app-container">
    <el-button type="primary" style="margin-bottom: 10px" @click="showAddDialog"
      >添加平台</el-button
    >
    <el-table
      :data="platforms"
      border
      style="width: 100%"
      header-row-class-name="table-header"
    >
      <el-table-column prop="id" label="id"> </el-table-column>
      <el-table-column prop="name" label="平台名称"> </el-table-column>
      <el-table-column prop="src" label="平台封面"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="deletePlatform(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <PlatformAdd ref="platformAdd" @updateSuccess="handleAddSuccess" />
  </div>
</template>

<script>
import { getPlatforms, deletePlatform } from '@/api/platform'
import PlatformAdd from './platformAdd.vue'
export default {
  components: {
    PlatformAdd
  },
  data() {
    return {
      platforms: []
    }
  },
  created() {
    this.getPlatforms()
  },

  methods: {
    showAddDialog() {
      this.$refs.platformAdd.show()
    },
    handleAddSuccess() {
      this.getPlatforms()
    },
    async getPlatforms() {
      const ret = await getPlatforms()
      if (ret) {
        this.platforms = ret.data
      }
    },
    async deletePlatform(item) {
      this.$confirm(`确定删除 <${item.name}>?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const ret = await deletePlatform({ id: item.id })
        if (ret) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getPlatforms()
        }
      })
    }
  }
}
</script>

<style>
</style>