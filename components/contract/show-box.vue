<template>
    <div class="show-box-wrap">
        <div class="box1">
            <div class="top">
                <p>签署合同</p>
                <p>电子合同可以有效的保证网络交易的双方权益，减少甲乙双方带来的纠纷。</p>
                <i class="iconfont icon-guanbi" @click="closeBox"></i>
            </div>
            <div class="bottom">
                <button @click="startZmContract">发起凌天众媒官方合同</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "show-box",
        props: {
            test: {
                type: String
            }
        },
        methods: {
            startZmContract(){
                this.$emit("startZmContract")
            },
            closeBox() {
                this.$emit("closeBox")
            }
        }
    }
</script>

<style scoped lang="less">

.show-box-wrap{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    left: 0;
    top: 0;
    z-index: 4;
    display: flex;
    align-items: center;
    justify-content: center;
    .box1{
        .top{
            width:540px;
            height:87px;
            background:#F3262D;
            border-radius:10px 10px 0px 0px;
            padding: 20px;
            color: #fff;
            position: relative;
            p:nth-child(1) {
                font-size: 14px;
                padding-bottom: 15px;
            }
            p:nth-child(2){
                font-size: 12px;
            }
            i {
                font-size: 30px;
                position: absolute;
                right: 12px;
                top: 12px;
                cursor: pointer;
                z-index: 3;
            }
        }
        .bottom{
            display: flex;
            justify-content: center;
            align-items: center;
            width:540px;
            height:290px;
            background: #fff url("~assets/img/htbj.png") no-repeat 20px 20px;
            padding-left:330px;
            background-size: 310px 214px;
            border-radius:10px;
            border-top-right-radius: 0;
            border-top-left-radius: 0;
            button {
                width: 160px;
                height: 38px;
                background:#fff;
                border:1px solid #F3262D;
                border-radius: 5px;
                outline: none;
                color: #F3262D;
                cursor: pointer;
            }
        }
    }
    .box2{

    }
}
</style>
