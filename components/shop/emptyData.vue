<template>
    <!-- text 文字内容 column 纵向模式 默认开启 -->
    <div class="empty-list" :class="{column:column}">
        <img src="~assets/img/pintouge.png">
        <slot><p>{{text}}</p></slot>
    </div>
</template>

<script>
    export default {
        name: 'emptyData',
        props: {
            text: {
                type: String,
                default: '暂无数据'
            },
            column: {
                type: Boolean,
                default: true
            }
        }
    };
</script>

<style scoped lang="less">
    .empty-list {
        width: 100%;
        height: 100%;
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            height: 100%;
            max-height: 100px;
            margin-right: 20px;
        }

        &.column {
            flex-direction: column;

            img {
                margin-bottom: 20px;
                margin-right: 0;
            }
        }

        p {
            color: #666;
        }
    }
</style>
