// export const BaseMenus = new Map([
//     ["201", { title:"系统运维",languageKey:"service_menu_system_maintenance_mgr",code:"201"}],
//     ["202", {title:"管理服务",languageKey:"service_manager",code:"202"}],
//     ["203", {title:"智能门禁",languageKey:"service_menu_door_guard_mgr_menu",code:"203"}],
//     ["204", {title:"物业服务",languageKey:"service_menu_property_mgr_menu",code:"204"}],
//     ["205", {title:"经营服务",languageKey:"service_operating_service",code:"205"}],
//     ["206", {title:"企业服务",languageKey:"service_menu_company_service_mgr",code:"206"}],
// ]);

// "[{"code":"20503","isHome":"0","title":"生活广场","type":"0","url":"app/hpage/manager/frame/third/serve/20503"},{"code":"20507","isHome":"0","title":"快满租","type":"0","url":"app/hpage/manager/frame/third/serve/20507"},{"code":"20505","isHome":"0","title":"智慧停车","type":"0","url":"app/hpage/manager/frame/third/serve/20505"},{"code":"20506","isHome":"0","title":"白领生活","type":"0","url":"app/hpage/manager/frame/third/serve/20506"},{"code":"20303","isHome":"0","title":"通行区域","type":"0","url":""},{"code":"20304","isHome":"0","title":"通行日志","type":"0","url":""},{"code":"20307","isHome":"0","title":"邀请访客","type":"0","url":""}]"

export const ServiceMenus = new Map([
    
	["20301", {
        title: "智能门禁",
        code: "20301",
        languageKey: "service_menu_door_guard_mgr",
        img: '/static/images/themes/default/menus/service_traffic_accessControl.png',
		
    }],
	["20302", {
        title: "访客管理",
        code: "20302",
        languageKey: "service_visitor_manager",
        img: require('../../static/img/menuIcon/accessControl1x.png'),
		
    }],
	["20303", {
	    title: "通行区域",
	    code: "20303",
	    languageKey: "service_menu_traffic_area_mgr",
	    img: '/static/images/themes/default/menus/service_traffic_area.png',
		path: '/pages/module/pass/myRegional'
	}],
	["20304", {
	    title: "通行日志",
	    code: "20304",
	    languageKey: "service_menu_traffic_log_mgr",
	    img: '/static/images/themes/default/menus/service_traffic_logs.png',
		path: '/pages/module/pass/myPassLog'
	}],
	["20305", {
	    title: "通行密码",
	    code: "20305",
	    languageKey: "service_traffic_pwd",
	    img: require('../../static/img/menuIcon/accessControl1x.png')
	}],
	["20306", {
	    title: "扫码通行",
	    code: "20306",
	    languageKey: "service_passcard_scan_pass",
	    img: '/static/images/themes/default/menus/service_scan_qrcode.png'
	}],
	["20307", {
	    title: "邀请访客",
	    code: "20307",
	    languageKey: "service_invite_visitor",
	    img: '/static/images/themes/default/menus/service_invite_visitor.png',
		path: '/pages/module/visitor/index'
	}],
	
	["10902", {
	    title: "消息通知",
	    code: "20602",
	    languageKey: "service_community_news",
	    img: '/static/images/themes/default/menus/service_community_news.png',
		path: '/pages/module/news/index'
	}],
	
	
	// ["20101", {
 //        title: "设备巡检",
 //        code: "20101",
 //        languageKey: "service_menu_equipment_mgr",
 //        img: require('/static/images/themes/default/menus/service_menu_equipment_mgr.png')
 //    }],
 //    ["20102", {
 //        title: "名单运维",
 //        code: "20102",
 //        languageKey: "service_menu_name_maintenance_mgr",
 //        img: require('/static/images/themes/default/menus/service_menu_name_maintenance_mgr.png')
 //    }],
 //    ["20103", {
 //        title: "运维通知",
 //        code: "20103",
 //        languageKey: "service_menu_notice_maintenance_mgr",
 //        img: require('/static/images/themes/default/menus/service_menu_notice_maintenance_mgr.png')
 //    }],

 //    ["20201", {
 //        title: "物业工单",
 //        code: "20201",
 //        languageKey: "service_menu_order_mgr",
 //        img: require('/static/images/serve/icon_main_serve_10024.png')
 //    }],
 //    ["20202", {
 //        title: "安防分析",
 //        code: "20202",
 //        languageKey: "service_access_report",
 //        img: require('/static/images/themes/default/menus/service_security_analysis.png')
 //    }],
 //    ["20203", {
 //        title: "营运分析",
 //        code: "20203",
 //        languageKey: "service_service_analyis",
 //        img: require('/static/images/themes/default/menus/service_service_analyis.png')
 //    }],
 //    ["20204", {
 //        title: "投诉处理",
 //        code: "20204",
 //        languageKey: "service_complaint_procss",
 //        img: require('/static/images/serve/icon_main_serve_10003.png')
 //    }],
 //    ["20205", {
 //        title: "设备巡检",
 //        code: "20205",
 //        languageKey: "service_menu_equipment_mgr",
 //        img: require('/static/images/serve/sbxj_v2.png')
 //    }],
 //    ["20206", {
 //        title: "名单运维",
 //        code: "20206",
 //        languageKey: "service_menu_name_maintenance_mgr",
 //        img: require('/static/images/serve/maintenance.png')
 //    }],
 //    ["20207", {
 //        title: "运维通知",
 //        code: "20207",
 //        languageKey: "service_menu_notice_maintenance_mgr",
 //        img: require('/static/images/serve/maintenance_name.png')
 //    }],
 //    ["20401", {
 //        title: "物业服务",
 //        code: "20401",
 //        languageKey: "service_menu_property_mgr",
 //        img:  require('/static/images/serve/icon_main_serve_10014.png')
 //    }],
 //    ["20402", {
 //        title: "物业公告",
 //        code: "20402",
 //        languageKey: "service_notice",
 //        img:require('/static/images/serve/icon_main_serve_10015.png')
 //    }],
 //    ["20403", {
 //        title: "投诉建议",
 //        code: "20403",
 //        languageKey: "service_menu_property_advice_mgr",
 //        img: require('/static/images/themes/default/menus/service_menu_property_advice_mgr.png')
 //    }],
 //    ["20404", {
 //        title: "会议预定",
 //        code: "20404",
 //        languageKey: "service_meetting_subscribe",
 //        img: require('/static/images/serve/icon_main_serve_10016.png')
 //    }],

 //    ["20501", {
 //        title: "账单管理",
 //        code: "20501",
 //        languageKey: "service_menu_bill_order_mgr",
 //        img: require('/static/images/serve/icon_main_serve_10018.png')
 //    }],

 //    ["20601", {
 //        title: "开业啦",
 //        code: "20601",
 //        languageKey: "service_menu_start_business_mgr",
 //        img: require('/static/images/serve/icon_main_serve_10023.png')
 //    }],
 //    ["20602", {
 //        title: "悦管家",
 //        code: "20602",
 //        languageKey: "service_menu_yue_guard_mgr",
 //        img: require('/static/images/serve/yueguanjia.png')
 //    }],

]);


