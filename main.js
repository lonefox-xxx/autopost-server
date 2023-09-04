const { default: axios } = require("axios");
(async () => {
    const videoidarray = []
    const response = await axios.get(
    "https://www.googleapis.com/youtube/v3/search",
    {
      params: {
        key: 'AIzaSyB9cK6LyhuKg1_wGengyD08pHD6fDQe43c',
        channelId: 'UCsNlfrFsaR0ovlnjFLzlGIQ',
        part: "snippet",
        type: "video",
        videoDuration: 'short',
        maxResults: 300, // Adjust as needed
      },
    }
  );

  response.data.items.forEach(element => {
    videoidarray.push(element.id.videoId)
  });
  console.log(videoidarray);
})();
