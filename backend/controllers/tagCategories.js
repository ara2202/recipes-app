//const Tag = require('../models/Tag');
const TagCategory = require('../models/TagCategory');

async function getTagCategories(ctx)
{
    const tagCategories = await TagCategory
        .find({})
        .populate(
        {
          path: 'tags',
          options: { autopopulate: false },
          select: 'tagName -_id'
        }
    );
    //const tags = tgs.map(({id, tagName, category}) => ({id, tagName, tagColor: category.tagColor}));
    ctx.body = {tagCategories}

}

module.exports = {getTagCategories};