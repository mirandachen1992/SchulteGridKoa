import {
  errorWrapper,
  successWrapper
} from '../utils/utils.js';
import HelpModel from '../models/help.js';
import config from '../helpmissConfig.json';
import uploadFile from '../utils/uploadFile';


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



export const createHelp = async (ctx, next) => {
  ctx.set('Cache-Control', 'no-cache');
  let request = ctx.request.body;
  let postDataKeys = ["openId", "createTime", "missTime", "missName", "missSex", "missAddress", "missAddressText", "missDetailText", "contactName", "contactTel", "picUrls", "helpType"];
  let postData = postDataKeys.reduce((data, ikey) => (data[ikey] = request[ikey], data), {});
  postData.createTime = new Date().getTime();
  let recordData = new HelpModel(postData);
  let result = await recordData.save().then(data => {
    return '保存成功'
  })
  ctx.response.body = successWrapper(result);
}

export const queryHelpList = async (ctx, next) => {
  ctx.set('Cache-Control', 'no-cache');
  let request = ctx.request.body;
  let {
    openId,
    counts
  } = request;
  let queryStr = openId ? {
    openId,
  } : {};
  let res = await HelpModel.find(queryStr).sort({
    createTime: -1
  }).limit(counts * 1);
  // 无结果
  if (res.length <= 0) {
    ctx.response.body = errorWrapper(`没有查到结果哦`);
  } else {
    ctx.response.body = successWrapper(res);
  }
}

export const queryHelpType = async (ctx, next) => {
  ctx.set('Cache-Control', 'no-cache');
  let {
    helpType
  } = config;
  let res = Object.keys(helpType).reduce((arry, key) => {
    arry.push({
      text: helpType[key],
      value: key
    })
    return arry;
  }, []);
  ctx.response.body = successWrapper(res);
}

export const upload = async (ctx, next) => {
  ctx.set('Cache-Control', 'no-cache');
  console.log(ctx.response.req);
  let path = 'https://sg.eldesign.cn/files/helpmiss/';
  let filename = ctx.req.file.filename;
  ctx.response.body = successWrapper(path + filename);
}