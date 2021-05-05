<template>

	<view class="u-flex-col u-col-center u-row-around" style="height: 90vh;">

		<view class="u-font-md u-type-primary" style="font-weight: bold;">
			{{faceID.authMsg}}
		</view>

		<view>
			<u-image  width="350rpx" height="350rpx" border-radius="20" :src="faceID.photo"> </u-image>
		</view>

		<view>
			<view style="width: 600rpx;">
			<u-button class="u-m-24" type="primary" @click="loadGetFaceID({btnMsg:'人脸认证拍照'})" size="default">
				人脸认证拍照
			</u-button>
			
			<u-button class="u-m-24" type="error"  @click="loadGetFaceID({btnMsg:'修改认证照片'})" size="default">
				修改认证照片
			</u-button>
			</view>
			
		</view>
			<view class="u-flex-col u-col-center">
			<view class="u-font-xl u-content-color u-p-24" style="font-weight: bold;">拍摄规范</view>
			<view class="u-font-sm u-tips-color"> 请面对摄像头，并保证人脸全部出现在照片中</view>
			</view>
			<u-image width="600rpx" height="auto" mode="widthFix" src="/static/module/faceID/photoSpec.png">
				
			</u-image>
		
		<!-- <view style="height: 10vh;"> -->
			
			
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				faceID:{
					authMsg:"请上传您的认证信息",
					photo:"/static/module/faceID/photoFrame.png",
					
				},
				
				Msg:{
					success:"恭喜您已认证成功！",
					require:"请上传您的认证信息",
					
				},
				
			};
			
		},
		onLoad(){
			
			//检查登陆状态
			// let pages = getCurrentPages();
			// let path = pages[pages.length - 1].route;
			// this.$u.api.checklogin(path)
			
			
			
		},
		async created(){
			let _self = this
			
			await uni.$on('uAvatarCropper', res => {
			
				
				_self.$u.vuex('g_faceIDUrl', res)
				// console.log(res)
			
			});
			
		},
		onShow(){
			
			if(this.g_faceIDUrl){
				
				this.faceID.photo = this.g_faceIDUrl
				
				this.faceID.authMsg = this.Msg.success
			}
			
		},
		methods:{
			
			
			loadGetFaceID(parmas={}){
				
				console.log(parmas)
				let _self = this
				uni.showModal({
					title:'是否确认' + parmas.btnMsg +'？',
					showCancel: true,
					confirmColor: _self.$u.color['primary'],
					    success: function (res) {
					        if (res.confirm) {
					            console.debug('用户点击确定');
								_self.avatarCropper()
							} 
							else if (res.cancel) {
					            console.debug('用户点击取消');
								
							}
					    }
				
				})
			
			},
			
			
			avatarCropper() {
				// 此为uView的跳转方法，详见"文档-JS"部分，也可以用uni的uni.navigateTo
				
				this.$u.route({
					// 关于此路径，请见下方"注意事项"
					url: '/plugin/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
					// 内部已设置以下默认参数值，可不传这些参数
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 250,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 250,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'png',
					}
				})
			},
			
			
			
		}
	}
</script>


<style lang="scss">
	page {

		height: 100vh;
		background-color: #FFFFFF;
	}
</style>
