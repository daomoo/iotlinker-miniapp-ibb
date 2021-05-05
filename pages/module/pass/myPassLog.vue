<template>

	<view>
		<!-- 顶部菜单 -->
		<view class="top-banner u-type-primary u-m-b-12">
			<text class='u-font-md u-p-l-24'> {{year}}年{{month}}月</text>

			<view @click="loadPickDate()">
				<u-icon class='u-p-r-24' name="calendar" :size="32" label-color=" " label="选择日期"></u-icon>

				<u-picker :start-year="startDate" :end-year="endDate" @confirm="confirm" :confirm-color="mainColor"
					confirm-text="确定" :safe-area-inset-bottom="true" :default-time="defaultTime" :mode="mode"
					v-model="show" :params="params">
				</u-picker>
			</view>

		</view>

		<!-- 页面主内容 -->
		<!-- <view style="height: 90vh;"> -->
		<view>
			<!-- 选择查看通行日志日期 -->
			<view>
				<!-- <view class="u-type-primary-dark u-p-16" style="background-color:#FFFFFF;text-align: center;">
				<u-icon name="arrow-left" :size="32" @click="loadMonthlyPasslog('preMonth',year +'-'+ month)"></u-icon>
				<text class='u-font-32 u-p-l-10 u-p-r-10'> {{year}}年{{month}}月</text>
				<u-icon name="arrow-right" :size="32" @click="loadMonthlyPasslog('nextMonth',year +'-'+ month)"></u-icon>
			</view> -->

				<!-- 通行日志信息 -->
				<scroll-view scroll-y="true" style="height: 90vh;">

					<view class="u-p-24 u-content-color">

						<view v-for="i in passLog" :key="i.index">
							<view class="u-flex-col">
								<view class="u-item-title u-p-l-24"> {{i.date + i.week}}</view>
							</view>
							<u-card margin="20rpx" :full="true" :border="false" :show-head="false">

								<view class="u-border-bottom u-p-12" slot="body" v-for="item1 in i.transitLog"
									:key="item1.index">
									<view class="u-flex-col ">
										<!-- <u-line class="u-line" :color="mainColor" direction="col" :hair-line="false"></u-line> -->
										<view class="u-content-color ">{{item1.curTime}}-</view>
										<view class="u-tips-color u-p-l-24 u-font-24">
											{{item1.projectName}}/{{item1.deviceName}}</view>
									</view>
								</view>


							</u-card>

						</view>

					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 底部banner logo 图片 -->
		<!-- <view class="u-flex-col u-p-t-50" style="align-items: center;"> -->
		<!-- <view class=" " style="width: 50%;">
				<u-image mode="widthFix" :fade="false" loading-icon="" src="~@/static/savills_banner.png"> </u-image>
			</view> -->
		<!-- </view> -->
	</view>

