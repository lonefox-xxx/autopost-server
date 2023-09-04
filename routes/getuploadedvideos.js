const localDatabase = require("./Database");

const db = new localDatabase("uploads");
async function getUploadedVideos(req, res) {
  try {
    let uploadedVideos = await db.getValue("uploadedVideos");
    if (!uploadedVideos) uploadedVideos = [];
    else uploadedVideos = JSON.parse(uploadedVideos);

    res.send({ status: true, msg: "", uploadedVideos });
  } catch (err) {
    res.send({ status: false, msg: err, uploadedVideos: null });
  }
}

module.exports = getUploadedVideos;
