import conf from "@/common/config/config.js"

const baseUrl = conf.baseUrlVersion;

export default {
	
	baseUrl: baseUrl,
	
	// 公众号刷新token
	wechatRefrashToken: baseUrl + "refreshToken", 
	
	// 根据临时秘钥登录
	userLoginOwnerByKey: baseUrl + "loginOwnerByKey", 
	
	// 登陆
	userLogin: baseUrl + '/sys/token/nocode', 
	
	//短消息验证码登陆
	userLoginBySmsCode: baseUrl + '/sys/token/sms',
	
	//用户配置信息
	userInfo: baseUrl + '/account',
	
	//上传头像
	userUploadAvater: baseUrl + '/account/avatar',
	
	//发送验证码
	userSendSms: baseUrl + '/sys/sms/code',
	
	//获取雇员项目信息
	projectList: baseUrl + '/project/list',
	
	//获取项目信息
	projectById: baseUrl + '/project',
	
	//获取项目组织信息
	projectOrganization: baseUrl + '/project/org',
	
	//获取组织信息
	organizationById: baseUrl +  '/org',
	
	//获取二维码
	qrcode: baseUrl + '/transit/qrcode',
	
	//获取通行日志
	transitLog: baseUrl + '/transit/log/list',
	
	//获取通行区域
	arrangeByProject: baseUrl + '/transit/arrange/project',
	
	//获取房间室号
	resourceByOrgId: baseUrl + 'project/resource/ByOrgId',
	
	
	
	//获取新闻资讯
	news: baseUrl + 'news',
	
	//获取访客邀请
	visitorInvitation: baseUrl +'/visitor/invitation/create',
	
	//重新获取访客邀请信息
	visitorApplyRepeat: baseUrl +'visitor/apply/Repeat',
	
	
	//访客历史记录查询
	visitorApplyList: baseUrl + '/visitor/invitation/list',
	
	//获取访客邀请函信息
	visitorApplyInfo: baseUrl + '/visitor/invitation/{id}',
	
	//获取用户通行区域
	regionalArrange: baseUrl + 'transit/regional/arrange',
	
	
	
	
	}
	
	