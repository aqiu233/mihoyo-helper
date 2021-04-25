const superagent = require('superagent');

const URL = "https://api-takumi.mihoyo.com/binding/api/getUserGameRolesByStoken";

module.exports = async () => {

  let res = await superagent.get(URL).set(getHeader());

  var result = '';
  res.body.data.list.forEach(playerData => {
    
    if (playerData.game_biz == 'bh3_cn' && playerData.is_chosen) {

        result = playerData.region;
        
    }
  });
  
  console.log("GetDefaultRegion【%s】 OK", result);
  return result;

}