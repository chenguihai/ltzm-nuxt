<template>
  <div class="turn-list" v-if="emptyCheck ? (emptyCheck && eachData.length > 0) : !emptyCheck">
    <slot name="title"></slot>
    <div class="list-con">
      <turnItem :item-data="item" v-for="(item,index) in eachData" :key="index"></turnItem>
    </div>
    <div class="pages" v-if="showPage">
      <el-pagination :total="total" @current-change="pageChange" :current-page="nowPage" :page-size="pageSize" layout="prev, pager, next, jumper" prev-text="上一页" next-text="下一页">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import turnItem from './turnItem'
import { getTurnList, searchTurnTime,journalShopList } from '@/api/turn-time'
import { pageMixin } from '@/utils/common-mixins'
export default {
  name: 'uploadList',
  components: { turnItem },
  mixins: [pageMixin('finalData')],
  props: {
    isVideo: {
      type: Boolean,
      default: true
    },
    turnType: {
        type:Number,
        default:0
    },
    isLike: {
      type: Boolean,
      default: false
    },
    chooseData: {
      type: [Object, Array],
      default: () => []
    },
    isNew: {
      // 最新动态
      type: Boolean,
      default: false
    },
    showPage: {
      // 显示页码
      type: Boolean,
      default: false
    },
    emptyCheck: {
      // 空检测
      type: Boolean,
      default: false
    },
    listName: '',
    keywords: '',
  },
  data () {
    return {
      nowListType: 1,
      localData: null
    };
  },
  provide () {
    return {
      xTurnList: this
    };
  },
  inject: {
    indexData: {
      default: null
    },
    nowPath: {
      default: ''
    }
  },
  computed: {
    listData () {
      if (!this.indexData || !this.listName) return []
      return this.listName.split(';').reduce((pre, cur) => pre[cur], this.indexData)
    },
    searchSub () {
      return {
        keyword: this.keywords,
      }
    },
    finalData () {
      return this.localData || this.listData
    },
    eachData () {
      return this.finalData.data
    }
  },
  created () {
    this.init()
  },
  watch: {
    turnType (val) {
      this.pageChange(1)
    },
    searchSub (val) {
      this.nowPage = 1
      this.pageChange(this.nowPage)
    }
  },
  methods: {
    init () {
      this.$on("handleChange", value => this.nowListType = value)
    },
    async pageChange (cur) {
      this.typeChangeV(cur)
    },
    async typeChangeV (page) {
      let opts = {
        type: this.turnType,
        uid:this.indexData.shop_info.uid,
        keyword:this.keywords,
        page
      }
    
      const res = await journalShopList(opts)
      if (!res) return
      const {data} = res.data;
      if (this.isNew && data.length <= 0 && page !== 1) return this.$message.error('暂时没有更多数据哦')
      this.localData = data
    }
  },
};
</script>

<style scoped lang="scss">
.turn-list {
  flex: 1;
}
.list-con {
  display: flex;
  flex-wrap: wrap;
}
.pages {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
