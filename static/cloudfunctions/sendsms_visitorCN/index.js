// 异步返回结果
const cloud = require('wx-server-sdk')

var QcloudSms = require("qcloudsms_js");


var appid = 1400435357;  // 短信应用SDK AppID
var appkey = "24e631c8dc13e4b2ae1daf1d7c206168"; // 短信应用SDK AppKey

// 需要发送短信的手机号码
// var phoneNumbers = ["21212313123", "12345678902", "12345678903"];

var templateId = 740460;  // 短信模板ID，需要在短信应用中申请
var smsSign = "第一太平戴维斯";  // 签名

// 实例化QcloudSms
var qcloudsms = QcloudSms(appid, appkey);

// 云函数入口函数

// 此处需使用 Promise 异步返回结果
exports.main = async (event, context) => new Promise((resolve, reject) => {
  var ssender = qcloudsms.SmsSingleSender();
  // var params = ["5678"];
  ssender.sendWithParam(86, event.phone, templateId,
  event.params, smsSign, "", "", (err, res, resData) => {
  // 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
     if (err) {
        console.log("err: ", err);
        reject({
          err
        })
      } else {
        resolve({
          res,
          resData
        })
      }
  });
})