/**
 * data-noopacity:true，默认false,页面滚动时有透明度的过渡效果，特殊情况不需要此效果的可以设置为true
 */
import Vue from "vue";
import VueLazyLoad from 'vue-lazyload';



export default async (context) => {
    let hosts = context.store.state.envVariables.IMG_HOST
   //检测图片是否可以设置透明度为1，
//    const isCanSet = (item) =>{
//     var ele = item.el;
//     //图片距离页面顶部的距离
//     var top = ele&&ele.getBoundingClientRect().top;
//     //页面可视区域的高度
//     var windowHeight = window.innerHight;
//     //top + 10 已经进入了可视区域10像素
//     if(ele){
//     if(top + 10 < window.innerHeight){
//     //设置图片透明度
//       ele.style.opacity = 1
//         return true;
//     }else{
//         return false;
//     }
//   }
// };
// const onListenScroll = (src) =>{
//   window.addEventListener('scroll',function(){
//     isCanSet(src)
//   })
// }
  Vue.use(VueLazyLoad, {
    preLoad: 1.3,
    error: require('~/assets/img/userDataImg.png'),
    // loading: require('~/assets/img/userDataImg.png'),
    attempt: 1,
    observer: true,
    filter: {
        modifyUrl(listener, options) {
          // console.log(11111,listener.src)
            listener.src =  hosts+listener.src
            // console.log('hosts+listener.src',hosts+listener.src)
            // listener.el.style.transition = 'all 0.5s'
            // let { noopacity } =listener.el.dataset
            //如果当前img，noopacitfa为false并且透明度不是1才设置，否则不需要设置
            // if(!noopacity&&listener.el.style.opacity != 1){
            //   listener.el.style.opacity = 0.1
            // }
            // onListenScroll(listener)
            // isCanSet(listener)
        },
    }

    });
}