<template>
  <!-- 商品列表项 -->
  <!-- 包含首页商品样式和客户合作样式 -->
  <li class="item-box" :class="{'iscoo': hideOther,mr_22:showBtn}">
    <nuxt-link
      target="_blank"
      class="nuxt_link"
      :to="showFlag ?{path: `/shopwork/${info.id}?shopid=${store_id}`}: {path: '/service/'+info.id, query: {id: store_id}}"
    >
      <img
        src="~/assets/img/img_bg.png"
        v-lazy="info.img || info.image_url+'?x-oss-process=image/resize,m_fill,h_168,w_284'"
        :alt="info.name || info.case_name"
      />
      <p class="item_name">
        <span>{{info.name || info.case_name}}</span>
      </p>
      <div class="item-other" v-if="!hideOther">
        <div class="item-other-top" :class="{'has-btn':showBtn}">
          <strong :title="`￥${parseInt(info.price)}/${info.unit_name}`">￥{{parseInt(info.price)}}<p>/{{info.unit_name}}</p></strong>
          <p>
            <span>成交量：</span>
            <em>{{info.deal_num}}</em>
          </p>
        </div>
        <button v-if="showBtn" @click.stop="buy">立即购买</button>
      </div>
    </nuxt-link>
  </li>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "shopItem",
  data() {
    const {shopid,caseId} = this.$route.query;
    const {id,caseid} = this.$route.params;
    return {
      store_id: shopid || id || caseid,
      showFlag: false
    };
  },
  props: {
    info: Object,
    showBtn: Boolean,
    hideOther: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      envVars: "envVariables"
    })
  },
  mounted() {
    this.showFlag = location.pathname.includes("/shopwork") && !location.pathname.includes("/shopwork/"); // 客户示例
  },
  methods: {
    buy() {
      this.$router.push({
        path: "/service/"+ this.info.id,
        query: {id: this.store_id }
      });
    }
  }
};
</script>

<style scoped lang="less">
.nuxt_link {
  text-decoration: none;
  display: block;
}

.item-box {
  margin-bottom: 20px;
  margin-right: 8px;
  width: 286px;
  min-height: 270px;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
  &.iscoo {
    min-height: 240px;
  }

  &.mr_22 {
    margin-right: 22px;
  }

  &:nth-child(4n) {
    margin-right: 0;
  }

  &:hover {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03), 0 12px 15px rgba(0, 0, 0, 0.04);
    transform: translateY(-2px);
    p {
      color: #f3262d;
    }
  }

  img {
    width: 100%;
    height: 168px;
  }
}
.item_name {
  padding: 10px;
  font-size: 14px;
  color: #666;
  height: 60px;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box; //作为弹性伸缩盒子模型显示。
    -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
    -webkit-line-clamp: 2; //显示的行
    word-wrap: break-word;
  }
}

.item-other {
  display: flex;
  padding: 12px;
  padding-top: 0;
  justify-content: space-between;

  button {
    cursor: pointer;
    width: 120px;
    height: 30px;
    background: rgba(243, 38, 45, 1);
    outline: none;
    color: #fff;
    font-size: 12px;
    border-radius: 2px;
    border: 1px solid rgba(243, 38, 45, 1);
  }
}
.item-other-top {
  display: flex;
  justify-content: space-between;
  flex: 1;

  &.has-btn {
    flex-direction: column;
  }

  strong {
    font-size: 14px;
    color: rgba(243, 38, 45, 1);
    display: flex;
    align-items: flex-end;
    &>p{
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
    }
  }

  p {
    span {
      color: #999;
      font-size: 12px;
    }

    span + em {
      font-size: 12px;
      color: #0066cc;
    }
  }
}
</style>
