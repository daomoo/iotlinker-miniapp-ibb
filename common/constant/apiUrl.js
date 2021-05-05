import conf from "@/common/config/config.js"

const baseUrl = conf.baseUrlVersion;

export default {
	
	baseUrl: baseUrl,
	
	// 公众号刷新token
	wechatRefrashToken: baseUrl + "refreshToken", 
	
	// 根据临时秘钥登录
	userLoginOwnerByKey: baseUrl + "loginOwnerByKey", 
	
	// 登陆
	userLogin: baseUrl + 'login', 
	
	//短消息验证码登陆
	userLoginBySmsCode: baseUrl + 'loginBySmsCode' ,
	
	//上传头像
	userUploadAvater: baseUrl + 'account/uploadAvatar',
	
	//发送验证码
	userSendSms: baseUrl + 'sms',
	
	//获取组织信息
	projectListByAccountId: baseUrl + 'project/ListByAccountId',
	
	//获取房间室号
	resourceByOrgId: baseUrl + 'project/resource/ByOrgId',
	
	//获取二维码
	qrcodeLong: baseUrl + 'qrcode/create/long',
	
	//获取新闻资讯
	news: baseUrl + 'news',
	
	//获取访客邀请
	visitorInvitation: baseUrl +'visitor/invitation',
	
	//重新获取访客邀请信息
	visitorApplyRepeat: baseUrl +'visitor/apply/Repeat',
	
	
	//访客历史记录查询
	visitorApplyList: baseUrl + 'visitor/apply/list',
	
	//获取访客邀请函信息
	visitorApplyInfo: baseUrl + 'visitor/apply/info',
	
	//获取用户通行区域
	regionalArrange: baseUrl + 'transit/regional/arrange',
	
	
	
	
	}
	
	