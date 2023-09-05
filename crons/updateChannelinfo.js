const { json } = require("body-parser");
const localDatabase = require("../routes/Database");
const savechannelinfo = require("../utils/savechannelinfo");
const db = new localDatabase("channels");

function updateChannelinfo() {
  console.log("channel updater started");
  const now = new Date();
  const currentTime = now.getTime();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const timeUntilMidnight = midnight - currentTime;

  async function update() {
    try {
      let olddata = await db.getValue("channelss");
      olddata = JSON.parse(olddata);

      olddata &&
        olddata.forEach((element) => {
          savechannelinfo(element);
        });
      console.log("channels updated");
    } catch (error) {
      console.log(error);
    }
  }
  update();

  setTimeout(() => {
    console.log("updating channels");
    updateChannelinfo();
  }, timeUntilMidnight);
}

module.exports = updateChannelinfo;