// export const serviceClick = (NativeModules, code,navigate) => {
//     console.log("code="+code);
//     switch (code) {
//         case"20301": //智能门禁
//         case '10009':
//             NativeModules.MainServeModule.openNativeView('Main_Serve_Znmj', '');
//             break;
//         case "20302": //访客管理
//         case '10010':
//             NativeModules.MainServeModule.openNativeView('Main_Serve_Fkgl', '');
//             break;
//         case "20303": //通行区域
//         case '10011':
//             NativeModules.MainServeModule.openNativeView('Main_Serve_Txqy', '');
//             break;
//         case "20304": //通行日志
//         case '10012':
//             NativeModules.MainServeModule.openNativeView('Main_Serve_Txrz', '');
//             break;
//         case "20401": //物业服务
//         case '10014':
//             NativeModules.MainServeModule.openNativeView('Main_Serve_Wyfw', '');
//             break;
//         case "20402": //物业公告
//         case '10015':
//             NativeModules.MainServeModule.openNativeView('Main_Serve_Wtgg', '');
//             break;
//         case "20403"://服务投诉
//         case '10016':
//             NativeModules.MainServeModule.openNativeView('Main_Serve_Fwts', '');
//             break;
//         case "20501"://账单管理
//         case '10018':
//             NativeModules.MainServeModule.openNativeView('Main_Serve_Zdgl', '');
//             break;
//         case "20601":  //开业啦
//         case '10023':
//             //         this.kaiylAction();
//             global.bbwUrl = APIS.KaiYeLa;
//             navigate("WebViewController",{languageKey:"service_menu_start_business_mgr"});
//             // NativeModules.MainServeModule.openNativeView('RN_SKIP', ViewTypes.k_kaiyl_v2);
//             break;
//         case "20201":  //工单管理
//         case '10024':
//             NativeModules.MainServeModule.openNativeView('10024', '');
//             break;
//         case '10002':
//             NativeModules.MainServeModule.openNativeView('10002', '');
//             break;
//         case '10003':
//             NativeModules.MainServeModule.openNativeView('10003', '');
//             break;
//         case '10004':
//             NativeModules.MainServeModule.openNativeView('10004', '');
//             break;
//         case '10005':
//             NativeModules.MainServeModule.openNativeView('10005', '');
//             break;
//         case '10006':
//             NativeModules.MainServeModule.openNativeView('10006', '');
//             break;
//         case '10007':
//             NativeModules.MainServeModule.openNativeView('10007', '');
//             break;
//         case '10124'://点融
//             NativeModules.MainServeModule.openNativeView('RN_SKIP', ViewTypes.k_dianr_v2);
//             break;
//         case "20602":
//         case '10025':  //悦管家
//             global.bbwUrl = APIS.yueguanjia;
//             navigate("WebViewController",{languageKey:"service_menu_yue_guard_mgr"});
//             // NativeModules.MainServeModule.openNativeView('RN_SKIP', ViewTypes.k_yuekj_v2);
//             break;
//         case "20101":
//         case '10100': // 设备巡检
//             // NativeModules.MainServeModule.openNativeView('RN_SKIP', '{\"viewKey\":\"k_webview\",\"title\":\"设备巡检\",\"url\":\"http://www.baidu.com\"}');
//             //NativeModules.MainServeModule.openNativeView('RN_SKIP', ViewTypes.k_sbxj_v2);
//             global.bbwUrl = APIS.deviceCheck;
//             navigate("WebViewController",{languageKey:"service_menu_equipment_mgr"});
//             break;
//         case "20205": // 设备巡检
//             global.bbwUrl = APIS.deviceCheck+"02";
//             navigate("WebViewController",{languageKey:"service_menu_equipment_mgr"});
//             break;
//         case "20202"://安防分析
//         case '10101': // 统计分析
//             //NativeModules.MainServeModule.openNativeView('RN_SKIP', ViewTypes.k_tjfx_v2);
//             NativeModules.MainServeModule.openNativeView("RN_SKIP", ViewTypes.securityAnalysis);
//             break;

