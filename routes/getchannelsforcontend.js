const localDatabase = require("./Database");

const db = new localDatabase("channels");

async function getchannelsforcontend(req, res) {
  let channels = await db.getValue("channelss");
  if (!channels)
    return res.send({
      success: false,
      msg: "no channels",
      channels: null,
    });
  channels = JSON.parse(channels);
  return res.send({
    success: true,
    msg: "",
    channels,
  });
}

module.exports = getchannelsforcontend;
