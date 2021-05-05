<template>
	<view>

		<u-cell-group :border="false">

			<!-- 个人用户信息 -->
			<u-cell-item v-for="i in orgList" :key="i.orgId" :arrow="arrow" :title="i.orgName" @click="loadSelectedProject({
						orgId:i.orgId,
						orgName:i.orgName
						
					})">

				<!-- 用户选定项目 -->
				<view v-if="checkShow(i.orgId)">

					<u-icon size="32" :name="iconName"></u-icon>

					<!-- <u-icon slot="icon" size="32" :name="iconName" ></u-icon> -->

				</view>

			</u-cell-item>

		</u-cell-group>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				orgList: {},
				project: {},
				arrow: false,
				value: "",
				checked: false,
				iconName: "checkmark",
				v: 1,
			};
		},
		onLoad(e) {

			this.project = e
			let _self = this
			
			this.$u.api.getOrgListbyProject({
				projectId: this.project.id
				
			}).then(res=>{
				console.log(res)
				_self.orgList = res
				// if (_self.project.id != '') {
				
				// 	for (let i in res) {
				
				// 		if (res[i].projectId === _self.project.projectId) {
				
				// 			_self.orgList = res[i].orgList
				// 		}
				// 	}
				// }
			}).catch(err => {
				
				_self.$u.toast(err.msg)
				
			})
			

		},
		computed: {
			checkShow: function() {

				return function(val) {

					if (val === this.g_userProfile.project.org.orgId) {
						return true;
					} else {
						return false;
					}
				}
			}

		},
		methods: {



			async loadSelectedProject(e) {
				
				try{
				let userProfile = {}
				console.log(e)
				//用户默认项目信息
				// this.project = await this.$u.api.project({
				// 	accountId: this.g_userProfile.accountId,
				// 	projectId: this.project.projectId,
				// 	projectName: this.project.projectName,
				// 	orgId: e.orgId,
				// 	orgName: e.orgName,
				// })
				
				// console.log(this.project)
				/* 获取登陆用户选定项目信息
				 * @param accountId 	用户账号Id
				 * @param projectId 	项目对象
				 * @param projectName	项目名字
				 * @param orgId			组织Id
				 * @param orgName		组织名字
				 * @returns {*}
				 */
				this.project.project = await this.$u.api.getProjectById({
					projectId: this.project.id
				})
				
				this.project.project.org = await this.$u.api.getOrgById({
					orgId: e.orgId
				})
				
				
				userProfile = this.g_userProfile

				userProfile.project = this.project.project
				
				
				//保存全局用户配置信息
				await this.$u.vuex('g_userProfile', userProfile);
				
				
				console.debug(this.g_userProfile)
				
				
				}catch(err){
					console.log(err)
					this.$u.toast(err.msg)
				}

			}


		},
	}
</script>

<style lang="scss">

</style>
