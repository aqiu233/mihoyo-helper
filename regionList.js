const superagent = require('superagent');

const URL = "https://api-takumi.mihoyo.com/binding/api/getUserGameRolesByStoken";

require('./lib/global').init();

const init = async () => {

  let res = await superagent.get(URL).set(getHeader());

  res.body.data.list.forEach(playerData => {
    if (playerData.game_biz == 'bh3_cn') {
        console.log("regionId: %s, regionName:%s, playerName: %s, level:%s",playerData.region,playerData.region_name,playerData.nickname,playerData.level);
    }
    // console.log("RoleList 【%s】 %s", playerData.region, result);

  });
  
//   console.log("GetUserid【%s】 %s", regionName, result);
//   return result;

}

init();