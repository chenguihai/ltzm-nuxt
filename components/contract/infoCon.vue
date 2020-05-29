<template>
  <div>
    <info-title :text="title"></info-title>
    <div class="con-box" v-if="article">
      <div class="con" v-html="article.con"></div>
      <div class="down-list" v-if="article.files && article.files.length > 0">
        <div class="download" v-for="(file, idx) in article.files" :key="idx" @click="DownLoadImg(envVars.IMG_HOST +file.url)">
           附件{{idx+1}}
        </div>
      </div>
    </div>
    <div class="con-box has-bor" v-for="(con, index) in conList" :key="con.id">
      <span class="check-status" :class="{checked:con.status === 1}">
        {{con.created_at | created_time}} 客服{{con.status | UIstatus}}
        <span>{{con.status === 2 ? `  未通过原因:${con.reason}` : ''}}</span>
      </span>
      <div class="con con-xq" v-html="con.require"></div>
      <div class="down-list" v-if="con.files.length > 0">
        <div class="download" v-for="(file, idx) in con.files" :key="idx" @click="DownLoadImg(envVars.IMG_HOST +file.url)">

          附件{{idx+1}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import infoTitle from './infoTitle'
import { downloadMixin } from '~/utils/common-mixins'
import moment from 'moment'
import { mapState } from "vuex";
const suppleStatusList = new Map([
  [0, '未审核'],
  [1, '审核通过'],
  [2, '审核未通过']
])
export default {
   computed: {
    ...mapState({ envVars: "envVariables"})
  },
  name: 'infoCon',
  props: ['title', 'conList', 'article'],
  components: { infoTitle },
  mixins: [downloadMixin()],
  filters: {
    UIstatus (status) {
      return suppleStatusList.get(status)
    },
    created_time (created_at) {
      return moment(created_at).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  methods:{
     DownLoadImg(url) {
      window.open(url, "top");
    }
  }
};
</script>

<style scoped lang="less">
.mgt16 {
  margin-top: 16px;
}
.con {
  padding: 10px 0;
  line-height: 28px;
  font-size: 14px;
  color: #666;
  max-width: 100%;
}
.con-xq{
  padding: 0;
}
.has-bor {
  border-bottom: 1px dashed #ddd;
  padding-bottom: 20px;
}
.download {
  color: #337eef;
  line-height: 12px;
  margin-right: 50px;
  cursor: pointer;
  display: inline-block;
  &:hover {
    text-decoration: underline;
  }
  &:last-child {
    margin-right: 0;
  }
  span {
    color: #757575;
  }
}

.check-status {
  &.checked {
    color: #28962c;
  }
  color: #f3262d;
  font-size: 12px;
  margin-top: 16px;
  display: inline-block;
  span{
    margin-left:10px;
  }
}
</style>
