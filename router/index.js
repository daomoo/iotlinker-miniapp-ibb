import modules from './modules'
import Vue from 'vue'
import Router from 'uni-simple-router'
import {USER_PROFILE} from '@/common/constant/constants.js'

Vue.use(Router)
//初始化´‰´
const router = new Router({
	// encodeURI:true,  
    routes: [...modules]//路由表
});

const whiteList = ['/pages/login/index','/pages/login/login'] 
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	let token=uni.getStorageSync(ACCESS_TOKEN);
	if(token){
		 next()
	}else{
	if (whiteList.indexOf(to.path) !== -1) {
		  next()
	 	}else{
	 	  next({ path: '/pages/login/index'})
	 	}
	 } 
})
// 全局路由后置守卫
router.afterEach((to, from) => {
	console.log("afterEach")
})
export default router;