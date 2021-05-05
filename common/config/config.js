/**
 * @description 智慧壹码通配置文件
 * @author 		mmjj
 * @date 		2021/02/20
 * 
 */

if(process.env.NODE_ENV == 'development'){
	//本地环境 development
}else{
	//线上环境 production
}


// #ifdef H5
// 服务器域名 公众号时，配置为 / 就可以
// const baseUrl = '/'; 
// #endif

//服务器域名 小程序 或者 app 时 后端地址
//开发环境
// #ifdef H5
const baseUrl = "http://ito.com:8088"; 
//正式环境
// const baseUrl = 'http://api.ibaoban.com/'; 
// #endif

// const REQUEST_Content-Type = 'Content-Type':'application/x-www-form-urlencoded'
//请求mackey
const MAC_KEY = '*Ke7p~y{SX~9ZZw]Aku+';
const MAC_VERSION = '1$1%2';
const baseUrlVersion = '';
const appCodeName = 'WXIBB'

//默认项目
const DEFAULT_PROJECT_ID = "795124065877757952";
const DEFAULT_PROJECT_NAME = "上海中星城";


// 微信公众号 appId，小程序和app 可以不用修改
const wxAppId="wxf151fcd3e9bd2984"; //微信AppId

//app支付时这里需要填写支付秘钥
const appPayKey="";

const logLevel="DEBUG"; // 日志级别

export default{
	baseUrl:baseUrl,
	baseUrlVersion:baseUrlVersion,
	appCodeName:appCodeName,
	DEFAULT_PROJECT_ID:DEFAULT_PROJECT_ID,
	MAC_KEY:MAC_KEY,
	MAC_VERSION:MAC_VERSION,
	DEFAULT_PROJECT_NAME:DEFAULT_PROJECT_NAME,
	wxAppId:wxAppId,
	logLevel:logLevel,
	appPayKey:appPayKey
}