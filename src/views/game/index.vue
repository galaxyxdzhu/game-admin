<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-button type="primary" style="margin-bottom: 10px" @click="showAddDialog"
      >添加游戏</el-button
    >
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
      <el-table-column prop="src" label="游戏封面">
        <template slot-scope="scope">
          <a style="color: #409eff" :href="scope.row.src" target="_blank">{{
            scope.row.src
          }}</a>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showEditDialog(scope.row)"
            >编辑</el-button
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

    <!-- dialog -->
    <GameEdit
      ref="gameEdit"
      :game="currentGame"
      :gameTypes="gameTypes"
      @updateSuccess="onSuccess"
    />

    <GameAdd ref="gameAdd" :gameTypes="gameTypes" @updateSuccess="onSuccess" />
  </div>
</template>

<script>
import { getGames, getGameTypes } from '@/api/game'
import GameEdit from './gameEdit.vue'
import GameAdd from './gameAdd.vue'
export default {
  components: {
    GameEdit,
    GameAdd
  },
  data() {
    return {
      totalGames: [],
      gameTypes: [],
      currentPage: 1,
      pageSize: 15,
      total: 0,
      currentGame: null
    }
  },
  computed: {
    games() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.totalGames.slice(start, end)
    }
  },
  created() {
    this.getGames()
    this.getGameTypes()
  },
  methods: {
    onSuccess() {
      this.getGames()
    },
    showAddDialog() {},
    // 显示游戏编辑弹窗
    showEditDialog(row) {
      this.currentGame = row
      this.$refs.gameEdit && this.$refs.gameEdit.show()
    },

    showAddDialog() {
      this.$refs.gameAdd && this.$refs.gameAdd.show()
    },
    //获取游戏列表
    async getGames() {
      const ret = await getGames()
      if (ret) {
        const { data } = ret
        this.totalGames = data
        this.total = data.length
      }
    },
    async getGameTypes() {
      const ret = await getGameTypes()
      if (ret) {
        const { data } = ret
        this.gameTypes = data
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