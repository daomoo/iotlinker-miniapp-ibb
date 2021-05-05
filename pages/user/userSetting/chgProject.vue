<template>
	<view>

		<u-cell-group :border="false">

			<!-- 个人用户信息 -->
			<u-cell-item v-for="i in g_userProfile.projectList" :key="i.projectID" :arrow="arrow" :title="i.projectName" @click="loadSelectedProject({
						projectId:i.projectID,
						projectName:i.projectName
						
					})">

				<!-- 用户选定项目 -->
				<!-- <view v-if="checkShow(i.projectID)"> -->

				<!-- <u-icon  size="32" :name="iconName"></u-icon> -->

				<!-- <u-icon slot="icon" size="32" :name="iconName" ></u-icon> -->

				<!-- </view> -->

			</u-cell-item>

		</u-cell-group>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				projectList: {},
				project: {},
				arrow: true,
				value: "",
				checked: false,
				iconName: "checkmark",
				v: 1,
			};
		},
		onLoad() {


			this.project = this.g_userProfile.project

		},
		computed: {
			checkShow: function() {

				return function(val) {

					if (val === this.project.projectID) {
						return true;
					} else {
						return false;
					}
				}
			}

		},
		methods: {

			loadSelectedProject(e) {

				//用户默认项目信息
				this.project = {
					projectId: e.projectId,
					projectName: e.projectName,
					// projectAddress: project.projectAddress,
					// orgId: orgList[0].orgId,
					// orgName: orgList[0].orgName,
					// roomId: roomList[0].resourceId,
					// roomName: roomList[0].resourceName,
				}
				// console.log(this.$u.queryParams(this.project))

				uni.navigateTo({
					url: '/pages/user/userSetting/chgProjectOrg' + this.$u.queryParams(this.project)
				});
			},
		},
	}
</script>

<style lang="scss">

</style>
