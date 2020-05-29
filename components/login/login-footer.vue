<template>
  <div class="footer">
    <div class="links">
      <nuxt-link to="/about?id=10" target="_blank">关于我们</nuxt-link>
      <nuxt-link to="/about?id=12" target="_blank">联系我们</nuxt-link>
      <nuxt-link to="/about?id=12" target="_blank">商务合作</nuxt-link>
      <nuxt-link to="/news" target="_blank">新闻资讯</nuxt-link>
      <nuxt-link to="/clues/release" target="_blank">发布线索</nuxt-link>
      <nuxt-link to="/business" target="_blank">店铺入驻</nuxt-link>
      <nuxt-link to="/about?id=12" target="_blank">网站地图</nuxt-link>
      <nuxt-link to="/help?id=22" target="_blank">帮助中心</nuxt-link>
    </div>
    <div class="copyright">
      <p class="footer-copyright">Copyright © 2019-{{year}} 凌天众媒 版权所有，ICP备案证书号:<a href="http://www.beian.miit.gov.cn/">粤ICP备18040617号。</a></p>

      <p class="footer-copyright">
        <a href="mailto:Service@zhongmei66.com" rel="nofollow">联系邮箱：service@zhongmei66.com</a>
        <span class="phone">客服电话：400-688-6662</span>
      </p>
      <p class="footer-copyright">联系地址：深圳市大宝路荣成达科创慧谷A栋310室</p>
      <div class="footer-copyright">
        <a href="https://szcert.ebs.org.cn/504514c9-56e9-4a48-bc7b-941df740c609">
          <img src="../../assets/img/newGovIcon.gif" alt />
        </a>
          <a id="_pingansec_bottomimagelarge_brand" target="_blank" href="//si.trustutn.org/info?sn=174200422039490253045&certType=1"><img src="//v.trustutn.org/images/cert/brand_realname_large_img.png"/></a>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript" src="//trusted.shuidi.cn/trusted.js?id=3665"></script>
<script>
export default {
  data() {
    return {
       year: new Date().getFullYear()
    }
  },
  mounted() {
  },
  methods: {
  }
};
</script>
<style scoped lang="scss">
.footer {
  padding-top: 30px;
  padding-bottom:63px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #fff;
}
.links {
  line-height: 26px;
  a {
    text-decoration-line: none;
    color: #666;
    padding: 0 8px;
    font-size: 12px;
    border-right: 1px solid #ddd;
  }
  a:nth-last-child(1) {
    border: none;
  }
  a:nth-child(1) {
    padding-left: 0;
  }
}
.copyright {
  .footer-copyright {
    text-align: center;
    line-height: 26px;
    color: #999;
    font-size: 12px;
    a {
      text-decoration-line: none;
      color: #999;
      font-size: 12px;
      margin-right: 10px;
    }
    img {
      display: inline-block;
      width: 108px;
      height: 41px;
      background: sandybrown;
    }
    .phone {
      border-left: 1px solid #ddd;
      padding-left: 5px;
      margin-left: 2px;
    }
  }
}
</style>