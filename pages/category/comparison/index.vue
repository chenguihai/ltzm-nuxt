<template>
  <div class="comparisonList">
    <!-- 对比 -->
    <comHeader :headerWid="1390" />
    <navAll :navWidth="1395" />
    <div class="comparisonL">
      <table>
        <thead>
          <tr>
            <th>名称</th>
            <th>店铺</th>
            <th>媒介资质</th>
            <th>隶属媒体公司</th>
            <th>所在地</th>
            <th>可选规格</th>
            <th
              class="theadList"
              v-for="(item , index) in theadList"
              :key="index"
            >{{item.attr_name}}</th>
            <th class="comments">评价</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in 4" :key="item">
            <td>
              <li style="line-height:240px">请在服务详情或列表加入同类型服务</li>
            </td>
            <td>
              <div class="location">
                <span></span>
              </div>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>

            <td class="theadList" v-for="(item , index) in theadList" :key="index"></td>
            <td class="comments">
              <span></span>
            </td>
          </tr>
        </tbody>
        <tbody class="tbodyData">
          <tr
            v-for="(item , index) in comparisonList"
            :key="index"
            @click="selectItemActionE(index)"
            :class="{active: index==selectIndex}"
          >
            <td>
              <li>
                <div class="swiper" @click="seleClick(item ,index)">
                  <img :src="envVars.IMG_HOST+item.img" v-if="item.img != null" alt />
                  <img v-else src="../../../assets/img/userDataImg.png" alt />
                </div>
                <div class="status" @click="seleClick(item ,index)">{{item.name}}</div>
                <div class="numner">￥{{item.price}}/月</div>
              </li>
              <div class="operation">
                <span class="submit" @click="seleClick(item ,index)">查看详情</span>
                <el-button class="remove" :plain="true" @click="deleteInfoAction(item,index)">删除</el-button>
              </div>
            </td>
            <td>
              <div class="location">
                <span>
                  <p>{{item.store_name}}</p>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-lianxiwo" class="ccccc" />
                  </svg>
                </span>
                <span>
                  <p class="bl_name">{{item.shopLevel.bl_name}}</p>
                  <p class="type_id_1" v-if="item.type_id == 1">个人</p>
                  <p class="type_id_2" v-else>企业</p>

                  <p class="vipLevel" v-if="item.vipLevel!=''">
                    <img :src="envVars.IMG_HOST+item.vipLevel" alt />
                  </p>
                  <p class="iconData">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-huanyingyebaozhengjin" class="ccccc" />
                    </svg>
                    <i>{{item.marginsum}}</i>
                  </p>
                </span>
              </div>
            </td>
            <td>
              <span v-for=" (itemL , index) in item.mediaAptitudeList" :key="index">
                {{itemL}}
                <i>;&nbsp;</i>
              </span>
            </td>
            <td>{{item.mediaCompany}}</td>
            <td>{{item.cityShortName}}</td>
            <td class="sale_attr">
              <span v-for="(itemG , index) in item.sale_attr" :key="index">
                {{itemG}}
                <span v-if="item.sale_attr !=[]"></span>
              </span>
            </td>
            <td class="theadList" v-for="(itemD , index) in item.normal_attr" :key="index">
              <span v-if="itemD.checked==1">
                <p v-if=" typeof itemD.checked_list   === 'string'">{{ itemD.checked_list}}</p>
                <p v-else>
                  <i v-for="(itemI , index) in itemD.checked_list" :key="index">
                    <span v-if="typeof itemI  === 'string'">{{itemI+=','}}</span>
                    <span v-else>{{itemI.value}}</span>
                  </i>
                </p>
              </span>
            </td>
            <td class="comments">
              <span>
                <p>
                  <i>综合评分</i>
                  {{item.comments.avgScore}}
                </p>
                <p>累计评价 {{item.commentsNum}}</p>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <comFooter />
    <side-bar ref="sideBar"></side-bar>
  </div>
</template>
        <script>
import comHeader from "@/components/component/comHeader";
import navAll from "@/components/component/navAll";
import sideBar from "@/components/sideBar";
import comFooter from "@/components/component/comFooter";
import { serviceCompare } from "@/api/list";
import { getHeader } from "@/api/async-server";
import { mapState } from "vuex";
export default {
  components: {
    comHeader,
    navAll,
    comFooter,
    sideBar
  },
  computed: {
    ...mapState({ envVars: "envVariables" })
  },
  data() {
    return {
      selectIndex: -1,
      comparisonList: [],
      theadList: "",
      id: [],
      comList: []
    };
  },
   provide() {
    return {
      // 导航SSR
      navList: this.headerNavList,
      navLeftMadio: this.navLeftMadio,
      popularMedia: this.popularMedia,
      PopularBrand: this.PopularBrand,
    };
  },
  async asyncData(app) {
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
 navLeftMadio,
      popularMedia,
      headerNavList,
      PopularBrand
    }
  },
  mounted() {
    this.id = JSON.parse(localStorage.getItem("dataId"));
    this.comList = JSON.parse(localStorage.getItem("comparisonList"));
    var data = { sid: this.id };
    serviceCompare(data)
      .then(res => {
        var listData = [];
        if (res.data.code == 200) {
          this.comparisonList = res.data.data;
          this.theadList = this.comparisonList[0].normal_attr;
          for (var i = 0; i < this.comparisonList.length; i++) {
            var a = this.comparisonList[i].sale_attr;
            for (var p = 0; p < a.length; p++) {
              a[p] = a[p].list;
              var arr = [];
              var arrList = [];
              var arrValue = {};
              for (var u = 0; u < a[p].length; u++) {
                arr = a[p][u].attr_name + ":" + a[p][u].value;

                arrList.push(arr);
              }
              a[p] = JSON.stringify(arrList);
              a[p] = a[p].replace(/\[|]/g, "");
              a[p] = a[p].replace(/\"|"/g, "");
            }
          }

          for (var i = 0; i < this.comparisonList.length; i++) {
            this.comparisonList[i].marginsum = Math.ceil(
              this.comparisonList[i].marginsum
            );
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    selectItemActionE(index) {
      if (this.selectIndex === index) {
        this.selectIndex = -1;
      } else {
        this.selectIndex = index;
      }
    },
    // 删除
    deleteInfoAction(item, index) {
      if (this.comparisonList.splice(index, 1)) {
        this.$message({
          message: "删除成功",
          type: "success"
        });
      }
      for (var i = 0; i < this.id.length; i++) {
        var index = this.id[i].index;
        if (this.id[i] == item.id) {
          this.id.splice(i, 1);
        }
        for (var i = 0; i < this.comList.length; i++) {
          if (this.comList[i].id == item.id) {
            this.comList.splice(i, 1);
          }
        }
      }
      window.localStorage.setItem("dataId", JSON.stringify(this.id));
      window.localStorage.setItem("comparisonList", JSON.stringify(this.comList));
    },
    seleClick(item, index) {
      var { href } = this.$router.resolve({
        path: "/service/"+item.id,
        query: { id: item.store_id }
      });
      window.open(href, "_blank");
    }
  }
};
</script>
    <style lang="less" scoped>
@import "../../../assets/css/comparisonScode.less";
</style>
    <style lang="less">
.operation {
  .remove {
    padding: 0;
    border: 0;
    font-size: 12px;
    color: #666;
  }
}

</style>
