<template>
  <div class="app-container">
    <!-- 表格 -->
    <div class="title">
      <el-button
        type="primary"
        style="margin-bottom: 10px"
        @click="showAddDialog"
        >添加游戏</el-button
      >
      <el-input
        style="width: 320px"
        placeholder="请输入内容"
        v-model="search"
        clearable
        class="input-with-select"
        @input="handleSearch"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
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
      <el-table-column prop="rate" label="游戏评分"> </el-table-column>
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
          <el-button type="text" size="small" @click="deleteGame(scope.row)"
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
import { getGames, deleteGame } from '@/api/game'
import { getGameTypes } from '@/api/gameType'
import GameEdit from './gameEdit.vue'
import GameAdd from './gameAdd.vue'
import { mapActions } from 'vuex'
export default {
  components: {
    GameEdit,
    GameAdd
  },
  data() {
    return {
      totalGames: [],
      originGames: [],
      gameTypes: [],
      currentPage: 1,
      pageSize: 15,
      total: 0,
      search: '',
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
    ...mapActions({
      setGameList: 'game/setGameList'
    }),
    onSuccess() {
      this.getGames()
    },

    handleSearch() {
      if (this.search) {
        this.totalGames = this.totalGames.filter(
          (item) => item.name.indexOf(this.search) !== -1
        )
        this.total = this.totalGames.length
      } else {
        this.totalGames = [...this.originGames]
        this.total = this.totalGames.length
      }
    },
    deleteGame(item) {
      this.$confirm(`确定删除 <${item.name}>?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const ret = await deleteGame({ id: item.id })
        if (ret) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getGames()
        }
      })
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
        const games = data.sort((a, b) => b.id - a.id)
        this.totalGames = [...games]
        this.originGames = [...games]
        this.total = games.length
        this.setGameList(data)
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

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>