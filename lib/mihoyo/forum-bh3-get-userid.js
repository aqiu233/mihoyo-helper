const superagent = require('superagent');

const URL = "https://api-takumi.mihoyo.com/binding/api/getUserGameRolesByStoken";

module.exports = async (regionName) => {

  let res = await superagent.get(URL).set(getHeader());

  let resObj = JSON.parse(res.text);

  var result = '';
  resObj.data.list.forEach(playerData => {
    
    if (playerData.region == regionName) {

      result = playerData.game_uid;
    
      }
  });
  
  console.log("GetUserid【%s】 %s", regionName, result);
  return result;

}