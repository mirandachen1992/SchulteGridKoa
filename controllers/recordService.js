import { errorWrapper, successWrapper } from '../utils/utils.js';
import Record from '../models/record';
import Token from '../models/token';
import config from '../appConfig.json';
import path from 'path';
const request = require('request-promise');
const fs = require('fs');



export const saveRecord = async (ctx, next) => {
  ctx.set('Cache-Control', 'no-cache');
  let request = ctx.request.body;
  let { record, nickName, openId, avatarUrl, type } = request;
  let res = await Record.find({ openId });
  let postData = { ...request, [`record_type${type}`]: record };
  let result;
  // 判断是否有记录
  if (res.length) {
    let currentRecord = res[0][`record_type${type}`];
    // 判断成绩是否为最好成绩
    if (currentRecord && currentRecord < record) {
      result = '当前为最好成绩'
    } else {
      result = await Record.update({ openId }, postData).then(data => {
        return '更新成功'
      })
    }
  } else {
    let recordData = new Record(postData);
    result = await recordData.save().then(data => {
      return '保存成功'
    })
  }
  ctx.response.body = successWrapper(result);
}

export const getRecord = async (ctx, next) => {
  ctx.set('Cache-Control', 'no-cache');
  let request = ctx.params;
  let { openId, type } = request;
  let res = await Record.find({ openId });
  ctx.response.body = successWrapper(res.length ? res[0][`record_type${type}`] : 0);
}

export const login = async (ctx, next) => {
  let { code } = ctx.request.body;
  let { AppId, AppSecret } = config;
  var options = {
    method: 'GET',
    uri: `https://api.weixin.qq.com/sns/jscode2session?appid=${AppId}&secret=${AppSecret}&js_code=${code}&grant_type=authorization_code`,
    json: true
  };
  let result = await request(options);
  ctx.response.body = successWrapper(result);
}

export const getMiniProgramQrcode = async (ctx, next) => {
  let { AppId, AppSecret } = config;
  let access_token = '';
  let date = new Date();
  // 查找是否生成过token
  let tokens = await Token.find({});
  let currentToken = tokens[0];
  // 验证access_token是否失效
  if(currentToken && (date.getTime()-currentToken.save_time)/1000 < currentToken.expires_in) {
    access_token = currentToken.access_token;
  } else {
    // 失效先清空token
    if(currentToken) {
      await Token.remove({})
    }
    
    // 重新获取access_token
    var options = {
      method: 'GET',
      uri: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${AppId}&secret=${AppSecret}`,
      json: true
    };
    let result = await request(options);
    let token = new Token({...result, save_time: date.getTime()});
    await token.save();
    access_token = result.access_token;
    let options1 = {
      method: 'POST',
      uri: `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${result.access_token}`,
      json: true,
      body: {
        scene: 'test',
        page: 'pages/home/index'
      }
    }
    // 获取二维码并保存
    let result1 = await request(options1).pipe(fs.createWriteStream('/usr/etc/miniprogramqrcode.png'));
  }
  
  let fileUrl = 'https://' + ctx.headers.host + '/miniprogramqrcode.png';    
  ctx.response.body = successWrapper(fileUrl);
}

export const getList = async (ctx, next) => {
  let request = ctx.params;
  let { type } = request;
  let res = [];

  await Record.find({
      [`record_type${type}`]: { $gt: 0 }
    }).sort({
      [`record_type${type}`]: 1
    }).lean()
    .then(
      (docs) => {
        docs.map((data, key) => {
          let { openId, nickName, avatarUrl } = data;
          res.push({ openId, nickName, avatarUrl, record: data[`record_type${type}`] , number: key + 1})
        })
      }
    )
  ctx.response.body = successWrapper(res);
}


