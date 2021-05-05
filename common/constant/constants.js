export const ACCESS_TOKEN = 'accessToken'
export const USER_NAME = 'login_username'
export const USER_INFO = 'login_user_info'
export const USER_PROFILE = 'userProfile'

export const NOTICE_VIEW = "NOTICE";
export const MNOTICE_VIEW = "MNOTICE";
export const BILL_VIEW = "BILL";
export const RN_MAIN_SERVE = "MSERVE";
export const TJFX_VIEW = "TJFX";//统计分析
export const YUFX = "YUFX";//营运分析
export const SERVE_MORE = "SERVE_MORE";//服务页-更多
export const k_tjfx_v2 = "k_tjfx_v2";//原统计分析 为 租赁管理 此统计分析 为新
export const k_sbxj_v2 = "k_sbxj_v2";// 设备巡检
export const k_txmm_v2 = "k_txmm_v2";// 通密码
export const k_dianr_v2 = "k_dianr_v2";// 点融
export const k_kaiyl_v2 = "k_kaiyl_v2";// 开业啦
export const k_yuekj_v2 = "k_yuegj_v2";// 悦管家
export  const securityAnalysis="securityAnalysis";//安防统计
export const maintenanceName="maintenanceName";//名单运维
export const maintenanceNotice="maintenanceNotice";//运维通知
export  const RN_MAIN_HOME="RN_MAIN_HOME";
export const RN_MAIN_MEETING="RN_MAIN_MEETING";//会议室
export  const RN_CLOSE="RN_CLOSE"; //关闭当前页
export  const  RN_WEBPAGE="RN_WEBPAGE"; //咨询活动页
export  const RN_SKIP="RN_SKIP";


const STORAGE_OPTIONS = {
  namespace: 'pro__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local', // storage name session, local, memory
}



export default STORAGE_OPTIONS;


