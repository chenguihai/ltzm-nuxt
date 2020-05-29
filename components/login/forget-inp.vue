<template>
  <div class="inp-box">
    <p>{{label}}</p>
    <input class="forget-inp" :value="value" :placeholder="placeholder" @input="$emit('change', $event.target.value)" @change="checkInp" :maxlength="maxLength" v-bind="othProps">
    <slot name='btn'> </slot>
    <div class="error-tip" v-if="showError">
      <img src="@/assets/img/warn.png">
      <p>{{errorTip}}</p>
    </div>
  </div>
</template>

<script>
import { isObject } from '@/utils/tool'
export default {
  name: 'ForgetInp',
  components: {},
  props: {
    value: [Number, String],
    placeholder: String,
    label: String,
    rules: [Object, Array],
    release: Boolean,
    maxLength:'',
    /* 
    rules
    {
      test: RegExp,
      required: Boolean,
      message: String,
      min,max : Number
    }
    */
    othProps: {
      type: Object,
      default: () => ({
        type: 'text'
      })
    },

  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data () {
    return {
      showError: false,
      errorTip: ''
    };
  },
  methods: {
    checkInp (event) {
      if (!this.rules) return
      let val = event ? event.target.value : this.value
      let res = this.validate(val, this.rules)
      this.$emit('update:release', this.validate(val, this.rules))
      return res
    },
    validate (val, rule) {
      let res = true
      if (isObject(rule)) {
        const { required, message, test, min, max } = rule
        if (
          (val === '' && required) ||
          (test && !test.test(val)) ||
          (min && val.length < min) ||
          (max && val.length > max)
        ) {
          this.errorSet(message)
          res = false
        } else {
          this.showError = false
        }
      } else if (Array.isArray(rule)) {
        for (let r of rule) {
          let tmp = this.validate(val, r)
          if (!tmp) {
            res = tmp
            break
          }
        }
      }
      return res
    },
    errorSet (message) {
      this.errorTip = message
      this.showError = true
    }
  }
};
</script>

<style scoped lang="less">
.inp-box {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 345px;
  margin-top: 22px;
  position: relative;
  p {
    &:first-child {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #333;
      width: 80px;
      text-align: right;
    }
  }
  .forget-inp {
    height: 38px;
    border: 1px solid rgba(204, 204, 204, 1);
    text-indent: 15px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #666666;
    flex: 1;
    margin-left: 13px;
  }
  .forget-inp:focus{
    border: 1px solid #5da6ff;
    outline: 0;
    box-shadow: 0px 0px 4px #5da6ff;
  }
  .error-tip {
    display: flex;
    align-items: center;
    width: 160px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(243, 38, 45, 1);
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: 356px;
    img {
      width: 18px;
      height: 18px;
      margin-right: 4px;
    }
  }
}
</style>
