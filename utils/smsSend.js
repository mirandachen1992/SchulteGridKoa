/**
 * Created by lotuslwb on 16/10/22.
 */


var SMSClient = require('@alicloud/sms-sdk')
var accessKeyId = 'LTAIz7pJTxZsIdmo'
var secretAccessKey = 'TZGQsTJpebBJz3QNNk1oL59TIUleqZ'
//初始化sms_client
var smsClient = new SMSClient({
    accessKeyId,
    secretAccessKey
})

function smsSend(code, tel) {
    //发送短信

    var promise = new Promise((resolve, reject) => {
        smsClient.sendSMS({
            PhoneNumbers: tel,
            SignName: '偷偷告诉你SaySome',
            TemplateCode: 'SMS_134780130',
            TemplateParam: JSON.stringify({
                "code": code
            })
        }).then(function (res) {
            var Code = res.Code;
            console.log(Code);
            if (Code === 'OK') {
                //处理返回参数
                resolve(Code);
            } else {
                reject(Code);
            }
        }, function (err) {
            reject(err)
        })
    });
    return promise;
}


module.exports = smsSend;