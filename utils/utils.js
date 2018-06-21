var errorWrapper = function(message) {
    return {
      "success": 1,  //success 0代表成功 1代表失败
      "code": "500", //code 正常为200 异常为异常码
      "message": message     //message 正常为"" 异常为具体错误信息
     }
}

var successWrapper = function(data, message) {
    return {
      "success": 0,  //success 0代表成功 1代表失败
      "code": "200", //code 正常为200 异常为异常码
      "message": message,     //message 正常为"" 异常为具体错误信息
      "data": data
    }
}

exports.errorWrapper = errorWrapper;
exports.successWrapper = successWrapper;