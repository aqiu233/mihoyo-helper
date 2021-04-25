const superagent = require('superagent');
const util = require('util');

const URL = "https://api-takumi.mihoyo.com/post/api/getForumPostList?forum_id=%s&is_good=false&is_hot=false&page_size=20&sort_type=1";

module.exports = async (forum) => {

  let res = await superagent.get(util.format(URL, forum.forumId)).set(getHeader());

  return res.body.data.list;
}