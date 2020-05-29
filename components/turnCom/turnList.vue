<template>
    <div class="turn-list" v-if="emptyCheck ? (emptyCheck && eachData.length > 0) : !emptyCheck">
        <slot name="title"></slot>
        <div class="list-con" v-if="eachData.length > 0">
            <turnItem :item-data="item" v-for="item in eachData" :key="item.id" :setImgSize="setImgSize"></turnItem>
        </div>
        <div class="dataNonea" v-else>
            <img width="116" src="~assets/img/pintouge.png" alt="暂无数据" class="mr_10"/><span>暂无数据</span>
        </div>
        <div class="pages" v-if="showPage && eachData.length > 0">
            <el-pagination :total="total" @current-change="pageChange" :current-page="nowPage" :page-size="pageSize"
                           layout="prev, pager, next, jumper" prev-text="上一页" next-text="下一页">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import turnItem from './turnItem'
    import {getTurnList, searchTurnTime} from '@/api/turn-time'
    import {pageMixin} from '@/utils/common-mixins'

    export default {
        name: 'turnList',
        components: {turnItem},
        mixins: [pageMixin('finalData')],
        props: {
            isVideo: {
                type: Boolean,
                default: true
            },
            isLike: {
                type: Boolean,
                default: false
            },
            chooseData: {
                type: [Object, Array],
                default: () => []
            },
            isNew: {
                // 最新动态
                type: Boolean,
                default: false
            },
            showPage: {
                // 显示页码
                type: Boolean,
                default: false
            },
            emptyCheck: {
                // 空检测
                type: Boolean,
                default: false
            },
            setImgSize:{type:String,default:'h_162,w_270'},
            listName: '',
            keywords: '',
        },
        data() {
            return {
                nowListType: 1,
                localData: null
            };
        },
        provide() {
            return {
                xTurnList: this
            };
        },
        inject: {
            indexData: {
                default: null
            },
            nowPath: {
                default: ''
            }
        },
        computed: {
            listData() {
                if (!this.indexData || !this.listName) return []
                return this.listName.split(';').reduce((pre, cur) => pre[cur], this.indexData)
            },
            searchSub() {
                return {
                    keyword: this.keywords,
                    chooseData: this.chooseData
                }
            },
            finalData() {
                return this.localData || this.listData
            },
            eachData() {
                return (this.isNew || this.showPage) ? this.finalData.data : this.finalData
            }
        },
        created() {
            this.init()
        },
        mounted() {
        },
        watch: {
            nowListType(val) {
                this.pageChange(this.nowPage)
            },
            searchSub(val) {
                this.nowPage = 1
                this.pageChange(this.nowPage)
            }
        },
        methods: {
            init() {
                this.$on("handleChange", value => this.nowListType = value)
            },
            async pageChange(cur) {
                switch (this.nowPath) {
                    case 'video':
                        this.typeChangeV(cur)
                        break
                    case 'img':
                        this.typeChangeV(cur)
                        break
                    default:
                        this.typeChange()
                }
            },
            async typeChange() {
                // created_at 最新投稿, updated_at 最新动态
                let opts = {
                    type: this.isVideo ? 2 : 1,
                    newest: this.nowListType === 1 ? 'created_at' : 'updated_at'
                }
                const res = await getTurnList(opts)
                if (!res) return
                const {data=[]} = res.data;
                this.localData = data
            },
            async typeChangeV(page) {
                let jmt_ids = this.chooseData.find(d => d.typeId === 1)
                let realm_ids = this.chooseData.find(d => d.typeId === 2)
                let city_ids = this.chooseData.find(d => d.typeId === 3)
                let searTime = this.chooseData.find(d => d.typeId === 4)
                jmt_ids = jmt_ids ? jmt_ids.id : ''
                realm_ids = realm_ids ? realm_ids.id : ''
                city_ids = city_ids ? city_ids.id : ''
                searTime = searTime ? searTime.con.split('至') : []
                let opts = {
                    type: this.isVideo ? 2 : 1,
                    keyword: this.keywords,
                    jmt_ids,
                    realm_ids,
                    city_ids,
                    start: searTime[0],
                    end: searTime[1],
                    page,
                }
                switch (this.nowListType) {
                    case 3:
                        opts.order = 'down_num'
                        break
                    case 2:
                        opts.order = this.isVideo ? 'play_num' : 'view_num'
                        break
                    default:
                        opts.order = this.isNew ? 'updated_at' : 'created_at'
                        break
                }
                const res = await searchTurnTime(opts)
                if (!res) return
                const {data} = res.data;
                if (this.isNew && data.length <= 0 && page !== 1) return this.$message.error('暂时没有更多数据哦')
                this.localData = data || [];
            }
        },
    };
</script>

<style scoped lang="scss">
    .turn-list {
        flex: 1;
        overflow: hidden;
    }

    .list-con {
        display: flex;
        flex-wrap: wrap;
        width: 105%;
    }

    .dataNonea {
        width: 100%;
        height: 276px;
        margin-top: 50px;
        display: -webkit-box !important;
        display: flex !important;
        -webkit-box-pack: center !important;
        justify-content: center !important;
        -webkit-box-align: center !important;
        align-items: center !important;
    }

    .pages {
        width: 100%;
        display: flex;
        padding-top: 30px;
        justify-content: flex-end;
        align-items: center;
    }
</style>
