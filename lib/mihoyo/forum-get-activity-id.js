const superagent = require('superagent');
const util = require('util');
const urls = require('url');
const querystring = require('querystring');

const URL = "https://bbs-api.mihoyo.com/apihub/api/home/new?gids=%s";

module.exports = async (forum) => {

  let res = await superagent.get(util.format(URL, forum.id));

  var appPath,params;

  res.body.data.navigator.forEach(element => {
  
    if (element.name === "福利补给") {

      appPath = urls.parse(element.app_path);
      params = querystring.parse(appPath.query);
      
      console.log("GetActivityId【%s】 %s", element.name, params.act_id);
    
    }
  
  });
  
  return params.act_id;

}
