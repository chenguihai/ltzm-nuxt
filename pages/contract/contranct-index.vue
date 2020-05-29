<!--订单详情-->
<template>
  <div>
    <navAll :navWidth="1210"/>
    <div class="contranct-wrap" v-loading="loading" v-if="dataOver && JSON.stringify(this.orderDetail) !== '{}'">
      <div class="box">
        <div class="item-top">
          <div class="head">
            <info-title text="已购服务信息"></info-title>
            <div class="order-top-icon">
              <div>
                <i class="iconfont icon-wenzhang-mingcheng"></i>
                <span>已托管赏金</span>
              </div>
              <span class="txt">￥{{orderDetail.pay_status==1 ? orderDetail.amount : 0}}</span>
            </div>
          </div>
          <div class="center">
            <img v-lazy="orderDetail.img+'?x-oss-process=image/resize,m_fill,h_108,w_180'" src="~/assets/img/img_bg.png" alt="服务" />
            <div>
              <h4>{{orderDetail.name}}</h4>
              <p v-if="orderDetail.spec">规格：{{orderDetail.spec}}</p>
              <p>店铺信息：{{orderDetail.employee && orderDetail.employee.store_name}}</p>
              <p>
                价格：
                <span>¥{{orderDetail.amount}}</span>
              </p>
            </div>
          </div>
          <div class="bottom">
            <span>
              <i class="iconfont icon-shijian"></i>订单时间：{{orderDetail.created_at}}
            </span>
            <span>
              <i class="iconfont icon-hetong-dingdanbianhao"></i>订单编号：{{orderDetail.order_sn}}
            </span>
            <span>
              <i class="iconfont icon-hetong-xuqiuleixing"></i>需求类型：{{orderDetail.cate_name}}
            </span>
            <span>
              <i class="iconfont icon-hetong-xuqiushuliang"></i>需求数量：{{orderDetail.number}}
            </span>
            <span class="m-report" @click="reportOnline()">
              <i class="icon-report"></i>举报
            </span>
          </div>
          <more-info v-if="showMore"></more-info>
          <div v-if="orderDetail.service_demand" class="ctr" @click="showMore = !showMore">
            <span>{{showMore ? '收起' : '显示更多'}}</span>
            <i class="iconfont" :class="`icon-${showMore ? 'xiangshang' : 'xiangyoudianji'}`"></i>
          </div>
        </div>
        <!-- 流程图 -->
        <steps :render="processRenderList" :finals="finalProcess" @update="updateDetail"></steps>
        <div class="status">
          <info-title text="订单状态"></info-title>
          <div class="container">
            <!--签单-->
            <signBill ></signBill>
            <!--合同-->
            <sign  @start="startContract"></sign>
            <!--工作-->
            <job v-loading="jobLoading" :phaseData="phaseData" @update="phaseAndOrder"></job>
            <!--评价-->
            <comment @update="updateDetail"></comment>
          </div>
        </div>
        <show-box v-show="showStartBoxFlag" @startZmContract="startZmContract" @closeBox="closeBox" />
      </div>
      <detail @changeTime="changeTime" :content="contractForm" :contractDetail="contractDetail"  v-show="showContractBoxFlag" @closeContractBox="closeContractBox" />

    </div>
  </div>
</template>

<script>
import { contAsync, getOrderDetail, getPhase, getHeader } from '~/api/async-server';
import { stateForUI, STATUS_RENDER, ERROR_RENDER, CLOSE_RENDER } from './status'
import { getOrderDetailClient, getPhaseClient } from '~/api/order'
import { indexInitMixin } from '~/utils/common-mixins'

