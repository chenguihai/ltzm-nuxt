<template>
    <div class="cla-list">
        <strong>类目：</strong>
        <div class="cla_right user_select">
            <span class="cla_item" :class="{active: !nowCla}" @click="changeClass(undefined)">全部</span>
            <span class="cla_item" v-for="item in storeInfo.shop_category" :key="item.cat_id"
                  :class="{active: nowCla == item.cat_id}" @click="changeClass(item.cat_id)"
            >{{item.cat_name}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'shopClass',
        props: ['nowCla'],
        data() {
            const {id = 0} = this.$route.params;
            return {
                storeId: id,
            }
        },
        computed: {
            storeInfo() {
                return this.$store.state.storeInfo
            }
        },
        methods: {
            changeClass(type) {
                this.$emit('change', type);
            }
        }
    };
</script>

<style scoped lang="less">
    .cla-list {
        display: flex;
        border: 1px solid #ddd;
        padding: 10px 20px;
        font-size: 12px;

        strong {
            color: #333;
            margin-right: 30px;
            width: 40px;
            line-height: 30px;
        }
    }

    .cla_right {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        line-height: 30px;
    }

    .cla_item {
        margin-right: 25px;
        color: #666;
        cursor: pointer;

        &:hover, &.active {
            color: #f3262d;
        }
    }

</style>
