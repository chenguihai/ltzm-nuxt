<template>
  <div
    class="comment-icon"
    :class="[bicon, {top:top}] "
  >
    <i
      class="iconfont icon "
      :class="`icon-${icon}`"
    ></i>
    <span v-if="!radio">{{text}}</span>
    <el-radio
      :label="text"
      :value="checked"
      @change="radioChange"
      v-else
    ></el-radio>
  </div>
</template>

<script>
const iconMap = new Map([
  [1, { icon: 'haoping', name: '好评', bicon: 'hp' }],
  [2, { icon: 'zhongping', name: '中评', bicon: 'zp' }],
  [3, { icon: 'chaping', name: '差评', bicon: 'cp' }]
])
export default {
  name: 'commentIcon',
  props: {
    /*
    1好评 2中评 3差评
    */
    type: {
      type: Number,
      default: 1
    },
    /*
    false横向 true纵向
    */
    top: {
      type: Boolean,
      default: true
    },
    radio: {
      type: Boolean,
      default: false
    },
    checked: String
  },
  computed: {
    icon () {
      return iconMap.get(this.type).icon
    },
    bicon () {
      return iconMap.get(this.type).bicon
    },
    text () {
      return iconMap.get(this.type).name
    }
  },
  model: {
    prop: 'checked',
    event: 'change'
  },
  methods: {
    radioChange (val) {
      this.$emit('change', val)
    }
  }
};
</script>

<style scoped lang="less">
.comment-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 14px;
  &:last-child {
    margin-right: 0;
  }
  .icon {
    margin-right: 7px;
    font-size: 20px;
    line-height: 22px;
    width: 22px;
    height: 22px;
  }
  &.top {
    flex-direction: column;
    .icon {
      margin-bottom: 9px;
      margin-right: 0;
    }
  }
}
.hp {
  color: #f74147;
}

.zp {
  color: #ffc948;
}

.cp {
  color: #ddd;
}
.zp,
.cp {
  span {
    color: #757575;
  }
}
</style>
