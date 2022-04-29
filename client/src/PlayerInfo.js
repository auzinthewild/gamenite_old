export const getPlayerInfo = async (playerEmail) => {
  let playerData = {
    playerID: null,
    playerName: null,
    playerEmail: playerEmail,
    playerGroupIDs: [],
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

  // get player's group ids, if they have any
  try {
    const response = await fetch(
      `http://localhost:5000/players/group/${playerData.playerID}`
    );
    const jsonData = await response.json();
    jsonData.forEach((group) => playerData.playerGroupIDs.push(group.group_id));
    // playerData.playerGroupID = jsonData.group_id;
  } catch (err) {
    console.error(err.message);
  }

  return playerData;
};
