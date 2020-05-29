<template>
  <div class="shop-rank">
    <div class="sr_top">
      <h2></h2>
    </div>
    <div class="sr_list">
      <div
        v-for="item in list"
        :key="item.id"
        @mouseover="mouseIn(item.index)"
        @mouseout="mouseOut(item.index)"
        :class="['sr_item',{'hover':hover===item.index}]"
      >
        <nuxt-link
          target="_blank"
          class="db"
          :to="{path:'/service/'+item.id,query:{id:item.store_id}}"
        >
          <img class="top-icon" :src="require(`~/assets/img/shop/${item.index}.png`)" alt="图片" />
          <div>
            <img
              src="~/assets/img/img_bg.png"
              v-lazy="item.img+'?x-oss-process=image/resize,m_fill,h_120,w_200'"
            />
          </div>
          <p>{{item.name}}</p>
          <p>
            <span>
              <span>成交量：</span>
              <strong>{{item.deal_num}}</strong>
            </span>
            <button v-show="hover===item.index">了解详情</button>
          </p>
        </nuxt-link>
      </div>
    </div>
    <div class="sr_box">
      <span class="span">服务排行列表</span>
      <ul class="sort_box user_select">
        <li
          :class="['sort_item',form.order=== item.type ? 'active':'']"
          v-for="(item,index) in sortList"
          @click="sortType(item.type)"
          :key="index"
        >
          <span>{{item.name}}</span>
          <i
            :class="['icon','iconfont',form.order=== item.type && form.sort=== 'asc' ? 'icon-pingfenxiangshang':'icon-pingfenxiangxia']"
          ></i>
        </li>
      </ul>
    </div>
    <ul class="item_ul">
      <li class="sr_li" v-for="item in serviceList" :key="item.id">
        <nuxt-link
          target="_blank"
          class="db"
          :to="{path:'/service/'+item.id,query:{id:item.store_id}}"
        >
          <img
            :src="envVars.IMG_HOST+item.img+'?x-oss-process=image/resize,m_fill,h_168,w_283'"
            alt="图片"
          />
          <p class="list_title">
            <span>{{item.name}}</span>
          </p>
          <div class="sr_bottom_wrap">
            <div class="sr_bottom">
              <strong class="sr_price">￥{{item.price}}<p>/{{item.unit_name}}</p></strong>
              <p class="sr_num">
                <span>成交量：</span>
                <em>{{item.deal_num}}</em>
              </p>
            </div>
          </div>
        </nuxt-link>
      </li>
    </ul>
    <div class="pagination_wrap">
      <el-pagination
        prev-text="上一页"
        next-text="下一页"
        layout="prev, pager, next,total,jumper"
        :total="total"
        :page-size="form.pageSize"
        :current-page.sync="form.page"
        @current-change="handlePageChange"
      />
      <div class="pages_submit_btn">确定</div>
    </div>
  </div>
</template>

