import {RouterMount,createRouter} from '@/plugin/uni-simple-router/uni-simple-router.js';
import {ACCESS_TOKEN} from '@/common/constant/constants.js'

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	routes: [...ROUTES]
});

const whiteList = ['/pages/login/index',
					'/pages/login/login',
					'/pages/module/visitor/visitorQr'
				] 

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
});
// 全局路由后置守卫
router.afterEach((to, from) => {
    console.log('跳转结束')
})

export {
	router,
	RouterMount
}