const DisplayName = require('../models/DisplayName');

async function getDisplayNames(ctx)
{
    const displayNames = await DisplayName.find({});
    ctx.body = {displayNames}

}

module.exports = {
    getDisplayNames
  }