const Tag = require("../models/Tag");
const TagCategory = require("../models/TagCategory");
const Recipe = require("../models/Recipe");

async function getTags(ctx) {
  const tgs = await Tag.find({});
  const tags = tgs.map(({ id, tagName, category }) => ({
    id,
    tagName,
    tagColor: category.tagColor
  }));
  ctx.body = { tags };
}

async function getTagsCollection(ctx) {
  let tagsCollection = await TagCategory.find({}).populate({
    path: "tags",
    options: { autopopulate: false },
    select: "tagName _id"
  });

  tagsCollection = await Promise.all(
    tagsCollection.map(async i => ({
      tagCategory: i.tagCategory,
      tags: await Promise.all(
        i.tags.map(async ({ tagName, _id }) => {
          const count = await Recipe.countDocuments({
            tags: _id
          });
          return {
            tagName,
            count,
            id: _id
          };
        })
      )
    }))
  );

  ctx.body = { tagsCollection };
}

module.exports = {
  getTags,
  getTagsCollection
};
