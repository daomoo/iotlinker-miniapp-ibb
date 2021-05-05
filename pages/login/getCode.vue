<template>
	<view>
		
		<!-- 页面内容 -->
		<view class="u-flex-col" style="justify-content:flex-end;height:60vh;">
		
		<!-- 页面主内容 -->
		<!-- <view class="main-content"> -->
			
			<view class="u-flex-col u-text-center u-content-color" style="justify-content:space-around; height: 10vh;">
				<!-- <view calss="u-flex-1">{{validCode.phone}}</view> -->
				
				<view calss="u-flex-2" >请输入您收到的验证码</view>
			</view>
			
			<view calss="u-p-48"style="height: 30vh;">
				<u-message-input :breathe="true" mode="bottomLine" active-color="#f29100" :focus="true"  @change="change" @finish="validCode"></u-message-input>
			</view>
		
		<!-- </view> -->
	
	</view>
</view>
</template>

<script>
	export default {
		data() {
			return {
				
				//验证码
				smsCode:{},
			};
		},
		onLoad: function(options){
			
			// console.log(options)
			
			//获取客户端设备的应用屏幕高度
			// this.device.windowTotalH = uni.getSystemInfoSync().windowHeight
			//获取验证码信息
			this.smsCode = options
			// this.smsCode.code = '7474'
			// this.smsCode.phone = '13817711711'
			console.log(this.smsCode)
			
			// this.validCode.phone ="13817711711"
		},
		
		methods: {
					change(e) {
						// console.log('内容改变，当前值为：' + e);
					},
					
					
					//输入验证码比对
					async validCode(e) {
						
							if(e != this.smsCode.code) {
								
								this.$u.toast('您输入的验证码有错误！')
								return;
								
							}
							console.log(this.smsCode)
							try{
								
								//获取登陆账户信息
								let userProfile = await this.$u.api.loginSmsCode({
									phone:this.smsCode.phone,
									smsCode: this.smsCode.code,
								})
								
								console.log(userProfile)
								
								//获取登陆账号项目信息
								userProfile.project= await this.$u.api.project({
									
									accountId:userProfile.accountId,
									projectId:userProfile.projectList[0].projectID,
									projectName:userProfile.projectList[0].projectName
								})
								
								// console.debug(userProfile)
								
								await this.$u.vuex('g_userProfile',userProfile)
								
								console.debug(this.g_userProfile)
								
								
								//跳转至主页
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
							}catch(err){
								
								console.debug(err)
								this.$u.toast(err.message)
								
							}
							
							
							
							
							
					},
				}
	}
</script>

<style lang="scss">
.main-content {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
