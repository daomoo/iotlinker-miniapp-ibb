import Vue from 'vue'
import Vuex from 'vuex'
import utils from '@/common/utils.js'
Vue.use(Vuex)
Vue.use(utils)

let appInfo='ibaoban PMP system miniAPP- Savills'
let appVersion='v1.0'

let storageSaveData={
		faceIDUrl:{name:'faceIDUrl',data:{}} ,
		wxUserInfo:{name:'wxUserInfo',data:{}},
		userProfile:{name:'userProfile',data:{}},
		userInfo:{name:'userInfo',data:{}},
		accessToken:{name:'accessToken',data:{}},
	
	}


for (let i in storageSaveData) {
	
	// 尝试获取本地变量
	storageSaveData[i].data=uni.getStorageSync(storageSaveData[i].name)

}

try{
	
	
}catch(e){}

// // 需要永久存储，且下次APP启动需要取出的，在state中的变量名
// let saveStateKeys = ['vuex_userInfo', 'vuex_token'];



// 保存变量到本地存储中
const saveData = function(key, value){
	// 判断变量名是否在需要存储的数组中
	let storageKey= key.split('g_')[1]
	for(let i in storageSaveData) {
		//判断是否需要本地存储
		if (storageSaveData[i].name === storageKey){
			//储存到本地
			uni.setStorageSync(storageKey, value);
		}
	}
}


const store = new Vuex.Store({

	state: {
		//app定制默认项目ID
		// g_appProjectId:'1037217179193708544',
		
		//本地信息存储
		
		//用户登陆信息
		// g_userInfo: storageSaveData.userInfo.data ? storageSaveData.userInfo.data:{},
		//微信用户信息
		g_wxUserInfo: storageSaveData.wxUserInfo.data ? storageSaveData.wxUserInfo.data:{},
		//用户项目信息
		// g_projectList: storageSaveData.projectList.data ? storageSaveData.projectList.data:{},
		//用户配置信息(包含用户账户，用户密码，用户选定的项目，项目列表，用户组织列表)
		g_userProfile: storageSaveData.userProfile.data ? storageSaveData.userProfile.data:{},
		
		//用户信息
		g_userInfo: storageSaveData.userInfo.data ? storageSaveData.userInfo.data:{},
	
		//用户选定项目信息
		// g_project: storageSaveData.project.data ? storageSaveData.project.data:{},
		
		//用户头像
		g_faceIDUrl: storageSaveData.faceIDUrl.data ? storageSaveData.faceIDUrl.data:"",
		
		//访问token
		g_accessToken: storageSaveData.accessToken.data ? storageSaveData.accessToken.data:"",
		
		
	},
	
	actions:{
		
	},
	mutations: {
		$uStore(state, payload) {
			
			// console.log(payload.value)
			// console.log (state)
			
			let saveKey = '';
			state[payload.name] = payload.value;
			saveKey = payload.name
			// 保存变量到本地，见顶部函数定义
			saveData(saveKey, state[saveKey])
			
		}
	}
})

export default store