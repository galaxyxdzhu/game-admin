<template>
  <div class="app-container">
    <el-button type="primary" style="margin-bottom: 10px" @click="showAddDialog"
      >添加容量</el-button
    >
    <el-table
      :data="sizes"
      border
      style="width: 100%"
      header-row-class-name="table-header"
    >
      <el-table-column prop="id" label="id"> </el-table-column>
      <el-table-column prop="normalSize" label="名义容量"> </el-table-column>
      <el-table-column prop="actualSize" label="实际容量"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="deleteSize(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <SizeAdd ref="sizeAdd" @updateSuccess="handleAddSuccess" />
  </div>
</template>

<script>
import { getSizes, deleteSize } from '@/api/sizes'
import SizeAdd from './sizeAdd.vue'
export default {
  components: {
    SizeAdd
  },
  data() {
    return {
      sizes: []
    }
  },
  created() {
    this.getSizes()
  },

  methods: {
    showAddDialog() {
      this.$refs.sizeAdd.show()
    },
    handleAddSuccess() {
      this.getSizes()
    },
    async getSizes() {
      const ret = await getSizes()
      if (ret) {
        this.sizes = ret.data
      }
    },
    async deleteSize(item) {
      this.$confirm(`确定删除 <${item.normalSize}>?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const ret = await deleteSize({ id: item.id })
        if (ret) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getSizes()
        }
      })
    }
  }
}
</script>

<style>
</style>