const Tag = require('../models/Tag');
const TagCategory = require('../models/TagCategory');

async function getTags(ctx)
{
    const tgs = await Tag.find({});
    //console.log(tgs);
    const tags = tgs.map(({id, tagName, category}) => ({id, tagName, tagColor: category.tagColor}));
    ctx.body = {tags}

}

module.exports = {
    getTags
  }