</template>
<script>
	export default {

		data() {

			return {

				mainColor: this.$u.color['primary'],

				//passLog信息
				passLog: {},

				year: new Date().getFullYear(),
				month: new Date().getMonth() + 1,

				// passLogMiniDate: '',

				//picker 设定参数
				mode: "time",
				show: false,
				startDate: "2018",
				endDate: "2025",
				defaultTime: '',
				params: {
					year: true,
					month: true,
					day: false,
					hour: false,
					minute: false,
					second: false
				},


			};
		},

		onLoad() {

			this.loadStartup();

		},
		computed: {

		},

		methods: {

			loadStartup() {

				//检查登陆状态
				// let pages = getCurrentPages();
				// let path = pages[pages.length - 1].route;
				// this.$u.api.checklogin(path)

				//获取本月的通行日志
				this.loadMonthlyPasslog(this.year + '-' + this.month)

			},


			//设定选择日期组件默认日期
			loadPickDate() {

				this.defaultTime = this.year + '-' + this.month + '-01 00:00:00'
				// console.log(this.defaultTime)
				this.show = true;

			},

			//获取选择日期组件返回值
			confirm(e) {
				// console.log(e);
				this.loadMonthlyPasslog(e.year + '-' + e.month)

			},

			//加载按月的通行日志
			loadMonthlyPasslog(queryDate) {

				//判断输入日期并格式化
				// let a = queryDate.split(/[^0-9]/)
				// let year = Number(a[0])
				// let month = Number(a[1])
				let year = new Date(queryDate).getFullYear()
				let month = new Date(queryDate).getMonth() + 1

				// month= month++
				// let curYear = new Date().getFullYear()
				// let curMonth = new Date().getMonth()

				// switch (type) {

				// 	case 'preMonth':

				// 		if (month === 1) {
				// 			month = 12;
				// 			year = year - 1;

				// 		} else {

				// 			month = --month;
				// 		}
				// 		if (month < 10) {

				// 			month = '0' + month;
				// 		}
				// 		break;

				// 	case 'nextMonth':

				// 		if (month === 12) {

				// 			month = 1;
				// 			year = year + 1;

				// 		} else {

				// 			month = ++month;
				// 		}
				// 		if (month < 10) {

				// 			month = '0' + month;
				// 		}
				// 		break;

				// 	case 'thisMonth':

				// 		if (month < 10) {
				// 			month = '0' + month;
				// 		} else {
				// 			month = month;
				// 		}

				// 		break;
				// }

				// let queryMonth = year + '-' + month

				let queryMonth = queryDate
				//判断日期是否正确
				if (!this.$u.test.date(queryMonth)) {

					return false;

				}
				//判断日期是否为最新日期
				// if (new Date(year, month-1) >= new Date()) {

				// 	return false;
				// }
				//判断日期是否为有数据记录的最小日期

				// this.selectedTime = "2020-01-01"

				this.year = year
				this.month = month


				//查询通行日志
				let _self = this


				this.$u.api.getTransitLog({
					month: queryMonth,

				}).then(res => {
					console.log(res)
					
					_self.passLog = res

					if (!_self.$u.test.isEmpty(_self.passLog)) {
						//刷新显示日期
						_self.year = year
						_self.month = month

					}
				}).catch(err => {
					console.debug(err)
				})
				


				// this.getPassLog({
				// 	accountId: this.g_userProfile.accountId,
				// 	queryMonth: queryMonth
				// }).then(res => {

				// 	_self.passLog = res

				// 	if (!_self.$u.test.isEmpty(_self.passLog)) {
				// 		//刷新显示日期
				// 		_self.year = year
				// 		_self.month = month

				// 	} 
				// else {

				// self.passLogMiniDate = self.year + '-' + self.month
				// console.log (this.passLogMiniDate)
				// self.loadMonthlyPasslog('thisMonth', self.passLogMiniDate)
				// }

				// })



			},

			/**
			 * 按月查询通行日志服务器接口
			 * @param accountId 	用户账号ID
			 * @param queryMonth 	查询月份
			 * @returns {*}
			 */
			getPassLog: async function(params = {}) {

				let passLog = {}
				let requestUrl = '/passage/my/list'
				let requestData = '{"accountId":"' + params.accountId + '","date":"' + params.queryMonth + '"}'



				await this.$u.post(requestUrl, {
					data: requestData,
				}).then(res => {

					passLog = JSON.parse(res.data)

				}).catch(res => {

					return false;
				})

				return passLog;
			},


		}
	};
</script>

<style lang="scss">
	.top-banner {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-Weight: bold;
		margin-left: 24rpx;
		margin-right: 24rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding-left: 12rpx;
		padding-right: 24rpx;
		// padding:32rpx;
		height: 96rpx;
	}

	.u-item-title {
		position: relative;
		font-size: 28rpx;
		padding-left: 8px;
		line-height: 1;
		margin-top: 12rpx;
	}

	// .u-item-title:after {
	// 	position: absolute;
	// 	width: 4px;
	// 	top: 0px;
	// 	right: 10px;
	// 	height: 12px;
	// 	/* #ifndef APP-NVUE */
	// 	content: '';
	// 	/* #endif */
	// 	left: 0;
	// 	border-radius: 10px;
	// 	background-color: $u-tips-color;
	// }
</style>
