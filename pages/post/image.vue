<template>
  <div>
    <navAll :navWidth="1395"/>
    <div class="turn-time-box">
      <!-- 筛选 -->
      <div class="v-top user_select">
        <div class="typ-line" :class="{open: showJmt}" v-if="jmt.length > 0">
          <p>媒体类型:</p>
          <ul class="typ-box">
            <li @click="sel('',1)" :class="{active:nowJmt === ''}">全部</li>
            <li v-for="item in jmt" :key="item.id" :class="{active:nowJmt === item.id}" @click="sel(item, 1)">{{item.name}}</li>
            <li class="typ-btn" :class="{active:showJmt}" @click="showOpen(1)">
              {{showJmt ? '收起':'更多'}}
              <div>
                <i class="el-icon-arrow-down"></i>
                <i class="el-icon-arrow-down"></i>
              </div>
            </li>
          </ul>
        </div>

        <div class="typ-line" :class="{open: showRealm}" v-if="realm.length > 0">
          <p>上刊领域:</p>
          <ul class="typ-box">
            <li @click="sel('',2)" :class="{active:nowRealm === ''}">全部</li>
            <li v-for="item in realm" :key="item.id" :class="{active:nowRealm === item.id}" @click="sel(item,2)">{{item.name}}</li>
            <li class="typ-btn" :class="{active:showRealm}" @click="showOpen(2)">
              {{showRealm ? '收起':'更多'}}
              <div>
                <i class="el-icon-arrow-down"></i>
                <i class="el-icon-arrow-down"></i>
              </div>
            </li>
          </ul>
        </div>
        <div class="typ-line" :class="{open: showCity}" v-if="city.length > 0">
          <p>投放城市:</p>
          <ul class="typ-box">
            <li @click="sel('',3)" :class="{active:nowCity === ''}">全部</li>
            <li v-for="item in city" :key="item.id" :class="{active:nowCity === item.id}" @click="sel(item,3)">{{item.shortname}}</li>
            <li class="city-sel-boxp">
              <el-select v-model="province" placeholder="请选择省" size="mini" class="sel-box">
                <el-option v-for="(item, idx) in cityJSON" :key="item.id" :label="item.name" :value="`${item.id};${idx}`"></el-option>
              </el-select>
            </li>
            <li class="city-sel-box">
              <el-select v-model="selCity" placeholder="请选择市" size="mini" class="sel-box">
                <el-option v-for="(item, idx) in cityArr" :key="item.id" :label="item.name" :value="`${item.id};${idx}`">
                </el-option>
              </el-select>
            </li>
            <li class="sure-btn user_select" @click="sureCity">
              确定
            </li>
          </ul>
        </div>

        <div class="typ-line center">
          <p>拍摄时间:</p>
          <ul class="typ-box">
            <li>
              <el-date-picker size="mini" class="date" v-model="searchTime" type="daterange" value-format="yyyy-MM-dd" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" @change="timeChange">
              </el-date-picker>
            </li>
          </ul>
        </div>

        <div class="top-oth" v-if="nowSelArr.length > 0">
          <p>当前筛选：</p>
          <p v-for="(item,idx) in nowSelArr" :key="idx">{{item.type}}：<span>{{item.con}}<i class="el-icon-close" @click="delSel(item, idx)"></i></span></p>
          <p @click="clearSel">清空筛选</p>
        </div>
      </div>
      <!-- 筛选 -->
      <!-- 列表 -->
      <div class="v-bottom" style="margin-top:57px;">
        <div class="turn-time">
          <turnList listName="newest" :isVideo="false" :chooseData="nowSelArr" :keywords="searchKeyWords" :isNew="true" ref="newlist" :emptyCheck='true'>
            <turnTitle slot="title" title="最新动态">
              <p class="more-btn" slot="btn" @click="refresh">
                <i class="el-icon-refresh"></i>换一组
              </p>
            </turnTitle>
          </turnList>
          <div class="m-have-pages">
            <turnList listName="create" :isVideo="false" style="margin-top:34px;" :keywords="searchKeyWords" :chooseData="nowSelArr" :showPage="true">
              <turnTitle slot="title" :tab-arr="titleTabArr" class="t1">
                <div class="sear-box" slot="btn">
                  <input type="text" v-model="keywords" placeholder="搜索图片" @keyup.enter="searchSubmit">
                  <i class="el-icon-search" @click="searchSubmit"></i>
                </div>
              </turnTitle>
            </turnList>
          </div>


        </div>
        <turnAside title="热门上刊图片" type="1" param="deal,view,comm"></turnAside>
      </div>
      <!-- 列表 -->
    </div>
  </div>
</template>

<script>
import turnList from '@/components/turnCom/turnList'
import turnTitle from '@/components/turnCom/turnTitle'
import turnAside from '@/components/turnCom/turnAside'
import { getTurnTimeList, getHeader } from '@/api/async-server'
import { searchTurnTime } from '@/api/turn-time'
import cityJSON from '~/utils/city.json'
import navAll from "@/components/component/navAll"

