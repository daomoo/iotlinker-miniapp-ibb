<template>
	<view>

		<u-popup v-model="showLogin" mode="bottom" border-radius="20" :safe-area-inset-bottom="true"
			:mask-close-able="false" :mask="false">
			<!-- <scroll-view  scroll-x="false"> -->
			<view class="u-m-32 u-p-64">

				<!-- 登陆输入框标题 -->
				<view class="u-content-color u-font-lg">
					<!-- <u-icon name="/static/savills_logo.png" :size="64" label=" "></u-icon> -->
					<view class="u-p-l-24">绑定您的登陆手机号</view>
				</view>
				<view class="u-p-48">
				</view>

				<!-- 绑定用户手机号和登陆输入框 -->
				<view>
					<u-form :model="passForm" ref="uForm">
						<!-- 手机号 -->
						<u-form-item label="手机号" prop="passLogin" label-width="150">
							<u-input placeholder="请输入登陆手机号" type="Number" v-model="passForm.passLogin"></u-input>
						</u-form-item>
						<!-- 密码 -->
						<u-form-item label="密码" prop="passCode" label-width="150">
							<u-input placeholder="请输入登陆密码" type="password" v-model="passForm.passCode"></u-input>
						</u-form-item>
					</u-form>
				</view>
			</view>

			<!-- 忘记密码和绑定手机按钮 -->
			<view class="u-flex-col u-p-32">
				<view class="u-p-32">
					<u-button type="success" size="default" @click="$u.debounce(submit,500)">登陆</u-button>
				</view>
				<view class="u-tips-color u-font-xs u-text-center" @click="$u.route('/pages/login/index')">
					手机验证码登陆
				</view>
			</view>

		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//登陆页面显示
				showLogin: true,
				// abb_logo: '@/static/img/abb_logo.png',
				//登陆信息
				passForm: {
					passLogin: '',
					passCode: '',
				},

			}
		},
		onLoad() {


		},
		onShow() {

			// uni.setNavigationBarTitle({
			// 	title:this.$t('lang.title')
			// });

		},

		methods: {

			async submit() {

				if (!this.$u.test.mobile(this.passForm.passLogin)) {

					this.$u.toast('请输入正确的手机号！');
					return false;

				}

				try {

					// // 获取登陆账户信息
					let accessToken = await this.$u.api.login({

						mobilephone: this.passForm.passLogin,
						password: this.passForm.passCode,

					})

					await this.$u.vuex('g_accessToken', accessToken)

					let userInfo = await this.$u.api.getUserInfo()

					await this.$u.vuex('g_userProfile', userInfo)

					console.debug(this.g_userProfile)

					// //跳转至主页
					this.$u.route({

						type: 'reLaunch',
						url: 'pages/main/index',
						// params: {
						// 	orgName: this.g_organization[0].label,
						// 	orgId: this.g_organization[0].value,
						// 	projectId: this.g_project.projectId,
						// 	projectName: this.g_project.projectName,
						// }
					});
				} catch (err) {

					console.debug(err)
					this.$u.toast(err.msg)

				}

			},
		}
	};
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
