import axios from "axios";

export const getGroupInfo = async (groupID) => {
  let groupData = {
    groupID: groupID[0],
    groupName: groupID[1],
    groupPlayers: [],
    groupGames: [],
    groupEvents: [],
  };

  // get group players
  try {
    const response = await axios.get(`/groups/${groupData.groupID}/players`);
    console.log(`group players response ${JSON.stringify(response)}`);
    response.data.forEach((player) => {
      delete player.id;
      console.log(player);
      groupData.groupPlayers.push(player);
    });
    console.log(groupData.groupPlayers);
  } catch (err) {
    console.error(err.message);
  }

  // get group games
  try {
    const response = await axios.get(`/groups/${groupData.groupID}/games`);
    console.log(`group players response ${JSON.stringify(response)}`);
    response.data.forEach((game) => {
      delete game.id;
      console.log(game);
      groupData.groupGames.push(game);
    });
    console.log(groupData.groupGames);
  } catch (err) {
    console.error(err.message);
  }

  // get group events
  try {
    const response = await axios.get(`/groups/${groupData.groupID}/events`);
    console.log(`group players response ${JSON.stringify(response)}`);
    response.data.forEach((event) => {
      delete event.id;
      console.log(event);
      groupData.groupEvents.push(event);
    });
    console.log(groupData.groupEvents);
  } catch (err) {
    console.error(err.message);
  }

  return groupData;
};
