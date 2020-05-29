<template>
  <div class="store-first">
    <div class="main">
      <div class="item1">
        <h3>系统信息</h3>
      </div>
      <div class="item2">
        <div class="inner-item1">恭喜您注册成功!</div>
        <div class="inner-item2">
          <div class="content-itme1">
            <div class="inner">
              <div class="g-blue-item1">
                <div class="div1">
                  <div class="">
                    <div class="img"></div>
                    <h3>我是雇主(广告主)</h3>
                    <p>I am an employer</p>
                  </div>
                </div>
              </div>
              <div class="g-blue-item2">
                <el-divider>—<span>雇主身份介绍</span>—</el-divider>
                <div class="box">
                  <div class="inner-box">
                    <p>相当于电商平台的买家身份，</p>
                    <p>可以在平台雇佣各种服务商为其进行服务，</p>
                    <p>需支付一笔佣金作为服务商的报酬.</p>
                    <p>雇主也可以发布任务，让服务商主动来</p>
                    <p>投标和悬赏符合条件的</p>
                    <p>服务商为其服务。</p>
                    <p>同时广告主也可以发布广告线索快速获取所需要的媒体资源信息</p>
                  </div>
                </div>
              </div>
              <div class="g-blue-item3">
                <nuxt-link to="/userCenter/myData/myData">填写基本资料</nuxt-link>
              </div>
            </div>
          </div>
          <div class="content-itme2">
            <div class="inner">
              <div class="g-blue-item1">
                <div class="div1 div2">
                  <div class="">
                    <div class="img img2"></div>
                    <h3>我是凌客(服务商)</h3>
                    <p>I am a service provider</p>
                  </div>
                </div>
              </div>
              <div class="g-blue-item2">
                <el-divider>—<span>凌客身份介绍</span>—</el-divider>
                <div class="box">
                  <div class="inner-box inner-box2">
                    <p>相当于电商平台的卖家身份，</p>
                    <p>可以在平台选择技能进行赋能，赋能后在该技能类目</p>
                    <p class="red">下开设自己的店铺，从此开店盈利赚钱,</p>
                    <p>当凌客成为技能者后，可以去雇主发布的任务投标</p>
                    <p>当中标后 会获取一定的赏金奖励。</p>
                    <p class="bott">同时也可以去广告主发布的线索帖子中购买。</p>
                    <p>广告线索，获取更多一手广告主</p>
                    <p>信息，赢取大单。走上人生致富路</p>
                  </div>
                </div>
              </div>
              <div class="g-blue-item3">
                <nuxt-link to="/store?storeIndex=index">开通店铺</nuxt-link>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="item3">
        <nuxt-link to="/">进入首页</nuxt-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "~assets/css/store/first.less";
</style>
<script>
export default {
  layout: 'shop-flow-layout',
}
</script>
