<template>
	<view>

		<view class="main-content" style="height: 80vh;">
			<view class="u-p-24 u-type-primary-dark u-font-xl u-text-center">
				<view v-model="invitation.orgName">
					{{invitation.orgName}}
				</view>

				<!-- <view v-model="invitation.roomName">
						{{invitation.roomName}}
					</view> -->

			</view>

			<!-- 访客二维码 -->
			<view class="u-flex-col" style="justify-content:center;  align-items: center;">

				<view class="u-content-color u-font-md"> 访客通行二维码 </view>

				<view class="qrcode-img">
					<u-image height="400rpx" width="400rpx" :src="invitation.qrCodeImg"></u-image>
				</view>

				<view class="u-flex u-font-lg u-p-24">
					<u-icon name="calendar" size="32">
					</u-icon>
					<text>到访日期&nbsp&nbsp</text>
					<view class="u-p-l-12">{{invitation.beginDateStr}}</view>
				</view>


				<!-- <text class="u-font-sm">{{'开始:&nbsp' + invitation.beginDateStr + '&nbsp' + invitation.beginTimeStr}}</text> -->
				<!-- <text class="u-font-sm">{{'结束:&nbsp'  + invitation.endDateStr + '&nbsp' + invitation.endTimeStr}}</text> -->

			</view>
			<view class="u-p-t-24 u-font-lg u-text-left">
			
				<view class="u-p-t-24">{{'访客：' + invitation.visitorName}}</view>
				<!-- <view class="u-text-center u-content-color u-font-32">{{invitation.orgName}}</view> -->
				
				<view class="u-p-t-24">{{'手机：' + invitation.visitorPhone}}</view>
				<!-- <u-gap bg-color="#f18e1e" height="5" ></u-gap> -->
			</view>
			
			<view class="u-p-t-24 u-font-xl u-text-center">

				<view class="u-p-24">{{invitation.project.projectName}}</view>
				<!-- <view class="u-text-center u-content-color u-font-32">{{invitation.orgName}}</view> -->
				<u-icon name="map" size="32" :label="invitation.project.address"> </u-icon>
				<!-- <u-gap bg-color="#f18e1e" height="5" ></u-gap> -->
			</view>
		</view>

		<view style="height: 10vh; ">
			<!-- 邀请函分享 -->
			<!-- <view class=" u-border-bottom"> </view> -->
			<view class="u-flex u-m-12 u-p-32" style="justify-content: space-around;">

				<view class="">
					<u-button type="primary" size="medium" @click="loadSmsMsg()">短信邀请</u-button>
				</view>

				<view class="">
					<u-button type="primary" size="medium" open-type="share">微信邀请</u-button>
				</view>
				
			</view>
		</view>
		
		<!-- <u-button @click="submitTest">test</u-button> -->
		<!-- 底部banner logo 图片 -->
		<!-- <view class="u-flex-col u-p-t-50" style="align-items: center;">
				<view class=" " style="width: 50%;">
					<u-image mode="widthFix" :fade="false" loading-icon="" src="~@/static/savills_banner.png"> </u-image>
				</view>
			</view> -->
		<!-- <u-modal v-model="showSmsMsg" title="发送邀约短信" :showCancelButton="true" confirmColor="" :content="'是否确认发送至手机号：' + invitation.visitorPhone + '？'" @confirm="sendSms()" >
	</u-modal> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {

				//滨江国际广场坐标
				// rsLocation: {
				// 	//纬度
				// 	latitude: 31.251690,
				// 	//经度
				// 	longitude: 121.530566,
				// },
				
				mainColor: this.$u.color['primary'],
				visitorCode: '',
				//访客邀约信息
				invitation: {
					// title: '访客邀请函',
					project: {
						projectName: '',

					},
					// orgName: '',
					// roomName:'',
					// name:'',
					// phone:'',
					// date:'',
					// qrCode:'',
					// qrCodeImg:'',
					// url:'',
					// visitorPhone:'',
					// visitorName:'',
				},
			}
		},
		computed: {
			// inputStyle() {
			// 	let style = {};
			// 	if (this.tel) {
			// 		style.color = "#fff";
			// 		style.backgroundColor = this.$u.color['warning'];
			// 	}
			// 	return style;
			// }
		},

		onLoad(e) {

			// console.log(e)
			// uni.setStorageSync('invite',e)

			// e = uni.getStorageSync('invitation')
			// e.visitorCode='6RMSYVK4'

			// e.visitorCode = "HHZMGH2T"
			// e.visitorUrl = 'https://pmp.ibaoban.com/z/vqr/HHZMGH2T'
			this.loadStartup(e)


		},


		onShareAppMessage(res) {

			if (res.from === 'button') { // 来自页面内分享按钮

				// console.log(res.target)

			}

			return {

				title: '访客二维码',

				path: '/pages/module/visitor/visitorQr?visitorCode=' + this.visitorCode,

				success: function(res) {

					// console.log('成功', res)
					// console.log ('/pages/visitor/visitorQr?visitorQrCode='+this.invitation.qrCode +'&date='+this.invitation.date + '&name=' + this.invitation.name + '&phone='+ this.invitation.phone + '&orgName=' + this.invitation.orgName +  '&roomName=' + this.invitation.roomName)

				}

			}
		},
		methods: {
			async loadStartup(option) {

				//检查登陆状态
				let pages = getCurrentPages();
				let path = pages[pages.length - 1].route;
				this.$u.api.checklogin(path)


				try {
					//获取访客邀请函变量
					let applyInfo = await this.$u.api.getApplyInfo({
						visitorCode: option.visitorCode
					})

					
					console.log(applyInfo)
					this.invitation = applyInfo
					this.visitorCode = option.visitorCode
					this.invitation.visitorUrl = option.visitorUrl
					console.log(this.invitation)
					// this.invitation.title = '邀请访客'


				} catch (err) {
					console.debug(err)
					this.$u.toast(err.message)
				}


				// uni.setStorageSync('invitation',this.invitation)
			},



			submitTest() {

				// // 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
				// function callback(err, res, resData) {
				//     if (err) {
				//         console.log("err: ", err);
				//     } else {
				//         console.log("request data: ", res.req);
				//         console.log("response data: ", resData);
				//     }
				// }

				let _self = this
				uni.showModal({
					title: '提示',
					content: '这是一个模态弹窗',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							// that.sendSms2()
							_self.$u.route({
								url: "pages/module/visitor/visitorQr",
								params: {
									visitorCode: _self.visitorCode,

								}

							})

						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			
			
			loadSmsMsg(){
				
				//黏贴短信信息
				let smsMsg = '欢迎来访' + this.invitation.project.projectName + ',打开链接' + this.invitation.visitorUrl
							+ '扫码通行，地址：' +  this.invitation.project.address + ',有效期' + this.invitation.beginDateStr
							+ '至' + this.invitation.endDateStr
							
				let _self = this
				uni.showModal({
					title: '发送分享短信',
					content: smsMsg,
					confirmText:'复制短信',
					confirmColor: this.mainColor,
					success: function(res) {
						if (res.confirm) {
							
							uni.setClipboardData({
							    data: smsMsg,
							    success: function () {
							        _self.$u.toast('将消息黏贴至短信，发送您的访客邀请链接！')
									console.log('success');
								}
							});
							
						} else if (res.cancel) {
							// console.log('用户点击取消');
						
						}
					}
				});
				
				
				
				
				
			},

			//短信邀约
			sendSmsCn: function(visitorPhone, visitorName, vistorDate, visitorQrCode) {


				// 需要发送短信的手机号码
				let phoneNumbers = []
				phoneNumbers.push(visitorPhone)

				// 短信模板ID，需要在短信应用中申请
				//【第一太平戴维斯】欢迎来访{1}，有效期{2}至{3}。
				let templateId = 740460;

				// 签名
				let smsSign = "第一太平戴维斯"; // NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`

				// 实例化QcloudSms
				// let  qcloudsms = QcloudSms(appid, appkey);
				// let  ssender = qcloudsms.SmsSingleSender();
				let params = [visitorName, visitorQrCode, '上海市杨浦区杨树浦路1062号(滨江国际广场)', vistorDate, vistorDate];

				console.log(phoneNumbers)
				console.log(visitorPhone)
				console.log(visitorName)
				console.log(vistorDate)
				console.log(visitorQrCode)


				// ssender.sendWithParam(86, phoneNumbers[0], templateId,
				//   params, smsSign, "", "", callback);  // 签名参数不能为空串
				//微信云平台短信发送接口  
				wx.cloud.callFunction({
					name: 'sendsms_visitorCN',
					data: {
						phone: phoneNumbers,
						params: params,
					},
				}).then(res => {
					// output: res.result
					console.log(res)



					if (res.result) {
						//   wx.showToast({
						// 	title: res.result.msg,
						// 	// title: "您的访客邀约短信已发送！",
						// icon: 'none',
						// 	duration: 1500,

						//   }) 

					}


				}).catch(err => {
					// handle error

				})

			},


			openSmsMsg() {

				// this.showSmsMsg=true;

				console.log(this.invitation.visitorPhone)

				console.log(this.invitation.date)

				let that = this
				uni.showModal({
					title: '短信邀约',
					content: '发送邀约至\n手机号:' + this.invitation.visitorPhone,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							console.log(that.invitation.visitorPhone, that.invitation.visitorName, that.invitation.date, that.invitation.qrCode)
							that.sendSmsCn(that.invitation.visitorPhone, that.invitation.visitorName, that.invitation.date, that.invitation
								.qrCode)

							setTimeout(() => {

								that.$u.toast("已发送您的邀约短信！")

							}, 1000)

						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});


			},
			// openMap(){

			// 	wx.openLocation({
			// 		latitude: this.rsLocation.latitude,
			// 		longitude: this.rsLocation.longitude,
			// 		scale: 18,
			// 		name: "滨江国际广场",
			// 		address: "上海市杨浦区杨树浦路1062号",
			// 		success: function () {
			// 		   console.log('success');
			// 		            }
			// 	})

			// },

			sendSms() {

				setTimeout(() => {

					this.$u.toast('已发送您的邀请短信！')

				}, 1000)
			},

		}
	};
</script>

<style lang="scss">
	page {

		background-color: #FFFFFF;

	}

	.main-content {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		background-color: #FFFFFF;
	}

	.qrcode-content {
		// height: calc(100% - 10rpx);
		// height: 45%;
		// height: 35vh;

	}
</style>
