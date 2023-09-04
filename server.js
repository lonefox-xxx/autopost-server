const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
const updateChannelinfo = require("./crons/updateChannelinfo");

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

// get
app.get("/", (req, res) => res.send("OK"));
app.get("/channels", require("./routes/getchannels"));
app.get("/channelsforcontend", require("./routes/getchannelsforcontend"));
app.get("/uploadedvideos", require("./routes/getuploadedvideos"));

// post
app.post("/saveChannel", require("./routes/addChannelid"));
app.post("/deleteChannel", require("./routes/deleteChannel"));
app.post("/updateuploadedvideos", require("./routes/updateuploadedvideos.js"));

// crons
updateChannelinfo();

app.listen(port, () => console.log(`Server running on port: ${port}!`));
