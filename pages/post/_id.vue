<template>
  <div>
    <navAll :navWidth="1395"/>
    <div class="post-detail" v-if="publishInfo.type">
      <div class="m-detail-top">
        <div class="detail-center-box">
          <div class="m-video-box-top">
            <div class="m-video-left">
              <div class="m-wrap-resource" v-if="publishInfo.type==2">
                <div
                  class="m-video-wrap"
                  id="videoPlayer"
                  :playsinline="playsinline"
                  @play="onPlayerPlay($event)"
                  @pause="onPlayerPause($event)"
                  @ended="onPlayerEnded($event)"
                  @loadeddata="onPlayerLoadeddata($event)"
                  @waiting="onPlayerWaiting($event)"
                  @playing="onPlayerPlaying($event)"
                  @timeupdate="onPlayerTimeupdate($event)"
                  @canplay="onPlayerCanplay($event)"
                  @canplaythrough="onPlayerCanplaythrough($event)"
                  @ready="playerReadied"
                  @statechanged="playerStateChanged($event)"
                  v-video-player:myVideoPlayer="playerOptions"
                ></div>
                <div
                  v-show="!publishInfo.is_paid && showFreeTips"
                  id="freeTipsId"
                  class="m-free-tips"
                >
                  <p>
                    免费观看前
                    <span class="color_orange">{{publishInfo.try_see}}</span> 秒钟，完整观看请
                    <span @click="journalBuy()" class="color_orange">立即购买</span>
                  </p>
                  <i class="iconfont icon-guanbi close" @click="closeHint"></i>
                </div>
              </div>
              <div v-if="publishInfo.type==1" class="m-img-wrap">
                <img v-if="publishInfo.is_paid" :src="envVars.IMG_HOST+publishInfo.source_file" alt />
                <img v-else :src="envVars.IMG_HOST+publishInfo.preview" alt />
              </div>
              <div class="m-video-info">
                <div class="m-info-left">
                  <span v-if="publishInfo.type==2">
                    <img src="~assets/img/icon-turntime-play.png" alt />
                    {{publishInfo.play_num}}
                  </span>
                  <span v-if="publishInfo.type==1">
                    <img src="~assets/img/turntime/icon-view.png" alt />
                    {{publishInfo.view_num}}
                  </span>
                  <span class="m-msg">
                    <img src="~assets/img/turntime/icon-turntime-msg.png" alt />
                    {{publishInfo.comm_num}}
                  </span>
                  <span class="m-download">{{publishInfo.down_num}}</span>
              <share :config="config" :typeNone="typeNone" v-if="config"/>
                </div>
                <div class="m-info-right" v-if="!shopInfo.myself_shop">
                  <span
                    class="m-zan"
                    :class="{'m-zan-active':likeType==='likes'}"
                    @click="detailLike('likes',publishInfo.id)"
                  >{{like_num||publishInfo.like_num}}</span>
                  <span
                    class="m-low"
                    :class="{'m-low-active':likeType==='dislikes'}"
                    @click="detailLike('dislikes',publishInfo.id)"
                  >{{dislike_num||publishInfo.dislike_num}}</span>
                  <span class="m-collect" @click="collect(6,0)" v-if="!publishInfo.collection">收藏</span>
                  <span
                    class="m-collect m-collect-active"
                    @click="collect(6,1)"
                    v-else-if="publishInfo.collection"
                  >已收藏</span>
                  <span class="report" v-if="!shopInfo.myself_shop" @click="reportEvent()">举报</span>
                </div>
                <div class="m-info-right" v-if="shopInfo.myself_shop">
                  <span
                    class="m-zan"
                    :class="{'m-zan-active':likeType==='likes'}"
                    @click="detailLike('likes',publishInfo.id)"
                  >{{like_num||publishInfo.like_num}}</span>
                  <span
                    style="margin-right:0"
                    class="m-low"
                    :class="{'m-low-active':likeType==='dislikes'}"
                    @click="detailLike('dislikes',publishInfo.id)"
                  >{{dislike_num||publishInfo.dislike_num}}</span>
                </div>
              </div>
            </div>
            <div class="m-video-right">
              <div class="m-user-box">
                <div class="m-avatar">
                  <nuxt-link :to="'/shop/'+shopInfo.shop_id" :title="shopInfo.store_name">
                    <img v-if="shopInfo.logo" :src="envVars.IMG_HOST+shopInfo.logo" alt />
                    <img v-else src="~/assets/img/userDataImg.png" alt="默认头像" />
                  </nuxt-link>
                </div>
                <div class="m-user-right">
                  <h3 class="m-name">
                    <nuxt-link
                      :to="'/shop/'+shopInfo.shop_id"
                      :title="shopInfo.store_name"
                    >{{shopInfo.store_name}}</nuxt-link>
                  </h3>
                  <div class="m-user-other">
                    <div class="m-upload-num">上传：{{shopInfo.upload_num}}</div>
                    <div class="m-upload-num">收藏：{{shopInfo.collect_num}}</div>
                  </div>
                  <div class="m-collect-btn" v-if="!shopInfo.collection" @click="collect(3,0)">收藏店铺</div>
                  <div
                    class="m-collect-btn"
                    v-else-if="!myself_shop &&shopInfo.collection"
                    @click="collect(3,1)"
                  >
                    <span class="m-collected">已收藏</span>
                    <span class="m-cancel-collected">取消收藏</span>
                  </div>
                </div>
              </div>
              <div class="m-video-right-list">
                <h3 class="m-video-list-title">相关推荐</h3>
                <ul class="m-video-list-wrap">
                  <li v-for="(item,index) in recommended" :key="index" class="m-video-list-item">
                    <nuxt-link target="_blank" :to="{path:'/post/'+item.id,query:{type:item.type}}">
                      <div class="m-video-item-img">
                        <img :src="envVars.IMG_HOST+item.image_s" :alt="item.name" />
                        <div v-if="item.type==2" class="m-video-play-time">
                          <img src="~assets/img/icon-turntime-playtime.png" alt />
                          {{formatTime(item.duration)}}
                        </div>
                      </div>
                      <div class="m-video-item-content">
                        <h4 class="m-video-item-title">{{item.name}}</h4>
                        <div class="m-video-item-right-bottom">
                          <span v-if="item.type==2">
                            <img src="~assets/img/icon-turntime-play.png" alt />
                            {{item.play_num}}
                          </span>
                          <span v-if="item.type==1">
                            <img src="~assets/img/turntime/icon-view.png" alt />
                            {{item.view_num}}
                          </span>
                          <span>
                            <img src="~assets/img/icon-turntime-download.png" alt />
                            {{item.down_num}}
                          </span>
                        </div>
                      </div>
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="m-videoinfo-bottom">
            <div class="m-videoinfo-left">
              <h2 class="m-video-title">{{publishInfo.name}}</h2>
              <div class="m-video-content">
                <span>发布时间：{{publishInfo.created_at &&publishInfo.created_at.slice(0,10)}}</span>
                <span>媒体类型：{{publishInfo.media_name}}</span>
                <span>上刊领域：{{publishInfo.realm_name}}</span>
                <span>投放城市：{{city}}</span>
                <span>拍摄地点：{{publishInfo.address}}</span>
                <span>拍摄时间：{{publishInfo.shoot}}</span>
              </div>
              <div class="m-video-tag" v-if="publishInfo.tag_name &&publishInfo.tag_name.length>0">
                标签：
                <span
                  class="m-tag-span"
                  v-for="(item,index) in publishInfo.tag_name"
                  :key="index"
                >{{item}}</span>
              </div>
              <div class="m-video-introduce">
                <h3 class="m-video-introduce-title">上刊介绍:</h3>
                <div class="m-video-introduce-content-wrap">
                  <div
                    v-if="publishInfo.introduce && publishInfo.introduce.length>164"
                    class="m-slide-btn"
                    @click="showAllIntr=!showAllIntr"
                  >{{!showAllIntr ? '展开详情' :'收起详情'}}</div>
                  <div
                    class="m-video-introduce-content"
                    :class="{hidden2:!showAllIntr}"
                  >{{publishInfo.introduce}}</div>
                </div>
              </div>
            </div>
            <div class="m-videoinfo-right">
              <div class="m-price">¥{{publishInfo.price}}</div>
              <div class="m-tips" v-if="!publishInfo.is_paid">
                <img src="~assets/img/error.png" alt />购买后可下载
              </div>
              <div class="m-tips" v-else-if="!myself_shop">
                <img src="~assets/img/resimg.png" alt />
                您已购买上刊{{publishInfo.type==2
                ?'视频':'画面'}}，可以下载了
              </div>
              <div
                class="m-buy-btn"
                v-if="!publishInfo.is_paid"
                @click="journalBuy()"
              >{{publishInfo.type==2 ? '购买上刊视频' : '购买上刊图片'}}</div>
              <div
                class="m-buy-btn"
                v-else
                @click="downloadJournal(publishInfo.source_file, publishInfo.name,publishInfo.type)"
              >下载</div>
            </div>
          </div>
        </div>
      </div>
      <div class="detail-center-box">
        <div class="m-other-upload-list">
          <div class="m-other-title">
            <h3>该用户的其他上传</h3>
            <span class="m-upload-tab" @click="clickJournalShop(2)" :class="{'active':isVideo}">视频</span>
            <span class="m-upload-tab" @click="clickJournalShop(1)" :class="{'active':!isVideo}">图片</span>
            <nuxt-link
              v-if="newest.length>=6"
              target="_blank"
              :to="'/post/user/'+shopInfo.uid"
              class="more"
            >更多</nuxt-link>
          </div>
          <ul v-if="newest.length > 0">
            <li v-for="(item,index) in newest" :key="index">
              <nuxt-link target="_blank" :to="`/post/${item.id}?type=${item.type}`">
                <div class="upload-img">
                  <img v-lazy="item.image_s" alt />
                </div>
                <h3 class="name">{{item.name}}</h3>
                <div class="upload-bottom">
                  <div class="upload-bottom-left">
                    <span v-if="item.type == 2">
                      <img class="upload_view" src="~assets/img/turntime/turnpH.png" alt />
                      {{item.play_num |numUnitFormat}}
                    </span>
                    <span v-else-if="item.type == 1">
                      <i class="upload_view el-icon-view"></i>
                      {{item.view_num | numUnitFormat}}
                    </span>
                    <span>
                      <img class="upload_download" src="~assets/img/turntime/turndH.png" alt />
                      {{item.down_num}}
                    </span>
                  </div>
                  <div>{{item.created_at&& item.created_at.slice(0,10)}}</div>
                </div>
              </nuxt-link>
            </li>
          </ul>
          <div v-else class="no-data">
            <img class="right_img" src="~assets/img/pintouge.png" alt="图片" />
            <span>店铺还未上架内容</span>
          </div>
        </div>
      </div>
      <div class="detail-center-box">
        <div class="m-video-comments-box">
          <div class="m-comments-left">
            <div class="m-comments-title">
              <h3>评论区</h3>
              <span>{{commentNum}}条</span>
            </div>
            <div class="m-my-comments-box-nologin" v-if="!isLogin">
              您需要
              <span @click="loginP">登录</span> 才可以评论
            </div>
            <div class="m-my-comments-box" v-else>
              <el-input
                type="textarea"
                placeholder="我要说几句"
                minlength="6"
                v-model="myComments"
                maxlength="300"
              ></el-input>
              <div class="comments-num">{{myComments.length}}/300</div>
              <div @click="submitComment()" class="m-submit-btn">发布</div>
            </div>

            <ul class="m-comments-list" v-if="commentsList.data && commentsList.data.length > 0">
              <li class="m-comments-item" v-for="(item,index) in commentsList.data" :key="index">
                <div class="m-comments-avatar">
                  <img v-if="item.user.avatar"
                    class="user_img"
                    :src="envVars.IMG_HOST+item.user.avatar+'?x-oss-process=image/resize,m_fill,h_40,w_40'"
                    alt
                  />
                  <img v-else
                    class="user_img"
                    src="~assets/img/icon_sign_mobile.jpg"
                    alt
                  />
                </div>
                <div class="m-comments-content">
                  <div class="m-nickname">{{item.user.name}}</div>
                  <div class="m-yl">{{item.contents}}</div>
                  <div class="m-comments-info">
                    <div class="m-info-wrap">
                      <span class="m-time">{{item.created_at}}</span>
                      <span
                        class="m-zan"
                        :class="{'m-zan-active':item.is_like}"
                        @click="likeOrDislike('likes',item.id)"
                      >{{item.like_num}}</span>
                      <span
                        class="m-low"
                        :class="{'m-low-active':item.is_dislike}"
                        @click="likeOrDislike('dislikes',item.id)"
                      >{{item.dislike_num}}</span>
                      <span class="m-recall" @click="showSubInput(index)">回复</span>
                    </div>
                    <div class="m-my-comments-sub-box" v-if="subCommentInputShow===index">
                      <el-input
                        type="textarea"
                        placeholder="我要说几句"
                        minlength="6"
                        v-model="mySubComments"
                        maxlength="300"
                      ></el-input>
                      <div class="comments-num">{{mySubComments.length}}/300</div>
                      <div @click="submitSubComment(item.id)" class="m-submit-btn">发布</div>
                    </div>
                    <ul class="m-sub-comments-list" v-if="item.child.data.length > 0">
                      <li
                        class="m-sub-comments-item"
                        v-for="(subItem,idx) in item.child.data"
                        :key="idx"
                      >
                        <div class="m-sub-comments-avatar">
                          <img v-if="item.user.avatar"
                            class="user_img"
                            :src="envVars.IMG_HOST+item.user.avatar+'?x-oss-process=image/resize,m_fill,h_40,w_40'"
                            alt
                          />
                        <img v-else
                          class="user_img"
                          src="~assets/img/icon_sign_mobile.jpg"
                          alt
                        />
                        </div>
                        <div class="m-sub-comments-content">
                          <div class="m-sub-comments-name">{{subItem.user.name}}</div>
                          {{subItem.contents}}
                          <div class="m-info-wrap">
                            <span class="m-time">{{subItem.created_at}}</span>
                            <span
                              class="m-zan"
                              :class="{'m-zan-active':subItem.is_like}"
                              @click="likeOrDislike('likes',subItem.id)"
                            >{{subItem.like_num}}</span>
                            <span
                              class="m-low"
                              :class="{'m-low-active':subItem.is_dislike}"
                              @click="likeOrDislike('dislikes',subItem.id)"
                            >{{subItem.dislike_num}}</span>
                            <span class="m-recall" @click="showSubInput(index,idx)">回复</span>
                          </div>
                          <div
                            class="m-my-comments-sub-box-to"
                            v-if="subCommentInputShow===index+''+idx"
                          >
                            <el-input
                              type="textarea"
                              minlength="6"
                              :placeholder="'回复 @'+subItem.user.name"
                              v-model="mySubComments"
                              maxlength="300"
                            ></el-input>
                            <div class="comments-num">{{mySubComments.length}}/300</div>
                            <div
                              @click="submitSubComment(item.id,subItem.user.name)"
                              class="m-submit-btn"
                            >发布</div>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <p class="m-show-more-comments" v-if="item.child.total>3 && !item.showSub">
                      共{{item.child.total}}条回复，
                      <span
                        @click="showMoreSub(index,1)"
                        class="m-show-more-btn"
                      >点击查看</span>
                    </p>
                    <div class="page_sample" v-if="item.child.total>10 && item.showSub">
                      <el-pagination
                        :total="item.child.total"
                        prev-text="上一页"
                        next-text="下一页"
                        :page-size="10"
                        @current-change="subPageChange"
                        :hide-on-single-page="true"
                        layout="prev, pager, next,total,jumper"
                      ></el-pagination>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div class="m-pages-bottom" v-if="commentsList.total>0">
              <el-pagination
                prev-text="上一页"
                next-text="下一页"
                :current-page="nowPage"
                layout="prev, pager, next,total,jumper"
                @current-change="pageChange"
                :page-size="pageSize"
                :total="commentsList.total"
              ></el-pagination>
              <div class="sbm">确定</div>
            </div>
            <p class="statement_text">
              <b>内容声明：</b>
              <span>凌天众媒网为第三方交易平台及互联网信息服务居间提供者，凌天众媒网（含PC、H5网站等）所展示的商品/服务的标题、价格、详情、图片、视频等信息内容系由店铺经营者发布，其真实性、准确性和合法性均由店铺经营者负责。凌天众媒网提醒用户购买商品/服务前注意谨慎核实。如用户或权利人对商品/服务的标题、价格、详情图片、视频等任何信息有任何疑问的，请在购买前与店铺经营者沟通确认；如用户发现店铺内有任何违法/侵权信息，请立即向凌天众媒网举报并提供有效线索，我们在核实后将及时删除违法/侵权信息。</span>
            </p>
          </div>
          <div class="m-comments-right">
            <turnAside :type="publishInfo.type" param="deal"></turnAside>
          </div>
        </div>
      </div>
      <el-dialog
        custom-class="dialog-box"
        zIndex="998"
        title="温馨提示"
        width="440px"
        :modal-append-to-body="false"
        :visible.sync="alertDialogVisible"
        center
      >
        <div class="code-box">购买本实时上刊后可完整观看和下载</div>
        <div class="dialog-price">{{publishInfo.price}}</div>
        <span slot="footer" class="dialog-footer">
          <button class="m-code-btn" type="primary" @click="journalBuy()">购买上刊视频</button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import tuenList from "@/components/turnCom/turnList";
