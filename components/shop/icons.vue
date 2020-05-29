<template>
  <div class="head_icons">
    <div class="hi_box" v-if="storeInfo">
      <strong class="strong1">{{storeInfo.store_name}}</strong>
      <!--凌等级-->
      <span
        class="span2"
        v-if="storeInfo.shopLevel"
        :style="{backgroundImage: 'url('+envVars.IMG_HOST +storeInfo.shopLevel.icon+')'}"
      >{{storeInfo.shopLevel && storeInfo.shopLevel.bl_name}}</span>
      <!--个人/企业-->
      <span
        :class="['span3',storeInfo.type_id === 1 ? 'c_personal':'c_company']"
      >{{storeInfo.type_id | storeType}}</span>
      <!--vip等级-->
      <img
        v-if="storeInfo.vip_level"
        class="vip-level"
        src="@/assets/img/img_bg.png"
        v-lazy="storeInfo.vip_level && storeInfo.vip_level.icon"
        alt="VIP等级"
      />
      <div class="hi_span4">
        <svg class="icon bzj" aria-hidden="true">
          <use xlink:href="#icon-huanyingyebaozhengjin" />
        </svg>
        <span>{{storeInfo.marginsum | lit}}</span>
      </div>
      <div class="hi_rate" v-if="storeInfo.serviceStatistic">
        <rate-cpn :pass="storeInfo.score" />
        <span class="em2">{{(+storeInfo.score).toFixed(2)}}</span>
        <!--
                <i v-if="storeInfo.aboveAverage !== 0" class="iconfont icon icon2 "
                   :class="[storeInfo.aboveAverage > 0 ? 'icon-pingfenxiangshang' : 'icon-pingfenxiangxia']"></i>
        -->
        <hoverBox class="hover-show" :storeData="storeInfo"></hoverBox>
      </div>
      <div class="flex_1"></div>
      <div
        :class="['hi_lxw user_select','collet',{'detail-collect':storeInfo.collect ===1}]"
        @click="colletClick"
      >{{storeInfo.collect===1 ?'已收藏':'收藏'}}</div>
      <div class="hi_lxw user_select" @click="openQQ()" >
        <i
          class="icon icon3 iconfont icon-lianxiwo"
          :class="{active:storeInfo.customer_services && storeInfo.customer_services.length>0}"
        ></i>
        <span class="lxw_text" v-if="storeInfo.customer_services && storeInfo.customer_services.length>0" >联系客服</span>
        <span class="lxw_text" v-else title="该店铺尚未设置客服">联系客服</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { storeType } from "~/utils/common-filters";
import hoverBox from "~/components/shop/hoverBox";
import { commonCollect } from "@/api/list";
import rateCpn from "~/components/component/rateCpn";
export default {
  name: "icons",
  computed: {
    ...mapState({ envVars: "envVariables", storeInfo: "storeInfo" })
  },
  components: { hoverBox, rateCpn },
  methods: {
    colletClick() {
      if (!localStorage.getItem("access_token")) {
        this.$message.error("请先登录");
        return;
      }
      const { id = 0, collect = 0 } = this.storeInfo;
      this.commonCollectHttp(id, collect);
    },
    commonCollectHttp(id, type = 1) {
      var data = {
        type: 3,
        collect_id: id,
        cancel: type
      };
      commonCollect(data)
        .then(res => {
          if (res.data.code != 200) {
            this.$message.error(res.data.message);
            return;
          }
          this.storeInfo.collect = +!type;
        })
        .catch(err => {
          console.log(err);
        });
    },
    openQQ() {
      const custom = this.storeInfo.customer_services;
      if (custom && custom[0] && custom[0].kf_account) {
        window.open(`tencent://message/?uin=${custom[0].kf_account}`);
      } else {
        // this.$message.error("该店铺没有客服");
      }
    }
  },
  filters: {
    storeType,
    lit(num) {
      return num ? (+num).toFixed(0) : 0;
    }
  }
};
</script>

<style scoped lang="less">
.head_icons {
  background: #fff;
  padding-bottom: 10px;
}

.hi_box {
  width: 1210px;
  margin: auto;
  display: flex;
  align-items: center;

  .collet {
    background: url("../../assets//img/ServGetDetailsPage/kongxin.png")
      no-repeat 0 1px;
    padding-left: 20px;
    margin-left: 29px;
    background-size: 15px 15px;

    &:hover {
      color: #f3262d;
    }
  }

  .detail-collect {
    background-image: url("../../assets/img/ServGetDetailsPage/shixin.png");
    background-size: 15px 15px;
  }

  .strong1 {
    font-size: 15px;
    color: #666;
  }

  .span2 {
    background-color: #24e0e3;
    background-size: 100%;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    padding: 0 10px;
    color: #fff;
    margin-left: 0.5em;
    border-radius: 4px;
  }

  .span3 {
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    width: 32px;
    text-align: center;
    color: #ffffff;
    margin-left: 0.5em;
    border-radius: 4px;
  }
  .vip-level {
    height: 20px;
    width: 49px;
    margin-left: 4px;
  }
}

.hi_rate {
  display: flex;
  align-items: center;
  position: relative;
  margin-left: 8px;

  .hover-show {
    display: none;
  }

  &:hover {
    .hover-show {
      display: block;
    }
  }

  em:nth-child(1) {
    font-size: 14px;
    color: #666;
    margin-right: 0.5em;
  }

  .em2 {
    font-size: 14px;
    font-weight: 900;
    color: rgba(243, 38, 45, 1);
    margin-left: 4px;
  }

  .icon1 {
    width: 14px;
    margin-right: 5px;
    height: 14px;
  }

  .icon2 {
    width: 14px;
    height: 14px;
    text-align: center;
    line-height: 14px;
    font-size: 12px;

    &.icon-pingfenxiangshang {
      color: #f3262d;
    }

    &.icon-pingfenxiangxia {
      color: #a1df2a;
    }
  }
}

.hi_lxw {
  display: flex;
  align-items: center;
 
  font-size: 12px;
  color: #666;

  &:hover {
    .active + .lxw_text {
      color: #f3262d;
       cursor: pointer;
    }
    .active{
         color: #f3262d!important;
    }
  }

  .icon3 {
    width: 18px;
    height: 18px;
    margin: 0 4px 0 20px;
    text-align: center;
    line-height: 1em;
    font-size: 18px;
    color: #ccc;

    &.active {
      color: #5992ff;
    }
  }
}

.hi_span4 {
  border: 1px solid #a1df2a;
  height: 20px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  margin-left: 0.5em;

  .bzj {
    height: 18px;
    width: 24px;
  }

  span {
    height: 20px;
    line-height: 20px;
    background: #a1df2a;
    font-size: 12px;
    color: #fff;
    padding-left: 3px;
    padding-right: 3px;
  }
}
</style>
