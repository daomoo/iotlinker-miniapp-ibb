<script>
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
						success: function(e) {

							wx.login({
								success: (res) => {
									if (res.code) { //微信登录成功 已拿到code  
										// ...doSomething  
										console.debug(res)
									} else {
										console.error('登录失败！' + res.errMsg)
									}
								}
							})
							// 判断基础库是否支持云函数

							// if (!wx.cloud) {
							//   console.error('请使用 2.2.3 或以上的基础库以使用云能力')
							// } else {
							//   wx.cloud.init({
							//     traceUser: true,
							//   })
							// }

						}
					})
				},
				onShow: function() {
					console.log('App Show')
				},
				onHide: function() {
					console.log('App Hide')
				}
		}
</script>

<style lang="scss">
	@import "plugin/uview-ui/index.scss";
	/*每个页面公共css */
</style>
