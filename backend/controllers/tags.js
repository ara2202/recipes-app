const Tag = require('../models/Tag');

async function getTags(ctx)
{
    const tags = await Tag.find({});
    ctx.body = {tags}

}

module.exports = {
    getTags
  }