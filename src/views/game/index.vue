<template>
  <div class="app-container">
    <el-table
      :data="games"
      border
      style="width: 100%"
      header-row-class-name="table-header"
    >
      <el-table-column prop="id" label="id"> </el-table-column>
      <el-table-column prop="name" label="游戏名称"> </el-table-column>
      <el-table-column prop="genre" label="游戏类型"> </el-table-column>
      <el-table-column prop="size" label="游戏大小"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="margin-top: 20px; text-align: right"
      :page-size="pageSize"
      background
      :total="1000"
      layout="prev, pager, next, jumper"
      :current-page="currentPage"
      @current-change="onCurrentPageChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getGames } from '@/api/game'
export default {
  data() {
    return {
      totalGames: [],
      currentPage: 1,
      pageSize: 15,
      total: 0
    }
  },
  computed: {
    games() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.totalGames.slice(start, end)
    }
  },
  mounted() {
    this.getGames()
  },
  methods: {
    async getGames() {
      const ret = await getGames()
      if (ret) {
        const { data } = ret
        this.totalGames = data
        this.total = data.length
      }
    },
    onCurrentPageChange(val) {
      this.currentPage = val
    }
  }
}
</script>

<style >
</style>