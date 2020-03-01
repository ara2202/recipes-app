const DisplayName = require('../models/ProductDisplayNames');

async function getProductDisplayNames(ctx)
{
    const displayNames = await DisplayName.find({});
    ctx.body = {displayNames}

}

module.exports = {
    getProductDisplayNames
  }