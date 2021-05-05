<template>
	<view>
		<!-- <u-navbar back-text="" title="邀请访客"></u-navbar> -->
		<u-tabs :list="barList" :is-scroll="false" :active-color="activeColor" :current="current" @change="change"></u-tabs>
		<view class="u-flex-col u-col-center u-p-24" style="height: 80vh;">
			<view>
				<u-image border-radius="20" mode="widthFix" height="auto" width="600rpx" :fade="false" src="@/static/img/abb_pmp_logo.jpg"></u-image>
			</view>

			<view class="u-flex-col u-col-center" style="background-color: #FFFFFF">

				<view class="u-font-xl u-main-color u-p-24" style="font-weight: bold;">
					{{g_userProfile.project.orgName}}
				</view>

				<view>

					<u-form :model="model" ref="uForm" :errorType="errorType">
						<u-form-item left-icon="account" :border-bottom="false" :label-width="150" label="访客" prop="name">
							<u-input :border="border" placeholder="请输入被邀访客" v-model="model.name" type="text"></u-input>
						</u-form-item>

						<u-form-item left-icon="phone" :border-bottom="false" label="手机" prop="phone" label-width="150">
							<u-input :border="border" placeholder="请输入访客手机号" v-model="model.phone" type="number"></u-input>
						</u-form-item>
						<!-- <u-form-item :label-position="labelPosition" label="选择项目" prop="projectName" label-width="150">
					<u-input :border="border" type="select" :select-open="selectProjectShow" v-model="model.projectName" placeholder="请选择项目"  @click="loadProjectList"></u-input>
				</u-form-item> -->
						<!-- <u-form-item left-icon="home" :border-bottom="false" label="房号" prop="roomName" label-width="150">
							<u-input :border="border" type="select" :select-open="selectRoomShow" v-model="model.roomName" placeholder="请选择室号"
							 @click="$u.debounce(loadRoomList,500)"></u-input>
						</u-form-item> -->

						<u-form-item :border-bottom="false" left-icon="calendar" label-width="150" label="日期" prop="date">
							<u-input :border="border" :disabled="true" placeholder="请输入日期" v-model="model.date" type="text" @click="showCalendar"></u-input>
						</u-form-item>

						<u-form-item :border-bottom="false" left-icon="map" label-width="150" :label-position="labelPosition" label="地址">
							<view class="u-text u-content-color">{{g_userProfile.project.projectName}}</view>
						</u-form-item>

					</u-form>

					<view class="u-p-t-32">
						<u-button size="default" type="primary" @click="submit()">访客邀请</u-button>
					</view>

					<!-- <view class="u-flex-col u-col-center">
						<u-icon class="u-p-t-30 u-type-primary-dark" name="clock" size="48" @click="navTo_visitorlog()" margin-left="12rpx" label="邀请访客自主预约" label-size="28"
						 label-color="#909399"></u-icon>
					</view> -->
				</view>
			</view>

			<!-- 日历 -->
			<u-calendar :mode="mode" :min-date="minDate" :max-date="maxDate" v-model="showcalendar" ref="calendar" @change="dateChange"
			 :start-text="startText" :end-text="endText" :range-color="rangeColor" :range-bg-color="rangeBgColor"
			 :active-bg-color="activeBgColor" :btn-type="btnType">
			</u-calendar>

			<!-- <u-select mode="single-column" :list="selectProjectList" v-model="selectProjectShow" @confirm="selectProjectConfirm"></u-select> -->
			<!-- <u-select mode="single-column" :list="selectOrgList" v-model="selectOrgShow" @confirm="selectOrgConfirm"></u-select> -->
			<!-- <u-select mode="single-column" :list="selectRoomList" v-model="selectRoomShow" @confirm="selectRoomConfirm"></u-select> -->

			<!-- <u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm"></u-picker> -->

			<!-- banner图片显示 -->
			<!-- <view class="u-flex-col u-p-t-50" style="align-items: center;"> -->
			<!-- <view class=" " style="width: 50%;">
				<u-image mode="widthFix" :fade="false" loading-icon="" src="~@/static/savills_banner.png"> </u-image>
			</view> -->
			<!-- </view> -->

		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<!-- <u-tabbar
			v-model="current"
			:show="show"
			:bg-color="bgColor"
			:border-top="borderTop"
			:list="list"
			:inactive-color="inactiveColor"
			:activeColor="activeColor"
		></u-tabbar> -->
	</view>

