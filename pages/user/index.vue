<template>
	<view class="u-flex-col">
		
		<view class="u-flex abb-top-content u-m-l-24 u-m-r-24" style="height: 20vh;">
			<view class="u-flex-3 u-flex u-row-center">
				<!-- <u-avatar :src="g_avatarUrl" size="large" @click="chooseAvatar"></u-avatar> -->
				<!-- <button open-type="getUserInfo" @getuserinfo="onGetUserInfo" class="userinfo-avatar" :style="'background-image:url(' + g_userProfile.avatarUrl + ')'"
					 size="default"></button> -->
				<u-avatar  :src="g_userProfile.avatarUrl" size="large">
				</u-avatar>

			</view>
			<view class="u-flex-5 u-border-left u-p-12" style="font-weight: bold;">

				<view class="u-font-sm u-content-color u-p-b-18" style="color:#FFFFFF;">{{g_userProfile.loginName}}</view>
				<view class="u-font-xs u-tips-color">
					<view class="u-line-1" style="color:#f3f4f6;">{{g_userProfile.mobilephone}}</view>
					<view class="u-line-1" style="color:#f3f4f6;" >{{g_userProfile.project.projectName}}</view>
					<view class="u-line-1" style="color:#f3f4f6;">{{g_userProfile.project.orgName}}</view>
				</view>
			</view>

			<view class="u-flex-1 u-content-color" @click="$u.route({
				url:'pages/user/userSetting/index',
				params:{
					logoutShow:true
					},
				})">
				<u-icon name="/static/icon/setting1x.png" size="42"></u-icon>
			</view>
		</view>
		
		<!-- 服务应用中心 -->
		<view class="u-m-l-24 u-m-r-24">
			
			<!-- 楼宇服务 -->
			<view v-if="" class="u-m-t-20" style="background-color: #FFFFFF;border-radius: 20rpx;">
				<view class="u-p-24 u-font-sm u-tips-color">楼宇服务</view>
				<u-grid :col="3" :border="false">
					<!-- <u-grid-item bg-color="transparent">
						<u-icon name="/static/icon/restaurant1x.png" :size="46"></u-icon>
						<view class="grid-text">食堂餐厅</view>
					</u-grid-item> -->
					<u-grid-item bg-color="transparent">
						<u-icon name="/static/icon/coworkingRoom.png" @click="$u.toast('服务功能未开通')" :size="46"></u-icon>
						<view class="grid-text">共享会议室</view>
					</u-grid-item>
					<!-- <u-grid-item bg-color="transparent">
						<u-icon name="/static/icon/starPlus1x.png" :size="46" bg-color="transparent"></u-icon>
						<view class="grid-text">星动plus</view>
					</u-grid-item> -->
					<u-grid-item bg-color="transparent">
						<u-icon name="/static/icon/robot1x.png" @click="$u.toast('服务功能未开通')" :size="46"></u-icon>
						<view class="grid-text">机器人配送</view>
					</u-grid-item>
					<!-- <u-grid-item bg-color="transparent">
						<u-icon name="/static/icon/payCenter1x.png" @click="$u.toast('服务功能未开通')" :size="46"></u-icon>
						<view class="grid-text">线上缴费</view>
					</u-grid-item> -->
					<u-grid-item bg-color="transparent">
						<u-icon name="/static/icon/service1x.png" @click="$u.toast('服务功能未开通')" :size="46"></u-icon>
						<view class="grid-text">客服报修</view>
					</u-grid-item>
					<!-- <u-grid-item bg-color="transparent">
						<u-icon name="/static/icon/service1x.png" @click="$u.toast('服务功能未开通')" :size="46"></u-icon>
						<view class="grid-text">服务投诉</view>
					</u-grid-item> -->
				</u-grid>
			</view>
			
			<!-- 壹码通服务 -->
			<view class="u-m-t-20 " style="background-color: #FFFFFF;border-radius: 20rpx;">
				<view class="u-p-24 u-font-sm u-tips-color">壹码通服务</view>
				<u-grid :col="3" :border="false">
				
					<u-grid-item @click="$u.route('pages/user/userSetting/index')" bg-color="transparent">
						<u-icon name="/static/icon/userSetting1x.png"  :size="46"></u-icon>
						<view class="grid-text">用户设置</view>
					</u-grid-item>
					<u-grid-item bg-color="transparent">
						<u-icon name="/static/icon/contact1x.png" @click="$u.toast('服务功能未开通')" :size="46"></u-icon>
						<view class="grid-text">我的访客</view>
					</u-grid-item>
					<u-grid-item @click="$u.route('pages/module/visitor/index')" bg-color="transparent">
						<u-icon name="/static/icon/visitor1x.png" :size="46" bg-color="transparent"></u-icon>
						<view class="grid-text">邀请访客</view>
					</u-grid-item>
					<u-grid-item @click="$u.route('pages/module/news/index')" bg-color="transparent">
						<u-icon name="/static/icon/news1x.png"  :size="46" bg-color="transparent"></u-icon>
						<view class="grid-text">通知消息</view>
					</u-grid-item>	
					<!-- <u-grid-item bg-color="transparent">
						<u-icon name="/static/icon/passCode1x.png" :size="46"></u-icon>
						<view class="grid-text">通行密码</view>
					</u-grid-item> -->
					<!-- <u-grid-item bg-color="transparent">
						<u-icon name="/static/icon/help1x.png" @click="$u.toast('服务功能未开通')" :size="46" bg-color="transparent"></u-icon>
						<view class="grid-text">帮助中心</view>
					</u-grid-item> -->
				</u-grid>
			</view>
			
			<!-- 智能通行 -->
			<view class="u-m-t-20 " style="background-color: #FFFFFF;border-radius: 20rpx;">
				<view class="u-p-24 u-font-sm u-tips-color">智能通行</view>
				<u-grid :col="3" :border="false">
					<u-grid-item @click="$u.route('/pages/module/pass/myRegional')" bg-color="transparent">
						<u-icon name="/static/icon/passregion1x.png" :size="46"></u-icon>
						<view class="grid-text">通行区域</view>
					</u-grid-item>
					<u-grid-item @click="$u.route('/pages/module/pass/myPassLog')"bg-color="transparent">
						<u-icon  name="/static/icon/passlog1x.png" :size="46"></u-icon>
						<view class="grid-text">通行日志</view>
					</u-grid-item>
					<u-grid-item bg-color="transparent">
						<u-icon name="/static/icon/scanQrcode1x.png" @click="$u.toast('服务功能未开通')" :size="46"></u-icon>
						<view class="grid-text">扫码通行</view>
					</u-grid-item>
					<u-grid-item bg-color="transparent">
						<u-icon name="/static/icon/accessControl1x.png" @click="$u.toast('服务功能未开通')" :size="46"></u-icon>
						<view class="grid-text">智能门禁</view>
					</u-grid-item>
				</u-grid>
			</view>
			
			<!-- 管理服务 -->
			<!-- <view class="u-m-t-20 " style="background-color: #FFFFFF;border-radius: 20rpx;">
				<view class="u-p-24 u-font-sm u-tips-color">管理服务</view>
				<u-grid :col="3" :border="false">
					<u-grid-item bg-color="transparent">
						<u-icon name="/static/icon/passregion1x.png" :size="46"></u-icon>
						<view class="grid-text">通行分析</view>
					</u-grid-item>
					<u-grid-item bg-color="transparent">
						<u-icon name="/static/icon/faceident1x.png" :size="46"></u-icon>
						<view class="grid-text">设备巡检</view>
					</u-grid-item>
					<u-grid-item bg-color="transparent">
						<u-icon name="/static/icon/help1x.png" :size="46" bg-color="transparent"></u-icon>
						<view class="grid-text">运维名单</view>
					</u-grid-item>
				</u-grid>
			</view> -->
			
		</view>

	</view>



