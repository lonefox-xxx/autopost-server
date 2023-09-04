const localDatabase = require("../routes/Database");
const fetchChannelData = require("./fetchChannelData");
const db = new localDatabase("cahnnel_deteals");

async function savechannelinfo(id) {
  let data = await db.getValue("cahnnel_deteals");
  if (!data) data = [];
  else data = JSON.parse(data);
  let freshArray = data.filter(item => item.channelId != id)
  const channelinfo = await fetchChannelData(id);
  freshArray.push({...channelinfo ,dateadded :  channelinfo.dateAdded ? channelinfo.dateAdded : new Date().getTime()  });
  console.log(freshArray);
  db.insertValue("cahnnel_deteals", JSON.stringify(freshArray));
}

module.exports = savechannelinfo;
