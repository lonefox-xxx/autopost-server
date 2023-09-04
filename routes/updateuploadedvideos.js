const localDatabase = require("./Database");

const db = new localDatabase("uploads");

async function updateUploadedVideos(req, res) {
  try {
    const videoId = req.body.videoid;
    let uploadedVideos = await db.getValue("uploadedVideos");
    if (!uploadedVideos) uploadedVideos = [];
    else uploadedVideos = JSON.parse(uploadedVideos);

    uploadedVideos.push(videoId);
    const responce = await db.insertValue(
      "uploadedVideos",
      JSON.stringify(uploadedVideos)
    );

    res.send({ success: true, msg: responce });
  } catch (error) {
    res.send({ success: false, msg: error });
  }
}

module.exports = updateUploadedVideos;
