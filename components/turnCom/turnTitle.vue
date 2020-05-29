<template>
  <div class="turn-title">
    <div class="turn-title-left">
      <p class="title-con" v-if="title">{{title}}</p>
      <ul class="tab-box user_select" v-if="tabArr.length > 0">
        <li class="tab" :class="{active:model === tab.sel}" @click="model = tab.sel" v-for="(tab,idx) in tabArr" :key="idx">{{tab.text}}</li>
      </ul>
    </div>
    <slot name="btn">
      <a target="_blank" class="more-btn" :href="xTurnList.isVideo?'/post/video':'/post/image'">
        更多<i class="el-icon-arrow-right"></i>
      </a>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'turnTitle',
  components: {},
  props: {
    value: null,
    type: null,
    title: '',
    tabArr: {
      type: Array,
      default: () => []
    }
  },
  inject: {
    xTurnList: {
      default: ""  //默认为''
    }
  },
  data () {
    return {

    };
  },
  computed: {
    isGroup () {
      return this.xTurnList !== ""
    },
    model: {
      get () {
        return this.isGroup ? this.xTurnList.nowListType : this.value
      },
      set (val) {
        this.isGroup
          ? this.xTurnList.$emit("handleChange", val)
          : this.$emit("change", val);
      }
    },
  },
  created () {

  },
  mounted () {

  },
  watch: {

  },
  methods: {
    goOth () {
      if (this.isGroup) {
        this.$router.push(this.xTurnList.isVideo ? '/post/video' : '/post/image')
      } else {
        this.$router.push('/post/video')
      }
    }
  },
};
</script>

<style scoped lang="scss">
.turn-title,
.turn-title-left,
.tab-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title-con {
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 30px;
  margin-right: 17px;
}
.tab {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  position: relative;
  color: #666666;
  cursor: pointer;
  margin-right: 11px;
  &::before {
    width: 0;
    height: 0;
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    margin: auto;
    border-bottom: 3px solid #f3262d;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-top: 0 solid transparent;
  }
  &::after {
    width: 100%;
    height: 1px;
    background: #f3262d;
    position: absolute;
    bottom: -4px;
    left: 0;
  }
  &:hover,
  &.active {
    color: rgba(243, 38, 45, 1);
    &::after,
    &::before {
      content: " ";
    }
  }
}
.more-btn {
  display:block;
  width: 60px;
  height: 22px;
  line-height:20px;
  background: #F4F6F8;
  border: 1px solid #D2D5DB;
  border-radius: 100px;
  text-align: center;
  font-size: 12px;
  color: #333;
  &:hover{
    background-color: #fff;
  }
}
</style>
