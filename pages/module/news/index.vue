<template>
	<view  >
		<!-- <u-gap height="5" bg-color="#bbb" margin-top="10"></u-gap> -->
		<view>
			<view class="banner" style="background-color: #FFFFFF;" >

				<!-- <image class="banner-img" :src="banner.mediaPath"></image> -->
				<u-swiper indicator-pos="bottomRight" height="350" mode="dot"
				 :autoplay="false"  border-radius="0" :list="newsBanner" @click="loadNewsDetail"></u-swiper>

			</view>

			<!-- 列表活动资讯 -->
			<view class="uni-list" >
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in newsList" :key="key" @click="goDetail(value)">
					<view class="uni-media-list">
						<u-image width='200rpx' height="150rpx" class="uni-media-list-logo" :src="value.image"></u-image>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">{{value.title}}</view>
							<view class="uni-media-list-text-bottom">
								<text>{{value.author_name}}</text>
								<text>{{value.publishedDate}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>

	</view>


</template>

<script>
	export default {
		data() {
			return {

				//登陆用户信息
				userInfo: {},

				// //banner信息
				// NewsBanner: {},

				//新闻信息清单
				newsList: [],

				//项目信息
				project: {
					projectName: '',
					projectId: '',
					orgId: '',
					orgName: '',
				},
				//消息轮播图
				newsBanner: [{
					//默认加载图片
					image: '',
					title: '通知消息',

				}, ],
				//页面信息
				model: {
					//选择组织
					selectOrgName: '',
					selectOrgShow: false,
					//组织选择列表
					selectOrgList: [],
				},

				//定时任务jobid
				refreshPassQrCodeJobId: '',
				screenLightJobId: '',

			}
		},
		computed: {


		},
		onLoad() {

			this.load();

		},

		onShow() {


		},


		onHide() {


		},
		onUnload() {



		},

		methods: {

			load() {

				
				
				
				//获取顶部banner新闻资讯
				this.loadNewsBannerData()

				//获取列表新闻资讯
				this.loadNewsListData()

				return true;
			},

		

			//获取Banner活动资讯
			async loadNewsBannerData() {

				let newsList = []
				let newsSpace = "01"
				let tmp

				await this.getNewsList(this.g_userProfile.accountId, newsSpace).then(res => {
					// console.log(res) 
					tmp = res
				})
				// console.log(tmp)

				for (let i in tmp) {

					newsList[i] = {}
					newsList[i].title = tmp[i].newsTitle
					newsList[i].image = tmp[i].mediaPath

					// console.log(tmp[i].newsTitle)

				}
				this.newsBanner = newsList

			},

			//获取列表活动资讯
			async loadNewsListData() {

				let newsList = []
				let newsSpace = "02"
				let tmp

				await this.getNewsList(this.g_userProfile.accountId, newsSpace).then(res => {
					// console.log(res)
					tmp = res
					let self = this
					for (let i in tmp) {
						
						newsList[i] = {}
						newsList[i].title = tmp[i].newsTitle
						newsList[i].image = tmp[i].mediaPath
						newsList[i].publishedDate = this.$Utils.dateUtils.format(tmp[i].dataVersion)
						newsList[i].newsUrl = tmp[i].newsUrl
						// console.log(tmp[i].newsTitle)
					}
				})
				// console.log(newsList)
				this.newsList = newsList
			},

			goDetail: function(e) {
				
				let detailData = {
			        // author_name: e.author_name,
			        image: e.image,
			        newsUrl: e.newsUrl,
			        publishedDate: e.publishedDate,
			        title: e.title
			    }
				// console.log(detail)
			    uni.navigateTo({
			        url: '/pages/module/news/newsDetail' + this.$u.queryParams(detailData)
			    
				})
			},
			
			loadNewsDetail :function(index) {
			    
				// console.log(index)
				
				let detailData = {
			        // author_name: e.author_name,
			        image: this.newsBanner[index].image,
			        // newsUrl: e.newsUrl,
			        // publishedDate: e.publishedDate,
			        title: this.newsBanner[index].title,
					newsUrl: this.newsBanner[index].newsUrl
			    }
				console.log(detailData)
			  this.$u.route({
			        url: '/pages/module/news/newsDetail' + this.$u.queryParams(detailData)
			    
				})
			},
			
			//获取消息通知
			async getNewsList(accountId, newsPlace = "01") {
				let newsList = []
				let data = '{"accountId":"' + accountId + '","newsPlace":"' + newsPlace + '"}'
				let requestUrl = '/news/getNewsList'

				await this.$u.post(requestUrl, {
					data: data,
				}).then(res => {
					//存入全局变量
					// console.log(res)
					let tmp = JSON.parse(res.data)
					// console.log (tmp)
					newsList = tmp
					// for (let i in tmp) {

					// 	newsList[i].title=tmp[i].newsTitle
					// 	newsList[i].image=tmp[i].mediaPath

					// 	// console.log(tmp[i].newsTitle)
					// }
				}).catch(res => {
					// console.log(res)
					// this.$u.toast(res.message)
					return false;
				})

				// this.banner = newsList
				// console.log(newsList)
				return newsList;

			},

		},
	}
</script>

<style lang="scss">
	.banner {
		height: 350rpx;
		overflow: hidden;
		position: relative;
		// background-color: #ccc;
	}

	.banner-img {
		width: 100%;
	}

	.banner-title {
		max-height: 84rpx;
		overflow: hidden;
		position: absolute;
		left: 30rpx;
		bottom: 30rpx;
		width: 90%;
		font-size: 32rpx;
		font-weight: 400;
		line-height: 42rpx;
		color: white;
		z-index: 11;
	}

	.uni-list {
		background-color: #FFFFFF;
		// border-radius: 20rpx;
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.uni-list:after {
		position: absolute;
		z-index: 10;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.uni-list::before {
		position: absolute;
		z-index: 10;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.uni-list-cell {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.uni-list-cell-hover {
		background-color: #eee;
	}

	.uni-list-cell::after {
		position: absolute;
		z-index: 3;
		right: 0;
		bottom: 0;
		left: 30rpx;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.uni-list .uni-list-cell:last-child::after {
		height: 0rpx;
	}

	/* 图文列表 */
	.uni-media-list {
		padding: 22rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		width: 100%;
		flex-direction: row;
	}

	.uni-navigate-right.uni-media-list {
		padding-right: 74rpx;
	}

	.uni-pull-right {
		flex-direction: row-reverse;
	}

	.uni-pull-right>.uni-media-list-logo {
		margin-right: 0rpx;
		margin-left: 20rpx;
	}

	.uni-media-list-logo image {
		height: 100%;
		width: 100%;
	}


	.uni-media-list-text-bottom {
		width: 100%;
		line-height: 30rpx;
		font-size: 26rpx;
		color: #8f8f94;
	}

	.uni-media-list-logo {
		width: 180rpx;
		height: 140rpx;
		margin-right: 20rpx;
	}

	.uni-media-list-body {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		overflow: hidden;
		height: auto;
	}

	.uni-media-list-text-top {
		width: 100%;
		line-height: 36rpx;
		font-size: 30rpx;
		height: 74rpx;
		font-size: 28rpx;
		overflow: hidden;
	}

	.uni-media-list-text-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
