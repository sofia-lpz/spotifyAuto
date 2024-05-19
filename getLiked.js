const token = process.argv;
const { exec } = require('child_process');

exec("curl --request GET --url https://api.spotify.com --header 'Authorization: Bearer " + token + "'", (error, response, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`Response: ${response}`);
});




