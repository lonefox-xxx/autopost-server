const localDatabase = require("./Database");

const cahnnel_detealsdb = new localDatabase('cahnnel_deteals');
const cahnnelSDb = new localDatabase('channels');

async function deleteChannel(req, res) {
    const id = req.body.id;
  try {
    let cahnnel_deteals = await cahnnel_detealsdb.getValue("cahnnel_deteals");
    cahnnel_deteals = JSON.parse(cahnnel_deteals)
    let channels = await cahnnelSDb.getValue('channelss')
    channels = JSON.parse(channels)
    channels = channels.filter((item) => item != id);
    const newChannels = await cahnnelSDb.insertValue("channelss", JSON.stringify(channels))

    cahnnel_deteals = cahnnel_deteals.filter((item) => item.channelId != id);
    const newChannel_detials = await cahnnel_detealsdb.insertValue("cahnnel_deteals", JSON.stringify(cahnnel_deteals));
    res.send({ success: true, msg: "Deleted", data : [newChannel_detials , newChannels] });
  } catch (error) {
    res.send({ success: false, msg: "Somthing Went Wrong", data: error });
    console.log(error);
  }
}

module.exports = deleteChannel;
