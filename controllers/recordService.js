import { errorWrapper, successWrapper } from '../utils/utils.js';
import Record from '../models/record';
import config from '../appConfig.json';
const request = require('request-promise');


export const saveRecord = async (ctx, next) => {
  ctx.set('Cache-Control', 'no-cache');
  let request = ctx.request.body;
  let { record, nickName, openId, avatarUrl, type } = request;
  let res = await Record.find({ openId:'a' });
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

export const getList = async (ctx, next) => {
  let request = ctx.params;
  let { type } = request;
  let res = [];

  await Record.find({
      [`record_type${type}`]: { $gt: 0 }
    }).sort({
      [`record_type${type}`]: -1
    }).lean()
    .then(
      (docs) => {
        docs.map(data => {
          let { openId, nickName, avatarUrl } = data;
          res.push({ openId, nickName, avatarUrl, record: data[`record_type${type}`] })
        })
      }
    )
  ctx.response.body = successWrapper(res);
}


