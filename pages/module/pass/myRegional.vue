<template>
	<view> 
		
		<!-- 页面内容 -->
		<view>
			<!-- 顶部菜单 -->
			<view class="top-banner u-type-primary-dark u-m-b-12">
				<!-- 项目信息 -->
				<!-- <u-icon name="map" :size="32" label-color="$u-type-primary-dark" :label="g_userProfile.project.projectName"> </u-icon> -->
				 <text class='u-font-28 u-p-l-24'>{{g_userProfile.project.projectName}}</text>
				
			</view>

			<!-- 页面主内容 -->
			<view class="u-m-24 u-p-t-24" style="height: 80vh;background-color: #FFFFFF; border-radius: 20rpx;">
				<!-- 用户通行区域 -->
				<scroll-view  scroll-y="true" style="height: 80vh;">
					<view class="u-p-24" v-for="i in arrangeList ">
						
						<u-button> {{i.arrangeName}}</u-button>
						
						<!-- <view class="u-p-24 u-flex u-text-center" style="width: 50%;display: inline-flex;" v-for="b in i.value ">
							<text>{{b.arrangeName}}</text>
						</view> -->

					</view>
				</scroll-view>
			</view>
		</view>
		<!-- banner logo 图片 -->
				<!-- <view class="u-flex-col u-p-t-50" style="align-items: center;">
					<view class=" " style="width: 50%;">
						<u-image mode="widthFix" :fade="false" loading-icon="" src="~@/static/savills_banner.png"> </u-image>
					</view>
				</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				arrangeList: [],
				
				
			}
		},
		computed: {

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
				
				let _self = this
				
				//获取用户通行区域
				this.$u.api.getArrange({
					projectId:this.g_userProfile.project.projectId
				},).then(res=>{
					
					// console.log (res)
					_self.arrangeList = res
					
				}).catch(err =>{
					
					_self.$u.toast(err.message)
					
				})
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

</style>
