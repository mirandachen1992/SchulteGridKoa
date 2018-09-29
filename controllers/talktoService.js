import {
  errorWrapper,
  successWrapper
} from '../utils/utils.js';
import SMSModel from '../models/sms';
import config from '../talktoConfig.json';
import path from 'path';
import moment from 'moment';
const request = require('request-promise');
const fs = require('fs');

export const login = async (ctx, next) => {
  let {
    code
  } = ctx.request.body;
  let {
    AppId,
    AppSecret
  } = config;
  var options = {
    method: 'GET',
    uri: `https://api.weixin.qq.com/sns/jscode2session?appid=${AppId}&secret=${AppSecret}&js_code=${code}&grant_type=authorization_code`,
    json: true
  };
  let result = await request(options);
  ctx.response.body = successWrapper(result);
}



export const createSMS = async (ctx, next) => {
  ctx.set('Cache-Control', 'no-cache');
  let request = ctx.request.body;
  let {
    openId,
    tel,
    text,
  } = request;
  let {
    limitSMS
  } = config;
  let createTime = moment().format('YYYYMMDD');
  let res = await SMSModel.find({
    openId,
    createTime
  });
  let code = genCode(6);
  let postData = {
    openId,
    tel,
    text,
    createTime,
    code
  }
  // 判断是否超过每日限制
  if (res.length >= limitSMS) {
    ctx.response.body = errorWrapper(`每天只能发送${limitSMS}条哦`);
  } else {
    let recordData = new SMSModel(postData);
    let result = await recordData.save().then(data => {
      return '保存成功'
    })
    ctx.response.body = successWrapper(result);
  }

}


// 生成验证码
function genCode(len) {
  var code = '';
  for (var i = 0; i < len; i++) {
    code = code + Math.floor(1 + Math.random() * 9).toString();
  }
  return code;
}