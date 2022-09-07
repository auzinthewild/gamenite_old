import axios from "axios";

export const getPlayerInfo = async (playerEmail) => {
  let playerData = {
    playerID: null,
    playerName: null,
    playerEmail: playerEmail,
    playerGroupIDs: [],
  };

  // get player id and name using their email
  try {
    const response = await fetch(`/players/email/${playerEmail}`);
    const jsonData = await response.json();
    console.log(jsonData.data);
    playerData.playerID = jsonData.player_id;
    playerData.playerName = jsonData.player_name;
  } catch (err) {
    console.error(err.message);
  }

  // get player's group ids, if they have any
  try {
    const response = await fetch(`/players/group/${playerData.playerID}`);
    const jsonData = await response.json();
    jsonData.forEach((group) =>
      playerData.playerGroupIDs.push({
        id: group.group_id,
        name: group.group_name,
      })
    );
    // playerData.playerGroupID = jsonData.group_id;
  } catch (err) {
    console.error(err.message);
  }

  return playerData;
};
