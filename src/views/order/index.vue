<template>
  <div class="app-container">
    <el-table
      :data="orders"
      border
      style="width: 100%"
      header-row-class-name="table-header"
    >
      <el-table-column prop="id" label="id"> </el-table-column>
      <el-table-column prop="name" label="客户姓名"> </el-table-column>
      <el-table-column prop="phone" label="客户电话"> </el-table-column>
      <el-table-column prop="size" label="硬盘大小"> </el-table-column>
      <el-table-column prop="games" label="所选游戏">
        <template slot-scope="scope" v-if="scope.row.games">
          <div v-for="item in selectGames(scope.row.games)" :key="item.id">
            {{ item.name }}
          </div>
          <div v-if="isShowGamedots(scope.row.games)">...</div>
        </template>
      </el-table-column>

      <el-table-column label="下单时间">
        <template slot-scope="scope">
          <span>{{ toDate(scope.row.createAt) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="showOrderDetail(scope.row)"
            >查看</el-button
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
  </div>
</template>

<script>
import { getOrders } from '@/api/order'
import { getGames } from '@/api/game'
export default {
  data() {
    return {
      totalOrders: [],
      games: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      showGamesNumber: 4
    }
  },

  created() {
    this.getGames()
    this.getOrders()
  },
  computed: {
    selectGames() {
      return (ids) => {
        if (this.games && this.orders && ids) {
          let idsArray = ids.split(',')
          idsArray =
            idsArray.length > this.showGamesNumber
              ? idsArray.slice(0, this.showGamesNumber)
              : idsArray
          return idsArray.map((id) => {
            return this.games.find((game) => game.id == id)
          })
        }
        return []
      }
    },
    isShowGamedots() {
      return (ids) => {
        return ids.split(',').length > this.showGamesNumber
      }
    },
    orders() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.totalOrders.slice(start, end)
    }
  },
  methods: {
    showOrderDetail(item) {
      this.$router.push({ name: 'OrderDetail', params: { id: item.id } })
    },
    onCurrentPageChange(val) {
      this.currentPage = val
    },
    toDate(num) {
      if (!num) return ''
      let date = new Date(Number(num))
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? '0' + MM : MM //月补0
      let d = date.getDate()
      d = d < 10 ? '0' + d : d //天补0
      let h = date.getHours()
      h = h < 10 ? '0' + h : h //小时补0
      let m = date.getMinutes()
      m = m < 10 ? '0' + m : m //分钟补0
      let s = date.getSeconds()
      s = s < 10 ? '0' + s : s //秒补0
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
    },
    async getOrders() {
      const ret = await getOrders()
      if (ret) {
        this.totalOrders = ret.data.sort((a, b) => b.createAt - a.createAt)
        this.total = ret.data.length
      }
    },

    async getGames() {
      const ret = await getGames()
      if (ret) {
        this.games = ret.data
      }
    }
  }
}
</script>

<style>
</style>