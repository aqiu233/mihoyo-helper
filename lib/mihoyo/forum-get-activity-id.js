const superagent = require('superagent');
const util = require('util');
const urls = require('url');
const querystring = require('querystring');

const URL = "https://bbs-api.mihoyo.com/apihub/api/home/new?gids=%s";

module.exports = async (forum) => {

  let res = await superagent.get(util.format(URL, forum.id));
  res.body.data.navigator.forEach(element => {
    if(element.name === "福利补给") {
      let appPath = urls.parse(element.app_path);
      var params = querystring.parse(appPath.query);
    
    //   console.log(res.text);
      console.log("GetActivityId【%s】 %s", res.body.data.navigator[2].name, params.act_id);
      return params.act_id;
    }
  });
  console.log("Activity ID not Found!")
  process.exit();
}