<script>
import { serviceList } from "@/api/store";
import { mapState } from "vuex";
import { storeInfoInit, getServiceList, getTopSales } from "~/api/async-server";
export default {
  layout: "user-shop",
  name: "shop-rank",
  head() {
    const { store_name = "" } = this.$store.state.storeInfo;
    return {
      title: `${store_name} - 热门排行 - 凌天众媒网`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `凌天众媒网服务商：${store_name}销量排行，${store_name}热门排行，${store_name}畅销榜`
        },
        {
          hid: "keywords",
          name: "keywords",
          content: `${store_name}销量排行，${store_name}热门排行，凌天众媒网`
        }
      ]
    };
  },
  data() {
    return {
      hover: 1,
      storeId: "", //	是	int	店铺id
      total: 0,
      list: [],
      serviceList: [],
      form: {
        page: 1,
        pageSize: 20,
        store_id: "", //	是	int	店铺id
        store_class: "", //	否	int	店铺分类筛选id
        order: "sales", //	否	string	服务排序字段（’sales’,’comments’,’price’,’new’）
        sort: "desc" //	否	string	服务排序降序或者升序（’desc’,’asc’）
      },
      sortList: [
        { name: "成交量", type: "sales" },
        { name: "好评率", type: "comments" },
        { name: "价格", type: "price" },
        { name: "更新", type: "new" }
      ]
    };
  },
  computed: {
    ...mapState({
      envVars: "envVariables"
      // storeInfo: "storeInfo"
    })
  },
  created() {
    const { id = 0 } = this.$route.params;
    this.storeId = id;
    this.form.store_id = +this.storeId;
  },
  async fetch(app) {
    const { id } = app.params;
    if (!id) return;
    /* 获取店铺信息 */
    await storeInfoInit(app, id).catch(e => console.log(e));
  },
  async asyncData(app) {
    const errCon = { statusCode: 500, message: "服务列表数据加载失败,请重试" };
    const { id } = app.params;
    if (!id) return;
    const params = {
      store_id: id,
      order: "default",
      store_class: "",
      sort: "desc"
    };
    const topParams = { store_id: id };
    const resRes = await getServiceList(app, params).catch(e => {
      if (e && e.data) {
        errCon.message = e.data.message;
      }
      app.error(errCon);
    });
    const res = resRes ? resRes.data.data : '';
    const respRes = await getTopSales(app, topParams).catch(e => {
      if (e && e.data) {
        errCon.message = e.data.message;
      }
      app.error(errCon);
    });
    const resp = respRes ? respRes.data.data : '';
    let { total = 0, data = [] } = res;
    let list = [];
    for (let i = 0; i < resp.length; i++) {
      resp[i].index = i + 1;
      if (i % 2 === 0) {
        list.push(resp[i]);
      } else {
        list.unshift(resp[i]);
      }
    }
    return {
      total: total,
      serviceList: data,
      list
    };
  },
  methods: {
    sortType(type) {
      if (type === this.form.order) {
        this.form.sort = this.form.sort === "asc" ? "desc" : "asc";
      } else {
        this.form.sort = "asc";
      }
      this.form.order = type;
      this.form.page = 1;
      this.getList();
    },
    mouseIn(index) {
      //鼠标移入
      this.hover = index;
    },
    mouseOut() {
      //鼠标移出
      this.hover = 1;
    },
    handlePageChange(num) {
      this.form.page = num;
      this.getList();
    },
    getList() {
      serviceList(this.form)
        .then(res => {
          let {
            code,
            message,
            data: { data = [], total = 0 }
          } = res.data;
          if (code === 200) {
            this.serviceList = data;
            this.total = total;
          } else {
            this.$message.error({ title: "错误提示", message: message });
          }
        })
        .catch(err => {
          this.$message.error({ title: "错误提示", err });
        });
    }
  }
};
</script>

<style scoped lang="less">
@import "../../../assets/css/mixin";

.shop-rank {
  background: #fff;
  width: 1210px;
  margin: 20px auto 50px;
}

.sr_top {
  width: 1210px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 20px solid #f4f6f8;
  padding-top: 20px;
  padding-bottom: 20px;

  h2 {
    font-size: 24px;
    background: url("~assets/img/shop/head_bg.png") no-repeat center;
    width: 348px;
    background-size: contain;
    height: 67px;
    color: #fff;
    font-weight: bold;
    text-align: center;
    line-height: 67px;
  }
}

.sr_list {
  display: flex;
  height: 400px;
  justify-content: center;
  border-bottom: 20px solid #f4f6f8;

  &::after {
    display: block;
    clear: both;
    height: 0;
    content: "";
    visibility: hidden;
    overflow: hidden;
  }
}

