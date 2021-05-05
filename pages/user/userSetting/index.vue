<template>
	<view class="u-flex-col u-p-24">


		<u-image mode="widthFix" border-radius="20" loading-icon="" :fade="false" src="@/static/img/abb_pmp_logo.jpg"></u-image>

		<view class="u-m-t-20 u-p-12" style=" background-color: #FFFFFF; border-radius: 20rpx;">
			<u-cell-group :border="false">

				<!-- 个人账户信息 -->
				<u-cell-item title="头像" :border-bottom="isbottom" @click="chooseAvatar">

					<!-- icon="camera" -->

					<u-avatar mode="square" size="128" :src="g_userProfile.avatarUrl"></u-avatar>

				</u-cell-item>

				<!-- 个人账户信息 -->
				<u-cell-item title="姓名" :border-bottom="isbottom" :value="g_userProfile.loginName"></u-cell-item>
				<u-cell-item title="账号" :border-bottom="isbottom" :value="g_userProfile.accountCode"></u-cell-item>

				<!-- 默认账号绑定手机 -->
				<u-cell-item title="手机" :border-bottom="isbottom" :value="g_userProfile.mobilephone"></u-cell-item>

				<!-- 用户默认语言选择 -->
				<u-cell-item title="语言" :border-bottom="isbottom" :value="localization"></u-cell-item>

				<!-- 系统说明 -->
				<u-cell-item title="关于" :border-bottom="isbottom"></u-cell-item>

			</u-cell-group>
		</view>
		<view class="u-m-t-20 u-p-12" style=" background-color: #FFFFFF; border-radius: 20rpx;">
			<u-cell-group :border="false">
				<!-- 选择楼宇项目 -->
				<u-cell-item title="我的楼宇" :border-bottom="isbottom" :value="g_userProfile.project.projectName" @click="navTO_chgProject"></u-cell-item>
			</u-cell-group>

		</view>

		<view v-if='logoutShow' class="u-p-t-32 u-flex" style="height: 30%; justify-content: center; align-items: center;">
			<u-modal v-model="show" :title-style="{color: 'red'}" :showCancelButton="true" confirmColor="" :content="msgLogout"
			 @confirm="logout()">
			</u-modal>

			<u-button style="width: 60%;" size="default" type="primary" @click="submit()">退出登录</u-button>

		</view>

	</view>

</template>

<script>
	export default {
		data() {
			return {

				logged: false,
				show: false,
				localization: "中文",
				msgLogout: "是否确认退出登陆？",
				logoutShow: false,
				isbottom: false,
				isUploadUserAvatar: false,
				userAvatar:'',

			}
		},
		onLoad(e) {
			
			// console.log(e)
			
			this.logoutShow = e.logoutShow
		
		},
		onShow(){
			
			this.loadStartup()
			
		},
		created() {
			// 监听从裁剪页发布的事件，获得裁剪结果

			let _self = this
			uni.$on('uAvatarCropper', res => {
				
				// this.$u.vuex('userProfile.project.avatarUrl', res)
				// console.log(res)
				_self.userAvatar = res
				_self.isUploadUserAvatar = true
				_self.g_userProfile.avatarUrl = _self.userAvatar
				// try {
				// 	_self.$u.api.uploadUserAvatar({
				// 		accountId: _self.g_userProfile.accountId,
				// 		file: res,
				// 	})
				// } catch (err) {
				// 	console.error(err)
				// 	_self.$u.toast(err.message)
				// }


			});
		},

		methods: {

			async loadStartup() {

				//检查登陆状态
				// let pages = getCurrentPages();
				// let path = pages[pages.length - 1].route;
				// this.$u.api.checklogin(path)

				try {
					//更新用户头像
					// console.log(this.isUploadUserAvatar)
					
					if (this.isUploadUserAvatar) {
						await this.$u.api.uploadUserAvatar({
							accountId: this.g_userProfile.accountId,
							
							// #ifdef MP-WEIXIN
							file: 'data:image/png;base64,' + uni.getFileSystemManager().readFileSync(this.g_userProfile.avatarUrl, 'base64'),
							// #endif
							
							// #ifdef H5 
							file: this.g_userProfile.avatarUrl,
							// #endif
						})
					}
					
					//获取登陆账户信息
					let userProfile = await this.$u.api.login({

						mobilephone: this.g_userProfile.mobilephone,
						AESpassword: this.g_userProfile.pwd,

					})

					//获取登陆账号项目信息
					userProfile.project = await this.$u.api.project({

						accountId: this.g_userProfile.accountId,
						projectId: this.g_userProfile.project.projectId,
						projectName: this.g_userProfile.project.projectName,
						orgId: this.g_userProfile.project.orgId,
						orgName: this.g_userProfile.project.orgName,
					})

					await this.$u.vuex('g_userProfile', userProfile)
					console.debug(this.g_userProfile)

				} catch (err) {
					console.error(err)
					this.$u.toast(err.message)
				}

			},

			chooseAvatar() {
				// 此为uView的跳转方法，详见"文档-JS"部分，也可以用uni的uni.navigateTo
				this.$u.route({
					// 关于此路径，请见下方"注意事项"
					url: '/plugin/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
					// 内部已设置以下默认参数值，可不传这些参数
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 1024,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 300,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'png',
					}
				})
			},


			submit() {

				this.show = true;
			},


			async logout() {

				uni.removeStorageSync('userProfile')
				await this.$u.vuex("g_userProfile", '')

				//路由到登陆页
				this.$u.route({
					type: 'reLaunch',
					url: '/pages/login/index',
				});

			},


			navTO_chgProject() {

				uni.navigateTo({
					url: '/pages/user/userSetting/chgProject'
				});

			},
		}
	}
</script>

<style lang="scss">



</style>
