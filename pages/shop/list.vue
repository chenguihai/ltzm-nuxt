<template>
  <div>
    <navAll :navWidth="1210"/>
    <div class="shop_wrap">
      <ul class="shop_category">
        <li class="item_li active">
          <span class="title">分类：</span>
          <div :class="['shop_a-list',{active:showCate}]">
            <a :class="{active:form.cat_id==''}" href="javascript:;" @click="changeCate()">全部</a>

            <a
              :class="{active:form.cat_id===item.id}"
              href="javascript:;"
              v-for="item in cateList"
              :key="item.id"
              @click="changeCate(item.id)"
            >{{item.cate_name}}</a>
            <span class="more user_select" @click="showCate = !showCate">
              {{showCate ? '更多':'收起'}}
              <svg v-if="showCate" class="icon_s" aria-hidden="true">
                <use xlink:href="#icon-liebiaoye-gengduo" />
              </svg>
              <svg v-else class="icon_y" aria-hidden="true">
                <use xlink:href="#icon-liebiaoye-shouqi" />
              </svg>
            </span>
          </div>
        </li>
        <li class="item_li item_area">
          <span class="title">地区：</span>
          <div class="shop_a-list">
            <a
              :class="['area_item',{active:form.region_id==''}]"
              href="javascript:;"
              @click="changeRegion()"
            >全部</a>
            <a
              :class="['area_item',{active:form.region_id==item.id}]"
              href="javascript:;"
              v-for="item in regionList"
              :key="item.id"
              @click="changeRegion(item.id)"
            >{{item.name}}</a>
            <div class="area_wrap">
              <el-select
                size="mini"
                class="city"
                v-model="form.province"
                clearable
                placeholder="请选择省"
                @change="changeProvince"
              >
                <el-option v-for="item in areaArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <el-select size="mini" class="city" v-model="form.city" clearable placeholder="请选择市">
                <el-option
                  v-for="item in cityList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <span class="area_btn user_select" @click="searchRegion">确认</span>
            </div>
          </div>
        </li>
      </ul>
      <div class="sort_wrap">
        <ul class="sort_box user_select">
          <li
            :class="['sort_item',{active:form.order=== item.type}]"
            v-for="(item,index) in sortList"
            :key="item.type"
            @click="sortType(item.type)"
          >
            <span class="text">{{item.name}}</span>
            <i
              v-if="index!==0"
              :class="['icon','iconfont',form.order=== item.type && form.sort=== 'asc' ? 'icon-pingfenxiangshang':'icon-pingfenxiangxia']"
            ></i>
          </li>
        </ul>
        <el-pagination
          layout="total, prev, pager, next"
          @current-change="handlePageChange"
          :current-page="form.page"
          :hide-on-single-page="true"
          :total="total"
          :page-size="per_page"
        ></el-pagination>
      </div>
      <div class="shop_list" v-if="list.length > 0">
        <ul class="list_item">
          <li class="li-box" v-for="(item,index) in list" :key="item.id">
            <div class="shop_left">
              <nuxt-link target="_blank" :to="{path:'/shop/'+item.id}" class="picImg nuxt_link">
                <img
                  class="pic"
                  src="~assets/img/userDataImg.png"
                  v-lazy="item.logo+'?x-oss-process=image/resize,m_fill,h_160,w_160'"
                  :alt="item.store_name"
                />
              </nuxt-link>
              <div class="item">
                <div class="item_h4">
                  <nuxt-link
                    class="title-sot nuxt_link"
                    target="_blank"
                    :to="{path:'/shop/'+item.id}"
                    :title="item.store_name"
                  >
                    {{item.store_name}}
                    <div class="show-box">
                      <hoverBox class="hover-show" :storeData="item" />
                    </div>
                  </nuxt-link>
                  <div
                    :class="['collet',{'detail-collect':item.collect}]"
                    @click.stop="colletClick(item ,index)"
                  >{{item.collect ?'已收藏':'收藏'}}</div>
                  <span v-if="item.cityShortName" class="addr_box" :title="item.cityShortName">
                    <i class="iconfont icon-dizhi addr_icon"></i>
                    {{item.cityShortName}}
                  </span>
                </div>
                <nuxt-link class="nuxt_link" target="_blank" :to="{path:'/shop/'+item.id}">
                  <div class="icon-list">
                    <span
                      class="level"
                      v-if="item.shopLevel"
                      :style="{backgroundImage: 'url('+envVars.IMG_HOST +item.shopLevel.icon+')'}"
                    >{{item.shopLevel.bl_name}}</span>
                    <span
                      :class="[item.type_id === 1 ? 'c_personal':'c_company']"
                    >{{item.type_id | storeType}}</span>
                    <span
                      v-if="item.vipLevel"
                      class="vipLevel"
                      :style="{backgroundImage: 'url('+envVars.IMG_HOST +item.vipLevel+')'}"
                    ></span>
                    <div class="icon-num">
                      <svg class="bond_icon" aria-hidden="true">
                        <use xlink:href="#icon-huanyingyebaozhengjin
  " />
                      </svg>
                      <span>{{Math.floor(item.marginsum)}}</span>
                    </div>
                  </div>
                  <div class="text-1">
                    <span class="date">90天成交量：</span>
                    <em class="num">{{item.sales}}</em>
                    <span class="rate">好评率：</span>
                    <i class="r-num">{{item.praise_rate || 0}}%</i>
                  </div>
                  <div class="text-2" :key="item.id">
                    <span class="label">擅长技能：</span>
                    <span
                      class="sl_skill"
                      :key="skill.cat_one"
                      v-for="(skill) in item.skillList.filter((item,index)=> index<6)"
                    >{{skill.cate_name}}</span>
                  </div>
                  <div class="count">
                    共
                    <span>{{item.servicesum}}</span>个服务
                  </div>
                </nuxt-link>
              </div>
            </div>
            <div class="shop_right">
              <ul class="right_ul">
                  <li v-if="item[navItem.value+'_list'].length > 0"
                    v-for="(navItem,navIndex) in aboutList"
                    @click="navClick(navItem.value,index)"
                    :class="['right_li user_select',{active:item.select ? item.select===navItem.value : navItem.value ==='service'}]"
                    :key="navIndex"
                  >{{navItem.label }}</li>
              </ul>
              <ol class="right_list" v-if="item[(item.select || 'service')+'_list'].length > 0">
                <li v-for="subItem in item[(item.select || 'service')+'_list']" :key="subItem.id">
                  <nuxt-link
                    class="nuxt_link"
                    target="_blank"
                    :to="{path:`/${item.select==null || item.select ==='service'?`service/${subItem.id}`:`case-biog/${subItem.id}`}`,query:{id:subItem.store_id,type:item.select||'service'}}"
                  >
                    <div>
                      <img
                        class="pic"
                        src="~assets/img/img_bg.png"
                        v-lazy="subItem.img+'?x-oss-process=image/resize,m_fill,h_75,w_125'"
                        :alt="subItem.name"
                      />
                    </div>
                    <p class="right_name">{{subItem.name}}</p>
                    <p>
                      <span>¥{{subItem.price}}</span>元
                      <span v-show="subItem.unit_name">
                        <span>/{{subItem.unit_name}}</span>
                      </span>
                    </p>
                    <p>
                      <span>
                        成交量：
                        <span>{{subItem.deal_num || 0}}</span>
                      </span>
                    </p>
                  </nuxt-link>
                </li>
              </ol>
              <div v-else class="no-data">
                <img class="right_img" src="~assets/img/pintouge.png" alt="图片" />
                <span>店铺还未上架内容</span>
              </div>
            </div>
          </li>
        </ul>
        <div class="pagination_wrap">
          <el-pagination
            layout="prev, pager, next,total,jumper"
            prev-text="上一页"
            next-text="下一页"
            @current-change="handlePageChange"
            :current-page="form.page"
            :total="total"
            :page-size="per_page"
            :hide-on-single-page="true"
          ></el-pagination>
        </div>
      </div>
      <div v-else class="not-data searNodata">
        <img class="img" src="~assets/img/pintouge.png" alt="图片" />
        <span v-if="this.$route.query.keywords">抱歉，没有找到“<p>{{this.$route.query.keywords}}</p>”对应的店铺，请试试其他关键词试试</span>
        <span v-else class="text">您搜索到店铺列表为空，请更换关键字试试</span>
      </div>
    </div>
  </div>
