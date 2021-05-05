// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
//智慧壹码通 接口
import md5Libs from "plugin/uview-ui/libs/function/md5";
import CryptoJS from '@/libs/crypto-js.js'
import qrCode from'@/libs/weapp-qrcode.js'
import apiUrl from'@/common/constant/apiUrlv2.js'
import uQRCode from'@/libs/uqrcode.js'
import {ServiceMenus} from '@/common/constant/menu.js'

if (process.env.NODE_ENV == 'development') {
	//本地环境 development
} else {
	//线上环境 production
}


var crypTo = {

	data: {
		'key': 'XjqGtmIAhkP8', //加密秘钥
		'iv': 'y6RjUTGEI9ew' //偏移量 
	},

	/*** 加密  */
	AES_encrypt: function(message) {
		const keyHex = CryptoJS.enc.Utf8.parse(this.data.key);
		const encrypted = CryptoJS.AES.encrypt(message, keyHex, {
			iv: CryptoJS.enc.Utf8.parse(this.data.iv),
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		});
		return encrypted.toString();
	},

	/*** 解密 */
	AES_decrypt: function(ciphertext) {
		const keyHex = CryptoJS.enc.Utf8.parse(this.data.key);
		// direct decrypt ciphertext  
		const decrypted = CryptoJS.AES.decrypt({
			ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
		}, keyHex, {
			iv: CryptoJS.enc.Utf8.parse(this.data.iv),
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		});
		return decrypted.toString(CryptoJS.enc.Utf8);
	},
};


//图片转base64
const toBase64 = (url,rallback) =>{  
    uni.downloadFile({  
        url: url,  
        success(res) {  
            plus.io.resolveLocalFileSystemURL(res.tempFilePath, function(entry) {  
                entry.file(function(e) {  
                    let fileReader = new plus.io.FileReader();  
                    fileReader.onload = function(r){  
                        rallback(r.target.result)  
                    }  
                    fileReader.readAsDataURL(e)  
                })  
            })  
        }  
    })  
}

//获取qrmenu菜单
const getQrMenus = (qrmenuId,serviceMenus) =>{
	
	let qrMenus= []
	qrmenuId.forEach(function(item){
		
		if (serviceMenus.has(item.code)) {
			
			qrMenus.push(serviceMenus.get(item.code));
			
		}
			
	})
	
	return qrMenus
	
}