</template>
<script>
	export default {

		data() {
			// let that = this;

			return {
				current: 0,
				//顶部选项卡
				barList: [{
					name: '访客邀请'
				}, {
					name: '到访申请'
				}, {
					name: '历史记录',
				}],

				mainColor: this.$u.color['primary'],
				activeColor: this.$u.color['primary'],

				//页面表单对象
				model: {
					//访客姓名
					name: '',
					//访客手机号
					phone: '',
					//房号名
					roomName: '',
					//房号Id
					roomId: '',
					//到访日期
					date: '',
				},

				//房间选择列表
				selectRoomList: [],
				selectRoomShow: false,

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
							// trigger: 'blur',
						},

					],
					phone: [{
							required: true,
							message: '请输入邀约的访客手机',
							// trigger: ['blur'],
						},
						{
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.mobile(value);
							},
							message: '访客手机号码不正确',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							// trigger: ['blur'],
						}
					],
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
				rangeColor: this.$u.color['primaryDark'],
				rangeBgColor: 'rgba(253, 246, 236, 0.5)',
				activeBgColor: this.$u.color['primary'],
				btnType: ' ',

				show: true,
				bgColor: '#ffffff',
				borderTop: true,
				inactiveColor: '#909399',

			};
		},
		onLoad() {

			this.loadStartup();
		},
		onReady() {

			this.$refs.uForm.setRules(this.rules);

		},
		methods: {

			loadStartup() {

				//检查登陆状态
				// let pages = getCurrentPages();
				// let path = pages[pages.length - 1].route;
				// this.$u.api.checklogin(path)

				//默认房间号
				this.model.roomName = this.g_userProfile.project.resourceName

				console.log(this.g_userProfile.project)

				//最小选择日期为当日
				this.minDate = this.$Utils.dateUtils.getDay(0);

				//最大选择日期为30天
				this.maxDate = this.$Utils.dateUtils.getDay(30);

				//选择日期默认为当日
				this.model.date = this.$Utils.dateUtils.getDay(0)

			},

			//点击加载房源列表
			// async loadRoomList() {

			// 	this.selectRoomList = []
			// 	let _self = this

			// 	try {
			// 		//获取房间可选择列表
			// 		this.selectRoomList = await this.$u.api.getRoomList({
			// 			orgId: this.g_userProfile.project.orgId
			// 		}).then(res => {
			// 			let roomList = []
			// 			console.log(res)

			// 			for (let i in res) {

			// 				let tmp = {
			// 					value: res[i].resourceId,
			// 					label: res[i].resourceName
			// 				}

			// 				roomList.push(tmp)
			// 			}
			// 			return roomList
			// 		})

			// 		this.selectRoomShow = true

			// 		if (this.selectRoomList.length > 1) {

			// 			this.selectRoomShow = true
			// 		}
			// 	} catch (err) {
			// 		console.error(err)
			// 		this.$u.toast(err.message)

			// 	}


			// },



			submit() {

				this.$refs.uForm.validate(valid => {

					if (valid) {
						// this.showMsg=true
						let _self = this
						uni.showModal({
							title: '提示',
							content: '是否发送您的访客邀约？',
							confirmColor: this.mainColor,
							success: function(res) {
								if (res.confirm) {
									console.debug('用户点击确定');

									_self.loadVisitorInvite()

								} else if (res.cancel) {
									console.debug('用户点击取消');
								}
							}
						});
					}
				});
			},


			//tabs菜单
			change(e) {

				console.log(e)
				if (e == 0) {
					uni.navigateTo({
						url: '/pages/module/visitor/index'
					});
				}

				if (e == 1) {
					uni.navigateTo({
						url: '/pages/module/visitor/todolist'
					});

				}
				if (e == 2) {
					uni.navigateTo({
						url: '/pages/module/visitor/visitorsLog'
					});
				}
			},

			//分享访客邀请
			async loadVisitorInvite() {

				let visitorData = {
					accountId: this.g_userProfile.accountId,
					projectId: this.g_userProfile.project.projectId,
					orgId: this.g_userProfile.project.orgId,
					roomName: this.model.roomName,
					name: this.model.name,
					phone: this.model.phone,
					date: this.model.date,
				}
				try {


					visitorData.visitorUrl = await this.$u.api.getVisitorUrl(visitorData)

					let visitorCode = visitorData.visitorUrl.substring(visitorData.visitorUrl.length - 9, visitorData.visitorUrl.length -
						1)

					console.log(visitorData.visitorUrl)

					//邀请页面主页面
					this.$u.route({
						url: 'pages/module/visitor/visitorInvite',
						params: {
							// name: this.g_userProfile.loginName,
							// phone: this.g_userProfile.mobilephone,
							// projectName:this.g_userProfile.project.projectName,
							// orgName: this.g_userProfile.project.orgName,
							// roomName: visitorData.roomName,
							// visitorUrl: visitorData.visitorUrl,
							// visitorName: visitorData.name,
							// visitorPhone: visitorData.phone,
							visitorCode: visitorCode,
							visitorUrl: visitorData.visitorUrl,
							// date: visitorData.date,

						}
					});
				} catch (err) {

					this.$u.toast(err.message)
				}


			},

			showCalendar() {

				this.showcalendar = true;
			},

			dateChange(e) {

				if (this.mode == 'range') {
					this.model.date = e.startDate + " - " + e.endDate;
				} else {
					this.model.date = e.result;
				}
			},


		}
	};
</script>

<style lang="scss">
	page {


		background-color: #FFFFFF;

	}
</style>
