/**
 * Created by lotuslwb on 16/10/22.
 */


var SMSClient = require('@alicloud/sms-sdk')
var accessKeyId = 'LTAIz7pJTxZsIdmo'
var secretAccessKey = 'TZGQsTJpebBJz3QNNk1oL59TIUleqZ'
//初始化sms_client
var smsClient = new SMSClient({accessKeyId, secretAccessKey})

function smsSend(code, tel) {
    //发送短信

    var promise = new Promise((resolve, reject) => {
        smsClient.sendSMS({
            PhoneNumbers: tel,
            SignName: '结婚邀请函',
            TemplateCode: 'SMS_134780130',
            TemplateParam: JSON.stringify({"code": code})
        }).then(function (res) {
            var Code = res.Code;
            if (Code === 'OK') {
                //处理返回参数
                resolve(res)
            }
        }, function (err) {
            reject(err)
        })
    });

    return promise;
}


module.exports = smsSend;