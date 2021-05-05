<template>
	<view>
		<!-- 页面内容 -->
		<!-- 输入手机弹出框 -->
		<u-popup v-model="show" mode="bottom" border-radius="12" :safe-area-inset-bottom="true" :mask-close-able="false"
		 :mask="false">
			<view class="u-m-32 u-p-64" style="background-color: #FFFFFF;">
				<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
					<u-form-item :label-position="labelposition" :border-bottom="true" label="绑定您的登陆手机号" prop="phone" label-width="150">
						<u-input class="u-p-t-32" :maxlength=18 placeholder="请输入登陆用的手机号" type="number" v-model="model.phone"></u-input>
					</u-form-item>
					<!-- <u-form-item :label-position="labelposition" :border-bottom="true"  label="验证码" prop="code" label-width="150"> -->
					<!-- <u-input  placeholder="请输入验证码"  type="number" v-model="model.code" ></u-input> -->
					<!-- <u-button slot="right" type="success" size="mini" :disabled="buttonStatus" @click="getCode()">{{tips}}</u-button> -->
					<!-- </u-form-item> -->
				</u-form>
				<!-- <u-verification-code :seconds="seconds" @change="codeChange"  ref="uCode"></u-verification-code> -->
				<u-verification-code :seconds="seconds" ref="uCode" @change="codeChange"></u-verification-code>
				<!--  操作按钮 -->
				<view class="u-flex-col u-col-center u-m-t-64 u-p-b-32">
					
					<view class="u-p-32">
						<u-button type="success" size="medium" :disabled="buttonStatus" @click="getCode">{{tips}}</u-button>
					</view>
					
					<view class="u-tips-color u-font-xs" @click="$u.route('/pages/login/login')">
						用户密码登陆<!-- <u-button type="success" size="default" @click="submit">下一步</u-button> -->
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//设备信息
				device: {
					windowTotalH: '',
					screenBrightness: '',
				},
				avatarUrl: '',
				pageHeight: '',
				phoneStatus: false,
				verifyStatus: false,
				loginStatus: false,
				verifyButtonText: '获取',
				phone: '',
				verify: '',
				second: 60,
				verifyCount: 0,
				buttonStatus: false,
				tips: '获取验证码',

				seconds: 60,

				phone: '',
				code: '',
				show: true,

				//页面表单对象
				model: {
					//手机号
					phone: '',
					//再次输入密码
					accountId: '',
				},
				//验证码
				validCodeStatus: false,

				border: true,
				labelposition: "top",
				//表单验证错误提示
				errorType: ['message', 'border'],


				rules: {
					phone: [{
							required: true,
							message: '请输入手机号',
							trigger: ['blur'],
						},
						{
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['blur'],
						}
					],
					code: [{
						// required: true,
						min: 4,
						max: 4,
						// pattern: /^(?![0-9]+$)/,
						message: '请输入正确验证码',
						trigger: ['change', 'blur'],
					}],
				}
			}
		},

		computed: {

		},
		onLoad() {

		},
		onReady() {
			// this.$refs.uForm.setRules(this.rules);
		},
		methods: {

			//页面初始化
			load() {



			},



			// 获取验证码服务接口
			getValidCode(phoneNumber, success, fail) {

				// console.log('{"phone":"'+phoneNumber+'","isCheckReg":"true","sn":"changePassword"}')
				// let validCodeStatus=false
				//发送服务器短信验证码
				// await this.$u.post('/mobile/send/code/retrieve',{
				// 	data:'{"phone":"'+phoneNumber+'","isCheckReg":"true","sn":"changePassword"}',
				// 	}).then(res =>{

				// 		// console.log(res)
				// 		validCode = res
				// 		// this.$u.vuex('g_checkCode',res);

				// 	}).catch(res=>{
				// 		// console.log(res)
				// 		this.$u.toast(res.message)
				// 		return false;
				// 	})
				//微信云平台发送短信验证码
				let that = this
				wx.cloud.callFunction({
					name: 'sendsms_verifyCode',
					data: {
						phone: phoneNumber
					},
				}).then(res => {
					console.log(res)
					if (res.result) {
						wx.showToast({
							title: res.result.msg,
							icon: 'none',
							duration: 1500,
						})
						if (res.result.code === 0) {

							that.phoneStatus = false,
								that.verifyStatus = true,
								that.verifyCount = that.verifyCount + 1,
								that.verify = ''
							success(res);
							// this.timer()
						}
						//   else {
						//   wx.showToast({
						// 	title: '验证码发送失败',
						// 	icon: 'none',
						// 	duration: 1500
						//   })

						// 	that.phoneStatus=true

						// }
					}
				}).catch(err => {

					console.error(err);
					fail(err);


				})


				// //微信云平台发送短信验证码
				// await wx.cloud.callFunction({
				// 	  name: 'sendsms_verifyCode',
				// 	  data: {
				// 		phone: phoneNumber,
				// 		// params: params,
				// 	  },
				// 	  }).then(res=>{
				// 		// output: res.result
				// 		 console.log(res)
				// 		 if (res.result) {
				// 		 //   wx.showToast({
				// 		 // 	title: res.result.msg,
				// 		 // 	// title: "您的访客邀约短信已发送！",
				// 			// icon: 'none',
				// 		 // 	duration: 1500,

				// 		 //   }) 
				// 		  validCode  = res.code
				// 		  }


				// 	  }).catch(err => {
				// 	    // handle error

				// 	  })



				// return validCodeStatus;
			},

			//60秒计时
			timer: function() {
				let promise = new Promise((resolve, reject) => {
					let setTimer = setInterval(
						() => {
							this.setData({
								verifyButtonText: `${this.data.second - 1}  s`,
								second: this.data.second - 1,
							})
							if (this.data.second <= 0) {
								if (this.checkPhone(this.data.phone)) {
									this.setData({
										second: 60,
										verifyButtonText: '获取',
										phoneStatus: true
									})
								} else {
									this.setData({
										second: 60,
										verifyButtonText: '获取',
										phoneStatus: false,
										verifyStatus: false
									})
								}
								resolve(setTimer)
							}
						}, 1000
					)
				})
				promise.then((setTimer) => {
					clearInterval(setTimer)
				})
			},



			//验证码按钮倒计时
			codeChange(text) {
				this.tips = text;
			},

			// getAccountInfo(phoneNumber, projectId, success, fail) {

			// 	this.$u.post('/mp/getAccountInfo', {
			// 		data: '{"mobilePhone":"' + phoneNumber + '","projectId":"' + projectId + '"}',
			// 	}).then(res => {

			// 		// console.log(res)
			// 		success(res.data);
			// 		// this.$u.vuex('g_checkCode',res);

			// 	}).catch(res => {
			// 		// console.log(res)
			// 		// this.$u.toast(res.message)
			// 		fail(res);
			// 	})



			// },


			//获得短信验证码
			async getCode() {

				//校验表单收据数据

				if (!this.$u.test.mobile(this.model.phone)) {

					this.$u.toast('请输入正确的手机号！');
					return false;

				}


				// uni.showLoading({
				// 	title: '正在获取验证码',
				// 	mask: true
				// })

				// setTimeout(()=>{

				// 	uni.hideLoading();

				// },500)

				// this.$u.vuex("g_checkCode",'2031')

				// return;

				try {

					let vaildCode = await this.$u.api.sendSmsCode({
						phone: this.model.phone,
						type: 'login',
					})

					console.log(vaildCode)

					this.$u.route({
						url: 'pages/login/getCode',
						params: {
							code: vaildCode.content,
							phone: vaildCode.phone,
						}
					})
				} catch (err) {
					console.error(err)
					this.$u.toast(err.message)
				}
			},
		}
	}
</script>

<style lang="scss">
	page {

		background-color: $u-type-primary-dark;
		background-image: url($abb-logo);
		background-position: center 20%, bottom center;
		background-repeat: no-repeat, no-repeat;
		background-size: 30%, cover;

	}
</style>
