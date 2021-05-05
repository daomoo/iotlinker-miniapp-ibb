<template>
    <view>
        <view class="banner">
            <u-image class="banner-img" :src="banner.image"></u-image>
            <view class="banner-title">{{banner.title}}</view>
        </view>
        <view class="article-meta">
            <!-- <text class="article-author">{{banner.author_name}}</text> -->
            <text class="article-text">发表于</text>
            <text class="article-time">{{banner.publishedDate}}</text>
        </view>
        <view class="article-content">
            <!-- <rich-text :nodes="banner.newsUrl"></rich-text> -->
			 <!-- <web-view :webview-styles="webviewStyles" :src="banner.newsUrl"></web-view> -->
        </view>
		
        
		<!-- #ifdef MP-WEIXIN -->
        <ad v-if="htmlString" unit-id="adunit-01b7a010bf53d74e"></ad>
        <!-- #endif -->
    </view>
</template>

<script>
    export default {
        data() {
            return {
				title: 'list-triplex-row',
				banner: {},
				htmlString: "",
				webviewStyles: {
								progress: {
									color: '#FF3333'
								}
							}
            }
        },
        onShareAppMessage() {
            // return {
            //     title: this.banner.title,
            //     path: '/pages/template/list2detail-detail/list2detail-detail?detailDate=' + JSON.stringify(this.banner)
            // }
        },
        onLoad(e) {
            // 目前在某些平台参数会被主动 decode，暂时这样处理。
			console.log(e)
            
		
			this.banner = e
			
			console.log(this.banner)
            
			this.loadDetail();
            uni.setNavigationBarTitle({
                title: this.banner.title
            });
			
			// plus.runtime.openURL(banner.newsUrl);
			
			
        },
        methods: {
            loadDetail() {
                // uni.request({
                //     url: this.banner.newsUrl,
                //     success: (data) => {
                //         if (data.statusCode == 200) {
                //             this.htmlString = data.data.content.replace(/\\/g, "").replace(/<img/g,
                //                 "<img style=\"display:none;\"");
                //         }
                //     },
                //     fail: () => {
                //         console.log('fail');
                //     }
                // })
            }
        }
    }
</script>

<style>
    view {
        font-size: 28upx;
        line-height: 1.8;
    }

    .banner {
        height: 360upx;
        overflow: hidden;
        position: relative;
        background-color: #ccc;
    }

    .banner-img {
        width: 100%;
    }

    .banner-title {
        max-height: 84upx;
        overflow: hidden;
        position: absolute;
        left: 30upx;
        bottom: 30upx;
        width: 90%;
        font-size: 32upx;
        font-weight: 400;
        line-height: 42upx;
        color: white;
        z-index: 11;
    }

    .article-meta {
        padding: 20upx 40upx;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        color: gray;
    }

    .article-text {
        font-size: 26upx;
        line-height: 50upx;
        margin: 0 20upx;
    }

    .article-author,
    .article-time {
        font-size: 30upx;
    }

    .article-content {
        padding: 0 30upx;
        overflow: hidden;
        font-size: 30upx;
        margin-bottom: 30upx;
    }
</style>
