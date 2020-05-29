
<template>
  <div class="helpCenter_us">
    <!-- 帮助中心 -->
    <aboutUs />
    <div class="helpCenter_content">
      <div class="helpCenter_content_left">
        <div class="about_sidebar user_select">
          <el-menu
            :unique-opened="true"
            :default-active="indexX"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"

          >
            <el-submenu v-for="(item,index) in tabArr" :key="index" :index="'1-'+index+1">
              <template slot="title" style="padding-left:23px">
                <span>{{item.name}}</span>
              </template>
              <el-menu-item
                v-for="(items,i) in item.children"
                :key="i"
                :index="items.id.toString()"
                @click="tabActive(items,i)"
              >
                {{items.name}}
                <i class="el-icon-arrow-right"></i>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
        <div class="contents" v-if="flag && usNews != null">
          <el-form :inline="true" :model="formInline" class="demo-form-inline time_user">
            <el-form-item class="submit">
              <el-button type="primary" @click="onSubmit">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-sousuo" class="ccccc" />
                </svg>
              </el-button>
            </el-form-item>
            <el-form-item class="user_bot formInline_user">
              <el-input v-model="formInline.user" placeholder="关键字"></el-input>
            </el-form-item>
          </el-form>
          <ul v-if="usNews.length > 0" class="text_lis">
            <li
              v-for="(Oitem , index) in usNews"
              :key="index"
              @click="textActive(Oitem,index ,Oitem.id)"
            >
              <span >
                {{Oitem.title}}
              </span>
              <span >{{Oitem.created_at}}</span>
            </li>
          </ul>
          <div class="OitemNone" v-else>
            <div>
              <img src="@/assets/img/pintouge.png" alt />
              <span>暂无查到相关数据</span>
            </div>
          </div>
          <div class="block" id="block" v-if="totalFlag">
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
            ></el-pagination>
            <div class="sbm">确定</div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="content_boxs text" v-if="flage">
          <p class="title_boxs">{{text.title}}</p>
          <div>
            <span v-html="text.content"></span>
          </div>
        </div>
      </div>
    </div>
    <comFooter />
    <side-bar ref="sideBar"></side-bar>
  </div>
</template>
<script>
import comHeader from "@/components/component/comHeader";
import aboutUs from "@/components/component/aboutUs";
import sideBar from "@/components/sideBar";
import comFooter from "@/components/component/comFooter";
import { helpCentre, helpCentreList, helpCentreDetail } from "@/api/list";

