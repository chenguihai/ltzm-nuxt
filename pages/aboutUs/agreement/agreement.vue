
<template>
  <div class="agreement_us">
    <!-- 网站协议 -->
    <aboutUs />
    <div class="agreement_content">
      <div class="agreement_content_left">
        <ul>
          <h2>关于我们</h2>
          <li
            class="Tab"
            :class="{active:index ==selectIndex}"
            v-for="(item,index) in tabArr"
            :key="index"
            @click="tabActive(item,index)"
          >
            <div>
              <p>{{item.name}}</p>
              <span class="iconfont icon-xiangyoudianji"></span>
            </div>

            <div class="content">
              <div v-for="(Oitem , index) in item.text" :key="index">
                <span>{{Oitem}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="agreement_content_right"></div>
    </div>
     <comFooter/>
  </div>
</template>
<script>
import comHeader from "@/components/component/comHeader";
import aboutUs from "@/components/component/aboutUs";
import comFooter from "@/components/component/comFooter";

export default {
  components: {
    comHeader,
    aboutUs,
    comFooter,
  },

  data() {
    return {
      selectIndex: 0,
      tabArr: [
        {
          name: "网站协议1",
          text: {
            title: "网站协议1",
            content:
              "网站协议网站协议网站协议网站协议网站协议网站协议网站协议网站协议网站协议网站协议网站协议"
          }
        },
        {
          name: "网站协议2",
          text: {
            title: "网站协议2",
            content:
              "网站协议网站协议网站协议网站协议网站协议网站协议网站协议网站协议网站协议网站协议网站协议"
          }
        },
        {
          name: "网站协议3",
          text: {
            title: "网站协议3",
            content:
              "介网站协议网站协议网站协议网站协议网站协议网站协议网站协议"
          }
        },
        {
          name: "网站协议4",
          text: {
            title: "网站协议4",
            content: "网站协议网站协议网站协议网站协议网站协议"
          }
        },
        {
          name: "网站协议5",
          text: {
            title: "网站协议5",
            content: "网站协议网站协议"
          }
        }
      ]
    };
  },
  methods: {
    tabActive(item, index) {
      this.selectIndex = index;
    }
  }
};
</script>

<style lang="less" scoped>
@import "agreementScode.less";
</style>