import detail from "~/components/contract/detail";
import ShowBox from "~/components/contract/show-box";
import moreInfo from '~/components/contract/moreInfo'
import infoTitle from '~/components/contract/infoTitle'
import signBill from '~/components/contract/signBill'
import job from '~/components/contract/job'
import sign from '~/components/contract/sign'
import comment from '~/components/contract/comment'
import steps from '~/components/contract/steps'
import { report } from '~/api/report'
import navAll from "@/components/component/navAll";
export default {
  layout: 'shop-list-layout',
  name: "contractIndex",
  middleware: ['auth'],
  mixins: [indexInitMixin()],
  data () {
    return {
      contractDetail: {},
      showStartBoxFlag: false,
      showContractBoxFlag: false,
      order_sn: this.$route.query.order_sn,
      isCert: false, // 是否内部跳转
      loading: false,
      jobLoading: false,
      orderDetail: {},
      phaseData: {},
      dataOver: false, // 页面准备就绪 以及 nuxtBUG hack！！！
      showMore: true, // 显示更多
      contractForm: {
        begin_time: '', //开始时间
        end_time: '',  //结束时间
        day_count: '',  //总天数
        ProjectPhasePrice: '',  //	总价格
        content: '', //	内容
        ordersn: '', //服务订单
        project: [{
          ProjectPhaseName: '', //阶段名字
          ProjectPhaseGain: '', //阶段说明
          ProjectPhasePrice: '', //阶段价格
          ProjectPhaseDay: ''  //阶段天数
        }], //阶段
      }
    }
  },
  async created () {
    this.isCert && await this.certInit()
    this.$nextTick(function () {
      this.dataOver = true
    })

    const { cert } = this.$route.query
    this.isCert = cert;
    /* 获取订单详情 */
    const errCon = { statusCode: 500, message: '订单详情加载失败,请重试' }
    const resArr = await contAsync(this.$route, ['order_sn'], getOrderDetail, getPhase).catch(e => {
      if (e && e.data) {
        errCon.message = e.data.message
      }
      console.log(errCon);
    })
    console.log("---------------", resArr)
    // const resArr = resArrRes ? resArrRes.data.data : ''
    if (resArr) {
      const [orderDetail, phaseData] = resArr
      console.log('2222222222', orderDetail)
      if (orderDetail) {
        this.orderDetail = orderDetail
        this._provided.orderInfo = orderDetail
        this._provided.identity = this.firstPerson
      }
      if (phaseData) {
        this.phaseData = phaseData
      }
    }
  },
  async mounted () {

  },
  provide () {
    return {
      orderInfo: this.orderDetail,
      identity: this.firstPerson,
      // 导航SSR
      navList: this.headerNavList,
      navLeftMadio: this.navLeftMadio,
      popularMedia: this.popularMedia,
      PopularBrand: this.PopularBrand,
    }
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
      // 导航SSR
      navLeftMadio,
      popularMedia,
      headerNavList,
      PopularBrand
    };

  },
  computed: {
    finalProcess () {
      // 最终流程定点
      const { order_status, pay_status, isRefund, refundStatus } = this.orderDetail
      return stateForUI(+order_status, +pay_status, isRefund, refundStatus)
    },
    processRenderList () {
      // 流程渲染表
      let { order_status, pay_status } = this.orderDetail
      return ![8, 9].includes(order_status) ? STATUS_RENDER : pay_status === 0 ? CLOSE_RENDER : ERROR_RENDER;
    },
    firstPerson () {
      if (!this.userInfo || JSON.stringify(this.orderDetail) === '{}') return 0;
      const { original: { id } } = this.userInfo;
      /*
      0 无角色身份 1雇主 2服务商
      */
      return id === this.orderDetail.employer.id ? 1 : 2;
    },
    userInfo () {
      if (process.server) {
        return null
      } else {
        let data = localStorage.getItem('userInfo')
        return !data ? null : JSON.parse(data)
      }
    },
    storeState () {
      return this.orderDetail ? this.orderDetail.employee.status : 0
    }
  },
  components: { ShowBox, detail, moreInfo, infoTitle, signBill, job, sign, comment, steps, navAll },
  methods: {
    reportOnline() {
      let _this = this
      let thisType = this.firstPerson==2 ? 1 : 2; //2
      let id = this.firstPerson==2 ? this.orderDetail.employer.id : this.orderDetail.employee.id
      let data = {
        project_type:thisType,
        project_id:id
      }
      report.tipOffs(data).then(res=>{
        const {code,message} = res.data
          if(code == 200) {
            sessionStorage.setItem('historyUrl',this.$route.fullPath)
            var { href } = _this.$router.resolve(`/report?type=${thisType}&id=${id}`);
            window.open(href);
          }else{
            this.$message.error(message)
          }
        })
    },
    async phaseAndOrder () {
      await this.updateDetail()
      await this.updatePhase()
    },
    closeBox () {
      this.showStartBoxFlag = false;
    },
    startContract (e, e1) {
      this.contractDetail = e;
      if (e1 == 1) {
        this.showStartBoxFlag = true;
      } else if (e1 == 2 || e1 == 3) {
        this.showContractBoxFlag = true;
      }

    },
    startZmContract () {
      this.showStartBoxFlag = false;
      this.showContractBoxFlag = true;
    },
    closeContractBox () {
      this.showContractBoxFlag = false;
      window.location.reload();
    },
    showContractBox () {
      this.showContractBoxFlag = true;
    },
    changeTime () {

    },
    async updatePhase () {
      this.jobLoading = true
      const res = await getPhaseClient(this.order_sn).catch(e => this.$message.error('更新阶段信息失败'))
      this.jobLoading = false
      if (!res) return
      // hack
        const {data} = res.data;
      this.phaseData = data;
    },
    async updateDetail () {
      this.loading = true
      const res = await getOrderDetailClient(this.order_sn).catch(e => this.$message.error('更新数据失败'))
      this.loading = false
      if (!res) return
      // hack
      const {data} = res.data;
      for (let key of Object.keys(data)) {
        if (this.orderDetail) {
          this.orderDetail[key] = data[key]
        } else {
          this.orderDetail = data
        }
      }
    },
    async certInit () {
      await this.indexInit()
      // 无基础内部跳转之后 1.0必须要准备的数据
      await this.updateDetail()
    }
  }
};
</script>

<style scoped lang="less" src="~/assets/css/contract.less"></style>
