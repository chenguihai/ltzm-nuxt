<template>
  <div class="regulation_us">
    <!-- 规则中心 -->
    <aboutUs />
    <div class="regulation_content">
      <div class="regulation_content_left">
        <ul>
          <li
            class="Tab"
           
            v-for="(item,id) in tabArr"
            :key="id"
             :class="{active:item.id ==selectIndex}"
            @click="tabActive(item,id,item.id)"
          >
            <div>
              <p>{{item.name}}</p>
              <span class="iconfont icon-xiangyoudianji"></span>
            </div>
          </li>
        </ul>
        <div class="content" v-if="flag">
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
          <div class="conNews" v-if="usNews.length >0">
            <div
              class="List"
              v-for="(itemN , index) in usNews"
              :key="index"
              @click="usNewsList(itemN , index , itemN.id)"
            >
              <span style="color:#333">{{itemN.title}}</span>
              <span style="color:#666">{{itemN.created_at}}</span>
            </div>
          </div>
          <div class="conNews" v-else>
            <div class="OitemNone">
              <div>
                <img src="../../../assets/img/pintouge.png" alt />
                <span>暂无查到相关数据</span>
              </div>
            </div>
          </div>
          <div class="block" id="block" v-if="totalFlag">
            <div class="sbm">确定</div>
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
          </div>
          <div class="clear"></div>
        </div>
        <div class="content text" v-if="flage">
          <span>{{text.title}}</span>
          <div>
            <span  v-html="text.content"></span>
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
import { ruleCentre, ruleCentreList, ruleCentreDetail } from "@/api/list";

export default {
  components: {
    comHeader,
    aboutUs,
    comFooter,
    sideBar
  },
  data() {
    return {
      flag: false,
      flage: true,
      selectIndex: this.$route.query.idO||0,
      totalFlag: false,
      id: "",
      page: 1,
      total: 0,
      pageSize: 0,
      text: "",
      formInline: { user: "" },
      usNews: "",
      ids:'',
      tabArr: [],
      idO:'',
      idT:'',
    };
  },
  mounted() {
    this.init();
    if(this.$route.query.type ==1){
      this.selectIndex = 1
      this.ids = 1
       this.dataList();
      this.dataXY()
    }else if(this.$route.query.type ==2){
      this.selectIndex = 0
      this.ids = 2
      this.dataXY()
    }else if(this.$route.query.type ==3){
      this.selectIndex = 1
      this.ids = 5
      this.dataXY()
    }else if(this.$route.query.type ==4){
       this.selectIndex = 1
      this.ids = 3
      this.dataXY()
    }else if(this.$route.query.id =='19'){
       this.selectIndex = 1
      this.ids = '62'
      this.dataXY()
    }else if(this.$route.query.idO && this.$route.query.idT){
       this.selectIndex = this.$route.query.idO
      this.ids =this.$route.query.idT
      this.dataXY()
    }

  },
  methods: {
    init() {
      // 导航列表请求
      ruleCentre()
        .then(res => {
          if (res.status == 200) {
            this.tabArr = res.data.nav;
            this.usNews = res.data.default.data;
            this.total = res.data.default.total;
            this.pageSize = res.data.default.per_page;
            if (this.usNews.length > 1) {
              this.flag = true;
              this.flage = false;
              this.text = this.usNews[0];
            }
             if (this.total > 8) {
              this.totalFlag = true;
            }
            this.id = this.tabArr[0].id;
            if(!this.$route.query.idO && !this.$route.query.idT){
               this.selectIndex = this.id
            }
           
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //数据列表请求
    dataList() {
      var id = this.id;
      var page = this.page;
      var title = String(this.formInline.user);
      ruleCentreList(id, page, title)
        .then(res => {
          if (res.status == 200) {
            this.usNews = res.data.data;
            
            if (this.usNews.length > 1) {
              this.flag = true;
              this.flage = false;
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
      this.dataList();
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    // 分页搜索
    handleCurrentChange(val) {
      this.page = val;
      this.dataList();
    },
    //规则中心导航切换
    tabActive(item, id) {
      this.totalFlag = false;
      this.selectIndex = item.id;
      this.id = item.id;
      this.flag = true;
      this.flage = false;
      this.dataList();
    
    },
    //列表数据展示
    usNewsList(itemN, index, id) {
      this.ids = itemN.id;
       var { href } = this.$router.resolve({
        path: "/aboutUs/regulation/regulation",
        query: { idO: this.id ,idT:this.ids }
      });
      window.open(href, "_blank");
    },
    dataXY(){
      var id = this.ids
       ruleCentreDetail(id)
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
    }
  }
};
</script>

<style lang="less" scoped>
@import "regulationScode.less";
</style>


<style lang="less" >
.regulation_us {
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
    margin: 25px 0 !important;
    .el-input__inner {
      height: 28px;
    }
  }
  #block {
    width: 100%;
    float: right;
    margin: 25px 0 !important;
    .el-input__inner {
      height: 28px;
    }
    .is-background {
      float: right;
      border-bottom: 0;
    }

    .sbm {
      float: right;
      border: 1px solid #d1d1d1;
      width: 50px;
      height: 30px;
      text-align: center;
      cursor: pointer;
      font-size: 14px;
      line-height: 28px;
      color: #333;
      justify-content: center;
    }

    .el-input__inner {
      height: 28xp !important;
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
</style>



