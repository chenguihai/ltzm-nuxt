<template>
    <div v-html ="apply">
        {{apply}}
    </div>
</template>
<script>
    export default {
        name:"applyText",
             data(){
                return {
                    apply:'12343'
                }
            },
           mounted(){
            console.log(this.$route)
                let form =  JSON.parse(localStorage.getItem("htmls"))
                this.apply = form;
                this.$nextTick(()=> {
                    document.forms[0].submit()
                })
                localStorage.removeItem("htmls");
            }
    }
</script>
<style lang="less" scoped>
</style>


