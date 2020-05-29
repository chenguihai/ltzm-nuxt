<template>
    <div class="sort-btn" :class="{active}"><span>{{text}}</span><i v-if="text!== '综合'" class="sort_icon iconfont"
                                                                    :class="!active ? `icon-${iconDown}` : nowSort ? `icon-${iconUp}` : `icon-${iconDown}`"></i>
    </div>
</template>

<script>
    /**
     * @Description: 排序规则按钮
     * @param {
     * 'text' 按钮文字,
     * 'iconUp' 上标,
     * 'iconDown' 下标,
     * 'nowSort' 当前规则,
     * 'active' 是否激活
     * }
     * @return:
     * @Date: 2019-10-28 09:48:40
     * @LastEditors: Eve
     * @LastEditTime: Do not edit
     */
    export default {
        name: 'sortBtn',
        props: {
            text: {
                type: String,
                default: '综合'
            },
            iconUp: {
                type: String,
                default: 'pingfenxiangshang'
            },
            iconDown: {
                type: String,
                default: 'pingfenxiangxia'
            },
            nowSort: {
                type: Boolean,
                default: true
            },
            active: {
                type: Boolean,
                default: false
            }
        }
    };
</script>

<style scoped lang="less">
    .sort-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        padding: 0 20px;
        color: #333;

        span {
            font-size: 12px;
            color: #333;
            line-height: 38px;
        }

        .sort_icon {
            color: #cecece;
            width: 16px;
            -webkit-transform: scale(0.6);
            -moz-transform: scale(0.6);
            -o-transform: scale(0.6);
            transform: scale(0.6);
            margin-top: 1px;
        }

        &.active, &:hover {
            span, i {
                color: #f3262d;
            }

            background: #fff;
        }
    }
</style>
