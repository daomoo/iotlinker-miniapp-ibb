
function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function (n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}


// 获取页面路径
const getPagePath=()=>{
	let pageArr=getCurrentPages(); //页面集合
	let currPage=pageArr[pageArr.length-1]; //当前页面数据
	let pageParam={}; //当前页面参数
	// #ifdef H5 || APP-PLUS
	pageParam=currPage.$mp?currPage.$mp.query:{};
	// #endif
	// #ifdef MP
	pageParam=currPage.options;
	// #endif

	let paramStr=''; //拼接的参数
	// 判断对象不为空
	if(Object.keys(pageParam).length>0){
		for(let item in pageParam){
			paramStr+=`&${item}=${pageParam[item]}`;
		}
		paramStr=paramStr.replace('&',''); //去掉第一个&
	}
	let pagePath=`/${currPage.route}?${paramStr}`; //当前页面地址,路由+参数
	return pagePath;
}


function dataURItoBlob  (base64Data) {
	var byteString;
	if (base64Data.split(',')[0].indexOf('base64') >= 0)
	byteString = atob(base64Data.split(',')[1]);
	else
	byteString = unescape(base64Data.split(',')[1]);
	var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
	var ia = new Uint8Array(byteString.length);
	for (var i = 0; i < byteString.length; i++) {
	ia[i] = byteString.charCodeAt(i);
	}
	return new Blob([ia], {type:mimeString});
}



var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function (milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function (dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function (number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function (str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	},
	//选择日期
	getDay: function  (day) {
		let today = new Date();
		let targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
		// console.log(today.getTime())
		// console.log(targetday_milliseconds)
		today.setTime(targetday_milliseconds); //注意，这行是关键代码
	
		let tYear = today.getFullYear();
		let tMonth = today.getMonth();
		let tDate = today.getDate();
		tMonth = this.doHandleMonth(tMonth + 1);
		tDate = this.doHandleMonth(tDate);
		return tYear + "-" + tMonth + "-" + tDate;
	},
	doHandleMonth: function (month) {
		let m = month;
		if (month.toString().length == 1) {
			m = "0" + month;
		}
		return m;
	},
};

  


module.exports = {
	formatTime: formatTime,
	formatLocation: formatLocation,
	dateUtils: dateUtils,
	dataURItoBlob:dataURItoBlob,
}
