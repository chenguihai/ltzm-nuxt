<template>
  <div class="serviceDetails" id="serviceD" :class="{'zoomD':activeClass}">
    <comHeader :headerWid="1390" />
    <navAll :navWidth="1395" />
    <div class="service_details">
      <div class="service_hot">
        <div class="serviceHot">热卖服务</div>
        <div class="hotList">
          <ul>
            <li class="hot_list" v-for="(Cont , index) in hotList" :key="index">
              <nuxt-link :to="`/service/${Cont.id}?id=${Cont.store_id}`" target="_blank">
                <img
                  v-if="Cont.img!=''&& Cont.img!=null"
                  :src="envVars.IMG_HOST+Cont.img+'?x-oss-process=image/resize,m_fill,h_102,w_170'"
                  :title="Cont.name"
                  :alt="Cont.name"
                />
                <img :title="Cont.name" :alt="Cont.name" v-else src="../../assets/img/img_bg.png" />
              </nuxt-link>
              <nuxt-link :to="`/service/${Cont.id}?id=${Cont.store_id}`" target="_blank">
                <span>{{Cont.name}}</span>
                <span :title="'￥'+Cont.price+'/'+Cont.unit_name">
                  <p>
                    <span>￥{{parseInt(Cont.price)}}</span>
                    <span>/{{Cont.unit_name}}</span>
                  </p>
                </span>
                <span>查看详情</span>
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="textHot">热门文章</div>
        <div class="newsList">
          <ul>
            <li v-for="(item , index) in newsList" :key="index">
              <p>·</p>
              <nuxt-link :to="`/news/${item.id}`" target="_blank">{{item.title}}</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="service_Nav">
        <div class="serviced">
          <div class="nav_brand" v-if="this.$route.params.id">
            当前结果
            <i class="crumbs-arrow">></i>
            <p class="colo">"{{SubmenuList.brand_name}}"</p>
          </div>
          <div class="nav_brand" v-if="this.$route.params.keywords">
            当前结果
            <i class="crumbs-arrow">></i>
            <p class="colo">"{{this.$route.params.keywords}}"</p>
          </div>
          <div class="NameList">
            <div class="lmName" v-if="pName.id" @click="deletP()">
              {{pName.name}}:
              <p>
                {{pName.brand_name}}
                <span class="iconfont icon-guanbi"></span>
              </p>
            </div>
          </div>
          <div class="NameList">
            <div class="lmName" v-if="jname.id" @click="deletJ()">
              {{jname.name}}:
              <div>
                {{jname.show_info}}
                <span class="iconfont icon-guanbi"></span>
              </div>
            </div>
          </div>
          <div class="NameList">
            <div class="lmName" v-if="lname.id" @click="deletL()">
              {{lname.name}}:
              <div>
                {{lname.sr_name}}
                <span class="iconfont icon-guanbi"></span>
              </div>
            </div>
          </div>
          <div class="NameList">
            <div class="lmName" v-if="cname.name" @click="deletC()">
              {{cname.names}}:
              <div>
                {{cname.name}}
                <span class="iconfont icon-guanbi"></span>
              </div>
            </div>
          </div>
          <div
            class="NameList"
            v-for="(item , index) in filterArr"
            :key="index"
            v-if="filterArr.length > 0"
          >
            <div class="lmName" @click="deletF(item,index)">
              {{item.name}}:
              <div>
                {{item.filter_Info}}
                <span class="iconfont icon-guanbi"></span>
              </div>
            </div>
          </div>
          <div class="NameList">
            <span v-if="flagAll" @click="deletA()">清空筛选</span>
          </div>
        </div>
        <div class="nav_list user_select">
          <div
            class="navList"
            :class="{'colordisplay':display}"
            v-if="navList.data != undefined &&
              navList.data.length > 0"
          >
            <p>{{navList.name}}:</p>
            <div class="navName">
              <div class="navName_top">
                <div class="letterListAll" v-if="flagLE">
                  <div
                    v-for="(itemP, index) in letterList"
                    :key="index"
                    @click="letterClick(index)"
                    :class="{letterActive:letterIndex == index}"
                  >{{itemP}}</div>
                </div>
              </div>
              <div :class="[display?'navName_bot heid_box':'navName_bot']">
                <div
                  v-for="(itemO, indexb) in showList"
                  :key="indexb"
                  :class="{brandNameActive:brandNameIndex == indexb }"
                  @click="brandNameClick(indexb ,itemO)"
                  :title="itemO.brand_name"
                >
                  <img
                    src="~/assets/img/img_bg.png"
                    v-lazy="itemO.brand_logo+'?x-oss-process=image/resize,m_fill,h_36,w_98'"
                    :alt="itemO.brand_name"
                  />
                  <div>{{itemO.brand_name}}</div>
                </div>
              </div>
              <div v-if="brandName.length > 9" @click="setShowAll()" class="more chang">
                <p>{{word}}</p>
                <div class="changeIcon icon_x" v-if="display">
                  <svg class="icon_s" aria-hidden="true">
                    <use xlink:href="#icon-liebiaoye-shouqi" />
                  </svg>
                  <svg class="icon_y" aria-hidden="true">
                    <use xlink:href="#icon-liebiaoye-shouqis" />
                  </svg>
                </div>
                <div class="changeIcon" v-else>
                  <svg class="icon_s" aria-hidden="true">
                    <use xlink:href="#icon-liebiaoye-gengduo" />
                  </svg>
                  <svg class="icon_y" aria-hidden="true">
                    <use xlink:href="#icon-liebiaoye-gengduos" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="navList Territory" v-if="navPrice.data">
            <p>{{navPrice.name}}:</p>
            <div class="navName">
              <div class="priceAll navName_top navNameTerritory">
                <div class="price">
                  <div
                    v-for="(itemPM , index) in navPrice.data"
                    :key="index"
                    @click="navPriceClick(itemPM ,index)"
                    :class="{navPriceActive:navPriceIndex == index}"
                  >
                    {{itemPM.show_info}}
                    <span v-if="index>(navPrice.length - 2)">以上</span>
                  </div>
                </div>
                <div class="inputP" v-if="navPrice.data">
                  <input type="text" v-model="number1" />
                  <span>-</span>
                  <input type="text" v-model="number2" />
                  <button @click="subM">确定</button>
                </div>
              </div>
            </div>
          </div>

          <div
            :class="['navList Territory', showAlltory?'colordisplay':'']"
            v-if="terriNav.length>0"
          >
            <p>{{territory.name}}:</p>
            <div class="navName">
              <div class="priceAll navName_top navNameTerritory">
                <div class="cany">
                  <div
                    v-for="(itemPT , indexT) in terriNav"
                    :key="indexT"
                    @click="territoryClick(itemPT,indexT)"
                    :class="{territoryActive:territoryIndex == indexT}"
                  >{{itemPT.sr_name}}</div>
                </div>
              </div>
              <div v-if="terriListL.length > 9" @click="setShowTory()" class="tory chang">
                <p>{{wordT}}</p>
                <div class="changeIcon icon_x" v-if="displayTerri">
                  <svg class="icon_s" aria-hidden="true">
                    <use xlink:href="#icon-liebiaoye-shouqi" />
                  </svg>
                  <svg class="icon_y" aria-hidden="true">
                    <use xlink:href="#icon-liebiaoye-shouqis" />
                  </svg>
                </div>
                <div class="changeIcon" v-else>
                  <svg class="icon_s" aria-hidden="true">
                    <use xlink:href="#icon-liebiaoye-gengduo" />
                  </svg>
                  <svg class="icon_y" aria-hidden="true">
                    <use xlink:href="#icon-liebiaoye-gengduos" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="navList Territory region" v-if="region.data">
            <p>{{region.name}}:</p>
            <div class="navName">
              <div class="priceAll navName_top navNameTerritory">
                <div class="add">
                  <div
                    v-for="(itemA , indexR) in region.data"
                    :key="indexR"
                    @click="regionClick(itemA,indexR)"
                    :class="{regionActive:regionIndex == indexR}"
                  >{{itemA.shortname}}</div>
                </div>
              </div>
            </div>
            <div class="selectArea">
              <el-select
                size="mini"
                class="city"
                v-model="province"
                clearable
                placeholder="请选择省"
                @change="changeProvince"
              >
                <el-option
                  v-for="item in areaArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-select size="mini" class="city" v-model="city" clearable placeholder="请选择市">
                <el-option
                  v-for="item in cityList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <span class="onSubmit" @click.stop="onSubmit">确认</span>
            </div>
          </div>
          <div
            class="navList Territory othersList"
            v-for="(itemO , index1) in filterSpec"
            :key="index1"
            v-if="flag"
          >
            <p>{{itemO.name}}:</p>
            <div class="navName">
              <div class="priceAll navName_top navNameTerritory">
                <div class="filterSpec">
                  <div
                    v-for="(itemPM , index) in itemO.data"
                    :key="index"
                    @click.stop="filterArrClick(itemPM ,index ,index1 ,itemO)"
                    :class="{filterArrActive:filterArrIndex[index1] == index}"
                  >{{itemPM.show_Info}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="bottBlock" v-if="filterSpec.length > 0">
            <div class="bottbottBlock" ref="companyStyl" @click="bottbottBlock = !bottbottBlock">
              <div :class="{'colordisplayBlock':displayBlock}">
                <span>{{Block}}</span>
                <span class="iconfont icon-liebiaoye-gengduo" v-if="displayBlock== false"></span>
                <span class="iconfont icon-liebiaoye-shouqi" v-else-if="displayBlock== true"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="shopList">
        <div class="shopLis_left">
          <h4>雇主选购</h4>
          <nuxt-link
            :to="`/service/${Cont.id}?id=${Cont.store_id}`"
            target="_blank"
            class="shop_li"
            v-for="(Cont , index) in shopList.filter((item,idx)=>idx < num)"
            :key="index"
          >
            <div class="shopLis_left_img">
              <img
                src="~assets/img/userDataImg.png"
                v-lazy="Cont.img+'?x-oss-process=image/resize,m_fill,h_120,w_199'"
                v-if="Cont.img != null && Cont.img !=''"
                :title="Cont.name"
                :alt="Cont.name"
              />
              <img v-else src="../../assets/img/img_bg.png" :title="Cont.name" :alt="Cont.name" />
            </div>
            <span>{{Cont.name}}</span>
            <div class="shop_data">
              <p>
                成交量:
                <i>{{Cont.deal_num}}</i>
              </p>
              <p :title="`￥${parseInt(Cont.price)}/${Cont.unit_name}`">
                <span>￥{{parseInt(Cont.price)}}</span>
                <span>/{{Cont.unit_name}}</span>
              </p>
            </div>
          </nuxt-link>
        </div>
        <div class="shopLis_right">
          <div class="shopLis_right_top user_select">
            <ul>
              <li
                v-for="(item , index) in pxtab"
                :key="item.type"
                @click="shopSct(item.type)"
                :class="['shopSc',{shopSctiveC:typePX=== item.type}]"
              >
                {{item.name}}
                <span
                  v-if="index >0"
                  :class="['iconIndex','iconfont',typePX=== item.type && sort=== 'asc' ? 'icon-pingfenxiangshang':'icon-pingfenxiangxia']"
                ></span>
              </li>
            </ul>

            <div class="top_right">
              <span>共{{total}}个结果</span>
              <span :class="{'disableColor':disableColor}" @click="perPage">
                <span class="iconfont icon-zuo"></span>
              </span>
              <span>
                <i>{{page}}</i>
                /{{numtal||0}}
              </span>
              <span :class="{'lastColor':lastColor}" @click="nextPage">
                <span class="iconfont icon-you"></span>
              </span>
            </div>
          </div>
          <div class="shopLis_right_cont">
            <div class="shopLi_ul" v-if="shopLisRightCont.length >0">
              <div
                href="javascript:;"
                class="shopLi_li"
                v-for="Cont in shopLisRightCont"
                :key="Cont.id"
              >
                <nuxt-link
                  :to="`/service/${Cont.id}?id=${Cont.store_id}`"
                  target="_blank"
                  class="swiper"
                >
                  <img
                    src="~assets/img/userDataImg.png"
                    v-lazy="Cont.img +'?x-oss-process=image/resize,m_fill,h_143,w_224'"
                    :title="Cont.name"
                    :alt="Cont.name"
                  />
                </nuxt-link>
                <nuxt-link
                  :to="`/service/${Cont.id}?id=${Cont.store_id}`"
                  target="_blank"
                  class="numner"
                >
                  <span :title="`￥${parseInt(Cont.price)}/${Cont.unit_name}`">
                    ￥{{parseInt(Cont.price)}}
                    <p>/{{Cont.unit_name}}</p>
                  </span>
                  <span>
                    <p>成交量:</p>
                    <p>{{Cont.deal_num}}</p>
                  </span>
                </nuxt-link>
                <nuxt-link
                  :to="`/service/${Cont.id}?id=${Cont.store_id}`"
                  target="_blank"
                  class="status"
                  v-if="Cont.is_new == 1"
                >
                  <div class="newsSer">
                    <p>新</p>
                    <span>该服务为新上架的服务</span>
                  </div>
                  <div class="serName">{{Cont.name}}</div>
                </nuxt-link>
                <nuxt-link  class="status" :to="`/service/${Cont.id}?id=${Cont.store_id}`" target="_blank" v-else>
                  <div style="text-indent:0">{{Cont.name}}</div>
                </nuxt-link>
                <div class="location">
                  <div>
                    <nuxt-link
                      :to="{path:`/shop/${Cont.store_id}`}"
                      target="_blank"
                    >{{Cont.store_name}}</nuxt-link>
                    <a
                      v-if="Cont.customerServices!=null"
                      class="callMy"
                      :href="`tencent://message/?uin=${Cont.customerServices&&Cont.customerServices.kf_account}&Site=none&Menu=yes`"
                      target="_blank"
                    >
                      <span class="iconfont icon-lianxiwo services"></span>
                    </a>
                    <span v-else title="该店铺尚未设置客服" class="iconfont icon-lianxiwo"></span>
                  </div>
                  <div>
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-dizhi1" class="ccccc" />
                    </svg>
                    <p>{{Cont.cityShortName}}</p>
                  </div>
                </div>
                <div class="lzGrade">
                  <div class="bl_name" v-if="Cont.shopLevel">{{Cont.shopLevel.bl_name}}</div>
                  <div class="type_id_1" v-if="Cont.type_id == 1">个人</div>
                  <div class="type_id_2" v-else>企业</div>
                  <div class="vipLevel" v-if="Cont.vipLevel">
                    <img :src="envVars.IMG_HOST+Cont.vipLevel" alt />
                  </div>

                  <div class="marginsum" v-if="Cont.marginsum">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-huanyingyebaozhengjin" class="ccccc" />
                    </svg>
                    <p>{{Cont.marginsum}}</p>
                    <div>
                      已缴纳诚信保证金
                      <i>{{Cont.marginsum}}</i>元
                    </div>
                  </div>
                </div>

                <div class="bottomCont">
                  <div
                    id="radio"
                    class="radio"
                    :class="{'detail-selected':Cont.flag == true}"
                    @click.stop="Checkbox($event ,Cont)"
                  >对比</div>
                  <div
                    class="collect"
                    v-if="Cont.collect == 0"
                    @click.stop="Checkcollect($event ,Cont)"
                  >
                    <div class="detail-collect">
                      <img src="../../assets/img/ServGetDetailsPage/kongxin.png" alt />
                      <img src="../../assets/img/ServGetDetailsPage/shixin.png" alt />
                    </div>
                    <p>收藏</p>
                  </div>
                  <div class="collect collectF" v-else @click.stop="Checkcollect($event ,Cont)">
                    <div class="detail-collect">
                      <img src="../../assets/img/ServGetDetailsPage/kongxin.png" alt />
                      <img
                        class="detail-collect detail-color"
                        src="../../assets/img/ServGetDetailsPage/shixin.png"
                        alt
                      />
                    </div>
                    <p>已收藏</p>
                  </div>
                  <div class="shopCar" @click.stop="carClick(Cont)">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-gouwuche" class="ccccc" />
                    </svg>
                    <p>加入购物车</p>
                  </div>
                </div>
              </div>
              <div class="block" id="block" v-if="flagPage">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="page"
                  background
                  :page-size="pageSize"
                  layout="total,prev, pager, next, jumper"
                  prev-text="上一页"
                  next-text="下一页"
                  :total="total"
                  v-loading.fullscreen.lock="fullscreenLoading"
                ></el-pagination>
                <div class="sbm">确定</div>
              </div>
              <div class="clear"></div>
            </div>
            <div class="dataNonea" v-else>
              <img class="mr_10" width="90" height="115" src="../../assets/img/pintouge.png" alt />
              <span>暂无数据</span>
            </div>
          </div>
        </div>
      </div>
      <div class="comparison" v-if="closeL">
        <div class="message" v-if="messageFlage">
          <span>至少有两件服务才能对比哦！</span>
        </div>
        <div class="message" v-if="messageMore">
          <span>对比栏已经装不下啦，请删除后在添加</span>
        </div>
        <div class="comparison_top">
          <span>对比栏</span>
          <div @click="closeList">
            <span class="iconfont icon-guanbi"></span>
          </div>
        </div>
        <div class="comparison_cont">
          <div class="comparison_cont_left">
            <ul class="comparisNone">
              <li v-for="item  in 4" :key="item.index">
                <div>{{item}}</div>
                <div>
                  <span>您还可以继续添加</span>
                </div>
              </li>
            </ul>
            <ul class="comparisonList">
              <li v-for="(itemC , index) in comparisonList" :key="index">
                <div>
                  <img
                    v-lazy="itemC.img+'?x-oss-process=image/resize,m_fill,h_60,w_100'"
                    v-if="itemC.img != null"
                    :title="itemC.name"
                    :alt="itemC.name"
                  />
                  <img
                    v-else
                    src="../../assets/img/img_bg.png"
                    :title="itemC.name"
                    :alt="itemC.name"
                  />
                </div>
                <div>
                  <span>{{itemC.name}}</span>
                  <span>
                    ￥{{itemC.price}}/{{itemC.unit_name}}
                    <p @click="deletItemC(itemC)">删除</p>
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div class="comparison_cont_right">
            <span @click="comparisonId()">对比</span>
            <span @click="deletList">清空</span>
          </div>
        </div>
      </div>
      <div class="exhibition">
        <div class="advertising">
          <div class="advertising_top">
            <p>广告位精选</p>
            <img src="../../assets/img/guanggao.png" alt />
          </div>
          <div class="advert_data" v-if="recommmendList.length > 0">
            <nuxt-link
              :to="`/service/${item.id}?id=${item.store_id}`"
              target="_blank"
              class="adver_d_li"
              v-for="(item , index) in recommmendList"
              :key="index"
            >
              <div class="liatImg">
                <img
                  v-lazy="item.img +'?x-oss-process=image/resize,m_fill,h_144,w_240'"
                  :title="item.name"
                  :alt="item.name"
                  v-if="item.img != null &&item.img !=''"
                />
                <img :title="item.name" :alt="item.name" v-else src="../../assets/img/img_bg.png" />
              </div>
              <span class="name">{{item.name}}</span>
              <div class="liatM">
                <span>
                  <p>成交量:&nbsp;</p>
                  <p>{{item.deal_num}}</p>
                </span>
                <span :title="`￥${parseInt(item.price)}/${item.unit_name}`">
                  ￥{{parseInt(item.price)}}
                  <p>/{{item.unit_name}}</p>
                </span>
              </div>
            </nuxt-link>
          </div>
          <div class="dataNone" v-else>
            <img width="90" height="115" src="../../assets/img/pintouge.png" alt />
            暂无数据
          </div>
        </div>
        <div class="advertising lick">
          <div class="advertising_top">
            <p>猜你喜欢</p>
          </div>
          <div class="advert_data" v-if="advertising.length > 0">
            <nuxt-link
              :to="`/service/${item.id}?id=${item.store_id}`"
              target="_blank"
              class="adver_d_li"
              v-for="(item , index) in advertising"
              :key="index"
            >
              <div class="liatImg">
                <img
                  v-lazy="item.img+'?x-oss-process=image/resize,m_fill,h_144,w_240'"
                  :title="item.name"
                  :alt="item.name"
                  v-if="item.img != null"
                />
                <img :title="item.name" :alt="item.name" v-else src="../../assets/img/img_bg.png" />
              </div>
              <span class="name">{{item.name}}</span>
              <div class="liatM">
                <span>
                  <p>成交量:&nbsp;</p>
                  <p>{{item.deal_num}}</p>
                </span>
                <span :title="`￥${parseInt(item.price)}/${item.unit_name}`">
                  ￥{{parseInt(item.price)}}
                  <p>/{{item.unit_name}}</p>
                </span>
              </div>
            </nuxt-link>
          </div>
          <div class="dataNone" v-else>
            <img width="90" height="115" src="../../assets/img/pintouge.png" alt />
            暂无数据
          </div>
        </div>
      </div>
    </div>
    <comFooter />
    <sideBar ref="sideBar" styles="darkness"></sideBar>
  </div>
</template>
<script>
import comHeader from "@/components/component/comHeader";
import navAll from "@/components/component/navAll";
import comFooter from "@/components/component/comFooter";
import area from "@/assets/js/area";
import { cartTools } from "@/utils/tool";
import {
  serviceList,
  serviceRecommend,
  filtrateList,
  addCart,
  commonCollect
} from "@/api/list";
import {
  serviceAsync,
  serHotAsync,
  serFiltAsync,
  filtDataAsync,
  recoAsync,
  getHeader
} from "@/api/async-server";
import { mapState } from "vuex";
import sideBar from "@/components/sideBar";
import dataEventTrack from "@/utils/dataEventTrack";
export default {
  components: { comHeader, navAll, sideBar, comFooter },
  head() {
    const title = this.brandId
      ? this.SubmenuList.brand_name + "-" + this.brandId
      : this.SubmenuList.brand_name;

    return {
      title: `${title}-凌天众媒网`,
      meta: [
        {
          hid: "keywords",
          name: "keywords",
          content: `凌天众媒网${this.SubmenuList.brand_name}，${this.brandId}，zhongmei66.com`
        },
        {
          hid: "description",
          name: "description",
          content: `凌天众媒网（zhongmei66.com）${this.SubmenuList.brand_name}曝光，${this.brandId} AD，一站式全媒界大型媒体电商平台`
        }
      ]
    };
  },
  data() {
    let areaJson = JSON.parse(JSON.stringify(area));
    areaJson.shift();
    return {
      iconFlagC: 1,
      iconFlagH: 1,
      iconFlagJ: 1,
      iconFlagG: 1,
      cate_code: "",
      letterList: [], //存所有字母
      letData: [], //所有数据集合
      map: [], //获取字母所对应的所有数据 key为字母，value为对应的数据集合
      brandName: [], //字母对应的数据集合
      // 热门服务
      hotList: [],
      // 热门文章
      newsList: [],
      // 品牌分类
      navList: [],
      // 价格分类
      navPrice: [],
      // 领域分类
      territory: [],
      numtal: "",
      //地区
      region: [],
      // 其他分类
      filterSpec: [],
      areaArr: areaJson,
      selectArea: [], //地区选择搜索
      province: "",
      city: "",
      district: "",
      // 品牌分类 新数组
      navListImg: [],
      showAll: false, //标记数据是否需要完全显示的属性
      showAlltory: false,
      // 领域分类 新数组
      terriListL: [],
      display: false,
      displayTerri: false,
      number1: "",
      number2: "",
      // 二级分类
      SubmenuList: [],
      bottbottBlock: false,
      flag: false,
      displayBlock: false,
      // 雇主选稿
      shopList: [],
      pxtab: [
        { name: "综合", type: "default" },
        { name: "成交量", type: "sales" },
        { name: "好评率", type: "comments" },
        { name: "价格", type: "price" },
        { name: "更新", type: "update" }
      ],
      letterIndex: -1, //点击品牌字母索引
      brandNameIndex: -1, //点击品牌字母下方的品牌列表索引
      navPriceIndex: -1, //点击价格索引
      territoryIndex: -1, //领域索引
      regionIndex: -1, //地区索引
      shopLindex: -1, //成交量、好评率、价格、更新索引
      filterArrIndex: {},
      selectIndex1: -1,
      shopLisRightCont: "",
      // 对比
      radio: "",
      flage: false,
      allCheck: false,
      // 对比
      closeL: false,
      comparisonList: [],
      recommmendList: [], //广告精选
      advertising: [], //猜你喜欢
      brandId: "", // 品牌id，品牌筛选使用
      priceId: "", // 价格id，价格筛选使用
      realmId: "", // 热门领域id，领域筛选使用
      regionId: "", // 地区id，地区筛选使用
      order: "default", // 排序字段
      sort: "", // 排序方式
      flagPage: true, //判断分页
      pageSize: 0, //每页显示条数
      page: 1,
      total: 0, //总条目数
      qwerqwre: -1,
      flaeImg: false, //
      selectIndex: -1,
      messageFlage: false, //对比提示
      messageMore: false, //对比提示
      disableColor: false,
      lastColor: false,
      filterArr: [],
      T_reclassify: "全部",
      S_reclassify: "全部",
      T_rec: "",
      S_rec: "",
      Subchildren: [],
      current: {},
      name1: "",
      SubIndex: 0,
      SubIndex2: -1,
      brand_Id: "",
      brand: "",
      pName: {},
      jname: {},
      lname: {},
      cname: {},
      pcity: {},
      flagAll: false,
      filte: [],
      num: 0,
      flagLE: false,
      collectList: [],
      userId: "",
      typePX: "default",
      activeIndex: 0,
      cityList: [],
      activeClass: false,
      item: "",
      title: "",
      keyWord: "",
      description: "",
      flitData: "",
      lastPageD: 0,
      params: {},
      fullscreenLoading: false,
      filtra: "default"
    };
  },
  provide() {
    return {
      navList: this.headerNavList,
      navLeftMadio: this.navLeftMadio,
      popularMedia: this.popularMedia,
      PopularBrand: this.PopularBrand,
    };
  },
  async asyncData(app) {
    var id = "";
    var brand_code = "";
    const { keywords } = app.query;
    var page = app.query.page || 1;
    if (!app.query.cate_code && app.params.id) {
      brand_code = app.params.id;
    } else {
      id = app.query.cate_code;
      brand_code = app.params.id;
    }
    let params = {
      cate_code: id || "",
      page: page,
      brand_code: brand_code || "", // 品牌id，品牌筛选使用
      price_id: "", // 价格id，价格筛选使用
      realm_id: "", // 热门领域id，领域筛选使用
      region_id: "", // 地区id，地区筛选使用
      order: "default", // 排序字段
      sort: "", // 排序方式
      priceMin: "",
      priceMax: "",
      sort: "",
      filterArr: [],
      keywords: keywords || ""
    };
    var data = {
      cate_code: id || "",
      brand_code: brand_code || ""
    };
    var dataList = {
      cate_code: id || ""
    };

    const FlieRes = await filtDataAsync(app, data);
    const Flie = FlieRes ? FlieRes.data.data : '';
    const datalRes = await serviceAsync(app, params);
    const datal = datalRes ? datalRes.data.data : '';
    const dataSRes = await recoAsync(app, dataList);
    const dataS = dataSRes ? dataSRes.data.data : '';
    if (!datal) return;
    var num = 0;
    if (datal.data.length > 0) {
      num = Math.ceil(Number(datal.data.length) / 5) * 2;
    } else {
      num = 2;
    }
    let letterList = []; //存所有字母
    let map = new Map();

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
      total: datal.total,
      pageSize: datal.per_page,
      page: datal.current_page,
      numtal: Math.ceil(Number(datal.total) / Number(datal.pageSize)),
      shopLisRightCont: datal.data,
      SubmenuList: Flie.CatInfo,
      current: Flie.CatInfo.current,
      flitData: Flie,
      hotList: dataS.top_hot,
      shopList: dataS.left_hot,
      recommmendList: dataS.bottom_recommmend,
      advertising: dataS.bottom_guess_like,
      newsList: dataS.top_hot_articles,
      num: num,
      brandId: id,
      lastPageD: datal.last_page,
      // 导航SSR
      navLeftMadio,
      popularMedia,
      headerNavList,
      PopularBrand
    };
  },
  created() {
    const { id } = this.$route.params;
    const { keywords, page, cate_code } = this.$route.query;
    if (this.$route.query.keywords) {
      this.params = {
        keywords: this.$route.query.keywords,
        page: this.page
      };
    } else if (this.$route.query.cate_code) {
      this.params = {
        cate_code: this.$route.query.cate_code,
        page: page
      };
      if (!page) {
        this.params = {
          cate_code: this.$route.query.cate_code,
          page: 1
        };
      }
      this.replaceRouter();
    } else {
      this.params.page = page || 1;
      if (!page) {
        this.params = {
          page: 1
        };
        this.replaceRouter();
      }
    }
  },
  mounted() {
    this.dataEvent();
    if (this.page > this.lastPageD) {
      this.params.page = this.lastPageD;
      this.page = this.lastPageD;
      this.replaceRouter();
      this.init();
    } else if (this.params.page < 1) {
      this.params.page = 1;
      this.page = 1;
      this.replaceRouter();
      this.init();
    }
    this.numtal = Math.ceil(Number(this.total) / Number(this.pageSize));
    if (this.page == 1) {
      this.disableColor = true;
    } else {
      this.disableColor = false;
    }
    if (this.page == this.numtal) {
      this.lastColor = true;
    } else {
      this.lastColor = false;
    }
    if (JSON.parse(localStorage.getItem("comparisonList"))) {
      this.comparisonList = JSON.parse(localStorage.getItem("comparisonList"));
      if (this.comparisonList != undefined && this.comparisonList.length > 0) {
        this.closeL = true;
      }
    } else {
      this.comparisonList = [];
    }
    for (var i = 0; i < this.shopLisRightCont.length; i++) {
      this.shopLisRightCont[i].marginsum = Math.ceil(
        this.shopLisRightCont[i].marginsum
      );
      this.shopLisRightCont[i] = {
        ...this.shopLisRightCont[i],
        flag: false
      };
      if (this.comparisonList != undefined && this.comparisonList.length > 0) {
        for (var j = 0; j < this.comparisonList.length; j++) {
          if (this.shopLisRightCont[i].id == this.comparisonList[j].id) {
            this.shopLisRightCont[i].flag = true;
          }
        }
      }
    }

    this.navPrice = this.flitData.priceInterval;
    // 领域分类
    this.territory = this.flitData.realmList;
    this.terriListL = this.territory.data;
    //地区
    this.region = this.flitData.getRegion;
    // 其他分类
    if (
      this.flitData.filterSpec !== undefined &&
      this.flitData.filterSpec.length > 0
    ) {
      this.filterSpec = this.flitData.filterSpec;
      if (this.filterSpec.length == 1) {
        var name1 = this.filterSpec[0].name;
        this.name1 = "更多选项（" + name1 + "等）";
      } else if (this.filterSpec.length > 1) {
        var name1 = this.filterSpec[0].name;
        var name2 = this.filterSpec[1].name;
        this.name1 = "更多选项（" + name1 + "、" + name2 + "等）";
      }
    }
  },

  methods: {
    dataEvent() {
      var shop = this.shopLisRightCont;
      var idObj = [];
      shop.filter(item => {
        idObj.push(item.id);
      });
      // 埋点
      dataEventTrack({
        referer: document.referrer,
        event_type: "list_show",
        kv: {
          router: this.$route.fullPath,
          brand_id: `${this.$route.params.id}`,
          tab: this.filtra,
          sort: this.sort,
          ids: idObj,
          pageno: `${this.$route.query.page}`
        }
      });
    },
    replaceRouter() {
      this.$router.replace({
        path: this.$route.path,
        query: this.params
      });
    },
    // 服务列表数据
    setShowAll() {
      this.showAll = !this.showAll;
      if (this.showAlltory) {
        this.showAlltory = false;
      }
    },
    setShowTory() {
      this.showAlltory = !this.showAlltory;
      if (this.showAll) {
        this.showAll = false;
      }
    },
    async init() {
      if (this.$route.params.id) {
        this.cate_code = "";
      } else {
        this.cate_code = "";
      }
      if (this.item != "") {
        this.cate_code = this.item;
      }
      if (this.$route.params.id) {
        this.brandId = this.$route.params.id;
      } else {
        this.brandId = this.brand;
      }
      this.deleAll();

      var params = {
        cate_code: "", //this.cate_code,
        page: this.page,
        brand_code: this.brandId, // 品牌id，品牌筛选使用
        price_id: this.priceId, // 价格id，价格筛选使用
        realm_id: this.realmId, // 热门领域id，领域筛选使用
        region_id: this.regionId, // 地区id，地区筛选使用
        order: this.typePX, // 排序字段
        sort: this.sort, // 排序方式
        priceMin: this.number1,
        priceMax: this.number2,
        sort: this.sort,
        filterArr: this.filterArr,
        keywords: this.$route.query.keywords
      };
      let serData = await serviceList(params);
      const { code, message, data } = serData.data;
      if (code != 200) return this.$message.error(message);
      this.total = data.total;
      if (code == 200 && data.data != undefined && data.data.length > 0) {
        this.shopLisRightCont = data.data;
        this.pageSize = data.per_page;
        this.page = data.current_page;
        this.numtal = Math.ceil(Number(this.total) / Number(this.pageSize));
        //列表总页数翻页判断
        if (this.page == 1) {
          this.disableColor = true;
        } else {
          this.disableColor = false;
        }
        if (this.page == this.numtal) {
          this.lastColor = true;
        } else {
          this.lastColor = false;
        }
        if (JSON.parse(localStorage.getItem("comparisonList"))) {
          this.comparisonList = JSON.parse(
            localStorage.getItem("comparisonList")
          );
          if (
            this.comparisonList != undefined &&
            this.comparisonList.length > 0
          ) {
            this.closeL = true;
          }
        } else {
          this.comparisonList = [];
        }
        for (var i = 0; i < this.shopLisRightCont.length; i++) {
          this.shopLisRightCont[i].marginsum = Math.ceil(
            this.shopLisRightCont[i].marginsum
          );
          this.shopLisRightCont[i] = {
            ...this.shopLisRightCont[i],
            flag: false
          };
          if (
            this.comparisonList != undefined &&
            this.comparisonList.length > 0
          ) {
            for (var j = 0; j < this.comparisonList.length; j++) {
              if (this.shopLisRightCont[i].id == this.comparisonList[j].id) {
                this.shopLisRightCont[i].flag = true;
              }
            }
          }
        }
        //分页显示隐藏
        if (this.total < 1) {
          this.flagPage = false;
        } else {
          this.flagPage = true;
        }
        if (this.shopLisRightCont.length > 0) {
          this.num = Math.ceil(Number(this.shopLisRightCont.length) / 5) * 2;
        } else {
          this.num = 2;
        }
        this.replaceRouter();
        this.fullscreenLoading = false;
        this.dataEvent();
      } else {
        this.shopLisRightCont = [];
        // this.$message.error("未查询到相关信息");
      }
    },
    // 服务列表其他推荐 热门服务接口
    async service() {
      var params = {
        cate_code: this.$route.params.id
      };
      let rscoData = await serviceRecommend(params);
      const { code, message, data } = rscoData.data;
      if (code != 200) return this.$message.error(message);
      var dataList = data;
      this.hotList = dataList.top_hot;
      this.shopList = dataList.left_hot;
      this.recommmendList = dataList.bottom_recommmend;
      this.advertising = dataList.bottom_guess_like;
      this.newsList = dataList.top_hot_articles;
    },
    // 筛选属性列表
    async filtrate() {
      this.filterSpec = [];
      this.navList = [];
      this.navListImg = [];
      var params = {
        cate_code: "", //this.$route.params.id,
        brand_code: this.$route.params.id
      };
      let fillData = await filtrateList(params);
      const { code, message, data } = fillData.data;
      if (code != 200) return this.$message.error(message);
      this.SubmenuList = data.CatInfo;
      if (data.brandList != undefined && data.brandList != "") {
        this.navList = data.brandList;
        this.navListImg = this.navList.data;
        this.current = this.SubmenuList.current;
      }
      // 价格分类
      this.navPrice = data.priceInterval;
      // 领域分类
      this.territory = data.realmList;
      this.terriListL = this.territory.data;
      //地区
      this.region = data.getRegion;
      // 其他分类
      if (data.filterSpec !== undefined && data.filterSpec.length > 0) {
        this.filterSpec = data.filterSpec;
        if (this.filterSpec.length == 1) {
          var name1 = this.filterSpec[0].name;
          this.name1 = "更多选项（" + name1 + "等）";
        } else if (this.filterSpec.length > 1) {
          var name1 = this.filterSpec[0].name;
          var name2 = this.filterSpec[1].name;
          this.name1 = "更多选项（" + name1 + "、" + name2 + "等）";
        }
      }
    },

    SubmenClick1(item, index) {
      this.$route.params.id = item.cate_code;
      this.S_reclassify = "全部";
      this.cate_code = "";
      this.SubIndex = index;
      this.cate_code = item.cate_code;
      this.$router.replace({
        path: `/category/${item.cate_code}?cate_name=${item.cate_name}?page=1`
      });
      this.T_reclassify = item.cate_name;
      for (var i = 0; i < this.SubmenuList.children.length; i++) {
        if (this.SubmenuList.children[i].cate_code == item.cate_code) {
          this.Subchildren = this.SubmenuList.children[i];
        }
      }
      this.item = item.cate_code;
      this.init();
    },
    SubmenClick2(item, index) {
      this.cate_code = "";
      this.SubIndex2 = index;
      this.$route.params.cate_code = item.cate_code;
      this.$router.replace({
        path: `/category/${item.cate_code}?cate_name=${item.cate_name}?page=1`
      });
      this.S_reclassify = item.cate_name;
      this.cate_code = item.cate_code;
      this.item = item.cate_code;
      this.init();
    },

    //点击全部
    allNavList1(e) {
      this.navPriceIndex = -1;
      this.page = 1;
      this.jname = "";
      this.priceId = ""; // 价格id，价格筛选使用
      this.number1 = "";
      this.number2 = "";
      this.init();
    },
    allNavList2(e) {
      this.territoryIndex = -1;
      this.page = 1;
      this.lname = "";
      this.realmId = ""; // 热门领域id，领域筛选使用
      this.init();
    },
    allNavList3(e) {
      this.regionIndex = -1;
      this.page = 1;
      this.cname = "";
      this.regionId = ""; // 地区id，地区筛选使用
      this.init();
    },
    allNavList4(itemO, index1) {
      this.filterArrIndex[index1] = undefined;
      this.page = 1;
      for (var i in this.filterArr) {
        if (this.filterArr[i].id == itemO.id) {
          this.filterArr.splice(i, 1);
        }
      }
      this.init();
    },
    // 点击品牌筛选的字母
    letterClick(index) {
      this.letterIndex = index;
      this.brandNameIndex = -1;
      this.brandName = this.map.get(this.letterList[this.letterIndex]); //获取字母索引对应的列表集合
    },
    allLetter() {
      this.letterIndex = -1;
      this.brandNameIndex = -1;
      this.brandName = this.navListImg;
      this.brand = "";
      this.pName = "";
      this.brandId = "";
      this.init();
    },
    scrollClick() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top = 255;
        if (top > 0) {
          clearInterval(timeTop);
        }
      }, 10);
    },
    //点击品牌字母下方的品牌列表索引
    brandNameClick(indexb, itemO) {
      this.brandNameIndex = indexb;
      this.pName = {};
      this.brandId = "";
      this.flagAll = true;
      if (this.tletterIndex > -1) {
        this.brandNameIndex = indexb;
        let { letterList, brandNameIndex, letterIndex } = this;
        let fList = this.map.get(letterList[letterIndex]);
        let fontList = fList[brandNameIndex];
        this.brandId = fontList.id;
        this.pName = { ...this.brandId, name: this.navList.name };
        this.activeClass = true;
        this.init();
        return fontList;
      } else {
        this.activeClass = true;
        this.brandId = itemO.id;
        this.brand = this.brandId;
        this.pName = { ...itemO, name: this.navList.name };
        this.init();
      }
      this.scrollClick();
    },
    // 点击价格
    navPriceClick(itemPM, index) {
      this.activeClass = true;
      this.jname = {};
      this.flagAll = true;
      this.navPriceIndex = index;
      this.priceId = itemPM.id;
      this.jname = { ...itemPM, name: this.navPrice.name };
      this.init();
      this.scrollClick();
    },
    //价格搜索
    subM() {
      if (this.number1 != "" && this.number2 != "") {
        this.activeClass = true;
        this.flagAll = true;
        this.priceId = "";
        this.jname = {};
        this.jname = {
          show_info: this.number1 + "-" + this.number2,
          name: this.navPrice.name,
          id: "1"
        };
        this.init();
        this.scrollClick();
      }
    },
    //点击领域
    territoryClick(itemPT, indexT) {
      this.activeClass = true;
      this.flagAll = true;
      this.territoryIndex = indexT;
      this.realmId = itemPT.id;
      this.lname = { ...itemPT, name: this.territory.name };
      this.init();
      this.scrollClick();
    },
    // 点击地区
    regionClick(itemA, indexR) {
      this.activeClass = true;
      this.cname = {};
      this.city = "";
      this.province = "";

      this.flagAll = true;
      this.regionIndex = indexR;
      this.regionId = itemA.id;
      this.cname = { ...itemA, names: this.region.name };
      this.init();
      this.scrollClick();
    },
    filterArrClick(itemPM, index, index1, itemO) {
      this.activeClass = true;
      this.filterArrIndex[index1] = index;
      var str = {
        id: itemO.id,
        filter_Info: itemPM.filter_Info,
        name: itemO.name
      };
      if (this.filterArr.length == 0) {
        this.filterArr.push(str);
      } else {
        for (var i in this.filterArr) {
          if (this.filterArr[i].id == str.id) {
            this.filterArr.splice(i, 1);
          }
        }
        this.filterArr.push(str);
      }

      this.flagAll = true;
      this.init();
      this.scrollClick();
    },

    deletP() {
      this.pName = {};
      this.brandNameIndex = -1;
      this.brandId = "";
      this.brand = "";
      this.deleAll();
      this.init();
    },
    deletJ() {
      this.jname = {};
      this.navPriceIndex = -1;
      this.number1 = "";
      this.number2 = "";
      this.priceId = "";
      this.init();
      this.deleAll();
    },
    deletL() {
      this.lname = {};
      this.territoryIndex = -1;
      this.realmId = "";
      this.init();
      this.deleAll();
    },
    deletC() {
      this.cname = {};
      this.regionId = "";
      this.city = "";
      this.province = "";
      this.regionIndex = -1;
      this.init();
      this.deleAll();
    },
    deletF(item, index) {
      this.filterArrIndex[index] = -1;
      this.filterArr.splice(index, 1);
      if (this.filterArr.length < 1) {
        this.filterArrIndex = {};
      }
      this.init();
      this.deleAll();
    },
    deletA() {
      this.brabDe();
      this.brandId = "";
      this.init();
    },
    brabDe() {
      this.pName = {};
      this.brand = "";
      this.brandId = "";
      this.letterIndex = -1;
      this.brandNameIndex = -1;
      this.filterArr = [];
      this.filterArrIndex = {};
      this.jname = {};
      this.navPriceIndex = -1;
      this.number1 = "";
      this.number2 = "";
      this.priceId = "";
      this.lname = {};
      this.territoryIndex = -1;
      this.realmId = "";
      this.cname = {};
      this.regionId = "";
      this.regionIndex = -1;
      this.flagAll = false;
      this.city = "";
      this.province = "";
    },
    deleAll() {
      if (
        this.pName.name ||
        this.jname.name ||
        this.lname.name ||
        this.cname.name ||
        this.filterArr.length > 0
      ) {
        this.flagAll = true;
      } else {
        this.flagAll = false;
      }
    },
    //点击成交量、好评率、价格、更新  iconFlag
    shopSct(type) {
      this.filtra = type;
      this.typePX = type;
      if (type === "default") {
        if (this.typePX === type) {
          //之前就选中了综合
          this.sort = "";
          this.init();
          return;
        } else {
          this.sort = "";
        }
      } else {
        if (this.typePX === type) {
          this.sort = this.sort === "asc" ? "desc" : "asc";
        } else {
          this.sort = "asc";
        }
      }

      this.page = 1;
      this.init();
    },
    //点击上一页
    perPage() {
      if (this.page > 1) {
        this.page = this.page - 1;
        if (this.page == 1) {
          this.page = 1;
          this.disableColor = true;
          this.init();
        } else {
          this.init();
        }
      }
    },
    //点击下一页
    nextPage() {
      if (this.page < this.numtal) {
        this.page = this.page + 1;
        if (this.page == this.numtal) {
          this.page = this.numtal;
          this.lastColor = true;
          this.init();
        } else {
          this.init();
        }
      }
    },
    //点击对比
    Checkbox(e, Cont) {
      this.messageMore = false;
      this.closeL = true;

      if (e.currentTarget.className.indexOf("detail-selected") == -1) {
        if (this.comparisonList.length < 4) {
          e.target.className = `radio detail-selected ${Cont.id}`; //切换按钮样式
          var index = this.comparisonList.findIndex(
            item => item.id === Cont.id
          );
          ~index
            ? (this.comparisonList[index].id = Cont.id)
            : this.comparisonList.push(Cont);
        } else {
          this.messageMore = true;
        }
        window.localStorage.setItem(
          "comparisonList",
          JSON.stringify(this.comparisonList)
        );
      } else {
        e.currentTarget.className = "radio";
        for (var i = 0; i < this.comparisonList.length; i++) {
          if (this.comparisonList[i].id == Cont.id) {
            this.comparisonList.splice(i, 1);
          }
          if (this.comparisonList.length < 1) {
            this.closeL = false;
          }
        }
        if (this.comparisonList.length >= 2) {
          this.messageFlage = false;
          this.messageMore = false;
        } else if (this.comparisonList.length > 4) {
          this.messageFlage = false;
          this.messageMore = true;
        }
        window.localStorage.setItem(
          "comparisonList",
          JSON.stringify(this.comparisonList)
        );
      }
    },
    Checkcollect(e, Cont) {
      if (this.userInfoData) {
        this.userId = this.userInfoData.original.id;
        if (this.userId != Cont.user_id) {
          if (Cont.collect == 0) {
            var data = {
              type: "1",
              collect_id: Cont.id,
              cancel: "0"
            };
            commonCollect(data)
              .then(res => {
                this.init();
                if (res.data.code != 200) {
                  this.$message.error(res.data.message);
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            var data = {
              type: "1",
              collect_id: Cont.id,
              cancel: "1"
            };
            commonCollect(data)
              .then(res => {
                this.init();
                if (res.data.code != 200) {
                  this.$message.error(res.data.message);
                }
              })
              .catch(err => {
                console.log(err);
              });
            for (var i = 0; i < this.collectList.length; i++) {
              var index = this.collectList[i].index;
              if (this.collectList[i].id == Cont.id) {
                this.collectList.splice(i, 1);
              }
            }
          }
        } else {
          this.$message.error("您不能收藏自己的服务");
        }
      } else {
        this.$router.push({
          path: "/login"
        });
      }
    },
    //清空对比
    deletList() {
      var rad = document.querySelectorAll(".radio");
      for (var i = 0; i < rad.length; i++) {
        if ((rad[i].className = "radio detail-selected")) {
          rad[i].className = "radio";
        }
      }
      this.comparisonList = [];
      window.localStorage.setItem(
        "comparisonList",
        JSON.stringify(this.comparisonList)
      );
      this.closeL = false;
    },
    //关闭对比
    closeList() {
      this.closeL = false;
      this.messageFlage = false;
      this.messageMore = false;
    },
    comparisonId() {
      this.messageFlage = false;
      var id = [];

      for (var i = 0; i < this.comparisonList.length; i++) {
        id.push(this.comparisonList[i].id);
      }
      if (this.comparisonList.length < 2) {
        this.messageFlage = true;
      } else {
        var dataId = id;
        window.localStorage.setItem("dataId", JSON.stringify(dataId));
        this.$router.push({
          path: "/category/comparison"
        });
      }
    },
    // 删除单个对比
    deletItemC(itemC) {
      let detail = document.getElementById("radio");
      for (var i = 0; i < this.comparisonList.length; i++) {
        var index = this.comparisonList[i].index;
        if (this.comparisonList[i].id == itemC.id) {
          this.comparisonList.splice(i, 1);
          detail.className = "radio";
          if (this.comparisonList.length < 1) {
            this.closeL = false;
          }
        }
      }
      window.localStorage.setItem(
        "comparisonList",
        JSON.stringify(this.comparisonList)
      );
    },
    //点击加入购物车
    async carClick(Cont) {
      if (!this.userInfoData) return this.$router.push({ path: "/login" });
      this.userId = this.userInfoData.original.id;
      if (this.userId == Cont.user_id)
        return this.$message.error("您不能购买自己的服务");
      var params = {
        type: "1",
        goods_id: Cont.id,
        price: Cont.price,
        num: 1,
        list: 1
      };
      let car = await addCart(params);

      const { code, message, data } = car.data;
      if (code != 200) return this.$message.error(message);
      this.$message.success("成功加入购物车");
      dataEventTrack({
        referer: document.referrer,
        event_type: "click",
        kv: {
          router: this.$route.fullPath,
          rname: "加入购物车",
          service_id: Cont.id,
          service_spec: "1",
          service_price: Cont.price
        }
      });
      cartTools.countChange.call(this);
    },

    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.params.page = val;
      this.init();
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top = 0;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);
      this.fullscreenLoading = true;
    },
    changeProvince(value) {
      if (value === "") {
        this.cityList = [];
        this.city = "";
        return;
      }
      this.cityList = this.areaArr
        .filter(item => value === item.id)
        .map(item => item.child)[0];
    },
    searchRegion() {},
    onSubmit() {
      if (this.city != "" && this.province != "") {
        this.cname = {};
        this.regionId = this.city ? this.city : this.province;
        for (var i = 0; i < this.areaArr.length; i++) {
          var a = this.areaArr[i].child;
          if (a != undefined) {
            for (var j = 0; j < a.length; j++) {
              if (a[j].id == this.city) {
                this.pcity = a[j].name;
              }
            }
          }
        }
        this.cname = { names: this.region.name, name: this.pcity };
        this.regionIndex = -1;
        this.init();
        this.scrollClick();
      }
    }
  },

  watch: {
    activeClass(newVal) {
      if (this.activeClass == true) {
        setTimeout(() => {
          this.activeClass = false;
        }, 500);
      }
    }
  },
  computed: {
    ...mapState({ envVars: "envVariables", userInfoData: "userInfo" }),

    //列表总条数

    // 品牌分类 显示个数

    //判断品牌个数显示隐藏显示
    showList: function() {
      if (this.showAll == false) {
        //当数据不需要完全显示的时候

        var showList = []; //定义一个空数组
        if (
          this.brandName != undefined &&
          this.brandName.length > 0 &&
          this.brandName.length > 9
        ) {
          //这里我们先显示前9
          for (var i = 0; i < 9; i++) {
            showList.push(this.brandName[i]);
          }
        } else {
          showList = this.brandName;
        }
        return showList; //返回当前数组
      } else {
        return this.brandName;
      }
    },
    word: function() {
      if (this.showAll == false) {
        //对文字进行处理
        this.display = false;
        this.flagLE = false;
        //   el.style.height =
        return "更多";
      } else {
        this.display = true;
        this.flagLE = true;

        return "收起";
      }
    },
    // 领域分类 显示个数
    terriNav: function() {
      if (this.showAlltory == false) {
        var terriNav = [];
        if (this.terriListL.length > 17) {
          for (var y = 0; y < 17; y++) {
            terriNav.push(this.terriListL[y]);
          }
        } else {
          terriNav = this.terriListL;
        }
        return terriNav;
      } else {
        return this.terriListL;
      }
    },

    wordT: function() {
      if (this.showAlltory == false) {
        //对文字进行处理
        this.displayTerri = false;
        return "更多";
      } else {
        this.displayTerri = true;
        return "收起";
      }
    },
    // 查询

    Block: function() {
      if (this.bottbottBlock == false) {
        this.flag = false;
        this.displayBlock = false;
        return this.name1;
      } else {
        (this.displayBlock = true), (this.flag = true);
        return "收起";
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "~assets/css/categoryScode.less";
</style>
<style lang="less" scoped>
@import "~assets/css/advertisingScode.less";
</style>
<style lang="less" >
@import "~assets/css/category.less";
</style>