</template>

<script>
import { filtrateList, storeList } from "@/api/store";
import { storeListAsync, getHeader } from "@/api/async-server";
import area from "@/assets/js/area";
import { mapState } from "vuex";
import { commonCollect } from "@/api/list";
import { Loginp } from "@/components/plugins/LoginPlugin";
import hoverBox from "@/components/shop/hoverBox";
import navAll from "@/components/component/navAll";

export default {
  layout: "shop-list-layout",
  name: "shop-list",
  components: { hoverBox, navAll },
  head() {
    return {
      title: `店铺街-凌天众媒网`,
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            " 凌天众媒网（zhongmei66.com）店铺街，热门商铺，最新商铺，个人威客广场，服务商店铺，广告主卖场，广告提供商铺，一站式全媒界大型媒体电商平台"
        },
        {
          hid: "keywords",
          name: "keywords",
          content:
            "凌天众媒网店铺街，热门商铺，最新商铺，个人威客广场，服务商店铺，广告主卖场，广告提供商铺"
        }
      ]
    };
  },
  data() {
    let areaJson = JSON.parse(JSON.stringify(area));
    areaJson.shift();
    return {
      form: {
        page: 1,
        cat_id: "", //	否	string	筛选分类id
        region_id: "", //	否	string	筛选地区id
        order: "default", //	否	string	排序字段（'default',’sales’,’comments’,’time’）
        sort: "", //	否	string	排序方式（’asc’,’desc’）
        keywords: this.$route.query.keywords || "", //	否	string	搜索关键字
        province: "",
        city: ""
      },
      sortList: [
        { name: "综合", type: "default" },
        { name: "成交量", type: "sales" },
        { name: "好评率", type: "comments" },
        { name: "开通时间", type: "time" }
      ],
      aboutList: [
        { value: "service", label: "相关服务" },
        { value: "case", label: "相关案例" },
        { value: "biog", label: "相关传记" }
      ],
      areaArr: areaJson,
      total: 0,
      per_page: 0,
      list: [],
      cityList: [],
      cateList: [],
      regionList: [],
      showCate: true, //显示更多分类
      selectIndex: 0
    };
  },
  computed: {
    ...mapState({
      envVars: "envVariables"
    })
  },
  filters: {
    storeType: type => {
      let name = "";
      switch (type) {
        case 1:
          name = "个人";
          break;
        case 2:
          name = "企业";
          break;
      }
      return name;
    }
  },
