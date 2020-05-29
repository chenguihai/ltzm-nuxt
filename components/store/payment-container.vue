<template>
  <div class="payment_bond">
    <!--激活技能天赋-->
    <h3>激活技能天赋</h3>
    <div class="pb_head">
      <!-- <el-checkbox v-model="selectAll" @change="handleAllSelect">全选</el-checkbox> -->
      <span class="pb_first">一级类目</span>
      <span class="pb_second">二级类目</span>
      <span class="pb_third">三级类目</span>
      <span class="pb_fourth">保证金</span>
    </div>
    <div class="pb_list" v-for="(item,index) in list" :key="index">
      <el-checkbox v-model="item.checked" @change="handleSingle"></el-checkbox>
      <div class="pb_inner">
        <div class="pb_title">
          <i class="iconfont icon-jihuojinengbiaoti"></i>
          <span>{{item.cate_name}}</span>
          <i class="iconfont icon-jihuojinengshanchu" @click="handleDelete1(index)"></i>
          <em>{{index+1}}</em>
        </div>
        <div class="title-2">
          <a href="javascript:;" v-for="(item2,index2) in item.children2" :key="item2.id">
            <span>{{item2.cate_name}}</span>
            <i class="iconfont icon-jihuojinengshanchu" @click="handleDelete2(index,index2)"></i>
          </a>
        </div>
        <div class="title-3">
          <a href="javascript:;" v-for="(item3,index3) in item.children3" :key="item3.id">
            <span>{{item3.cate_name}}</span>
            <i class="iconfont icon-jihuojinengshanchu" @click="handleDelete3(index,index3)"></i>
          </a>
        </div>
        <div class="title-4">￥{{item.cat_money}}</div>
      </div>
    </div>
    <!-- 全选-->
    <div class="pb_bottom" v-if="list.length > 0">
      <el-checkbox v-model="selectAll" @change="handleAllSelect">全选</el-checkbox>
      <div class="btn_box">
        <p>
          已选
          <span>{{skillNum}}</span>个技能
        </p>
        <p>
          <span>总价：</span>
          <strong>￥{{totalPrice}}</strong>
        </p>
        <!--<button @click="toPay">去缴纳</button>-->
        <span class="next_step fs_16" @click="toPay">去缴纳</span>
      </div>
    </div>
    <div v-else class="no-data">
      <img class="right_img" src="../../assets/img/pintouge.png" alt="图片" />
      <span>暂无数据</span>
    </div>
    <!--温馨提示-->
    <dialog-cpn
      v-if="dialogFlag"
      :item="{title:'温馨提示', btn:'确认删除', close:'再考虑下'}"
      @emitClose="handleClose"
      @emitSubmit="_handleSubmit"
    >
      <p class="sub-title" v-if="selectCate ===1">
        确定要删除【{{cateName}}】一级类目吗，删除后该类目下的二级类目和三级类目都将会被删除哦，
        并有以下影响：
      </p>
      <p class="sub-title" v-else-if="selectCate === 2">
        确定要删除【{{cateName}}】二级类目吗，删除后该类目下的三级类目都将会被删除哦，
        并有以下影响：
      </p>
      <p class="sub-title" v-else>确定要删除【{{cateName}}】三级类目吗，删除后该类目会有以下影响：</p>
      <div class="ctn">
        <p class="item">
          <span>1</span>
          <em>您将不能发布该类目下服务</em>
        </p>
        <p class="item">
          <span>2</span>
          <em>您将不能参与该类目下的任务</em>
        </p>
        <p class="item">
          <span>3</span>
          <em>您将不能购买该类目下的线索</em>
        </p>
        <p class="item">
          <span>4</span>
          <em>请选择其他类目弥补该类目下的空缺，让赚钱来的更容易</em>
        </p>
      </div>
    </dialog-cpn>
    <!--提示信息-->
    <tips-cpn v-if="noDeleteFlag" title="温馨提示" btn="知道了" @submit="handleClose" @close="handleClose">
      <template>
        <div class="tc">您的类目数量过少，不能再删除了。</div>
      </template>
    </tips-cpn>
  </div>
</template>

<script>
import { categorys } from "../../api/store-flow";
import { unpaidList, marginOrder } from "~/api/bond";
import TipsCpn from "~/components/TipsCpn";
import DialogCpn from "~/components/DialogCpn";
import dataEventTrack from "@/utils/dataEventTrack";

