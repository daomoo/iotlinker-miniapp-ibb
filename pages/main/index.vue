<template>
	<view class="u-p-24">

		<!-- 导航栏 -->
		<u-navbar :is-back="false" :title="$t('lang.title')" title-color="#FFFFFF"
			:background="{ background: 'mainColor' }" :border-bottom="false">
			<view class="slot-wrap u-type-info-light">
				<u-avatar :src="g_userProfile.avatar" size="64" @click="$u.route('/pages/user/index')">
				</u-avatar>
				<view class="u-flex-col u-p-l-8 ">
					<view class="u-font-12">{{g_userProfile.loginName}}</view>
				</view>
			</view>
		</u-navbar>

		<!-- 页面内容 -->
		<view class="u-flex-col" style="height: 72vh;">
			<!-- 顶部 banner -->
			<!-- <view class="top-banner"> -->
			<!-- 项目信息 -->
			<!-- <u-avatar bg-color="#f3f4f6" :src="g_avatarUrl" size="64" @click="navTO_userCenter()"></u-avatar> -->
			<!-- <u-icon class="u-p-l-12" name="map" color="#ffffff" :size="32" label-color="#ffffff" :label="g_project.projectName"></u-icon> -->
			<!-- </view> -->
			<!-- 页面主内容 -->
			<view class="main-content">

				<!-- 通行二维码内容-->
				<view class="qrcode-content">

					<!-- 楼宇项目信息 -->
					<view class="u-p-24 u-font-xl u-type-primary">
						{{g_userProfile.project.projectName}}
					</view>

					<!-- 公司组织信息 -->
					<view class="u-text-center u-content-color u-font-md">
						{{g_userProfile.project.org.orgName}}
					</view>

					<!-- 通行二维码 -->
					<view vibrateShort @click="$u.throttle(reload,1000)">
						<image class="qrcode-img" :src="qrcodeURL"></image>
					</view>
					<!-- 手动刷新 -->
					<view class="u-tips-color u-flex" @click="$u.throttle(reload,1000)">
						<view class="u-flex" :animation="animationData">
							<u-icon name='reload' size="32"></u-icon>
						</view>
						<view class="u-p-l-4">刷新</view>
					</view>
					<!-- <view class="u-light-color">动态更新，截屏无效！</view> -->
				</view>
			</view>

			<!-- 通知公告 -->
			<view class="newslist-content u-flex-col u-justify-center">
				<!-- 页面线 -->
				<u-gap height="2" bg-color="#f8f8f8"></u-gap>

				<!-- <view  style="align-items: center;width: 50%;">
						<u-image mode="widthFix" :fade="false" loading-icon=""  src="~@/static/savills_banner.png"> </u-image>
					</view> -->
				<u-swiper border-radius="0" mode="none" height="150" :list="newsList" @click="loadNewsDetail">
				</u-swiper>
				<!-- 页面线 -->
				<u-gap height="2" bg-color="#f8f8f8"></u-gap>
			</view>

			<!-- 	功能按钮
			<view class="button-content">
				<u-grid class="u-type-info u-font-24 button-content" :col="3" :border="false" align="center">
					
					
					<u-grid-item @click="navTO_passLog()" bg-color="transparent">
						<u-icon name="/static/icon/passlog.png" margin-top="12rpx" size="50">
						</u-icon>
						<view class="grid-text  u-p-t-2">通行日志</view>
					</u-grid-item>
					<u-grid-item @click="navTO_passRegion()" bg-color="transparent">
						<u-badge :is-dot="true" size="mini" count="2" :offset="[15, 50]"></u-badge>
						<u-icon name="/static/icon/news.png" margin-top="12rpx" size="50"></u-icon>
						<view class="grid-text  u-p-t-2">消息通知</view>
					</u-grid-item>
					<u-grid-item @click="navTO_addVisitor()" bg-color="transparent">
						<u-icon name="/static/icon/invitevisitor.png" margin-top="12rpx" size="50"></u-icon>
						<view class="grid-text u-p-t-2">邀请访客</view>
					</u-grid-item>
				</u-grid>
			</view> -->
			<!-- 功能按钮 -->
			<view>
				<u-grid class="u-type-info u-font-24 button-content" :col="3" :border="false" align="center">

					<view v-for="(value,key) in g_userProfile.qrMenus" :key="key">
						<u-grid-item @click="$u.route(value.path)" bg-color="transparent" style="width: 100%">
							<u-icon :name=value.img margin-top="12rpx" size="50">
							</u-icon>
							<view class="grid-text  u-p-t-2">{{value.title}}</view>
						</u-grid-item>
					</view>

				</u-grid>
			</view>

			<!-- 选择组织 -->
			<!-- <u-select mode="single-column" :list="model.selectOrgList" v-model="model.selectOrgShow" @confirm="selectOrgConfirm"></u-select> -->

		</view>
		<!-- banner ads 广告  -->
		<view class="u-flex-col u-m-t-12" style="align-items: center;">
			<view style="width: 100%;" @click="scanQrCode">
				<u-image mode="widthFix" border-radius="20" :fade="false" src="~@/static/img/ad_banner.jpg"> </u-image>
			</view>
			<!-- banner logo 图片 -->
			<!-- <view class=" " style="width: 50%;">
				<u-image mode="widthFix" :fade="false" loading-icon="" src="~@/static/savills_banner.png"> </u-image>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				animationData: {},
				refreshCount: 1,
				mainColor: this.$u.color['pimaryDark'],

				//屏幕亮度 80% 
				brightness: 0.8,

				//消息轮播图
				newsList: [{
					image: '/static/img/newslist1.png',
					title: '新闻通知',

				}, ],

				//定时任务jobid
				refreshPassQrCodeJobId: '',
				screenLightJobId: '',

				qrcodeURL: "",
				qrMenus: {},
			}
		},
		computed: {


		},
		onLoad() {
			this.$i18n.locale = 'zh';

			// ServiceMenus.forEach (function(key){
			// 	console.log(key.code,key)

			// })
			//console.log(this.g_userProfile)
			// this.serviceMenus = new Map

			// this.qrMenus = ServiceMenus;
			// console.log(ServiceMenus.get("20301").title)

			// console.log(ServiceMenus.size)

			// console.log(this.g_userProfile.qrMenus)

			// console.log(ServiceMenus.has("20301"))

		},
		onShow() {

			uni.setNavigationBarTitle({
				title: this.$t('lang.title')
			});

			this.loadStartup();

			this.loadScreenLight();

			try {
				let _self = this
				this.refreshPassQrCodeJobId = setInterval(() => {


					this.$u.api.getPassQrcode().then(async res => {

						_self.qrcodeURL = await this.$u.api.qrcodeImage({
							stringCode: res
						})

					})
					//二维码刷新时间
				}, _self.g_userProfile.refSecond * 1000);

			} catch (err) {

				console.debug(err)
			}
		},

		async onPullDownRefresh() {

			await this.reload();
			uni.stopPullDownRefresh()
		},

		onHide() {


			uni.setScreenBrightness({
				value: this.brightness
			});

			clearInterval(this.refreshPassQrCodeJobId)
			clearInterval(this.screenLightJobId)
		},
		onUnload() {


		},

		methods: {
			loadStartup() {

				//获得通行二维码

				this.$u.api.getPassQrcode().then(async res => {

					this.qrcodeURL = await this.$u.api.qrcodeImage({
						stringCode: res
					})


				})


				//获取公告信息
				// this.loadNewsData()

				//截屏提示信息
				uni.onUserCaptureScreen(function() {

					let pages = getCurrentPages()
					if (pages[pages.length - 1].route !== 'pages/main/index') {
						return
					}

					uni.showToast({
						icon: 'none',
						title: '动态更新，截屏无效！',
						duration: 3000
					});
				});

				//  //获取新闻消息
				// this.newslist=this.getNewsList(this.g_userProfile.accountId)
				//  // console.log(this.g_userProfile.accountId)
				//  console.log(this.newslist)



				return true;
			},

			//重新刷新通行二维码
			reload() {

				let _self = this
				setTimeout(() => {

					if (this.loadStartup()) {
						uni.vibrateShort({
							success: function() {
								_self.loadScreenLight();
							},
						});
					}
				}, 300)

				let animation = uni.createAnimation({
					duration: 1000,
					timingFunction: 'linear',
				})

				animation.rotate(360 * this.refreshCount).step()

				this.animationData = animation.export()
				//刷新计数
				this.refreshCount = ++this.refreshCount

			},

			//获取Banner活动资讯
			async loadNewsData() {

				//通行二维码通知公告
				let newsPlace = "03"
				this.newsList = await this.$u.api.getNewsList({
					accountId: this.g_userProfile.accountId,
					newsPlace: newsPlace
				}).then(res => {

					let tmp = res
					let newsList = []

					for (let i in res) {

						newsList[i] = {}
						newsList[i].title = res[i].newsTitle
						newsList[i].image = res[i].mediaPath
						newsList[i].newsUrl = res[i].newsUrl

						// console.log(tmp[i].newsTitle)
					}

					return newsList
					// console.log(newsList)
				}).catch(err => {

					console.error(err)
				})

				// console.log(this.newsList)
			},

			//二维码显示屏幕自动亮度80%
			loadScreenLight: function() {

				let _self = this
				uni.getScreenBrightness({
					success: function(res) {

						if (res.value != 0.8) {

							_self.brightness = res.value // 获取到的手机屏幕原有亮度

							uni.setScreenBrightness({
								value: 0.8
							});
						}
					}
				})

				//自动亮度时间为30秒
				clearInterval(this.screenLightJobId)
				this.screenLightJobId = setTimeout(() => {
					uni.setScreenBrightness({
						value: _self.brightness
					});
				}, 30000)
			},

			//二维码扫描
			scanQrCode: function() {
				// 只允许通过相机扫码
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			},

			//加载通知公告详情
			loadNewsDetail: function(index) {

				console.log(index)

				let detailData = {
					// author_name: e.author_name,
					image: this.newsList[index].image,
					// newsUrl: e.newsUrl,
					// publishedDate: e.publishedDate,
					title: this.newsList[index].title,
					newsUrl: this.newsList[index].newsUrl
				}
				console.log(detailData)

				this.$u.route({
					url: '/pages/module/news/newsDetail' + this.$u.queryParams(detailData)

				})
			},

		}
	};
</script>

<style lang="scss">
	page {
		background-color:

			$u-type-primary-dark;

	}

	.slot-wrap {
		display: flex;
		align-items: center;
		font-Weight: bold;
		margin-left: 30rpx // flex: 1;
	}

	.top-banner {
		display: flex;
		// flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		// background: #f4d6aa;
		//background-color: #00a4cc;
		// border-radius: 10rpx 10rpx 5rpx 5rpx;
		// padding-left: 12rpx;
		// padding-right: 24rpx;
		// padding:32rpx;
		height: 96rpx;
		// height: 7%;
	}


	.main-content {
		height: 50vh;
		// padding-top: 12rpx;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		background-color: #FFFFFF;
	}

	.qrcode-content {
		height: 45vh;
		padding-top: 64rpx;
		display: flex;

		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.newslist-content {
		// background-color: #FFFFFF;
		// height: 15vh;
		// display: flex;
		// flex-direction: column;
		// justify-content: center;
		// align-items: center;
	}

	.button-content {
		background-color: #FFFFFF;
		border-radius: 0rpx 0rpx 20rpx 20rpx;
		height: 12vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

	}

	.qrcode-img {
		padding: 24rpx;
		width: 400rpx;
		height: 400rpx;

	}
</style>
