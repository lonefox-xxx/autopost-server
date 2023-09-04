const savechannelinfo = require("../utils/savechannelinfo");
const localDatabase = require("./Database");
const axios = require("axios");
const DB = new localDatabase("channels");

async function AddChannel(req, res) {
  try {
    const url = req.body.url;
    console.log(url);
    const videoId = getvideoid(url);
    const channelId = await getChannelid(videoId);
    if (channelId.success) {
      const response = await savechannel(channelId.channelId);
      response.retmsg == 0 && await savechannelinfo(channelId.channelId)
      res.send(response);
    } else {
      res.send({ succsess: false, msg: "cant save channel" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

async function getChannelid(videoId) {
  const apiKey = "AIzaSyB9cK6LyhuKg1_wGengyD08pHD6fDQe43c";

  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          key: apiKey,
          id: videoId,
          part: "snippet,contentDetails",
        },
      }
    );

    const video = response.data.items[0];
    const title = video.snippet.title;
    const duration = video.contentDetails.duration;

    return {
      success: true,
      channelId: response.data.items[0].snippet.channelId,
    };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, channelId: null };
  }
}

function getvideoid(url) {
  const videoId = url.split("/").pop().split("?")[0];
  return videoId;
}

async function savechannel(channelId) {
  try {
    let dbdata = await DB.getValue("channelss");
    let newchannelArray;
    if (!dbdata) newchannelArray = [] 
    else newchannelArray = JSON.parse(dbdata)
    
    if (!newchannelArray.includes(channelId)) {
      newchannelArray.push(channelId);
      await DB.insertValue("channelss", JSON.stringify(newchannelArray));
      return { succsess: true, retmsg: 0, msg: "success" };
    }
    return { succsess: true, retmsg: 1, msg: "alredy added" };
  } catch (error) {
    console.error("Error saving channel:", error);
    return { succsess: false };
  }
}

module.exports = AddChannel;
