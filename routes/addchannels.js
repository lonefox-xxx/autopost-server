const axios = require("axios");
const localDatabase = require("./Database");
const updateChannelinfo = require("../crons/updateChannelinfo");
const db = new localDatabase("channels");

// async function savechannel(channelId) {
//   try {
//     let dbdata = await db.getValue("channelss");
//     let newchannelArray;
//     if (!dbdata) newchannelArray = [];
//     else newchannelArray = JSON.parse(dbdata);

//     if (!newchannelArray.includes(channelId)) {
//       newchannelArray.push(channelId);
//       const add = await db.insertValue(
//         "channelss",
//         JSON.stringify(newchannelArray)
//       );
//       console.log(newchannelArray);
//       return { succsess: true, retmsg: 0, msg: "success" };
//     }
//     return { succsess: true, retmsg: 1, msg: "alredy added" };
//   } catch (error) {
//     console.error("Error saving channel:", error);
//     return { succsess: false };
//   }
// }

// axios.get("https://autopost.up.railway.app/channels").then(({ data }) => {
//   data.forEach(async (element) => {
//     await savechannel(element.channelId);
//   });
// });

updateChannelinfo()