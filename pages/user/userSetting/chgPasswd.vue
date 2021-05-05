<template>
	<!-- <view class="u-flex-col" :style="{ height: device.windowTotalH + 'px'} "> -->
	<view>
		<!-- 页面内容 -->
		<view class="u-flex-col u-p-64" style="background-color: #FFFFFF;">				
			
			<!-- 输入表单 -->
			<view>
				<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
					<u-form-item  :label-position="labelposition" :border-bottom="true"  prop="passCode" >
						<u-input  :border="border" :password-icon="true" type="password" v-model="model.passCode" placeholder="请输入新密码"></u-input>
					</u-form-item>
					<u-form-item :label-position="labelposition" :border-bottom="true"  prop="passCode2" >
						<u-input :border="border" :password-icon="true" type="password" v-model="model.passCode2" placeholder="请确认新密码"></u-input>
					</u-form-item>
				
				</u-form>
			</view>
			
			<!--  操作按钮 -->
			<view class="u-p-64 ">
				<u-button @click="showMessage()" type="success" size="default">确认提交</u-button>
			</view>
			<u-modal v-model="showMsg" :showCancelButton="true" :title-style="{color: 'red'}" confirmColor=" " content="修改密码将退出登陆,是否确认？"  @confirm="submit() " >
			</u-modal>
		</view>
	</view>
</template>

<script>
import md5Libs from "plugin/uview-ui/libs/function/md5";

export default {
	data() {
		return {
			
			// maxlength: 4,
			// value: '',
			// second: 3,
			showMsg: false,
			
			//设备信息
			device:{
				windowTotalH: '',
				screenBrightness: '',
			},
			//页面表单对象
			model: {
				//输入密码
				passCode: '',
				//再次输入密码
				passCode2: '',
				
				},
			accountId:'',
			border: false,
			labelposition: "top",
			//表单验证错误提示
			errorType: ['message','border'],
			
			rules: {
					passCode: [
						{
							required: true,
							// 正则不能含有两边的引号
							// pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
							// pattern:/[A-Za-z0-9.\-_:,!@#%&*()]{6,12}/,
							message: '密码不能为空',
							trigger: ['blur'],
						},
						// 正则判断为字母或数字
							{
								pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
								// 正则检验前先将值转为字符串
								transform(value) {
									return String(value);
								},
								message: '需同时含有字母和数字',
							
							},
							// 6-8个字符之间的判断
							{
								min: 6,
								max: 12,
								message: '长度在6-8个字符之间',
								
							},
					], 
					
					passCode2: [
						{
							required: true,
							validator: (rule, value, callback) => {
								return value === this.model.passCode;
							},
							message: '两次输入的密码不相等',
							trigger: ['blur'],
						}
					],
			}
		}
	},
	computed: {},
	
	
	onLoad: function(options) {
		
		console.log(options)
		
		this.load(options)
		
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		
		//页面初始化
		load(options){
			
			if(!this.$u.test.isEmpty(options.accountId)){
				
				this.accountId = options.accountId
				
			}else{
				
				//判断是否要登陆
				if(!this.checkLogin()){
					
					return false;
				}
				
				this.accountId = this.g_userInfo.accountId
			}
			
			//获取客户端设备的应用屏幕高度
			// this.device.windowTotalH = uni.getSystemInfoSync().windowHeight
			//获取全局变量状态值
		
		},
		
		//检查登陆状态
		checkLogin() {
			
			//判断是否存在用户信息
			if (this.$u.test.isEmpty(this.g_userInfo)) {
				//路由到登陆页面
				this.$u.route({
					type: 'reLaunch',
					url: 'pages/login/index',
				});
			 return false;
			}
		return true;
		},
		
		//用户更改密码服务接口
		async changeUserPassword (accountId,newPassword) {
			
			// console.log('{"accountId":"'+ accountId +'",newPassword:"' + md5Libs.md5(newPassword) + '"}')
			await this.$u.post('/mobilevf/pschange',{
				data:'{"accountId":"'+ accountId +'","newPassword":"' + md5Libs.md5(newPassword) + '"}',
			}).then(res => {
				
				// console.log(res)
				
				
				}).catch(res=>{
					// console.log(res)
					this.$u.toast(res.message)
					return false;
				})
			
		},
	
	
	
		// 返回登陆页面
		async logout(){
			
			uni.removeStorageSync('userInfo')
			// uni.removeStorageSync('project')
			await this.$u.vuex("g_userInfo",'')
			// await this.$u.vuex("g_project",{})
			
			//路由到登陆页
			uni.reLaunch({
				url: '/pages/login/index'
			})
				
		},
		
		//提交操作
		submit(){
			
			if (this.changeUserPassword(this.accountId,this.model.passCode)){
				
				this.logout()
			}
		},

		
		showMessage() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					
					console.log('验证通过');
					
					this.showMsg=true
				
				}
			
			});
			
		},
		
	}
}
</script>

<style lang="scss">


</style>