</template>

<script>
	// import menu from '@/common/constant/menu.js'
	
	export default {
		data() {
			return {
				canIUse: uni.canIUse('button.open-type.getUserInfo'),
				logged: false,
				orgName: '',
				show: false,
				localization: "中文",
				msgLogout: "是否确认退出登陆？",
			}
		},
		onLoad() {

			this.load()

		},
		

		methods: {

			load() {
				
				//检查登陆状态
				let pages = getCurrentPages();
				let path = pages[pages.length - 1].route;
				this.$u.api.checklogin(path)

				// let that = this
				// uni.getSetting({
				//       success (res){
				//         if (res.authSetting['scope.userInfo']) {
				//           // 已经授权，可以直接调用 getUserInfo 获取头像昵称
				//           uni.getUserInfo({
				//             success: function(res) {
				//               console.log(res.userInfo)
				// 			   // console.log(res.userInfo.avatarUrl)
				// 			  if (that.$u.test.isEmpty(that.g_avatar)){
				// 				  that.$u.vuex('g_avatar',res.userInfo.avatarUrl)
				// 			  }
				//             }
				//           })
				//         }
				//       }
				//     })

			},


			onGetUserInfo: function(e) {

				// console.log(e)
				if (e.detail.userInfo && this.$u.test.isEmpty(this.g_wxUserInfo)) {
					
					let userProfile = this.g_userProfile
					
					userProfile.avatarUrl = e.detail.userInfo.avatarUrl
					this.$u.vuex('g_userProfile',userProfile)
					this.$u.vuex('g_wxUserInfo', e.detail.userInfo)

				}
				// else  {

				// 	this.chooseAvatar()

				// }
			},

		

		}
	}
</script>

<style lang="scss">
	.abb-top-content {

		background-color:$u-type-primary;
		border-radius: 20rpx;

	}

	.userinfo-avatar {
		width: 128rpx;
		height: 128rpx;
		// margin: 20rpx;
		// -webkit-tap-highlight-color: #FFFFFF;
		border-radius: 50%;
		background-size: cover;
		background-color: $u-type-primary;
	}

	.userinfo-avatar[size] {
		width: 128rpx;
	}


	.userinfo-avatar:after {
		border: none;
	}

	.grid-text{
		
		color: $u-content-color;
		font-size: 24rpx;
		padding-top: 12rpx;
		
	}
	// .camera{
	// 	width: 54px;
	// 	height: 44px;

	// 	&:active{
	// 		background-color: #ededed;
	// 	}
	// }
	// .bottom_btn{
	// 	height: 50%;
	// 	// display: flex;
	// 	align-items: center;
	// 	// justify-content: center;
	// }
	// .user-box{
	// 	background-color: #fff;
	// }
	.badge-icon {
		position: absolute;
		top: 14rpx;
		right: 40rpx;
		width: 30rpx;
		height: 30rpx;
	}
</style>
