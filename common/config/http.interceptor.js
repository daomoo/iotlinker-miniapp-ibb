// common/http.interceptor.js
import md5Libs from "plugin/uview-ui/libs/function/md5";
import conf from "@/common/config/config.js";
import apiUrl from '@/common/constant/apiUrlv2.js'

// 这里的Vue为Vue对象(非创建出来的实例)，vm为main.js中“Vue.use(httpInterceptor, app)”这一句的第二个参数，
// 为一个Vue的实例，也即每个页面的"this"
// 如果需要了解这个install方法是什么，请移步：https://uviewui.com/components/vueUse.html

/**
 * 获取http 请求 mac加密信息
 * @param data 请求data数据信息
 * @returns {*}
 */
function getMAC(params = {}) {


	//由data参数+botler#bao@BanW@.Boss+dataTime+1$0%0 MD5加密而成的32位16进制的小写字符串
	// let str = params.data + '*Ke7p~y{SX~9ZZw]Aku+' + params.dateTime + '1$1%2'
	let str = params.data + conf.MAC_KEY + params.dateTime + conf.MAC_VERSION
	let mac = md5Libs.md5(str)

	return mac.toLowerCase()
}

// {"buildTime":"202005131002",
// "localTime":"2020-09-17 20:07:55",
// "deviceVersion":"13.7",
// "networkType":"",
// "deviceType":"iOS",
// "location":"",
// "deviceName":"iPhone12,1",
// "appName":"爱包办",
// "IPAddress":"10.187.45.83",
// "userToken":"247b58dd77a942da9c411737bfbf72a21600042579470",
// "appVersion":"1.4.6",
// "deviceID":"7ED11F80-6D14-4904-90C7-54E00E45B01B",
// "status":"refreshToken","loginID":""}


//    000000000操作成功
//    100100001网络连接失败
//    100100002请求参数有误
//    100100003平台报文校验错误
//    100100004未知错误
//    100100005用户密码或账号错误
//    100100006短信验证码已经失效请重新发送
//    100100007短信验证码匹配错误


const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig({

		// baseUrl: 'https://app.dev.ibaoban.com', // 请求的本域名
		baseUrl: conf.baseUrl, // 请求的本域名

		// method: 'POST',
		// 设置为json，返回后会对数据进行一次JSON.parse()
		dataType: 'json',
		showLoading: true, // 是否显示请求中的loading
		loadingText: '请稍等...', // 请求loading中的文字提示
		loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
		originalData: true, // 是否在拦截器中返回服务端的原始数据
		loadingMask: false, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
		// 配置请求头信息
		header: {
			'content-type': 'application/json;charset=UTF-8',
			// 'Access-Control-Allow-Origin':'*'
		},
	});

	// 请求拦截部分，如配置，每次请求前都会执行
	Vue.prototype.$u.http.interceptor.request = (config) => {

		if (!(config.url === apiUrl.userLogin ||
				config.url.startsWith('/sendCode/') ||
				config.url == '/common/upload')) {
			if (checkAccessToken) {

				config.header.Authorization = vm.g_accessToken.token
			}

		}

		// console.log(config)

		// 引用token
		// 方式一，存放在vuex的token，假设使用了uView封装的vuex方式
		// 见：https://uviewui.com/components/globalVariable.html
		// 可以对某个url进行特别处理，此url参数为this.$u.get(url)中的url值


		// 方式二，如果没有使用uView封装的vuex方法，那么需要使用$store.state获取
		// config.header.token = vm.$store.state.token;

		// 方式三，如果token放在了globalData，通过getApp().globalData获取
		// config.header.token = getApp().globalData.username;

		// 方式四，如果token放在了Storage本地存储中，拦截是每次请求都执行的
		// 所以哪怕您重新登录修改了Storage，下一次的请求将会是最新值
		// const token = uni.getStorageSync('token');
		// config.header.token = token;
		// config.data.token = 'llc';
		// let requestDateTime = new Date().getTime().toString()
		// config.data.dateTime = requestDateTime
		// config.data.mac= getMAC({data:config.data.data,dateTime:requestDateTime})
		// config.data.bbw_application_name = conf.appCodeName

		// 最后需要将config进行return
		return config;
		// 如果return一个false值，则会取消本次请求
		// if(config.url == '/user/rest') return false; // 取消某次请求
	}



	// 响应拦截，如配置，每次请求结束都会执行本方法

	Vue.prototype.$u.http.interceptor.response = async (res) => {

		const statusCode = res.data.code
		
		if (statusCode === 401 && checkAccessToken) {
			
				res.data.data =  await refreshToken(res)
		}
		
		if (statusCode == 200) {
			// res为服务端返回值，可能有code，result等字段
			// 这里对res.result进行返回，将会在this.$u.post(url).then(res => {})的then回调中的res的到
			// 如果配置了originalData为true，请留意这里的返回值
			

		}
		
		
		
		// if (statusCode == 201) {
		// 	// 假设201为token失效，这里跳转登录
		// 	vm.$u.toast('验证失败，请重新登录');
		// 	setTimeout(() => {
		// 		// 此为uView的方法，详见路由相关文档
		// 		vm.$u.route('/pages/login/index')
		// 	}, 1500)
		// 	return false;
		// } else {
		// 	// 如果返回false，则会调用Promise的reject回调，
		// 	// 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
		// 	return false;
		// }
		
		return res.data.data;
	}

	function checkAccessToken() {

		if (vm.g_accessToken && !(vm.$u.test.isEmpty(vm.g_accessToken.Token) && vm.$u.test.isEmpty(vm.g_accessToken.Code))) {
			return true;
		} else {
			//跳转到登录页进行登录
			uni.showToast({
				title: '检测到您未登录,2s后跳到登录页',
				icon: 'none',
				duration: 3000,
				success() {
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/login/index'
						})
					}, 2000)
				}
			})
			return false;
		}
	}

	async function refreshToken(response) {

		// console.log(response)

		let accessToken = await vm.$u.api.refreshToken({
			code: vm.g_userProfile.loginId,
			key: vm.g_accessToken.code,
		})
		await vm.$u.vuex('g_accessToken', accessToken)
		
		if (checkAccessToken) {
			// console.log(accessToken)
			// console.log(response.config)
			// response.config.header.Authorization = accessToken.token
			let res = await vm.$u.http.request(response.config)
			console.log(res)
			return res;
		}
	}
}

export default {
	install
}
