export const getPlayerInfo = async (playerEmail) => {
  let playerData = {
    playerID: null,
    playerName: null,
    playerEmail: playerEmail,
    playerGroupID: null,
  };

  // get player id and name using their email
  try {
    const response = await fetch(
      `http://localhost:5000/players/email/${playerEmail}`
    );
    const jsonData = await response.json();
    playerData.playerID = jsonData.player_id;
    playerData.playerName = jsonData.player_name;
  } catch (err) {
    console.error(err.message);
  }

  // get player's group id, if they have one
  try {
    const response = await fetch(
      `http://localhost:5000/players/group/${playerData.playerID}`
    );
    const jsonData = await response.json();
    playerData.playerGroupID = jsonData.group_id;
  } catch (err) {
    console.error(err.message);
  }

  return playerData;
};
