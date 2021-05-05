<template>
	<view>
		<!-- <u-navbar back-text="" title="邀请访客"></u-navbar> -->
		<view style="background-color: #FFFFFF; height: 96rpx;">
			<u-tabs :list="barList" :is-scroll="false" :active-color="activeColor" :current="current" @change="change"></u-tabs>
		</view>
		<view class="u-p-24">

			<!-- 顶部菜单 -->
			<!-- <view class="top-banner u-type-primary u-m-b-12" style="background-color: #FFFFFF;">
				<text class='u-font-28 u-p-l-24'> {{year}}年{{month}}月</text>

				<view @click="show = true">
					<u-icon class='u-p-l-24 u-p-r-24' name="calendar" :size="32" label-color="" label="选择日期"></u-icon>

					<u-picker start-year="2020" end-year="2025" confirm-text="确定" :safe-area-inset-bottom="true" mode="time" v-model="show"
					 :params="params"></u-picker>
				</view>

			</view> -->
			<!-- 访客邀约记录 -->
			<view>
				<scroll-view scroll-y="true" style="height: 90vh;" @scrolltolower="loadVisitorLog">
					<u-card :full="true" :title="i.visitorName" v-for="i in visitorLog" :key="i.applyId" borderRadius="20">
						<view class="u-flex u-row-between" slot="head">
							<span>{{i.visitorName}}</span>

							<view v-if="i.passStatus.indexOf('重发') >1 " @click="reInviteVisitor(i.applyId,i.visitorName,i.visitorDate)">
								<u-parse :html="i.passStatus"></u-parse>
							</view>
							<u-parse v-else :html="i.passStatus"></u-parse>
						</view>

						<view class="u-flex-col" slot="body">
							<span class="u-font-sm">{{i.projectName}}(门禁有效日期：{{i.visitorDate}})</span><br />
							<span class="u-font-sm">发送时间：{{i.invitationDate}}</span><br />
							<span class="u-font-sm" v-if="i.arriveTime!=null">到达时间：{{i.arriveTime}}</span><br />
						</view>

					</u-card>
					<u-loadmore :icon-type="iconType" :status="status" @loadmore="loadVisitorLog()" />
				</scroll-view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//顶部选项卡
				barList: [{
					name: '访客邀请'
				}, {
					name: '到访申请'
				}, {
					name: '历史记录',
				}],

				current: 2,
				mainColor: this.$u.color['primary'],
				activeColor: this.$u.color['primary'],
				status: 'loadmore',

				iconType: 'flower',
				page: 1,
				visitorLog: [],

				year: new Date().getFullYear(),
				month: new Date().getMonth() + 1,
				params: {
					year: true,
					month: true,
					day: false,
					hour: false,
					minute: false,
					second: false
				},
				show: false,

			}
		},
		onReachBottom() {

			// if(this.page >= 3) return ;
			// this.status = 'loading';
			this.loadVisitorLog()
			// if(this.page >= 3) this.status = 'nomore';
			// else this.status = 'loading';

		},
		onLoad() {

			this.load();

		},
		methods: {

			load() {
				
				//检查登陆状态
				// let pages = getCurrentPages();
				// let path = pages[pages.length - 1].route;
				// this.$u.api.checklogin(path)
				
				
				//获取访客历史记录
				this.loadVisitorLog()

			},


			async loadVisitorLog() {

				let _self = this
				let page = this.page++
				let pageSize = "10"
				
				if(this.status === 'nomore'){
					return false;
				}
				
				if (_self.visitorLog.length > 100) {
					this.status = 'nomore'
					return false;
				}
				
				await this.$u.api.getVisitorLog({
					accountId: this.g_userProfile.accountId,
					pageNo: page,
					pageSize: pageSize
				}).then(res => {

					_self.visitorLog = _self.visitorLog.concat(res.data)
					if (!res.page.hasMore) {

						_self.status = 'nomore'
					}
				}).catch(err => {
					_self.$u.toast(res.message)

				})
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

			
			//重发访客邀请函
			async reInviteVisitor(applyId, visitorName, visitorDate) {
					
			
				try{
			
					let visitorInfo = await this.$u.api.getVisitorApplyRepeat({
						applyId:applyId
					})
			
					let invition = {
						
						visitorUrl: visitorInfo.url,
						visitorCode: visitorInfo.url.substring(visitorInfo.url.length - 8),
					}
					
					let _self = this	
					uni.showModal({
								
							title: '提示',
							content: '是否重新发送您的访客邀约？',
							confirmColor: _self.mainColor,
								
							success: function(res) {
								
								if (res.confirm) {
									console.log('用户点击确定');
								
									_self.$u.route({
										url: 'pages/module/visitor/visitorInvite',
										params: invition
									})
								
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						})
					
					}catch(err){ this.$u.toast(err.message)}
			
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
		// background: #f4d6aa;
		// background-color: #00a4cc;
		border-radius: 20rpx;
		padding-left: 12rpx;
		padding-right: 24rpx;
		// padding:32rpx;
		height: 96rpx;
		// height: 7%;
	}

	.slot-wrap {
		display: flex;
		align-items: center;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		flex: 1;
		/* 如果您想让slot内容与导航栏左右有空隙 */
		/* padding: 0 30rpx; */
	}
</style>