import turnAside from "@/components/turnCom/turnAside";
import { report } from "~/api/report";
import { getTurnTimeDetail, getHeader } from "@/api/async-server";
import { downloadMixin } from "~/utils/common-mixins";
import comHeader from "@/components/component/comHeader";
import navAll from "@/components/component/navAll";
import comFooter from "@/components/component/comFooter";
import sideBar from "@/components/sideBar";
import {
  collect,
  journalCreateOrders,
  journalShopList,
  likeOrDislike,
  comment,
  subComment,
  commentSubList,
  commentList,
  journalIncrement
} from "@/api/turn-time";
import area from "@/utils/area";
import { numUnitFormat } from "@/utils/common-filters";
import share from "@/components/component/share";

export default {
  name: "detail",
  layout: "post-layout",
  mixins: [downloadMixin()],
  filters: {
    numUnitFormat
  },
  head() {
    let { type } = this.$route.query;
    const { store_name = "" } = this.shopInfo || {};
    const { name = "", media_name = "", realm_name = "" } =
      this.publishInfo || {};
    return {
      title: `上刊${type === "1" ? "图片" : "视频"} - ${name} - 凌天众媒网`,
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "上刊视频列表，实时上刊，最新广告上刊，上刊大厅，上刊图片，上刊视频，热门上刊，找广告上刊资源上凌天众媒网（zhongmei66.com）"
        },
        {
          hid: "keywords",
          name: "keywords",
          content: `${store_name}发布的上刊${name}，${realm_name}上刊，${media_name}上刊，全国最全上刊资源展示上凌天众媒网`
        }
      ]
    };
  },
  provide() {
    return {
      shopInfo: this.shopInfo,
      recommended: this.recommended,
      publishInfo: this.publishInfo,
      nowPath: "img",
      indexData: this.indexData,
      type: this.type,
      // 导航SSR
      navList: this.headerNavList,
      navLeftMadio: this.navLeftMadio,
      popularMedia: this.popularMedia,
      PopularBrand: this.PopularBrand,
    };
  },
  components: { turnAside, comHeader, navAll, comFooter, share, sideBar },
  data() {
    const { type = 0 } = this.$route.query;
    const { id = 0 } = this.$route.params;
    return {
      showFreeTips: true,
      type: +type,
      nowPage: 1,
      isLogin: false,
      subIndex: 0,
      currentPage: 1,
      subCommentInputShow: -1,
      pageSize: 10,
      isVideo: type == "2",
      otherShopList: [],
      alertDialogVisible: false,
      id: id,
      reportType: null,
      shopInfo: {}, //null
      publishInfo: {}, //null
      commentNum: 0,
      indexData: null,
      myself_shop: false, //null
      recommended: null,
      collection: false,
      showAllIntr: false,
      myComments: "",
      mySubComments: "",
      playsinline: true,
      commentsList: {
        data: [],
        total: 0
      },
      pages: {
        subCurrentPage: 1
      },
      selectType: "",
      likeType: "",
      like_num: 0,
      dislike_num: 0,
      typeNone: "",
      newest: [],
           config: ""
    };
  },
  async asyncData(app) {
    const errCon = { statusCode: 500, message: "实时上刊加载失败,请重试" };
    const dataRes = await getTurnTimeDetail(app, app.params.id,app.query.sign).catch(e => {
      if (e && e.data) {
        errCon.message = e.data.message;
      }
      app.error(errCon);
    });
    const data = dataRes ? dataRes.data.data : '';

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

    if (!data) {
      return {
        indexData: {},
        myself_shop: false,
        collection: false,
        shopInfo: {},
        recommended: [],
        publishInfo: {},
        newest: []
      };
    }

    return {
      indexData: data,
      myself_shop: data.shop_info.myself_shop,
      collection: data.collection,
      shopInfo: data.shop_info,
      recommended: data.recommended,
      publishInfo: data.publish_info,
      newest: data.newest.data,
      // 导航SSR
      navLeftMadio,
      popularMedia,
      headerNavList,
      PopularBrand
    };
  },
  computed: {
    ...mapState({ envVars: "envVariables" }),
    city() {
      return this.getCityName(this.publishInfo.city);
    },
    playerOptions() {
      return {
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "video/mp4",
            src:
              this.envVars.IMG_HOST +
              (this.publishInfo.is_paid
                ? this.publishInfo.source_file
                : this.publishInfo.preview)
          }
        ],
        muted: false,
        controlBar: {
          volumePanel: {
            inline: false //默认是true,横着的
          }
        },
        poster: this.envVars.IMG_HOST + this.publishInfo.image_l
      };
    }
  },
  created() {
    if (!this.publishInfo.type) {
      this.$router.push("/closeData/closeData?type=5");
    }
  },
  methods: {
    downloadJournal(url, name, type) {
      if (type == 2) {
        //视频
        this.download(url, name);
      } else {
        //图片
        this.downloadIamge(url, name);
      }
      this.incrementAction("download");
    },
    downloadIamge(url) {
      url = this.envVars.IMG_HOST + url;
      window.open(url, "top");
    },
    reportEvent() {
      let data = {
        project_type: this.publishInfo.type + 7,
        project_id: this.id
      };
      report.tipOffs(data).then(res => {
        const { code, message } = res.data;
        if (code == 200) {
          sessionStorage.setItem("historyUrl", this.$route.fullPath);
          var { href } = this.$router.resolve(
            "/report?type=" + (this.publishInfo.type + 7) + "&id=" + this.id
          );
          window.open(href, "_blank");
        } else {
          this.$message.error(message);
        }
      });
    },
    loginP() {
      return this.$loginp(0, () => {
        this.$router.go(0);
      });
    },
    showSubInput(index, subIndex) {
      if (!this.isLogin) {
        return this.$loginp(0, () => {
          this.$router.go(0);
        });
      }
      if (typeof subIndex != "undefined") {
        if (this.subCommentInputShow == index + "" + subIndex) {
          this.subCommentInputShow = -1;
          return;
        }
        this.subCommentInputShow = index + "" + subIndex;
      } else {
        if (this.subCommentInputShow == index) {
          this.subCommentInputShow = -1;
          return;
        }
        this.subCommentInputShow = index;
      }
    },
    subPageChange(val) {
      this.subCommentInputShow = -1;
      let _this = this;
      _this.$nextTick(() => {
        _this.$set(this.pages, "subCurrentPage", val);
        _this.$forceUpdate();
      });
      this.showMoreSub(this.subIndex, val);
    },
    async showMoreSub(index, page) {
      this.subIndex = index;
      let data = {
        pid: this.commentsList.data[index].id,
        current_page: page,
        page_size: 10
      };
      let res = await commentSubList(data);
      if (!res) return;
      this.$set(this.commentsList.data[index], "child", res);
      this.$set(this.commentsList.data[index], "showSub", true);
    },
    async incrementAction(action) {
      let data = {
        publish_id: this.publishInfo.id,
        action: action
      };
      let res = await journalIncrement(data);
    },
    async getComments(page) {
      let data = {
        publish_id: this.publishInfo.id,
        current_page: page,
        page_size: 10
      };
      let totleNum = 0;
      let res = await commentList(data);
      let newRes = res.data.data;
      newRes.data.forEach(item => {
        totleNum += item.child.total;
        item.child.data = item.child.data.slice(0, 3);
      });
      this.commentNum = totleNum + newRes.total;
      this.commentsList = newRes;
    },
    pageChange(val) {
      this.subCommentInputShow = -1;
      this.nowPage = val;
      this.getComments(val);
    },
    async submitComment() {
      if (this.myComments.length < 6) {
        this.$message.error("评论内容大于6个字");
        return;
      }
      let data = {
        publish_id: this.publishInfo.id,
        reply_id: 0,
        contents: this.myComments
      };
      const res = await comment(data);
      if (!res) return;
      this.myComments = "";
      this.getComments(this.nowPage);
    },
    async submitSubComment(reply_id, name) {
      if (this.mySubComments.length < 6) {
        this.$message.error("评论内容大于6个字");
        return;
      }
      let data = {
        publish_id: this.publishInfo.id,
        reply_id: reply_id,
        contents:
          typeof name != "undefined"
            ? "回复 @" + name + " " + this.mySubComments
            : this.mySubComments
      };
      const res = await comment(data);
      if (!res) return;
      this.getComments(this.nowPage);
      this.mySubComments = "";
      this.subCommentInputShow = -1;
    },
    clickJournalShop(type) {
      //切换视频和图片
      this.isVideo = type === 2;
      this.journalShopListFun(type);
    },
    async journalShopListFun(type) {
      // 获取用户的其他上传
      let params = {
        page: 1,
        type,
        uid: this.shopInfo.uid
      };
      let res = await journalShopList(params);
      if (!res) {
        this.newest = [];
        return;
      }
      const { data } = res.data.data;
      this.newest = data;
    },
    detailLike(action, id) {
      //上刊 详情的点赞和踩
      let data = {
        target_id: id,
        type: 1,
        action: action
      };
      this.likeType = action;
      likeOrDislike(data)
        .then(res => {
          const { code, data = {}, message } = res.data;
          if (code == 200) {
            this.like_num = data.like_num;
            this.dislike_num = data.dislike_num;
          } else {
            this.$message.error(message);
          }
        })
        .catch(err => {});
    },
    likeOrDislike(action, id) {
      //type 1上刊 2上刊评论
      this.selectType = action;
      let data = {
        target_id: id,
        type: 2,
        action: action,
        store_id: this.shopInfo.shop_id
      };
      likeOrDislike(data)
        .then(res => {
          if (res.data.code == 200) {
            this.getComments(this.nowPage);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {});
    },
    getCityName(num) {
      let areaString = JSON.stringify(area);
      var re = new RegExp('("' + num + '":").*?(?=",)');
      let cityName = areaString.match(re);
      let strName = "";
      if (cityName && cityName.length > 0) {
        strName = cityName[0].slice(10);
      }
      return strName;
    },
    journalBuy() {
      let data = {
        pid: this.id
      };
      journalCreateOrders(data).then(res => {
        if (res.data.code == 200) {
          this.$router.push(
            `/payment?order_sn=${res.data.data.order_sn}&type=7&turn=${this.publishInfo.type}`
          );
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    async collect(type, cancel) {
      let text = "您不能收藏自己的店铺";
      if (type == 6) {
        text = "您不能收藏自己的上刊资源";
      }
      if (this.shopInfo.myself_shop) {
        this.$message.error(text);
        return;
      }
      let data = {
        collect_id: type == 3 ? this.shopInfo.shop_id : this.id,
        type: type,
        cancel: cancel
      };

      let res = await collect(data);
      if (!res) return;
      if (cancel == 1) {
        if (type == 3) {
          this.$set(this.shopInfo, "collection", false);
        } else if (type == 6) {
          this.$set(this.publishInfo, "collection", false);
          this.$set(
            this.publishInfo,
            "collect_num",
            this.publishInfo.collect_num - 1
          );
        }
      } else {
        if (type == 3) {
          this.$set(this.shopInfo, "collection", true);
        } else if (type == 6) {
          this.$set(this.publishInfo, "collection", true);
          this.$set(
            this.publishInfo,
            "collect_num",
            this.publishInfo.collect_num + 1
          );
        }
      }
    },
    closeHint() {
      let dom = document.getElementById("freeTipsId");
      dom.style.display = "none";
    },
    onPlayerPlay(player) {
      let dom = document.getElementById("freeTipsId");
      dom.className = "m-free-tips bottom_67";
      this.incrementAction("play");
    },
    onPlayerPause(player) {
      // console.log('player pause!', player)
    },
    onPlayerEnded(player) {
      if (!this.publishInfo.is_paid) {
        this.alertDialogVisible = true;
      }
      let dom = document.getElementById("freeTipsId");
      dom.className = "m-free-tips";
      // console.log('player ended!', player)
    },
    onPlayerLoadeddata(player) {
      // console.log('player Loadeddata!', player)
    },
    onPlayerWaiting(player) {
      // console.log('player Waiting!', player)
    },
    onPlayerPlaying(player) {
      // console.log('player Playing!', player)
    },
    onPlayerTimeupdate(player) {
      // console.log('player Timeupdate!', player.currentTime())
    },
    onPlayerCanplay(player) {
      // console.log('player Canplay!', player)
    },
    onPlayerCanplaythrough(player) {
      // console.log('player Canplaythrough!', player)
    },
    // or listen state event
    playerStateChanged(playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },
    // player is ready
    playerReadied(player) {
      // console.log('example 01: the player is readied', player)
    }
  },
  mounted() {
    this.typeNone = "1";
    if (localStorage.getItem("access_token")) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    this.getComments(1);
      var img = this.envVars.IMG_HOST + this.publishInfo.image_l;
    var zmUrl =location.origin + "/favicon.ico"
     this.config = {
      url: location.href,
      title: `${this.publishInfo.name}`,
      description: `我在凌天众媒网发现一个不错的广告上刊画面，赶快来看看`,
      image: img|| zmUrl,
            summary: `我在凌天众媒网发现一个不错的广告上刊画面，赶快来看看`,

    };
  }
};
</script>

<style scoped lang="scss">
.post-detail {
  margin:0 auto;

  .bshare-custom {
    padding-top: 15px;
  }

  .m-play {
    display: inline-block;
    padding-left: 20px;
    height: 16px;
    color: #999;
    cursor: pointer;
    background: url("~assets/img/icon-turntime-play.png") no-repeat left center;
    background-size: 14px 14px;
  }

  .m-download {
    display: inline-block;
    padding-left: 20px;
    margin-right: 87px !important;
    height: 16px;
    color: #fff;
    cursor: pointer;
    background: url("~assets/img/icon-turntime-download.png") no-repeat left
      center;
    background-size: 14px 14px;
  }

  .m-collect {
    display: inline-block;
    padding-left: 20px;
    height: 16px;
    color: #fff;
    cursor: pointer;
    background: url("~assets/img/turntime/icon-video-collect.png") no-repeat
      left center;
    background-size: 14px 14px;
  }

  .m-collect-active {
    background-image: url("~assets/img/turntime/icon-video-collect-active.png") !important;
  }

  .m-collect:hover {
    background-image: url("~assets/img/turntime/icon-video-collect-hover.png");
    color: #ff6429 !important;
  }

  .m-collect-active {
    display: inline-block;
    padding-left: 20px;
    height: 16px;
    color: #999;
    cursor: pointer;
    background: url("~assets/img/turntime/icon-turntime-collect-active.png")
      no-repeat left center;
    background-size: 14px 14px;
  }

  .m-play:hover,
  .m-play-active {
    color: #f3262d;
    background-image: url("~assets/img/turntime/turnp.png");
  }

  .m-zan,
  .m-low {
    display: inline-block;
    padding-left: 20px;
    height: 20px;
    color: #999;
    background-size: 14px 14px;
    background: no-repeat left center;
  }

  .m-zan {
    background-image: url("~assets/img/turntime/icon-video-z.png");
  }

  .m-zan:hover,
  .m-zan-active {
    background-image: url("~assets/img/turntime/icon-video-z-active.png");
    color: #ff6429;
  }

  .m-low {
    background-image: url("~assets/img/turntime/icon-video-c.png");
  }

  .m-low:hover,
  .m-low-active {
    background-image: url("~assets/img/turntime/icon-video-c-active.png");
    color: #ff6429;
  }

  .m-recall {
    display: inline-block;
    padding-left: 20px;
    height: 16px;
    line-height: 16px;
    color: #999;
    cursor: pointer;
    background: url("~assets/img/turntime/icon-turntime-msg.png") no-repeat left
      center;
    background-size: 14px 14px;
  }

  .m-recall:hover,
  .m-recall-active {
    color: #ff6429;
    background-image: url("~assets/img/turntime/icon-turntime-msg-active.png");
  }

  .m-detail-top {
    min-height: 927px;
    position: relative;
    background: #0f0f1e;
    padding-bottom: 20px;
  }

  .detail-center-box {
    width: 1390px;
    padding-top: 20px;
    margin: 0 auto;
  }

  .m-videoinfo-bottom {
    width: 1390px;
    display: flex;
    justify-content: space-between;
  }

  .m-videoinfo-left {
    width: 1080px;
    overflow: hidden;
  }

  .m-videoinfo-right {
    padding-top: 40px;
    text-align: center;
    width: 310px;

    .m-price {
      font-size: 26px;
      color: #ff6429;
    }

    .m-tips {
      color: #fff;
      padding-top: 6px;
      padding-bottom: 14px;

      img {
        width: 18px;
        height: 18px;
        vertical-align: middle;
        margin-right: 5px;
      }
    }

    .m-buy-btn {
      width: 160px;
      height: 44px;
      line-height: 44px;
      background: #ff6429;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      margin: 0 auto;
      color: #fff;

      &:hover {
        background: #ff7a48;
      }
    }
  }

  .m-video-title {
    color: #ccc;
    font-size: 24px;
    padding-top: 19px;
  }

  .m-video-content {
    color: #ccc;
    font-size: 14px;
    padding-top: 15px;

    span {
      margin-right: 30px;
    }
  }

  .m-video-tag {
    padding-top: 23px;
    font-size: 14px;
    color: #ccc;

    .m-tag-span {
      display: inline-block;
      height: 22px;
      line-height: 22px;
      padding: 0 15px;
      text-align: center;
      border-radius: 11px;
      background: #3f3f4b;
      margin-bottom: 10px;

      &:not(:last-child) {
        margin-right: 12px;
      }
    }
  }

  .m-video-introduce {
    .m-video-introduce-title {
      color: #fff;
      padding-top: 15px;
      font-size: 14px;
    }

    .m-video-introduce-content-wrap {
      padding-top: 10px;
      width: 1080px;
      position: relative;

      .m-slide-btn {
        font-size: 12px;
        color: #fff;
        right: 20px;
        cursor: pointer;
        position: absolute;
        top: 10px;

        &:hover {
          color: #ff7a48;
        }
      }
    }

    .m-video-introduce-content {
      color: #fff;
      font-size: 12px;
      width: 978px;
    }

    .hidden2 {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      word-wrap: break-word;
    }
  }

  .m-video-box-top {
    height: 694px;
    background: #1c1d30;
    display: flex;

    .m-video-left {
      width: 1080px;
      height: 694px;

      /deep/ .vjs-text-track-display {
        bottom: 50px !important;
      }

      /deep/ .vjs-control-bar {
        height: 50px;
      }

      /deep/ .vjs-playback-rate-value {
        line-height: 50px;
      }

      /deep/ .vjs-playback-rate {
        position: absolute;
        right: 100px;
      }

      /deep/ .vjs-playback-rate {
        display: none;
      }

      /deep/ .vjs-volume-panel {
        position: absolute;
        right: 50px;
        top: 0;
      }

      /deep/ .vjs-current-time {
        line-height: 50px;
        width: 30px !important;
      }

      /deep/ .vjs-time-control {
        line-height: 50px;
        display: inline;
      }

      /deep/ .vjs-time-control {
        display: inline;
        width: auto !important;
        padding-left: 10px;
        padding-right: 0px;
      }

      /deep/ .vjs-remaining-time {
        display: none;
      }

      /deep/ .vjs-fullscreen-control {
        position: absolute;
        right: 0;
        top: 0;
      }

      /deep/ .video-js .vjs-control {
        width: 50px;
      }

      /deep/ .vjs-button > .vjs-icon-placeholder:hover {
        color: #ff6429;
      }

      /deep/ .vjs-remaining-time {
        line-height: 50px;
      }

      /deep/ .video-js .vjs-volume-panel .vjs-volume-control {
        width: 42px !important;
        height: 110px !important;
        position: absolute;
        left: 0;
        bottom: 56px;
      }

      /deep/ .vjs-volume-level {
        width: 4px !important;
        border-radius: 2px;
        background: #ff6429;
      }

      /deep/ .vjs-volume-level:before {
        left: -0.4em;
      }

      /deep/ .vjs-volume-bar {
        height: 90px !important;
        background: #5c5d5f;
        border-radius: 2px;
      }

      /deep/ .vjs-button > .vjs-icon-placeholder:before {
        line-height: 50px;
        font-size: 24px;
      }

      /deep/ .vjs-play-control.vjs-ended .vjs-icon-placeholder:before {
        content: "\f101";
      }

      /deep/ .vjs-volume-bar.vjs-slider-horizontal {
        width: 110px !important;
      }

      /deep/ .vjs-progress-control {
        position: absolute;
        bottom: 40px;
        width: 100% !important;
        height: 20px;
      }

      /deep/ .vjs-play-progress {
        background: #ff6429;
      }

      /deep/ .vjs-play-progress:before {
        display: none;
      }

      /deep/ .vjs-progress-holder {
        margin: 0 !important;
      }

      .m-free-tips {
        width: 302px;
        height: 28px;
        line-height: 28px;
        color: #fff;
        position: absolute;
        padding-left: 6px;
        padding-right: 6px;
        left: 10px;
        bottom: 16px;

        &.bottom_67 {
          /*bottom: 67px;*/
          transform: translateY(-61px);
        }

        .iconfont {
          font-size: 12px;
          position: absolute;
          right: 6px;
          top: 1px;
          z-index: 10;
          cursor: pointer;
        }

        &:after {
          content: " ";
          width: 302px;
          height: 28px;
          background: #000;
          opacity: 0.5;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 5;
        }

        p {
          position: relative;
          width: 270px;
          height: 28px;
          line-height: 28px;
          z-index: 20;
          font-size: 14px;
          color: #fff;
        }

        .m-free-pop {
          width: 270px;
          height: 28px;
          position: absolute;
          left: 0;
          top: 0;
          background: #000;
          opacity: 0.1;
          z-index: 10;
        }

        .color_orange {
          color: #ff6429;
          cursor: pointer;
        }
      }

      .m-img-wrap {
        width: 1080px;
        height: 648px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .m-wrap-resource {
        width: 1080px;
        height: 648px;
        position: relative;
      }

      .m-video-wrap {
        width: 1080px;
        height: 648px;
        background: #ccc;

        /deep/ .video-js {
          width: 100% !important;
          height: 100% !important;

          .vjs-big-play-button {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }

      .m-video-info {
        height: 46px;
        display: flex;
        padding: 0 16px;
        color: #fff;
        justify-content: space-between;

        .m-info-left {
          display: flex;
          align-items: center;

          span {
            margin-right: 30px;

            > img {
              margin-right: 6px;
              vertical-align: middle;
            }
          }
        }

        .m-info-right {
          display: flex;
          align-items: center;

          span {
            cursor: pointer;

            &:not(:last-child) {
              margin-right: 30px;
            }
          }

          .report {
            &:hover {
              color: #ff6429;
            }
          }
        }
      }
    }

    .m-video-right {
      width: 310px;
      height: 694px;

      .m-video-right-list {
        padding: 0 20px;

        .m-video-list-title {
          color: #fff;
          height: 50px;
          line-height: 50px;
          border-top: 1px solid #757575;
        }

        ul.m-video-list-wrap {
          overflow-y: auto;
          height: 528px;
        }

        li.m-video-list-item {
          a {
            display: block;
            display: flex;
            height: 72px;
            margin-bottom: 16px;
            justify-content: space-between;
          }

          .m-video-item-img {
            width: 120px;
            height: 72px;
            position: relative;
            overflow: hidden;
            border-radius: 4px;

            > img {
              width: 100%;
              height: 100%;
              display: block;
              background: #ccc;
            }

            .m-video-play-time {
              position: absolute;
              font-size: 12px;
              bottom: 8px;
              right: 8px;
              color: #fff;

              > img {
                width: 14px;
                height: 14px;
                vertical-align: bottom;
                margin-right: 5px;
              }
            }
          }

          .m-video-item-content {
            width: 140px;

            .m-video-item-title {
              color: #fff;
              font-size: 14px;
              height: 38px;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              word-wrap: break-word;

              &:hover {
                color: #ff6429;
              }
            }

            .m-video-item-right-bottom {
              padding-top: 14px;
              color: #fff;
              display: flex;
              justify-content: flex-start;

              img {
                margin-right: 6px;
                vertical-align: middle;
                margin-top: -5px;
              }

              span {
                margin-right: 24px;
              }
            }
          }
        }
      }

      //                 .m-video-right-list::-webkit-scrollbar {
      //     width: 6px; //滚动条的宽度
      // }
      // .m-video-right-list::-webkit-scrollbar-thumb {
      //     background-color: #8899A7;//滚动条的颜色
      //     border-radius: 3px;//滚动条的边框倒角
      // }
      .m-user-box {
        padding-left: 12px;
        padding-top: 20px;
        display: flex;
        padding-bottom: 22px;

        .m-avatar {
          width: 70px;
          height: 70px;
          border-radius: 35px;
          overflow: hidden;
          background: #fff;
          margin-right: 12px;

          img {
            width: 100%;
            height: 100%;
            border-radius: 35px;
          }
        }

        .m-collect-btn {
          width: 80px;
          height: 26px;
          margin-top: 6px;
          background: #ff6429;
          color: #fff;
          font-size: rem(24);
          line-height: 24px;
          text-align: center;
          border-radius: 2px;
          cursor: pointer;

          .m-collected {
            display: block;
          }

          .m-cancel-collected {
            display: none;
          }
        }

        .m-collect-btn:hover {
          background: #ff7a48;
        }

        .m-collect-btn:hover {
          .m-collected {
            display: none;
          }

          .m-cancel-collected {
            display: block;
          }
        }

        .m-collect-btn-active {
          background: #ff6429;
        }

        .m-user-right {
          width: 191px;

          .m-name {
            font-size: 15px;
            color: #fff;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            a {
              color: #fff;
              text-decoration: none;
            }

            a:hover {
              color: #f3262d;
            }

            a:active {
              color: #fff;
            }
          }

          .m-user-other {
            font-size: 12px;
            color: #fff;
            display: flex;
            padding-top: 3px;
            justify-content: flex-start;

            .m-upload-num {
              margin-right: 20px;
            }

            .m-collect:hover {
              background: url("~assets/img/turntime/icon-video-collect.png")
                no-repeat left center !important;
              color: #999 !important;
            }
          }
        }
      }
    }
  }

  .m-other-upload-list {
    padding-top: 10px;

    ul {
      display: flex;
      padding-top: 20px;
      justify-content: flex-start;

      a {
        text-decoration: none;
      }

      li {
        width: 220px;
        margin-right: 14px;

        &:hover {
          .name {
            color: #f3262d;
          }
        }

        .upload-img {
          position: relative;

          img {
            width: 220px;
            height: 132px;
            display: block;
            background: #ccc;
          }
        }

        .name {
          color: #333;
          font-size: 14px;
          padding-top: 11px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .upload-bottom {
          color: #999;
          display: flex;
          padding-top: 5px;
          font-size: 12px;
          justify-content: space-between;

          .upload-bottom-left {
            display: inline-flex;
            align-items: center;

            span {
              margin-right: 14px;
            }

            .upload_view {
              width: 11px;
              height: 10px;
              margin-right: 4px;
              color: #999;
            }

            .upload_download {
              width: 11px;
              height: 10px;
              margin-right: 4px;
            }
          }
        }
      }
    }

    .m-other-title {
      position: relative;

      h3 {
        font-size: 20px;
        display: inline;
        color: #333;
      }

      .m-upload-tab {
        font-size: 14px;
        margin-left: 16px;
        cursor: pointer;

        &.active,
        &:hover {
          color: #f80000;
        }
      }

      .more {
        border: 1px solid #d2d5db;
        width: 60px;
        padding-left: 12px;
        height: 22px;
        line-height: 20px;
        border-radius: 11px;
        text-align: left;
        background: #f4f6f8;
        color: #333;
        font-size: 12px;
        position: absolute;
        right: 0;
        top: 0;
        text-decoration: none;
      }

      .more:after {
        content: " ";
        width: 5px;
        height: 5px;
        border-top: 1px solid #333;
        border-right: 1px solid #333;
        position: absolute;
        right: 12px;
        top: 8px;
        transform: rotate(45deg);
      }

      .more:hover {
        background: #fff;
        border-color: #d2d5db;
      }
    }
  }

  .m-video-comments-box {
    display: flex;
    padding-bottom: 20px;
    justify-content: space-between;

    .m-comments-left {
      width: 1060px;

      .m-comments-title {
        color: #333;
        font-size: 18px;

        h3 {
          display: inline;
        }

        span {
          margin-left: 40px;
        }
      }

      .m-my-comments-box,
      .m-my-comments-sub-box,
      .m-my-comments-sub-box-to {
        padding-top: 16px;
        position: relative;

        .comments-num {
          color: #666;
          font-size: 12px;
          position: absolute;
          right: 100px;
          bottom: 10px;
        }

        /deep/ .el-textarea {
          width: 970px;
        }

        /deep/ textarea {
          width: 100%;
          height: 74px;
          color: #333;
          font-size: 14px;
        }

        .m-submit-btn {
          width: 70px;
          height: 40px;
          line-height: 40px;
          border-radius: 4px;
          text-align: center;
          color: #fff;
          position: absolute;
          right: 10px;
          bottom: 16px;
          cursor: pointer;
          background-color: #f3262d;
          font-size: 14px;

          &:hover {
            background-color: #f43c42;
          }
        }
      }

      .m-my-comments-sub-box {
        margin-bottom: 20px;

        /deep/ .el-textarea {
          width: 910px;
        }
      }

      .m-my-comments-sub-box-to {
        margin-bottom: 20px;

        /deep/ .el-textarea {
          width: 874px;
        }
      }

      .m-comments-list {
        padding-top: 20px;

        li.m-comments-item {
          padding-top: 30px;
          display: flex;
        }

        .m-comments-avatar {
          width: 40px;
          height: 40px;
          margin-right: 12px;

          img {
            display: block;
            width: 100%;
            height: 100%;
            background: #eee;
            border-radius: 20px;
          }
        }

        .m-comments-content {
          width: 1000px;
          padding-bottom: 6px;
          border-bottom: 1px solid #e8ebef;

          .m-nickname {
            color: #333;
            font-size: 14px;
          }

          .m-yl {
            color: #666;
            padding-top: 4px;
            font-size: 12px;
          }

          .m-show-more-comments {
            padding: 20px 0;

            .m-show-more-btn {
              color: #06c;
              cursor: pointer;
            }
          }

          .m-comments-info {
            .m-info-wrap {
              padding-top: 10px;

              span {
                cursor: pointer;
                margin-right: 24px;
              }

              .m-time {
                color: #999;
                padding-left: 20px;
                background: url("~assets/img/icon-turntime-time.png") no-repeat
                  left 2px;
              }

              img {
                width: 14px;
                height: 14px;
                margin-right: 6px;
              }
            }

            .page_sample {
              display: flex;
              justify-content: flex-end;
              padding: 10px 20px 50px 0;
            }

            .m-sub-comments-list {
              padding-top: 20px;

              li.m-sub-comments-item {
                display: flex;
                justify-content: flex-start;

                .m-sub-comments-avatar {
                  width: 24px;
                  height: 24px;
                  border-radius: 12px;
                  margin-right: 12px;

                  img {
                    width: 100%;
                    height: 100%;
                    border-radius: 12px;
                    background: #ccc;
                    display: block;
                  }
                }

                .m-sub-comments-content {
                  width: 970px;
                  word-break: break-all;
                  color: #666;
                  font-size: 12px;
                  margin-bottom: 20px;

                  .m-sub-comments-name {
                    color: #333;
                    font-size: 14px;
                    margin-right: 10px;
                    display: inline-block;
                  }
                }
              }
            }
          }
        }
      }
    }

    .m-comments-right {
      width: 300px;
    }
  }

  .m-pages-bottom {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px 20px 50px 0;

    & > .sbm {
      width: 46px;
      height: 28px;
      border: 1px solid #ddd;
      text-align: center;
      line-height: 26px;
      cursor: pointer;
      color: #333;
    }
  }

  .m-my-comments-box-nologin {
    width: 1060px;
    height: 120px;
    line-height: 120px;
    background: #f4f6f8;
    border-radius: 8px;
    color: #666;
    margin-top: 16px;
    margin-bottom: 50px;
    text-align: center;

    span {
      display: inline-block;
      width: 90px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background: #f3262d;
      color: #fff;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
    }
  }

  .video-player-box {
    min-height: 200px;
  }

  .code-box {
    text-align: center;
    font-size: 14px;
    color: #666;
  }

  .dialog-price {
    font-size: 26px;
    text-align: center;
    color: #ff0027;
    padding-top: 28px;
  }

  .m-code-btn {
    width: 112px !important;
    display: inline-block;
    border: 0;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #f3262d;
    color: #fff;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    transition: 0.1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
  }

  /deep/ .dialog-box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin-top: -50px !important;
  }
}
</style>
<style scoped lang="less">
@import "../../assets/css/mixin.less";
.statement_text {
  margin: 60px 0 16px;
  span {
    line-height: 20px;
  }
}
.m-video-list-wrap {
  .mixin_scroll-default-style();
}

.no-data {
  height: 149px;
  display: flex;
  align-items: center;
  color: #666;
  justify-content: center;

  .right_img {
    width: 62px;
    margin-right: 10px;
  }
}
</style>