//   watch: {
//     $route: {
//       handler: function(route) {
//         const { keywords = "" } = route.query;
//         if (keywords) {
//           this.form.page = 1;
//           this.form.keywords = keywords;
//           this.storeListHttp();
//         }
//       },
//       immediate: true
//     }
//   },
  created() {
    this.filtrateListHttp();
    // this.storeListHttp();
  },
  provide() {
    return {
      list: this.list,
      total: this.total,
      per_page: this.per_page,
      // 导航SSR
      navList: this.headerNavList,
      navLeftMadio: this.navLeftMadio,
      popularMedia: this.popularMedia,
      PopularBrand: this.PopularBrand,
    };
  },
  async asyncData(app) {
    const { keywords } = app.query;
    let params = {
      page: 1,
      keywords: keywords || "" //	否	string	搜索关键字
    };
    const errCon = { statusCode: 500, message: "店铺列表加载失败,请重试" };
    const resRes = await storeListAsync(app, params).catch(e => {
      if (e && e.data) {
        errCon.message = e.data.message;
      }
      app.error(errCon);
    });
    const res = resRes ? resRes.data.data : '';
    let data = res.data;
    for (let i = 0; i < data.length; i++) {
      const { service_list = [], case_list = [] } = data[i];
      data[i].select =
        service_list.length > 0
          ? "service"
          : case_list.length > 0
          ? "case"
          : "biog";
    }

    // 导航SSR
    let navData = await getHeader();
    const navDataRes = navData.data.data;
    // if (code != 200) return this.$message.error(message);
    let navLeftMadio = navDataRes.cate_left;
    let headerNavList = navDataRes.cate_right || [];
    let PopularBrand = navDataRes.hot_media && navDataRes.hot_media.hot_brand;
    let popularMedia = navDataRes.hot_media && navDataRes.hot_media.hot_media;
    for (var i = 0; i < navLeftMadio.length; i++) {
      var a = navLeftMadio[i].child;
      var itemList = [];
      navLeftMadio[i] = { ...navLeftMadio[i], itemList };
      if (a) {
        for (var j = 0; j < a.length; j++) {
          for (var k = 0; k < a[j].child.length; k++) {
            if (a[j].child[k].inr == 1 && a[j].child[k].pid == a[j].id) {
              navLeftMadio[i].itemList.push(a[j].child[k]);
            }
          }
        }
      }
    }

    return {
      list: data,
      total: res.total,
      per_page: res.per_page,
      // 导航SSR
      navLeftMadio,
      popularMedia,
      headerNavList,
      PopularBrand
    };
  },
  methods: {
    navClick(val, index) {
      let data = this.list[index];
      data.select = val;
      this.$set(this.list, index, data);
    },
    changeCate(id = "") {
      this.form.cat_id = id;
      this.form.page = 1;
      this.storeListHttp();
      return false;
    },
    changeRegion(id = "") {
      this.form.region_id = id;
      this.form.page = 1;
      this.storeListHttp();
      return false;
    },
    searchRegion() {
      const { province, city } = this.form;
      this.form.region_id = city ? city : province;
      this.form.page = 1;
      this.storeListHttp();
    },
    changeProvince(value) {
      if (value === "") {
        this.cityList = [];
        this.form.city = "";
        return;
      }
      this.cityList = this.areaArr
        .filter(item => value === item.id)
        .map(item => item.child)[0];
    },
    sortType(type) {
      if (type === "default") {
        //等于综合
        if (this.form.order === type) {
          //之前就选中了综合
          return;
        } else {
          this.form.sort = "";
        }
      } else {
        if (this.form.order === type) {
          this.form.sort = this.form.sort === "asc" ? "desc" : "asc";
        } else {
          this.form.sort = "asc";
        }
      }
      this.form.order = type;
      this.form.page = 1;
      this.storeListHttp();
    },
    handlePageChange(val) {
      //分页器：页码变更
      this.form.page = val;
      this.storeListHttp();
    },
    goto(url) {
      this.$router.push(url);
    },
    storeListHttp() {
      storeList(this.form)
        .then(res => {
          let {
            code,
            message,
            data: { data = [], total = 0, per_page = 0 }
          } = res.data;
          if (code === 200) {
            for (let i = 0; i < data.length; i++) {
              const { service_list = [], case_list = [] } = data[i];
              data[i].select =
                service_list.length > 0
                  ? "service"
                  : case_list.length > 0
                  ? "case"
                  : "biog";
            }
            this.list = data;
            this.total = total;
            this.per_page = per_page;
          } else {
            this.$message.error({ title: "错误提示", message: message });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    filtrateListHttp() {
      filtrateList(this.form)
        .then(res => {
          let {
            code,
            message,
            data: { cateList = [], regionList = 0 }
          } = res.data;
          if (code === 200) {
            this.cateList = cateList;
            this.regionList = regionList;
          } else {
            this.$message.error({ title: "错误提示", message: message });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    colletClick(item, index) {
      this.selectIndex = index;
      if (!localStorage.getItem("access_token")) {
        // this.$message.warning('请先登录');
        Loginp(0, () => window.location.reload(true));
        return;
      }
      this.commonCollectHttp(item, item.collect);
    },
    commonCollectHttp(item, type = 1) {
      var data = {
        type: 3,
        collect_id: item.id,
        cancel: type
      };
      commonCollect(data)
        .then(res => {
          if (res.data.code != 200) {
            this.$message.error(res.data.message);
            return;
          }
          let data = this.list[this.selectIndex];
          data.collect = +!item.collect;
          this.$set(this.list, this.selectIndex, data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style rel="stylesheet/less" scoped lang="less">
@import "../../assets/css/shop/shop-list.less";
@import "../../assets/css/mixin";
.searNodata{
    flex-direction: column!important;
    &>span{
        font-size: 14px;
        display: flex;
        margin-top: 10px;
        &>p{
            color: #006699;
        }
    }
}
.shop_category {
  background: @c_fff;
  padding: 10px 20px 8px;
    margin-top: 20px;
  .item_li {
    display: flex;
    align-items: flex-start;

    &.active {
      border-bottom: 1px solid #efefef;
    }
  }

  .item_area {
    height: 35px;
    line-height: 35px;
    margin-top: 6px;

    input {
      border: unset;
    }
  }

  .title {
    margin-right: 50px;
    color: #999;
    font-size: 14px;
    height: 14px;
    line-height: 34px;
  }
}

.shop_a-list {
  position: relative;
  flex: 1;

  a {
    line-height: 34px;
    display: inline-flex;
    font-size: 14px;
    color: @c_069;
    text-decoration-line: none;
    margin-right: 36px;

    &:hover,
    &.active {
      color: @c_danger;
    }
  }

  &.active {
    margin-bottom: 4px;
    height: 34px;
    overflow: hidden;
  }

  .area_item {
    height: 28px;
    line-height: 28px;
  }

  .more {
    position: absolute;
    top: 6px;
    right: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 22px;
    background: #fff;
    border: 1px solid #e6e6e6;
    text-align: center;
    color: #333;
    cursor: pointer;
    font-size: 12px;

    .icon_s,
    .icon_y {
      width: 13px;
      height: 7px;
    }
  }
}

.area_wrap {
  display: inline-flex;
  height: 28px;
  float: right;

  .city {
    width: 100px;
    margin-right: 10px;
  }

  .area_btn {
    width: 46px;
    height: 26px;
    line-height: 24px;
    margin-top: 4px;
    background: #f4f4f4;
    border: 1px solid #dfdfdf;
    font-size: 12px;
    color: #333;
    text-align: center;
    cursor: pointer;

    &:hover {
      background-color: #fff;
    }
  }
}

.sort_wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid @c_efefef;
  background: @c_fff;
  margin-top: 20px;
}

.sort_box {
  color: #333;
  flex: 1;

  .sort_item {
    display: inline-flex;
    align-items: center;
    line-height: 38px;
    justify-content: center;
    min-width: 76px;
    padding: 0 25px;
    cursor: pointer;

    .text {
      font-size: 12px;
      padding-right: 0.3em;
    }

    .icon {
      color: #cecece;
      width: 16px;
      transform: scale(0.6);
      margin-top: -2px;
      margin-left: -4px;
    }

    &.active,
    &:hover {
      background: @c_efefef;

      .text,
      .icon {
        color: @c_danger;
      }

      .icon {
        margin-top: -2px;
      }
    }
  }
}

.not-data {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 420px;
  background: #fff;

  .img {
    width: 100px;
    height: 117px;
  }

  .text {
    font-size: 16px;
    color: @c_666;
    margin-left: 10px;
  }
}
.seaData{
    flex-direction: column!important;
    &>span{
        font-size: 14px;
        display: flex;
        margin-top: 10px;
        &>p{
            color: #006699;
        }
    }
}
.shop_list {
  background: @c_fff;
}

.list_item {
  padding: 0px 20px 0 24px;

  .li-box {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;

    &:not(:last-child) {
      border-bottom: 1px dotted #eee;
    }

    .addr_box {
      color: @c_danger;
      font-size: 12px;
      margin-left: 29px;
      line-height: 22px;
     width: 65px;
    height: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 400;

      & > i {
        font-size: 12px;
        // margin-right: 4px;
      }
    }
  }
}

.shop_left {
  position: relative;

  .show-box {
    display: none;
    background: #fff;
    position: absolute;
    border: 1px solid #eee;
    left: 176px;
    //top: 37px;
    top: 17px;
    z-index: 2;

    .hover-show {
      top: -1px;
      left: -1px;
    }
  }
    &>.item{
        margin-right: 40px;
    }
  .picImg,
  .pic {
    width: 160px;
  }

  .picImg {
    height: 160px;
    width: 160px;
    margin-right: 16px;

    &:hover {
      img {
        opacity: 0.9;
      }
    }
  }

  .pic {
    height: 160px;
    display: block;
    overflow: hidden;
    border: 1px solid #eee;
  }

  flex: 6;
  display: flex;

  .item {
    flex: 1;
    .count {
      color: #666;

      span {
        color: #f3262d;
      }
    }
  }
}

.item_h4 {
  font-size: 14px;
  color: #333;
  padding-bottom: 8px;
  margin-top: -4px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
     .title-sot{
        width: 227px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        word-wrap: break-word;
     }
  .title-sot:hover {
    color: #f3262d;

    .show-box {
      display: block;
    }
  }

  .collet {
    width: 70px;
    padding-left: 20px;
    margin-left: 29px;
    font-weight: 400;

    &:hover {
      color: #f3262d;
    }
  }
}

.icon-list {
  display: flex;
  align-items: center;

  .level,
  .c_company,
  .c_personal,
  .vipLevel,
  .icon-num {
    border-radius: 4px;
  }

  .level {
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    color: #fff;
    padding: 0 4px;
    background: #22e0e3 no-repeat center;
  }

  .c_company,
  .c_personal {
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    color: #fff;
    padding: 0 3px;
    margin-left: 4px;
  }

  .vipLevel {
    width: 51px;
    height: 22px;
    margin-left: 4px;
    background: no-repeat center/51px 22px;
  }

  .icon-num {
    margin-left: 4px;
    border: 1px solid #a1df2a;
    height: 20px;
    display: flex;
    align-items: center;

    .bond_icon {
      width: 24px;
      height: 18px;
    }

    span {
      height: 20px;
      background: #a1df2a;
      font-size: 12px;
      color: #fff;
      border-radius: 4px;
      line-height: 20px;
      padding-left: 3px;
      padding-right: 3px;
    }

    svg {
      font-size: 20px;
    }
  }
}

.text-1 {
  display: flex;
  align-items: center;
  padding-top: 6px;

  .date {
    font-size: 12px;
    color: #666;
  }

  .num {
    font-size: 12px;
    color: #0066cc;
    margin-right: 46px;
  }

  .rate {
    font-size: 12px;
    color: #666666;
  }

  .r-num {
    color: #f3262d;
  }

  .text-1-1 {
    display: flex;
    align-items: center;

    div {
      display: flex;
      align-items: center;
    }
  }
}

.text-2 {
  padding: 6px 0 10px;
  max-height: 78px;
  overflow: hidden;

  .label {
    display: inline-flex;
    margin: 5px 0;
  }

  .sl_skill {
    display: inline-flex;
    color: #666;
    border: 1px solid #e3e3e3;
    font-size: 12px;
    padding: 3px 10px;
    border-radius: 15px;
    text-decoration-line: none;
    margin: 5px 16px 5px 0;
    white-space: nowrap;
  }
}

.shop_right {
  .right_ul {
    display: flex;
    align-items: center;
    padding-bottom: 8px;
    font-size: 14px;
  }

  .right_li {
    margin: -4px 20px 2px 0px;
    height: 22px;
    border-bottom: 1px solid transparent;
    cursor: pointer;

    &.active {
      color: #f3262d;
      border-bottom-color: #f3262d;
    }

    &:hover {
      color: #f3262d;
    }
  }

  .no-data {
    height: 149px;
    display: flex;
    align-items: center;
    color: #666;
    justify-content: center;
  }

  .right_img {
    width: 62px;
    margin-right: 10px;
  }

  flex: 5;
}

.right_list {
  display: flex;
  width: 524px;

  li {
    //flex: 1;
    cursor: pointer;

    &:not(:last-child) {
      margin-right: 8px;
    }

    div {
      width: 125px;
      height: 75px;

      &:hover {
        img {
          transform: scale(1.06);
        }
      }
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      transition: all 0.5s;
    }

    .right_name:hover {
      color: #ff0027;
    }

    p:nth-child(2) {
      font-size: 12px;
      width: 125px;
      color: #666;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-top: 3px;
      padding-bottom: 3px;
    }

    p:nth-child(3) {
      width: 125px;
      font-size: 12px;
      color: #ff0027;
      padding-bottom: 7px;
      line-height: 16px;
    }

    p:nth-child(4) {
      color: #999;
      font-size: 12px;

      span {
        color: #0066cc;
      }
    }
  }
}

.pagination_wrap {
  padding: 10px 20px 50px 0;
}

.nuxt_link {
  text-decoration: none;
}
</style>
