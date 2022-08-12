<template>
  <div class="order-detail">
    <div class="title">
      <div class="name">
        <span>姓名: </span>
        <span>{{ order.name }}</span>
      </div>
      <div class="phone">
        <span>电话: </span>
        <span>{{ order.phone }}</span>
      </div>
    </div>
    <div class="content">
      <el-table
        :data="selectGames"
        border
        style="width: 100%"
        header-row-class-name="table-header"
      >
        <el-table-column prop="id" label="id" width="120px"> </el-table-column>
        <el-table-column prop="name" min-width="350px" label="游戏名称">
        </el-table-column>
        <el-table-column prop="genre" label="游戏类型"> </el-table-column>
        <el-table-column prop="size" label="游戏大小"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getOrderDetail } from '@/api/order'
import { getGames } from '@/api/game'
export default {
  data() {
    return {
      order: {},
      games: [],
      selectGameIds: []
    }
  },
  computed: {
    selectGames() {
      if (this.selectGameIds.length && this.games.length) {
        return this.selectGameIds.map((id) => {
          return this.games.find((game) => game.id == id)
        })
      }
      return []
    }
  },
  created() {
    this.getGames()
    this.getOrderDetail()
  },
  methods: {
    async getOrderDetail() {
      const ret = await getOrderDetail(this.$route.params)
      if (ret && ret.code) {
        this.order = ret.data
        this.selectGameIds = ret.data.games.split(',')
      }
    },
    //获取游戏列表
    async getGames() {
      const ret = await getGames()
      if (ret) {
        const { data } = ret
        this.games = data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.order-detail {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.content {
  width: 100%;
}
</style>