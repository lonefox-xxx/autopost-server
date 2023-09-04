const localDatabase = require("./Database");

const db = new localDatabase("channels");

async function getChannelInfo(req, res) {
  const channesldata = await db.getValue("channelss");

  res.send(JSON.parse(channesldata));
}

module.exports = getChannelInfo;
