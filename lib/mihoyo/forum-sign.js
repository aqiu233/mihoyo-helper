const superagent = require('superagent');
const util = require('util');

const URL = "https://api-takumi.mihoyo.com/apihub/sapi/signIn?gids=%s";

module.exports = async (forum) => {

  let res = await superagent.post(util.format(URL, forum.id)).set(getHeader());
  console.log("签到【%s】 %s", forum.name, res.body.message);

}