const _ = require('lodash');
const async = require('async');
const utils = require('./lib/utils');

const FORUM_MAP = require('./lib/mihoyo/forum-map');

const forumSignIn = require('./lib/mihoyo/forum-sign');
const forumPostList = require('./lib/mihoyo/forum-post-list');
const forumPostDetail = require('./lib/mihoyo/forum-post-detail');
const forumPostVote = require('./lib/mihoyo/forum-post-vote');
const forumPostShare = require('./lib/mihoyo/forum-post-share');
const forumGetActivitys = require('./lib/mihoyo/forum-get-activity-id');
const forumBh3GetUserid = require('./lib/mihoyo/forum-bh3-get-userid');
const forumBh3GetDailyReward = require('./lib/mihoyo/forum-bh3-get-daily-reward');
const forumBh3GetDefaultRegion = require('./lib/mihoyo/forum-bh3-get-default-region');

// Init
require('./lib/global').init();

// Configs
const customregionId = false;
var regionId = 'android01';



const init = async function() {

  // BH3 Daily Reward Get
  var act_id;
  await async.eachSeries(FORUM_MAP, async (forum) => {
    if (forum.id == 1) {
      act_id = await forumGetActivitys(forum);
      await utils.randomSleepAsync();
    }
  });
  if (!customregionId) {
    regionId = await forumBh3GetDefaultRegion();
    await utils.randomSleepAsync();
  }
  var uid = await forumBh3GetUserid(regionId);
  await utils.randomSleepAsync();
  await forumBh3GetDailyReward(act_id,uid,regionId);
  await utils.randomSleepAsync();
  
  // Sign In
  await async.eachSeries(FORUM_MAP, async (forum) => {
    await forumSignIn(forum);
    await utils.randomSleepAsync();
  });

  // Read, vote, share
  await async.eachSeries(FORUM_MAP, async (forum) => {
    let postList = await forumPostList(forum);
    console.log("PostListCount:" + postList.length);
    await utils.randomSleepAsync();

    await async.eachSeries(postList, async ({post}) => {
      await forumPostDetail(post);

      await utils.randomSleepAsync();

      await forumPostVote(post);

      await utils.randomSleepAsync();
    });

    let sharePost = postList[postList.length - 1];
    await forumPostShare(sharePost.post);
  });
};

init();
