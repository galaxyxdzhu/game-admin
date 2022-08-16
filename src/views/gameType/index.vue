<template>
  <div class="app-container">
    <el-button type="primary" style="margin-bottom: 10px" @click="showAddDialog"
      >添加类型</el-button
    >
    <el-table
      :data="types"
      border
      style="width: 100%"
      header-row-class-name="table-header"
    >
      <el-table-column prop="id" label="id"> </el-table-column>
      <el-table-column prop="name" label="类型名称"> </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editPlatform(scope.row)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="deletePlatform(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="margin-top: 20px; text-align: right"
      :page-size="pageSize"
      background
      :total="total"
      layout="prev, pager, next, jumper"
      :current-page="currentPage"
      @current-change="onCurrentPageChange"
    >
    </el-pagination>

    <GameTypeAdd
      ref="gameTypeAdd"
      :types="totalTypes"
      @updateSuccess="handleSuccess"
    />
    <GameTypeEdit
      ref="gameTypeEdit"
      @updateSuccess="handleSuccess"
      :gameType="curGameType"
      :types="totalTypes"
    />
  </div>
</template>

<script>
import { getGameTypes, deleteGameType } from '@/api/gameType'
import GameTypeAdd from './gameTypeAdd.vue'
import GameTypeEdit from './gameTypeEdit.vue'
export default {
  components: {
    GameTypeAdd,
    GameTypeEdit
  },
  data() {
    return {
      totalTypes: [],
      currentPage: 1,
      pageSize: 15,
      total: 0,
      curGameType: null
    }
  },

  created() {
    this.getGameTypes()
  },
  computed: {
    types() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.totalTypes.slice(start, end)
    }
  },
  methods: {
    async getGameTypes() {
      const ret = await getGameTypes()
      if (ret) {
        this.totalTypes = ret.data
        this.total = ret.data.length
      }
    },
    editPlatform(type) {
      this.curGameType = type
      this.$refs.gameTypeEdit.show()
    },
    showAddDialog() {
      this.$refs.gameTypeAdd.show()
    },
    handleSuccess() {
      this.getGameTypes()
    },
    onCurrentPageChange(val) {
      this.currentPage = val
    },
    deletePlatform(item) {
      this.$confirm(`确定删除 <${item.name}>?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const ret = await deleteGameType({ id: item.id })
        if (ret) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getGameTypes()
        }
      })
    }
  }
}
</script>

<style>
</style>