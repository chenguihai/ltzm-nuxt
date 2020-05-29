<template>
  <div class="clues-side">
    <div class="item-1">
      <img src="../../assets/img/youshi.png" alt="youshi" title="youshi" />
      <div class="youshiTitle">
        <div class="youshiO">
          <span>发布广告线索</span>
          <span>为什么选择凌天众媒</span>
        </div>
        <div>
          <img src="../../assets/img/mei.png" alt title="youshi" />
          
          <span>
            <p>2000万媒体人专业店铺</p>
            <p>凌客实名认证，广告主放心</p>
            
          </span>
        </div>
        <div>
          <img src="../../assets/img/an.png" alt title="youshi" />
          <span>
            <p>担保交易，满意后付款</p>
            <p>资金托管众媒平台，安全又安心</p>
          </span>
        </div>
        <div>
          <img src="../../assets/img/bao.png" alt title="youshi" />
          <span>
            <p>电子合同签约，有保障</p>
            <p>线上验证一键电子签约，省时省心</p>
          </span>
        </div>
        <div>
          <img src="../../assets/img/tui.png" alt title="youshi" />
          <span>
            <p>无人交稿，全额退款</p>
            <p>零交稿零投标，任务全额退款</p>
          </span>
        </div>
      </div>
    </div>
    <div class="item-2">
      <div class="title">
        <strong>最活跃的凌客</strong>
        <a href="/shop/list" target="_blank">
          更多
          <i style="font-family: simsun; margin-top: 1px;">&gt;</i>
        </a>
      </div>
      <div class="content">
        <a
          class="inner"
          v-for="(item , index) in shop"
          :key="index"
          :href="'/shop/' +item.id"
          target="_blank"
        >
          <div v-if="index==0">
            <span class="setClass">{{index+1}}</span>
            <em>{{item.store_name}}</em>
          </div>
          <div v-else-if="index==1">
            <span class="setClassT">{{index+1}}</span>
            <em>{{item.store_name}}</em>
          </div>
          <div v-else-if="index==2">
            <span class="setClassS">{{index+1}}</span>
            <em>{{item.store_name}}</em>
          </div>
          <div v-else>
            <span>{{index+1}}</span>
            <em>{{item.store_name}}</em>
          </div>
          <i style="font-family: simsun; margin-top: 1px;">&gt;</i>
        </a>
      </div>
    </div>
    <div class="item-3">
      <div class="title">
        <strong>最受关注的线索</strong>
      </div>
      <div class="content">
        <a
          class="clueList"
          v-for="(item , index) in topPayClue"
          :key="index"
         :href="`/clues/${item.id}`"
         target="_blank"
        >
          <span>¥{{parseInt(item.budget_money)}}</span>
          <span>{{item.title}}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { clueList, homeimage } from "@/api/list";
import { mapState } from "vuex";
export default {
  name: "clues-side",
  computed: {
  },
  data() {
    return {
      shop: "", //最活跃的凌客
      topPayClue: "",
      ad_img: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      clueList()
        .then(res => {
          if (res.data.code == 200) {
            this.shop = res.data.data.shop;
            this.topPayClue = res.data.data.topPayClue;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
  }
};
</script>

<style scoped lang="less">
.item-1 {
  border: 1px solid #e9e9e9;
  height: 342px;
  background-color: #fff;
  position: relative;
  & > img {
    position: absolute;
    left: 0;
    top: 0;
  }
  & > .youshiTitle {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    & > div {
      display: flex;
      margin-bottom: 13px;
      color: #999;
      font-size: 12px;
      width: 227px;
      height: 37px;
      & > img {
        width: 37px;
        height: 37px;
        margin-right: 10px;
      }
      & > span {
        height: 37px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        & > p {
          color: #333;
        }
        & > p:nth-child(1) {
          font-weight: bold;
        }
        & > p:nth-child(2) {
          color: #999;
        }
      }
    }
    & > .youshiO {
      display: flex;
      flex-direction: column;
      color: #666;
      font-size: 20px;
      margin-top: 30px;
      margin-bottom: 30px;
      width: 180px;
      height: auto;
      line-height: 20px;
      & > span:nth-child(1) {
        color: #333;
        font-size: 28px;
        margin-bottom: 12px;
        line-height: 28px;
        height: 29px;
        font-weight: bold;
      }
      & > span:nth-child(2) {
        height: 21px;
      }
    }
  }
}

.item-2 {
  border: 1px solid #e9e9e9;
  margin-top: 20px;
  background: #fff;
  .title {
    border: 1px solid #e9e9e9;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    border-left: 0;
    border-right: 0;
    display: flex;

    justify-content: space-between;
    strong {
      font-weight: normal;
      font-size: 16px;
      color: #333;
    }

    span {
      font-size: 12px;
      color: #757575;
      cursor: pointer;
      &:hover{
        color: #f3262d;
      }
    }
  }

  .content {
    .inner {
      padding: 0 20px;
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      justify-items: center;
      border-bottom: 1px solid #e9e9e9;
      cursor: pointer;
      div {
        display: flex;
        align-items: center;
        span {
          height: 26px;
          width: 26px;
          border-radius: 13px;
          border: 1px solid #dddddd;
          line-height: 26px;
          text-align: center;
          font-size: 14px;
          color: #666666;
          &.setClass {
            color: #fff;
            background: #ff0000;
          }
          &.setClassT {
            color: #fff;
            background: #ffa350;
            border: 1px solid #ffa350;
          }
          &.setClassS {
            color: #fff;
            background: #83be26;
            border: 1px solid #83be26;
          }
        }
        em {
          color: #333;
          font-size: 12px;
          margin-left: 16px;
          width: 169px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        em:hover {
          color: #f3262d;
        }
      }

      i {
        color: #cccccc;
      }
    }
    .inner:nth-last-child(1) {
      border: 0;
    }
  }
}
.item-3 {
  margin-top: 20px;
  background: #fff;
  border: 1px solid #e9e9e9;

  .title {
    border: 1px solid #e9e9e9;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    border-left: 0;
    border-right: 0;
    display: flex;
    justify-content: space-between;
    strong {
      font-weight: normal;
      font-size: 16px;
      color: #333;
    }

    span {
      font-size: 12px;
      color: #757575;
    }
  }
  .content {
    padding-top: 10px;
    padding-bottom: 10px;
    height: 260px;
    overflow: hidden;
    .clueList {
      text-decoration-line: none;
      height: 30px;
      line-height: 20px;
      cursor: pointer;
      padding-left: 20px;
      padding-right: 20px;
      display: flex;
      align-items: center;
      span:nth-child(1) {
        color: #ff0027;
        font-size: 12px;
      }
      span:nth-last-child(1) {
        color: #333333;
        margin-left: 10px;
        font-size: 12px;
        width: 150px;
        word-break: break-all;
        overflow: hidden;
        display: block;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      span:nth-last-child(1):hover {
        color: #f3262d;
      }
    }
  }
}
</style>