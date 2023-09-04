const axios = require("axios");
async function fetchChannelData(channelId) {
  const apiKey = "AIzaSyB9cK6LyhuKg1_wGengyD08pHD6fDQe43c";

  console.log(channelId);
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        params: {
          key: apiKey,
          id: channelId,
          part: "statistics,snippet",
        },
      }
    );

    return {
      channelId,
      name: response.data.items[0].snippet.title,
      tottalvideos: response.data.items[0].statistics.videoCount,
    };
  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports = fetchChannelData;
