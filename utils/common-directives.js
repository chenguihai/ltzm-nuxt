import Vue from 'vue'
import { _checkStringVal } from './tool'
import config  from "@/config/index";
const {IMG_HOST} = config;
export const imgHost = {
	bind: function(el) {
		const {src,url=''} =el.dataset;
		if (el.dataset && _checkStringVal(src)) {
			if(url){
				el.src = `${IMG_HOST}${src}?x-oss-process=image/resize,${url}`
			}else{
				el.src = `${IMG_HOST}${src}`
			}
		}
	},
	update: function(el) {
		const {src,url=''} =el.dataset;
		if (el.dataset && _checkStringVal(src)) {
			if(url){
				el.src = `${IMG_HOST}${src}?x-oss-process=image/resize,${url}`
			}else{
				el.src = `${IMG_HOST}${src}`
			}
		}
	}
}
// Vue.directive('imgHost', imgHost)
