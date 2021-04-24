const superagent = require('superagent');
const util = require('util');

const URL = "https://api-takumi.mihoyo.com/common/euthenia/sign";

module.exports = async (act_id,uid,region) => {

  let post = util.format('{"act_id":"%s","region":"%s","uid":"%s"}',act_id,region,uid);
  let res = await superagent.post(URL).set(getHeader()).send(post);
  console.log("Get Daily Reward【%s】 %s",act_id,res.body.message);
  
}