var install = (Vue, vm) => {


	/**
	 * 账户登陆接口
	 * @param phone 			登陆手机号
	 * @param password 			明文登陆密码
	 * @returns {token} 		accessToken
	 */
	async function login(params = {}) {
		
		
		console.log(params)
		//返回token
		return await vm.$u.post(apiUrl.userLogin,
		{
			username: params.mobilephone,
			password: params.password,
			
		}).then(res => {
			
			console.log(res)
			//登陆用户信息
			let accessToken = {}
			accessToken.code = crypTo.AES_encrypt(params.password)
			accessToken.token = res.accessToken
			//用户项目列表
			//project 设为 string
			// let tmp = JSON.stringify(res.project).replace(/\\\"projectID\\\":(\d+)/g, '\\"projectID\\":\\"$1\\"')
			// let projectList = JSON.parse(JSON.parse(tmp))
			// // let qrMenus = getQrMenus(JSON.parse(res.qrMenus),ServiceMenus)
			// let qrMenus = JSON.parse(res.qrMenus)
			// qrMenus = getQrMenus(qrMenus,ServiceMenus)
			
			// res.projectList = projectList
			// res.qrMenus = qrMenus
			// if (!res.avatarUrl){
			// 	res.avatarUrl = res.headPath
			// }
			return accessToken

		})

		// userInfo.orgList = await getOrgList({
		// 	accountId:userInfo.accountId
		// })

	}
	
	
	/**
	 * 账户登陆接口
	 * @param code 		登陆code
	 * @param key 		AES加密MD5登陆密码
	 * @returns {userInfo} 		用户账户信息
	 */
	async function refreshToken(params = {}) {
		
		
		//返回用户配置信息
		params.password = crypTo.AES_decrypt(params.key)
		return await vm.$u.post(apiUrl.userLogin,
		{
			username: params.code,
			password: params.password,
			
		}).then(res => {
			
			//登陆用户信息
			let accessToken = {}
			accessToken.code = crypTo.AES_encrypt(params.password)
			accessToken.token = res.accessToken
			return accessToken
			
			})
	}
	
	/**
	 *  生成二维码图片
	 * @param    String
	 * @returns {二维码图片}
	 */
	async function qrcodeImage(params = {}){
		
		// console.log(params.stringCode)
	
		let qrcode
		
		qrcode = qrCode.drawImg(params.stringCode, {
			typeNumber: 4,
			errorCorrectLevel: 'M',
			size: 500
		})
		
		// console.log(qrcode)
		return qrcode
		
	}
	
	/**
	 * 获取用户通行二维码
	 * @param accountId 用户ID账号
	 * @returns {*}
	 */
	async function getPassQrcode() {
		
		// params.qrId = params.qrId || vm.g_userProfile.qrId
		return await vm.$u.get(apiUrl.qrcode, 
			{
				id: vm.g_userProfile.qrId,
			})
			
	}
	/**
	 * 账户登陆接口
	 * @param phone 			登陆手机号
	 * @param smsCode 			登陆短信验证码
	 * @returns {userInfo} 		用户账户信息
	 */
	async function loginSmsCode (params = {}) {

		let requestUrl = apiUrl.userLoginBySmsCode
		let requestData = '{"phone":"' + params.phone + '","content":"' + params.smsCode + '"}'
		
		
		//返回用户配置信息	
		let userInfo = await vm.$u.post(requestUrl, {
			data: requestData,
		}).then(res => {

			//登陆用户信息
			res = JSON.parse(res.data)

			let pwd = crypTo.AES_encrypt(res.pwd)
			res = res.userInfo
			res.pwd = pwd
			
			//用户项目列表
			// project 设为 string
			let tmp = JSON.stringify(res.project).replace(/\\\"projectID\\\":(\d+)/g, '\\"projectID\\":\\"$1\\"')
			let projectList = JSON.parse(JSON.parse(tmp))
			res.projectList = projectList
			
			//用户默认头像
			res.avatarUrl = res.headPath
			return res

		})

		// userInfo.orgList = await getOrgList({
		// 	accountId:userInfo.accountId
		// })

		return userInfo;
	}
	
	/**
	 * 账户登陆接口
	 * @returns {userInfo} 		用户账户信息
	 */
	async function getUserInfo() {
		
		//返回用户配置信息
	
		return await vm.$u.get(apiUrl.userInfo)
		
		
	}
	
	/**
	 * 获取登陆帐号项目信息
	 * @returns {project} 	项目信息
	 */
	async function getProjectList() {
		
		//返回用户配置信息
		let res = await vm.$u.get(apiUrl.projectList)
		
		return res;
		
	}
	
	/**
	 * 获取组织信息
	 * @param accountId 用户accountId
	 * @param projectId 用户项目
	 * @returns {*}
	 */
	async function getOrgList(params = {}) {
		
		// params.orgId = params.orgId
		
	
		return await vm.$u.get(apiUrl.organization, 
		{
			id: params.orgId,
			
		})
	
	}
	
	
	/**
	 * 账户短信验证码接口
	 * @param accountId 		登陆手机号
	 * @param fileType 			(png)
	 * @param file				base64数据
	 * @returns {data}			验证码信息
	 * Version:					2020/12/9
	 */
	async function uploadUserAvatar (params = {}) {

		params.fileType= params.fileType || 'png'
		
		//获取验证码
		let requestUrl = apiUrl.userUploadAvater
		let requestData = '{"bussinessID":"' + params.accountId + '","fileType":"'+ params.fileType + '"}'
		//base64 文件
		let requestFile = params.file
		
		
		//返回用户配置信息	
		return await vm.$u.post(requestUrl, {
			data: requestData,
			fileBytes: requestFile,
		})
		// .then(res => {

		// 	//返回数据
		// 	res = JSON.parse(res.data)
		// 	return res

		// })

	}


	/**
	 * 账户短信验证码接口
	 * @param phone 			登陆手机号
	 * @param type 				(login)
	 * @returns {data}			验证码信息
	 * Version:					2020/12/9
	 */
	async function sendSmsCode (params = {}) {

		//获取验证码
		let requestUrl = apiUrl.userSendSms
		let requestData = '{"phone":"' + params.phone + '"}'
		let requestType = params.type
		
		//返回用户配置信息	
		return await vm.$u.get(requestUrl, {
			data: requestData,
			type: requestType,
		}).then(res => {

			//返回数据
			res = JSON.parse(res.data)
			return res

		})

	}


	/**
	 * 获取登陆用户选定项目信息
	 * @param accountId 	用户账号Id
	 * @param projectId 	项目对象
	 * @param projectName	项目名字
	 * @param orgId			组织Id
	 * @param orgName		组织名字
	 * @returns {*}
	 */
	async function project(params = {}) {

		params.accountId = params.accountId || vm.g_userProfile.accountId

		let orgList = await getOrgList({
			accountId: params.accountId,
			projectId: params.projectId
		})

		params.orgId = params.orgId ? params.orgId : orgList[0].orgId
		// params.org = params.orgId[1] || orgList[0].orgName
		params.orgName = params.orgName ? params.orgName : orgList[0].orgName

		let roomList = await getRoomList({
			orgId: params.orgId
		})

		let project = {}

		//项目组织信息
		project.orgList = orgList

		//默认项目信息
		project = {
			projectId: params.projectId,
			projectName: params.projectName,
			orgId: params.orgId,
			orgName: params.orgName,
			orgList: orgList,
			resourceId: roomList[0].resourceId,
			resourceName: roomList[0].resourceName,
			roomList: roomList,
		}
		return project

	}
	
	
	
	/**
	 * 获取组织信息
	 * @param accountId 用户accountId
	 * @param projectId 用户项目
	 * @returns {*}
	 */
	async function getOrgListbyAccountId(params = {}) {

		//console.log(params)

		let orgList = []
		let requestUrl = apiUrl.projectListByAccountId
		params.projectId = params.projectId || ''
		params.accountId = params.accountId || vm.g_userProfile.accountId
		

		return await vm.$u.get(requestUrl, {
			data: '{"accountId":"' + params.accountId + '"}',
		}).then(res => {
			//存入全局变量
			// console.log(res)
			let tmp = JSON.parse(res.data)
			// console.log (tmp)

			if (params.projectId != '') {

				for (let i in tmp) {

					if (tmp[i].projectId === params.projectId) {

						orgList = tmp[i].orgList

					}
				}
			} else {
				orgList = tmp
			}
			return orgList
		})

	}

	/**
	 * 	//获取房间室号
	 * @param orgId 用户组织ID
	 * @returns {*}
	 */
	function getRoomList(params = {}) {

		//console.log(params)

		let roomList = []
		let requestUrl = apiUrl.resourceByOrgId
		let requestData = '{"orgId":' + params.orgId + '}'
		return vm.$u.get(requestUrl, {
			data: requestData,
		}).then(res => {

			let result = JSON.parse(res.data);

			if (result.length < 1) {

				roomList[0] = {}
				roomList[0].resourceName = '未配置'
				roomList[0].resourceId = '404'

			} else {

				roomList = result
			}
			return roomList
		})
	}
	

	//获取新闻资讯
	async function getNewsList(params = {
		accountId: "",
		newsPlace: "02"
	}) {

		let newsList = []
		let requestUrl = apiUrl.news
		let requestData = '{"accountId":"' + params.accountId + '","newsPlace":"' + params.newsPlace + '"}'
		

		return await vm.$u.get(
			requestUrl, {
				data: requestData,
			}).then(res => {

			return JSON.parse(res.data)
		})

	}


	/**
	 * 获取访客code
	 * @param accountId 用户ID账号
	 * @param projectId 用户ID账号
	 * @param name 访客姓名
	 * @param phone 访客电话
	 * @param date 到访日期
	 * @param orgId 邀请组织
	 * @returns {*}
	 */
	async function getVisitorUrl(params = {}) {

		let requestUrl = apiUrl.visitorInvitation
		let requestData = '{"regionalId":"' + params.projectId + '","name":"' + params.name + '","phone":"' + params.phone +
			'","time":"' + params.date + '","orgId":"' + params.orgId + '","accountId":"' + params.accountId +
			'","company":""}'
		
		return await vm.$u.post(
			requestUrl, {
				data: requestData
			}).then(res => {

			return res.data
		})
	}



	/**
	 * 获取重发访客邀约信息
	 * @param applyId 邀请函Id
	 * @returns {*}
	 */
	async function getVisitorApplyRepeat(parmas = {}) {

		let requestUrl = apiUrl.visitorApplyRepeat
		let requestData = '{"applyId":"' + parmas.applyId + '"}'

		return await vm.$u.post(requestUrl, {
			data: requestData,
		}).then(res => {
			return JSON.parse(res.data);
		})
	}


	/**
	 * 访客历史记录查询
	 * @param accountId 用户ID账号
	 * @param pageNo 查询页面
	 * @param pageSize 页面记录数
	 * @returns {*}
	 */
	async function getVisitorLog(params = {}) {

		params.pageNo = params.pageNo || "1"
		params.pageSize = params.pageSize || "10"

		let requestURL = apiUrl.visitorApplyList
		let requestDate = '{"accountId":"' + params.accountId + '","pageNo":"' +
			params.pageNo + '","pageSize":"' + params.pageSize + '"}'

		return await vm.$u.post(requestURL, {
			data: requestDate,

		}).then(res => {
			return JSON.parse(res.data);
		})
	}
	/**
	 * 访客历史记录查询
	 * @param visitorCode 邀请访问Id
	 * @returns {*}
	 */
	async function getApplyInfo(params = {}) {


		let requestURL = apiUrl.visitorApplyInfo
		let requestDate = '{"visitorCode":"' + params.visitorCode + '"}'

		return await vm.$u.post(requestURL, {
			data: requestDate,

		}).then(res => {
			
			let qrCodeImg
			
			res=JSON.parse(res.data)
			qrCodeImg = qrCode.drawImg(res.qrContent, {
				typeNumber: 4,
				errorCorrectLevel: 'L',
				size: 500,
			})
			
			res.qrCodeImg = qrCodeImg
			
			return res
			
			
		})
	}
	
	/**
	 * 获取用户通行区域
	 * @param accountId 用户ID账号
	 * @param projectName 项目名字
	 * @returns {*}
	 */
	async function getPassRegion(params = {}) {

		let requestUrl = apiUrl.regionalArrange
		
		return await vm.$u.post(requestUrl, {
			data: '{"accountId":"' + params.accountId + '"}',
		}).then(res => {

			//查询通行区域
			let selectProjectList = []
			// console.log (res)
			let myRegional = JSON.parse(res.data)


			for (let i in myRegional) {

				let tmp = myRegional[i]

				for (let x in tmp) {

					if (tmp[x].projectName === params.projectName) {

						let tmp2 = {
							label: tmp[x].arrangeName,
							value: x,
						}
						selectProjectList.push(tmp2)
					}
				}
			}
			return selectProjectList;
		})

	}

	/**
	 * 检查用户登陆状态
	 * @param path 页面路径
	 * @returns {*}
	 */
	async function checklogin(path) {
		
		
		//检查登陆状态
		//判断是否存在用户信息

		const whiteList = [
			'pages/login/index',
			'pages/module/visitor/visitorQr',
		]

		if (whiteList.indexOf(path) == -1) {

			if (vm.$u.test.isEmpty(vm.g_userProfile)) {
				//路由到登陆页面
				vm.$u.route({
					type: 'reLaunch',
					url: 'pages/login/index',
				})
			}
		}

		return true;
	}



	// 此处使用了传入的params参数，一切自定义即可
	// let alogin = (params = {}) => vm.$u.post(loginUrl,params);


	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		login,
		refreshToken,
		sendSmsCode,
		getUserInfo,
		qrcodeImage,
		getProjectList,
		getPassQrcode,
		uploadUserAvatar,
		loginSmsCode,
		project,
		getOrgList,
		getRoomList,
		getNewsList,
		checklogin,
		getVisitorUrl,
		getVisitorLog,
		getVisitorApplyRepeat,
		getPassRegion,
		getApplyInfo,
	};
}

export default {
	install
}