export default {
  name: 'turnTimeImage',
  layout: 'post-layout',
  components: { turnList, turnTitle, turnAside, navAll },
  head(){
    return {
      title: `上刊图片列表 - ${this.indexData.create.current_page} - 凌天众媒网`,
      meta: [{
        hid: "description",
        name: "description",
        content: "上刊图片列表，实时上刊，最新广告上刊，上刊大厅，上刊图片，上刊视频，热门上刊，找上刊资源上凌天众媒网（zhongmei66.com）"
      },{
        hid: "keywords",
        name: "keywords",
        content: "上刊图片列表，最新最全广告上刊，最新最全媒体上刊，上刊大厅，查找投放广告画面就上凌天众媒网"
      }]
    }
  },
  provide () {
    return {
      indexData: this.indexData,
      nowPath: 'img',
      // 导航SSR
      navList: this.headerNavList,
      navLeftMadio: this.navLeftMadio,
      popularMedia: this.popularMedia,
      PopularBrand: this.PopularBrand,
    };
  },
  data () {
    return {
      indexData: {},
      titleTabArr: [
        { text: '发布时间排序', sel: 1 },
        { text: '图片热度排序', sel: 2 },
        { text: '下载量排序', sel: 3 }
      ],
      searchTime: '',
      showJmt: false,
      showRealm: false,
      showCity: false,
      nowSelArr: [],
      nowJmt: '',
      nowRealm: '',
      nowCity: '',
      cityJSON,
      province: '',
      selCity: '',
      keywords: '',
      searchKeyWords: ''
    };
  },
  async asyncData (app) {
      const errCon = { statusCode: 500, message: "实时上刊加载失败,请重试" };
    const dataRes = await getTurnTimeList(app, 1).catch(e => {
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

    if (!data) return
    return { 
      indexData: data,
      // 导航SSR
      navLeftMadio,
      popularMedia,
      headerNavList,
      PopularBrand
    }
  },
  computed: {
    jmt () {
      if (!this.indexData.jmt) return []
      return this.showJmt ? this.indexData.jmt : this.indexData.jmt.slice(0, 10)
    },
    realm () {
      if (!this.indexData.realm) return []
      return this.showRealm ? this.indexData.realm : this.indexData.realm.slice(0, 10)
    },
    city () {
      if (!this.indexData.city) return []
      return this.showCity ? this.indexData.city : this.indexData.city.slice(0, 10)
    },
    cityArr () {
      return this.citySelParse(this.province, this.cityJSON)
    }
  },
  watch: {
    province: function (val) {
      this.selCity = ''
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log(vm);//当前组件的实例
    });
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  mounted () {

  },
  methods: {
    showOpen(type) {
      if(type==1) {
        this.showJmt = !this.showJmt
        this.showRealm = false
      }else if(type==2) {
        this.showRealm = !this.showRealm
        this.showJmt = false
      }
    },
    searchSubmit () {
      this.searchKeyWords = this.keywords
    },
    timeChange (val) {
      this.sel({ name: val ? val.join('至') : '' }, 4)
    },
    sureCity () {
      if (!this.selCity) return this.$message.error('请先选择城市')
      let idx = this.selCity.split(';')[1]
      this.sel(this.cityArr[idx], 3)
    },
    citySelParse (s, data) {
      if (s) {
        let idx = s.split(';')[1]
        return data[idx].child
      } else {
        return []
      }
    },
    refresh () {
      // 换一组
      let nel = this.$refs.newlist
      let numtal = Math.ceil(
        Number(nel.total) / Number(nel.pageSize)
      )
      if(nel.nowPage >= numtal){
        nel.nowPage=1
      }else{
        nel.nowPage += 1
      }
      nel.pageChange(nel.nowPage)
    },
    clearSel () {
      // 清空
      this.nowCity = ''
      this.nowRealm = ''
      this.nowJmt = ''
      this.searchTime = ''
      this.nowSelArr = []
      this.province = ''
      this.selCity = ''

    },
    delSel (item, idx) {
      // 删除
      switch (item.typeId) {
        case 4:
          this.searchTime = ''
          break
        case 3:
          this.nowCity = ''
          this.province = ''
          this.selCity = ''

          break
        case 2:
          this.nowRealm = ''
          break
        default:
          this.nowJmt = ''
      }
      this.nowSelArr.splice(idx, 1)
    },
    sel (item, cla) {
      // 选择
      let type = ''
      let ok = false
      switch (cla) {
        case 4:
          type = '拍摄时间'
          break
        case 3:
          type = '地区'
          this.nowCity = item.id || ''
          break
        case 2:
          type = '上刊领域'
          this.nowRealm = item.id || ''
          break
        default:
          type = '媒体类型'
          this.nowJmt = item.id || ''
      }
      let idx = this.nowSelArr.findIndex(sel => sel.type === type)
      if (idx !== -1) this.nowSelArr.splice(idx, 1)
      if (item === '' || item.name === '') {
        return
      }
      for (let i = 0, sel; sel = this.nowSelArr[i++];) {
        if (sel.type === type) {
          sel.con = item.name
          break
        }
      }
      this.nowSelArr.push({ type, con: item.name, id: item.id, typeId: cla })
    },
    search () {

    }
  },
};
</script>

<style scoped lang="scss">
@import './imageOrVideo.scss'
</style>
