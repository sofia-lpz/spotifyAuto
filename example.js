// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQA_YiUFErexeIS6rRunojzYtLX6qhzu3ClO8q6PZa6-72Xg3do-pICmY_Nmcr8O_d5XQPiLReSlRaGVrTUshrhximDgwyR9dmJeQQn158eWZtKsK-yD6EA65JFOrJt8LZPf-hR-pf8qP1L6DQPWyL49YGLEZrlmRjF55PAbyE8uzGZ9FvAxwFNPdRBw8pRxROURHxH-Yb2_lip7e0r35hT3GdtNh6cuL6pHdSeCIQagYvyWhqVNz5lyEDoYkAlH8RNOwgn2VDwEOXwUtboVLTZ9';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

const tracksUri = [
  'spotify:track:6HIaXjaAAA1WOChwBmReFR','spotify:track:3v5TVqzUKg2n8bEmzsfryU','spotify:track:0p8gAcPkDYgzcZZwAou12B','spotify:track:2A7JX4Cu4UtwCMazGBS2YN','spotify:track:2g3wyAWIAvmjfZ8K6Jb4Zn','spotify:track:3VNLNAiudAJ7iJRyav3jSM','spotify:track:4pbEwQiDjPln3oYlijXuOE','spotify:track:5iQp869m5yN4gHp48Ja4XY','spotify:track:4HuiEuJ7ZW8jewUuZBg6sk','spotify:track:7BlCLOykVzK1b6LEKP1lSB'
];

async function createPlaylist(tracksUri){
  const { id: user_id } = await fetchWebApi('v1/me', 'GET')

  const playlist = await fetchWebApi(
    `v1/users/${user_id}/playlists`, 'POST', {
      "name": "My recommendation playlist",
      "description": "Playlist created by the tutorial on developer.spotify.com",
      "public": false
  })

  await fetchWebApi(
    `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
    'POST'
  );

  return playlist;
}

const createdPlaylist = await createPlaylist(tracksUri);
console.log(createdPlaylist.name, createdPlaylist.id);