.sr_item {
  transition: all 0.6s;
  float: left;
  width: 220px;
  padding-bottom: 20px;
  box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  position: relative;
  margin: 70px 0 70px 10px;

  &:nth-last-child(1) {
    margin-right: 10px;
  }

  &:nth-child(1),
  &:nth-child(5) {
    .top-icon {
      position: absolute;
      left: 9px;
      top: 20px;
      z-index: 2;
    }
  }

  &:nth-child(2),
  &:nth-child(3),
  &:nth-child(4) {
    .top-icon {
      position: absolute;
      left: -12px;
      top: -12px;
      z-index: 2;
    }
  }

  div {
    margin: 20px 10px 10px 10px;

    position: relative;

    img {
      width: 200px;
      height: 120px;
      margin: 0 auto;
    }
  }

  p:nth-last-child(1) {
    padding-left: 15px;
    display: flex;
    align-items: center;

    span {
      color: #999;
      font-size: 12px;
    }

    strong {
      color: #f3262d;
      font-size: 18px;
    }

    button {
      width: 100px;
      height: 36px;
      border: none;
      outline: none;
      margin-right: 10px;
      font-size: 14px;
      color: #fff;
      cursor: pointer;
      background: rgba(243, 38, 45, 1);
    }
  }

  p:nth-last-child(2) {
    color: #666;
    font-size: 14px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    word-wrap: break-word;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 10px;
    line-height: 1.5;
  }

  &.hover {
    width: 269px;
    margin-top: 30px;
    margin-bottom: 30px;
    height: 320px;

    div {
      img {
        width: 248px;
        height: 150px;
      }
    }

    p:nth-last-child(1) {
      justify-content: space-between;

      span {
        font-size: 14px;
      }

      strong {
        font-size: 20px;
      }
    }

    p:nth-last-child(2) {
      font-size: 16px;
    }
  }
}

.sr_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e6e6e6;

  .span {
    color: #333;
    font-size: 14px;
    text-indent: 20px;
    flex: 1;
  }
}

.item_ul {
  overflow: hidden;
  padding: 20px;
}

.sr_li {
  margin-bottom: 20px;
  float: left;
  width: calc(25% - 7.5px);
  border: 1px solid #f2f5f6;
  overflow: hidden;

  &:not(:nth-child(4n + 4)) {
    margin-right: 10px;
  }

  img {
    width: 100%;
    height: 168px;
    transition: transform 0.5s;
  }

  &:hover {
    p {
      color: #f3262d;
    }

    img {
      transform: scale(1.04);
    }
  }
}

.list_title {
  height: 72px;
  box-sizing: border-box;
  padding: 15px 18px;
  font-size: 14px;
  color: #666;
  line-height: 1.5;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box; //作为弹性伸缩盒子模型显示。
    -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
    -webkit-line-clamp: 2; //显示的行
    word-wrap: break-word;
  }
}

.sr_bottom_wrap {
  display: flex;
  padding: 18px;
  padding-top: 0;
  padding-bottom: 20px;
  justify-content: space-between;
  /**
        button {
            cursor: pointer;
            width: 120px;
            height: 30px;
            background: rgba(243, 38, 45, 1);
            outline: none;
            color: #fff;
            font-size: 12px;
            border: 1px solid rgba(243, 38, 45, 1);
        }
                 */
}

.sr_bottom {
  display: flex;
  justify-content: space-between;
  flex: 1;
}

.sr_price {
  font-size: 14px;
  color: rgba(243, 38, 45, 1);
  display: flex;
  &>p{
      font-size: 12px;
      font-weight: 400;
      line-height: 18px;
  }
}

.sr_num {
  font-size: 12px;

  span {
    color: #999;
  }

  em {
    color: #0066cc;
  }
}

.sort_box {
  display: inline-flex;
  align-items: center;
  color: #333;

  span {
    font-size: 12px;
    /*color: #333;*/
    line-height: 38px;
  }

  i {
    color: #cecece;
  }
}

.sort_item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 76px;
  cursor: pointer;

  &.active,
  &:hover {
    background: @c_efefef;

    span,
    i {
      color: @c_danger;
    }
  }

  .icon {
    color: #cecece;
    width: 16px;
    transform: scale(0.6);
    margin-bottom: -10px;
  }
}

.pagination_wrap {
  padding-bottom: 30px;

  /deep/ .pages_submit_btn {
    margin-right: 20px;
  }
}
</style>
