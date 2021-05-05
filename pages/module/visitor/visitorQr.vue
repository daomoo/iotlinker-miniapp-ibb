<template>
	<view class="u-p-24">

		<!-- banner ads 广告  -->
		<view>

			<u-image mode="widthFix" border-radius="20" :fade="false" src="~@/static/img/ad_banner.jpg"> </u-image>

		</view>

		<view class="abb-main-content u-flex-col u-col-center u-m-t-12 u-p-24">
			<!-- 邀请函标题 -->
			<view class="u-type-primary u-font-xl u-flex-1" style="font-weight: bold;">
				{{invitation.title}}</view>

			<!-- 访客二维码 -->


			<view class="u-flex-col u-col-center u-flex-10 u-p-32">
				<!-- 到访公司信息 -->
				<view class="u-main-color u-font-lg u-p-12">{{invitation.orgName}}</view>

				<!-- 访客二维码 -->
				<view style="height: 450rpx;">
					<u-image width="450rpx" mode='widthFix' :src="invitation.qrCodeImg"> </u-image>
				</view>

				<view v-if="!invitation.isExpired" class="u-tips-color u-font-sm u-flex-1"> 扫一扫，马上通行 </view>
				<view v-if="!invitation.isExpired" class="u-flex-2 u-text-center u-type-warning-dark u-p-32" style="font-weight: bold;">
					<!-- <u-icon  name="calendar" size="32" label-size="32" label-color="" 
						:label=" '到访日期：' + invitation.beginDateStr + ' ' +'00:00:00' + '至' + invitation.endDateStr + '23:59:59'">
					</u-icon> -->

					<!-- 二维码有效日期 -->
					<view class='u-font-md'>
						凭证有效期
					</view>
					<view class="u-p-24">
						<view class="u-font-sm">
							{{invitation.startDate}} ～ {{invitation.endDate}}
						</view>
					</view>
				</view>

			</view>

		</view>

		<!-- 项目地址信息 -->
		<view v-if="!invitation.isExpired" class="u-flex-col u-col-center u-m-t-12" style="background-color: #FFFFFF;border-radius: 20rpx;">
			<view class="u-type-primary-dark u-font-xl u-p-32">{{invitation.project.projectName}}</view>

			<view @click="openMap" class="u-flex u-font-lg u-tips-color ">
				<u-icon name="map" size="32"> </u-icon>
				<text>{{invitation.project.address}} </text>
			</view>

			<view class=" u-p-32">
				<!-- 项目地图信息 -->
				<map style="width:600rpx; height: 300rpx;" :latitude="location.latitude" :longitude="location.longitude" :markers="covers">
					<cover-view @click="openMap" style="width: 600rpx; height: 300rpx;"></cover-view>
				</map>

			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {

				//屏幕亮度
				brightness: 0.8,

				//访客码
				visitorCode: "",

				//项目坐标
				location: {
					//纬度
					latitude: "",
					//经度
					longitude: "",
				},

				//访客邀约信息
				invitation: {
					title: '访客凭证',
					project: {
						projectName: '',

					},
					orgName: '',
					roomName: '',
					name: '',
					phone: '',
					date: '',
					qrCode: '',
					qrCodeImg: '',
					isExpired: true,
					isToday: false,
				},

				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',

				covers: [{
					// latitude: 31.16514,
					// longitude: 121.435700,
					iconPath: '/static/icon/local2x.png',
					width: 32,
					height: 32,
				}, ]

			}
		},
		computed: {

		},

		onLoad(e) {

			// e = uni.getStorageSync('invitation')
			// console.log(e)
			
			// e.visitorCode = "5RDBWHFU"
			// e.visitorUrl = 'https://pmp.ibaoban.com/z/vqr/5RDBWHFU'
			this.loadStarup(e);

		},
		onShow() {

			// if (this.invitation.isToday) {

			// 	console.log(this.invitation.isToday)
			// 	this.loadScreenLight()

			// }
		},
		onHide() {



		},
		onUnload() {


		},

		onShareAppMessage(res) {

			if (res.from === 'button') { // 来自页面内分享按钮

				console.log(res.target)

			}

			return {

				title: '访客二维码',
				path: '/pages/module/visitor/visitorQr?visitorCode=' + this.visitorCode,

				success: function(res) {

					// console.log('成功', res)
					// console.log ('/pages/module/visitor/visitorQr' + this.$u.queryParams(this.visitorCode))

				}

			}
		},
		methods: {

			async loadStarup(option) {


				try {
					//获取访客邀请函变量
					let applyInfo = await this.$u.api.getApplyInfo({
						visitorCode: option.visitorCode
					})

					// console.log(applyInfo)

					this.invitation = applyInfo
					this.visitorCode = option.visitorCode
					// this.invitation.title = '邀请访客'

				} catch (err) {
					console.debug(err)
					this.$u.toast(err.message)
				}



				//获取访客邀请函变量
				this.invitation.title = '访客凭证'
				
				this.invitation.startDate = this.invitation.beginDateStr
			
				this.invitation.endDate = this.invitation.endDateStr
				
				// + this.invitation.beginTimeStr)
					
					
				this.location.latitude = this.invitation.project.latitude
				this.location.longitude = this.invitation.project.longitude

				this.covers[0].latitude = this.invitation.project.latitude
				this.covers[0].longitude = this.invitation.project.longitude
				
				
				
				// let invitDate = new Date(this.invitation.date.replace(/-/g,"\/"))
				let invitDate = new Date(this.invitation.endDateStr)
			
				// console.log(new Date())
				// let today = new Date(this.$Utils.dateUtils.getDay(0).replace(/-/g,"\/"))
				let today = new Date(this.$Utils.dateUtils.getDay(0))

				//判断是否有访客码
				if (this.$u.test.isEmpty(this.invitation.qrCodeImg)) {

					this.invitation.isExpired = true
					this.invitation.qrCodeImg = '/static/img/expiredQrCode.png'

					return false
				}

				//判断是否是访客邀请函当日
				if (invitDate.getTime() == today.getTime()) {

					this.invitation.isToday = true
					// console.log(this.invitation.isToday)
				}

				//判断是否有访客码日期是否有效
				if (invitDate.getTime() >= today.getTime()) {

					this.invitation.isExpired = false

					// this.invitation.qrImg = option.qrImg
					// console.log(this.invitation.qrImg)
					// console.log(invitDate.getTime())
					// console.log(today.getTime())
					// console.log(invitDate.getTime() == today.getTime())
				} else {

					this.invitation.isExpired = true
					this.invitation.qrCodeImg = '/static/img/expiredQrCode.png'
				}

				console.log(this.invitation)
			},


			openMap() {

				uni.openLocation({
					latitude: this.location.latitude,
					longitude: this.location.longitude,
					scale: 16,
					name: this.invitation.project.projectName,
					address: this.invitation.project.address,
					success: function() {
						console.debug('success');
					}
				})
			},

		}
	};
</script>

<style lang="scss">
	page {

		// background-color: #FFFFFF;

	}

	.abb-main-content {
		background-color: #FFFFFF;
		border-radius: 20rpx;
		// height: 70vh;



	}
</style>