export default {
    head() {
    return {
      title: "凌天众媒网帮助中心",
      meta: [
        {
          hid: "description",
          name: "description",
          content:" 凌天众媒网平台帮助文档"
        },
        {
          hid: "keywords",
          name: "keywords",
          content: "雇主帮助中心，广告主帮助中心，凌天众媒网帮助文档"
        }
      ]
    };
  },
  components: {
    comHeader,
    aboutUs,
    comFooter,
    sideBar
  },
   async asyncData(app) {
    let queryId =  app.query.id,queryOid = app.query.Oid;
    let indexX = "",id = "",Oid='',flag= true,flage= false,totalFlag= false,page= 1,total= 0,pageSize= 0,text= "",formInline= { user: "" },usNews= null,tabArr= [],itemsId='',itemsX='';
    if (!queryId) {
      indexX = "22";
      id = "22";
    } else {
      if (queryId) {
        if (queryId == "49") {
          indexX = queryId;
          id = queryId;
          Oid = "136";
        }
        if (queryId == "35"&&!queryOid) {
          indexX = queryId;
          id = queryId;
          Oid = "12";
        } else if(queryId&&queryOid) {
           indexX = queryId;
           id = queryId;
           Oid=queryOid
        }else if(queryId=='32'&&!queryOid){
          indexX = queryId;
          id = queryId;
        }else {
          indexX = queryId;
          id = queryId;
           Oid=queryOid||''
           }
      }
      if(Oid){
      let detlRes =await helpCentreDetail(Oid)
          if (detlRes.status == 200) {
            flag = false;
            flage = true;
            text = detlRes.data;
          }
      }
    }
     // 导航列表请求
         let res = await helpCentre()
          if (res.status == 200) {
            tabArr = res.data.nav;
            usNews = res.data.default.data||[];
            total = res.data.default.total;
            pageSize = res.data.default.per_page;
            page = res.data.default.current_page;
            if (usNews.length == 1) {
              flag = false;
              flage = true;
              text = usNews[0];
            }
            if (total > 8) {
              totalFlag = true;
            }
          }
        let titles = String(formInline.user);
       let listRes = await helpCentreList(id, page, titles)
          if (listRes.status == 200) {
            usNews = listRes.data.data||[];
            if (usNews.length == 1) {
              flag = false;
              flage = true;
              text = usNews[0];
            }
            total = listRes.data.total;
            if (total > 8) {
              totalFlag = true;
            }
          }
    return {
      indexX,id,Oid,flag,flage,totalFlag,page,total,pageSize,text,formInline,usNews,tabArr,itemsId,itemsX
    };
   },
  data() {
    return {
      flag: true,
      flage: false,
      totalFlag: false,
      id: "",
      page: 1,
      total: 0,
      pageSize: 0,
      text: "",
      formInline: { user: "" },
      usNews: null,
      tabArr: [],
      Oid: "",
      indexX: "",
      itemsId:'',
      itemsX:'',
    };
  },
  mounted() {
  },
  methods: {
    init() {
      // 导航列表请求
      helpCentre()
        .then(res => {
          if (res.status == 200) {
            this.tabArr = res.data.nav;
            this.usNews = res.data.default.data||[];
            this.total = res.data.default.total;
            this.pageSize = res.data.default.per_page;
            this.page = res.data.default.current_page;
            if (this.usNews.length == 1) {
              this.flag = false;
              this.flage = true;
              this.text = this.usNews[0];
            }
            if (this.total > 8) {
              this.totalFlag = true;
            }

          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    helpCen() {
      var id = this.id;
      var page = this.page;
      var title = String(this.formInline.user);
      helpCentreList(id, page, title)
        .then(res => {
          if (res.status == 200) {
            this.usNews = res.data.data||[];
            if (this.usNews.length == 1) {
              this.flag = false;
              this.flage = true;
              this.text = this.usNews[0];
            }
            this.total = res.data.total;
            if (this.total > 8) {
              this.totalFlag = true;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSubmit(formName) {
      this.helpCen();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.helpCen();
    },
    //规则中心导航切换
    tabActive(items, i) {
      this.formInline.user = "";
      this.totalFlag = false;
      this.itemsId = items.id.toString();
      this.flag = true;
      this.flage = false;
      this.itemsX = items.id.toString();
      this.indexX =this.itemsId
       this.id = this.itemsX
      this.helpCen();
            let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 实现滚动效果
      const timeTop = setInterval(() => {
          document.body.scrollTop = document.documentElement.scrollTop = top = 0;
          if (top <= 0) {
              clearInterval(timeTop);
          }
      }, 10);

    },
    //列表数据展示
    textActive(Oitem, index, id) {
      this.Oid = Oitem.id;
      this.indexX =this.itemsId|| "22";
      this.id = this.itemsX||"22";
      var { href } = this.$router.resolve({
        path: "/help",
        query: { id: this.id ,Oid:this.Oid }
      });
      window.open(href, "_blank");
    },
    textData() {
      var id = this.Oid;
      helpCentreDetail(id)
        .then(res => {
          if (res.status == 200) {
            this.flag = false;
            this.flage = true;
            this.text = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleOpen(key, keyPath) {
      this.keyPath = ["1-11"];
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  }
};
</script>

<style lang="less">
@import "helpCenterScode.less";
</style>
<style lang="less" >
.helpCenter_us {
  .time_user {

    .el-form-item {
      float: right;
      margin: 0px;
      .el-input__inner {
        width: 182px;
        height: 38px;
        border-radius: 0;
      }
    }
  }
  #block {
    display: flex;
    justify-content: flex-end;
    width: 85%;
    float: right;
    padding: 20px 0;
    .sbm {
      float: right;
      border: 1px solid #d1d1d1;
      width: 50px;
      height: 30px;
      cursor: pointer;
      font-size: 14px;
      line-height: 28px;
      color: #333;
      text-align: center;
    }
     .sbm:hover{
       color: #fff;
       background: #f3262d;
         border: 1px solid #f3262d;
     }
    .btn-prev,
    .btn-next {
      width: 70px;
      height: 30px;
      background: #fff;
      border: 1px solid #d1d1d1;
    }
    .el-pager {
      .number {
        background: #fff;
        border: 1px solid #d1d1d1;
      }
      .number:hover {
        color: #fff;
        background: #f3262d;
        border: 0;
      }
      .active {
        color: #f3262d;
        background: #fff;
        border: 0;
      }
    }
    .el-pagination__jump {
      margin-left: 10px;
    }
  }

  .submit {
    .el-button {
      background: #ececec !important;
      border: 0;
      height: 38px;
      line-height: 12px;
      border-radius: 0;
      padding: 8px 10px;
      margin-top: 1px;

      .icon {
        width: 19px;
        height: 19px;
      }
    }

    .el-button--primary:hover {
      background: #eeeeee;
    }
  }
  .el-input__inner:focus,
  .el-range-editor.is-active {
    border: 1px solid #5da6ff;
    outline: 0;
    box-shadow: 0px 0px 4px #5da6ff;
  }
}
.el-menu-item{
  display: flex;
  justify-content: space-between;
  color: #333;

}
.el-menu-item:hover,.el-icon-arrow-right:hover{
  color: #f3262d;
}
</style>



