const superagent = require('superagent');
const util = require('util');
const urls = require('url');
const querystring = require('querystring');

const URL = "https://bbs-api.mihoyo.com/apihub/api/home/new?gids=%s";

module.exports = async (forum) => {

  let res = await superagent.get(util.format(URL, forum.id));

  let resObj = JSON.parse(res.text);
  let appPath = urls.parse(resObj.data.navigator[2].app_path);
  var params = querystring.parse(appPath.query);

//   console.log(res.text);
  console.log("GetActivityId【%s】 %s", resObj.data.navigator[2].name, params.act_id);
  return params.act_id;
}