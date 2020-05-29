<template>
  <div class="turn-item" :class="{'like-item':isLike}">
    <nuxt-link target="_blank" class="nuxt_link" :to="`/post/${itemData.id}?type=${itemData.type}`">
      <div class="logo">
        <img
          src="~assets/img/userDataImg.png"
          v-lazy="`${itemData.image_s}?x-oss-process=image/resize,m_fill,${setImgSize||'h_162,w_270'}`"
          :alt="itemData.name"
        />
        <p class="time" v-if="itemData.type==2">
          <img class="turn-icon" src="@/assets/img/turntime/turnt.png" alt />
          {{formatTime(itemData.duration)}}
        </p>
        <div class="mask">
          <p>媒体类型：{{itemData.media_type}}</p>
          <p>上刊领域：{{itemData.realm}}</p>
        </div>
      </div>
      <div class="item-name" :title="itemData.name">{{itemData.name}}</div>
      <div class="item-bottom">
        <div class="bt-left">
          <p v-if="itemData.type==2">
            <img class="turn-icon" src="@/assets/img/turntime/turnpH.png" alt />
            {{itemData.play_num |
            numUnitFormat}}
          </p>
          <p v-else>
            <i class="el-icon-view"></i>
            {{itemData.view_num | numUnitFormat}}
          </p>
          <p>
            <img class="turn-icon" src="@/assets/img/turntime/turndH.png" alt />
            {{itemData.down_num |
            numUnitFormat}}
          </p>
        </div>
        <p class="created" :title="`拍摄时间：${itemData.created_at}`">{{itemData.shoot}}</p>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { numUnitFormat } from "@/utils/common-filters";
import { downloadMixin } from "~/utils/common-mixins";

export default {
  name: "turnItem",
  filters: { numUnitFormat },
  props: ["itemData",'setImgSize'], 
  inject: {
    xTurnList: {
      default: "" //默认为''
    }
  },
  components: {},
  mixins: [downloadMixin()],
  data() {
    return {};
  },
  mounted(){
  },
  computed: {
    ...mapState({ envVars: "envVariables" }),
    isGroup() {
      return this.xTurnList !== "";
    },
    isVideo() {
      return this.isGroup ? this.xTurnList.isVideo : true;
    },
    isLike() {
      return this.isGroup ? this.xTurnList.isLike : false;
    }
  }
};
</script>

<style scoped lang="scss">
.nuxt_link {
  text-decoration: none;
}

.turn-item {
  width: 180px;
  margin-top: 20px;
  margin-right: 12px;
  cursor: pointer;

  .logo {
    width: 100%;
    height: 108px;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    text-align: center;
    img {
      height: 100%;
    }

    .time {
      position: absolute;
      bottom: 9px;
      right: 7px;
      z-index: 3;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);

      i {
        margin-right: 5px;
      }
    }

    .mask {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      background: rgba(0, 0, 0, 0.5);
      padding: 16px;
      display: none;

      p {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        margin-bottom: 9px;
      }
    }

    &:hover {
      .mask {
        display: block;
      }
    }
  }

  .item-name {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 18px;
    margin-top: 9px;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    position: relative;

    .com-name {
      position: absolute;
      left: 76px;
      right: 0;
      top: 16px;
      margin: auto;
      padding: 9px 10px;
      border: 1px solid #dddddd;
      background: #fff;
    }
  }

  .item-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    margin-top: 9px;

    i {
      margin-right: 5px;
    }

    .bt-left {
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        width: 50px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        /*color: #fd6e21;*/
        color: #999;
      }
    }
  }

  &:hover {
    .item-name {
      color: #f3262d;
    }
  }

  &.like-item {
    width: 270px;
    margin-right: 10px;

    .logo {
      height: 162px;
    }
  }

  .turn-icon {
    width: 10px !important;
    height: 10px !important;
    margin-right: 5px;
  }
}
</style>