export default {
  name: "payment-container",
  components: { TipsCpn, DialogCpn },
  data() {
    return {
      noDeleteFlag: false,
      dialogFlag: false,
      value: "",
      selectAll: [],
      selectIndex1: 0,
      selectIndex2: 0,
      selectIndex3: 0,
      selectCate: 1, // 1 一级 2 二级 3 三级
      cateName: "",
      skillNum: 0,
      orderSn: "",
      list: [],
      totalPrice: 0,
      payLoading: false
    };
  },
  created() {
    this.unpaidListHttp();
  },
  mounted() {
    dataEventTrack({
      referer: document.referrer,
      event_type: "page_show",
      kv: {
        router: "/store/payment"
      }
    });
  },
  methods: {
    handleDelete1(index) {
      this.dialogFlag = true;
      this.selectIndex1 = index;
      this.cateName = this.list[index].cate_name;
      this.selectCate = 1;
    },
    handleDelete2(index, subIndex) {
      this.selectIndex1 = index;
      this.selectIndex2 = subIndex;
      this.selectIndex3 = -1;
      let data = this.list[index];
      if (data.children2.length === 1) {
        this.noDeleteFlag = true;
        return;
      } else {
        this.dialogFlag = true;
        this.selectCate = 2;
        this.cateName = data.children2[subIndex].cate_name;
      }
    },
    handleDelete3(index, subIndex) {
      this.selectIndex1 = index;
      this.selectIndex2 = -1;
      this.selectIndex3 = subIndex;
      let data = this.list[index];
      if (data.children3.length === 1) {
        //只有一个三级类型
        this.noDeleteFlag = true;
        return;
      } else {
        //有两个及两个以上
        this.selectCate = 3;
        this.dialogFlag = true;
        this.cateName = data.children3[subIndex].cate_name;
      }
    },
    handleSingle(val) {
      this.selectAll = this.list.every(item => item.checked === true);
      this.skillNum = this.list.filter(item => item.checked === true).length;
      this.totalPriceFun();
    },
    handleAllSelect(val) {
      this.list.map(item => (item.checked = val));
      this.skillNum = this.list.filter(item => item.checked === true).length;
      this.totalPriceFun();
    },
    totalPriceFun() {
      let num = this.list.reduce((prev, cur) => {
        if (cur.checked) {
          return prev - -cur.cat_money;
        }
        return prev;
      }, 0);
      this.totalPrice = Math.floor(num * 100) / 100;
    },
    toPay() {
      //去缴纳
      this.marginOrderHttp();
    },
    _handleSubmit() {
      this.deleteHttp();
    },
    handleClose() {
      this.noDeleteFlag = false;
      this.dialogFlag = false;
    },
    deleteFun() {
      let index = this.selectIndex1;
      if (this.selectCate === 1) {
        //一级
        let data = this.list;
        if (data.length === 1) {
          this.list = [];
        } else {
          this.list.splice(index, 1);
        }
      } else if (this.selectCate === 2) {
        //二级
        let data = this.list[index];
        let id = data.children2[this.selectIndex2].id;
        let children3 = [];
        for (let i = 0; i < data.children3.length; i++) {
          if (data.children3[i].pid !== id) {
            children3.push(data.children3[i]);
          }
        }
        data.children2.splice(this.selectIndex2, 1);
        data.children3 = children3;
        this.$set(this.list, index, data);
      } else {
        //三级
        let data = this.list[index];
        let pid = data.children3[this.selectIndex3].pid;
        data.children3.splice(this.selectIndex3, 1);
        let flag = data.children3.some(item => item.pid === pid);
        if (!flag) {
          //三级不存在相同的pid，删除二级的项
          for (let i = 0; i < data.children2.length; i++) {
            if (data.children2[i].id === pid) {
              data.children2.splice(i, 1);
              break;
            }
          }
        }
        this.$set(this.list, index, data);
      }
      this.totalPriceFun();
      this.handleClose();
    },

    unpaidListHttp() {
      unpaidList()
        .then(res => {
          let { code, message, data } = res.data;
          if (code === 200) {
            this.list = this.list.concat(data);
          } else {
            this.$message.error({ title: "错误提示", message: message });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    marginOrderHttp() {
      if (this.payLoading) {
        return;
      }
      let idArr = this.list
        .filter(item => item.checked === true)
        .map(item => item.id); //	是	array	多个缴纳类目id
      if (idArr.length === 0) {
        this.$message.error({ title: "提示", message: "请先选择类目" });
        return;
      }
      let params = {
        entered_skillId: idArr
      };
      this.payLoading = true;
      marginOrder(params)
        .then(res => {
          let { code, message, data } = res.data;
          if (code === 200) {
            this.orderSn = data.order_sn;
            this.$router.push(`/payment?order_sn=${data.order_sn}&type=4`);
          } else {
            this.$message.error({ title: "错误提示", message: message });
            this.payLoading = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
      dataEventTrack({
        referer: document.referrer,
        event_type: "click",
        kv: {
          router: "/store/payment",
          rname: "去缴纳",
          money: this.totalPrice,
          cate_id: idArr.toString(),
        }
      });
    },
    deleteHttp() {
      let item = this.list[this.selectIndex1],
        catId = 0;
      if (this.selectCate === 1) {
        catId = item.id;
      } else {
        let subIndex =
          this.selectCate === 2 ? this.selectIndex2 : this.selectIndex3;
        catId = item["children" + this.selectCate][subIndex].id;
      }
      let params = {
        id: item.id, //	是	int	当前入主技能id
        type: this.selectCate, //是	int	删除的为几级类目 1：一级类目 2：二级类目 3：三级类目
        cat_id: catId //	是	int	删除的类目id
      };
      categorys
        .delFn(params)
        .then(res => {
          let { code, message, data } = res.data;
          if (code === 200) {
            this.deleteFun();
          } else {
            this.$message.error({ title: "错误提示", message: message });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less">
@import "../../assets/css/store/payment-container.less";
</style>
