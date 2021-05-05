<template>
	<view>
		<view style="background-color: #FFFFFF; height: 96rpx;">
			<u-tabs :list="barList" :is-scroll="false" :active-color="activeColor" :current="current" @change="change"></u-tabs>
		</view>
		<view class="u-flex-col" style="height: 85vh">
			<!-- 顶部提示文字 -->
			<view class="u-flex-10 u-text-center u-p-t-64">

				<view class="u-font-xl">目前有
					<text class="u-type-primary">
						0
					</text>
					条访客申请待处理
				</view>
				<view>
					访客申请在到拜访时间后将自动清理
				</view>

			</view>

			<!-- 底部操作按钮 -->
			<view class="u-flex-1 u-p-12">
				<view class="u-flex">
					<view class="u-flex-10">
						<u-button type="success">确认通过</u-button>
					</view>
					<view class="u-flex-1"></view>
					<view class="u-flex-10">
						<u-button type="error">拒绝到访</u-button>
					</view>
				</view>

				<!-- <footer>
				<view class="u-flex">
				<view class="u-flex-10"><u-button type="success">确认通过</u-button></view>
				<view class="u-flex-1"></view>
				<view class="u-flex-10"><u-button type="error">拒绝到访</u-button></view>
			</footer> -->



			</view>
		</view>

	</view>


</template>

<script>
	export default {

		data() {
			// let that = this;

			return {

				//顶部选项卡
				current: 1,
				barList: [{
					name: '访客邀请'
				}, {
					name: '到访申请'
				}, {
					name: '历史记录',
				}],
				activeColor:this.$u.color['primary'],
				
				//登陆用户信息
				userInfo: {},

				//项目信息
				project: {
					projectName: '',
					projectId: '',
					orgId: '',
					orgName: '',
					roomId: '',
					roomName: '',
				},

				// 页面配置信息

				//页面表单对象
				model: {
					//访客姓名
					name: '',
					//访客手机号
					phone: '',
					//访客二维码地址
					visitorUrl: '',
					//项目
					projectName: '',
					projectId: '',
					//组织
					orgName: '',
					orgId: '',
					//房间号
					roomName: '',
					roomId: '',
				},

				//项目选择列表
				// selectProjectShow: false,
				// selectProjectList:[],
				//组织选择列表
				selectOrgList: [],
				selectOrgShow: false,
				//房间选择列表
				selectRoomList: [],
				selectRoomShow: false,

				//提交提示框显示
				showMsg: false,

				//表单组件配置属性
				border: true,
				labelPosition: 'left',
				// codeTips: '',

				//表单验证错误提示
				errorType: ['border', 'toast'],
				//表单验证规则
				rules: {
					name: [{
							required: true,
							message: '请输入邀约的访客姓名',
							trigger: 'blur',
						},

					],
					phone: [{
							required: true,
							message: '请输入邀约的访客手机',
							trigger: ['blur'],
						},
						{
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.mobile(value);
							},
							message: '访客手机号码不正确',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['blur'],
						}
					],
					projectName: [{
						required: false,
						message: '请选择项目',
						trigger: 'blur',
					}, ],
					orgName: [{
						required: true,
						message: '请选择公司',
						trigger: 'blur',
					}, ],
					roomName: [{
						required: true,
						message: '请选择室号',
						trigger: 'blur',
					}, ],
					date: [{
						required: true,
						message: '请选择访客来访日期',
						// trigger: ['blur'],
					}, ],
				},

				//选择日期组件配置属性
				showcalendar: false,
				maxDate: '2030-12-31',
				minDate: '2020-9-28',
				mode: 'date',
				result: "请选择日期",
				startText: '开始',
				endText: '结束',
				rangeColor: '#0092b6',
				rangeBgColor: 'rgba(253, 246, 236, 0.5)',
				activeBgColor: '#00a4cc',
				btnType: ' ',


				show: true,
				bgColor: '#ffffff',
				borderTop: true,
				inactiveColor: '#909399',

				list: [{
						iconPath: "man-add",
						selectedIconPath: "man-add-fill",
						text: '访客邀请',
						// count: 2,
						// isDot: true,
						customIcon: false,
						pagePath: "/pages/visitor/addvisitor",
					},
					// {
					// 	iconPath: "photo",
					// 	selectedIconPath: "photo-fill",
					// 	text: '放映厅',
					// 	customIcon: false,
					// },
					{
						// iconPath: "https://cdn.uviewui.com/uview/common/min_button.png",
						// selectedIconPath: "https://cdn.uviewui.com/uview/common/min_button_select.png",
						iconPath: "grid",
						selectedIconPath: "grid-fill",
						text: '到访申请',
						midButton: false,
						customIcon: false,
					},
					// {
					// 	iconPath: "play-right",
					// 	selectedIconPath: "play-right-fill",
					// 	text: '直播',
					// 	customIcon: false,
					// },
					{
						iconPath: "file-text",
						selectedIconPath: "file-text-fill",
						text: '历史记录',
						// count: 23,
						// isDot: false,
						customIcon: false,
						pagePath: "/pages/visitor/visitorsLog",
					},
				],


			};
		},
		onLoad() {

			this.load();
		},
		onReady() {

			// this.$refs.uForm.setRules(this.rules);

		},
		methods: {

			load() {

				//检查登陆状态
				// let pages = getCurrentPages();
				// let path = pages[pages.length - 1].route;
				// this.$u.api.checklogin(path)

				//获取客户端设备的应用屏幕高度
				// this.device.windowTotalH = uni.getSystemInfoSync().windowHeight

				//获取用户登陆信息
				this.userInfo = this.g_userProfile

				

			},

			
			//tabs菜单
			change(e){
				
				console.log(e)
			 if(e==0){
			 	uni.navigateTo({
			 		url: '/pages/module/visitor/index'
			 	});		 
			 				 
			 }
			 
			 if(e==1){
				uni.navigateTo({
					url: '/pages/module/visitor/todolist'
				});
				 
			 }
			 if(e==2){
				uni.navigateTo({
					url: '/pages/module/visitor/visitorsLog'
				});		 
			 }
			},
			

		}
	};
</script>

<style lang="scss">
	footer {
		clear: both;
		display: block;
		text-align: center;
		margin: 0px auto;
		position: absolute;
		bottom: 100px;
		width: 100%;
	}
</style>