//         case '10127': // 名单运维
//             NativeModules.MainServeModule.openNativeView("RN_SKIP", ViewTypes.maintenanceName);
//             break;

//         case "10128"://运维通知
//             NativeModules.MainServeModule.openNativeView("RN_SKIP", ViewTypes.maintenanceNotice);
//             break;

//         //                NativeModules.MainServeModule.openNativeView('RN_SKIP',''); 新增模块代码示例

//         case "10000000"://更多
//             NativeModules.MainServeModule.openNativeView("RN_SKIP", ViewTypes.RN_MAIN_SERVE);
//             break;
//         case "20203":  //营运分析
//             navigate("managePage",{});
//             break;
//         case "20404":  //会议室预定
//             navigate("MeetingPage",{});
//             break;
//         case "20102"://名单运维
//             global.bbwUrl = APIS.maintenanceName;
//             //navigate("WebViewController",{languageKey:"service_menu_name_maintenance_mgr"});
//             global.languageKey="service_menu_name_maintenance_mgr";
//             navigate("WebViewController",{languageKey:"service_menu_name_maintenance_mgr"});

//             break;
//         case "20206":  //名单运维
//             global.bbwUrl = APIS.maintenanceName+"02";
//             //navigate("WebViewController",{languageKey:"service_menu_name_maintenance_mgr"});
//             global.languageKey="service_menu_name_maintenance_mgr";
//             navigate("WebViewController",{languageKey:"service_menu_name_maintenance_mgr"});

//             break;
//         case "20103": //运维通知
//             global.bbwUrl = APIS.maintenanceNotice;
//             global.languageKey="service_menu_notice_maintenance_mgr";
//              navigate("WebViewController",{languageKey:"service_menu_notice_maintenance_mgr"});
//             break;
//         case "20207":  //运维通知
//             global.bbwUrl = APIS.maintenanceNotice+"02";
//             global.languageKey="service_menu_notice_maintenance_mgr";
//             navigate("WebViewController",{languageKey:"service_menu_notice_maintenance_mgr"});
//             break;
//         case "20305":  //通行密码
//             global.bbwUrl = APIS.Password;
//             global.languageKey="service_traffic_pwd";
//             navigate("WebViewController",{languageKey:"service_traffic_pwd"});
//             break;
//         default:
//             NativeModules.MainServeModule.openNativeView(code, '');
//             break;
//     }
// }