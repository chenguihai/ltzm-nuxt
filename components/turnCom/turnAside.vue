<template>
  <div class="turn-aside">
    <div class="aside-title">
      <p>{{title}}</p>
      <ul
        v-if="param !== 'deal'"
        class="sel-box"
        :class="{active:showSel}"
        @click="showSel = !showSel"
      >
        <li
          :class="{active:nowSel === item.id}"
          @click="changeSel(item,idx)"
          v-for="(item, idx) in selArr"
          :key="idx"
        >
          {{item.name}}
          <i class="el-icon-arrow-down"></i>
        </li>
      </ul>
    </div>
    <div v-for="(item,i) in (localData || listData)" :key="item.id">
      <!-- id=${item.id} -->
      <nuxt-link target="_blank" class="side-top nuxt_link" :to="`/post/${item.id}?type=${type}`">
        <p class="rank" :class="{mini: i>rankNum}" :style="{background:rankColor(i+1)}">{{i+1}}</p>
        <img
          v-if="i<=rankNum"
          class="logo"  src="~assets/img/userDataImg.png"
          v-lazy="item.image_s+'?x-oss-process=image/resize,m_fill,h_60,w_100'"
          :alt="item.name"
        />
        <div class="info">
          <p class="name" :class="i<=rankNum? 'tline':'oline'" :title="item.name">{{item.name}}</p>
          <div class="bt-left" v-if="i<=rankNum">
            <p v-if="type ==2">
              <img class="turn-icon" src="@/assets/img/turntime/turnpH.png" alt />
              {{item.play_num |
              numUnitFormat}}
            </p>
            <p v-else>
              <i class="el-icon-view"></i>
              {{item.view_num | numUnitFormat}}
            </p>
            <p>
              <img class="turn-icon" src="@/assets/img/turntime/turndH.png" alt />
              {{item.down_num |
              numUnitFormat}}
            </p>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { numUnitFormat } from "@/utils/common-filters";
import { getAsideList } from "@/api/turn-time";
import { mapState } from "vuex";
export default {
  name: "turnAside",
  filters: {
    numUnitFormat
  },
  props: {
    type: {
      type: [Number, String],
      default: 1
    },
    title: {
      type: String,
      default: "热门"
    },
    showRankNum: {
      type: Number,
      default: 2
    },
    param: {
      type: String,
      default: ""
    }
  },
  inject: {
    indexData: {
      default: null //默认为''
    },
    nowPath: {
      default: ""
    }
  },
  data() {
    return {
      showSel: false,
      nowSel: 1,
      selArr: [
        { name: "三日", id: 1 },
        { name: "一周", id: 2 }
      ],
      localData: null,
      rankNum: this.param === "deal" ? 9 : this.showRankNum
    };
  },
  computed: {
    ...mapState({ envVars: "envVariables" }),
    listData() {
      switch (this.nowPath) {
        case "video":
          return this.indexData ? this.indexData.hot : [];
        case "img":
          return  this.indexData ? this.indexData.hot : [];
        default:
          return this.type == 2
            ? this.indexData.hot_video
            : this.indexData.hot_image;
      }
    }
  },
  watch: {
    nowSel() {
      this.selChange();
    }
  },
  methods: {
    rankColor(rank) {
      switch (rank) {
        case 1:
          return "#FF3001";
        case 2:
          return "#FF6100";
        case 3:
          return "#FFB401";
        default:
          return "#B7BFCB";
      }
    },
    changeSel(opts, idx) {
      this.selArr[0] = this.selArr.splice(idx, 1, this.selArr[0])[0];
      this.nowSel = opts.id;
    },
    async selChange() {
      let opts = {
        actions: this.param,
        days: this.nowSel === 1 ? 3 : 7,
        type: this.type,
        limit: 10
      };
      const res = await getAsideList(opts);
      if (!res) return;
      const {data} = res.data;
      this.localData = data;
    }
  }
};
</script>

<style scoped lang="scss">
.nuxt_link {
  text-decoration: none;
}

.tline {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  word-wrap: break-word;
}

.oline {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.turn-aside {
  margin-left: 20px;
  width: 230px;

  .aside-title {
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    position: relative;
    padding-bottom: 3px;

    .sel-box {
      position: absolute;
      right: 0;
      top: 0;
      margin: auto;
      width: 60px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(230, 234, 237, 1);
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      user-select: none;

      li {
        display: none;
        font-size: 12px;
        text-align: left;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;

        i {
          visibility: hidden;
          margin-left: 5px;
        }

        &.active {
          display: block;

          i {
            visibility: visible;
          }
        }
      }

      &.active > li {
        display: block;
      }
    }
  }

  .side-top {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    margin-top: 16px;

    .rank {
      width: 20px;
      height: 20px;
      background: rgba(255, 48, 1, 1);
      text-align: center;
      line-height: 20px;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin-right: 10px;

      &.mini {
        width: 17px;
        height: 17px;
        margin-left: 3px;
        border-radius: 4px;
      }
    }

    .logo {
      width: 100px;
      height: 60px;
      border-radius: 4px;
      margin-right: 10px;
    }

    .info {
      flex: 1;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      align-self: stretch;
      overflow: hidden;

      .name {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 18px;
      }

      .bt-left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        font-family: Arial;
        font-weight: 400;
        width: 100%;

        p {
          flex: 1;
        }

        i {
          margin-right: 4px;
          width: 10px;
          height: 10px;
          color: #999;
        }

        .turn-icon {
          width: 11px;
          height: 10px;
          margin-right: 4px;
        }
      }
    }

    &:hover {
      .name {
        color: #f3262d;
      }
    }
  }
}
</style>
