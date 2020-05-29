
<template>
  <div class="aboutUs">
    <!-- 关于我们 -->
    <comHeader />
    <div class="aboutUs_nav">
      <div class="aboutUs_top">
        <nav class="aboutUsNav">
          <ul>
            <li>
              <nuxt-link to="/about">关于我们</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/aboutUs/regulation/regulation">规则中心</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/help">帮助中心</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/news">新闻资讯</nuxt-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
<script>
import comHeader from "@/components/component/comHeader";
export default {
  components: {
    comHeader
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.aboutUs {
  background: #f4f6f8;
  & > .aboutUs_nav {
    & > .aboutUs_top {
      width: 100%;
      height: 42px;
      margin-top: 1px;
      background: #fff;
      border-bottom: 2px solid #f3262d;
      & > .aboutUsNav {
        width: 1210px;
        height: 42px;
        margin: 0 auto;
        & > ul {
          width: 600px;
          height: 42px;
          display: flex;
          margin-left: 0;
          font-weight: 600;
          text-align: center;
          & > li {
            a {
              font-size: 16px;
              color: #333;
              text-decoration: none;
              display: block;
              width: 168px;
              padding: 9px 42px 10px;
       
            }
            .nuxt-link-active {
              color: #ffffff;
              background: #f3262d;
              border-bottom: 2px solid #f3262d;
              background:linear-gradient(90deg,rgba(243,38,45,1) 0%,rgba(253,95,73,1) 100%);
              &:hover{
              color: #ffffff;
              }
            }
          }
          & > li:hover {
            a {
              color: #f3262d;
            }
          }
        }
      }
    }
    & > .seleIndex {
      width: 1210px;
      margin: 0 auto;
    }
  }
}
</style>


