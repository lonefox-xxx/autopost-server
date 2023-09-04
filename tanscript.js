const { YoutubeTranscript } = require("youtube-transcript");
const fs = require('fs')
YoutubeTranscript.fetchTranscript("https://www.youtube.com/watch?v=Wg050kF48uE").then((transcript) => {
  const subtitleLines = transcript.map((entry, index) => {
    const startTime = millisecondsToSRTTime(entry.offset);
    const endTime = millisecondsToSRTTime(entry.offset + entry.duration);
    return `${index + 1}\n${startTime} --> ${endTime}\n${entry.text}\n`;
  });

  const subtitleText = subtitleLines.join("");

  fs.writeFileSync("output.srt", subtitleText, "utf-8");
  console.log("Subtitle file created: output.srt");
});

function millisecondsToSRTTime(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const remainingMilliseconds = milliseconds % 1000;
  const remainingSeconds = seconds % 60;
  const remainingMinutes = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${remainingMinutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")},${remainingMilliseconds.toString().padStart(3, "0")}`;
}
