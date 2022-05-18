const nodemailer = require("nodemailer");
const pool = require("./db");

const sendMail = async (player_email, group_id, group_name) => {
  console.log(`meep ${player_email} ${group_id} ${group_name}`);
  const generateJoinKey = () => {
    let joinKey = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < charactersLength; i++) {
      joinKey += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }
    return joinKey;
  };

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "austin.bodin@gmail.com",
      pass: "srlctxcwintqglog",
    },
  });

  const joinKey = generateJoinKey();
  const joinLink = `http://localhost:3000/groups/${group_id}/join?player_email=${player_email}&join_key=${joinKey}`;
  const mailText = `You have been invited to join the ${group_name} game group on Gamenite! Click the following link to join - ${joinLink}`;

  try {
    const playerInvite = await pool.query(
      `INSERT INTO group_invites (player_email, join_key, group_id) VALUES ($1, $2, $3)`,
      [player_email, joinKey, group_id]
    );
  } catch (error) {
    console.error(error);
  }

  let mailOptions = {
    from: "noreply@gamenite.com",
    to: player_email,
    subject: `You've been invited to join ${group_name} on Gamenite!`,
    text: mailText,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const acceptInvite = async (player_email, group_id, join_key) => {
  const getPlayerID = async (player_email) => {
    try {
      const playerID = await pool.query(
        `SELECT player_id, player_email from players where player_email = $1`,
        [player_email]
      );
      return playerID.rows[0].player_id;
    } catch (error) {
      console.error(error);
    }
  };

  const addPlayerToGroup = async (player_id) => {
    try {
      const addedPlayer = await pool.query(
        `INSERT INTO group_players (group_id, player_id) VALUES ($1, $2)`,
        [group_id, player_id]
      );
    } catch (error) {
      console.error(error);
    }
  };

  const removePlayerInvite = async (join_key) => {
    try {
      const removedInvite = await pool.query(
        `DELETE FROM group_invites WHERE join_key = $1`,
        [join_key]
      );
    } catch (error) {
      console.error(error);
    }
  };

  getPlayerID(player_email).then((player_id) => {
    console.log(`player id ${JSON.stringify(player_id)}`);
    addPlayerToGroup(player_id).then(() => {
      removePlayerInvite(join_key);
    });
  });
  // return groupName;
};

module.exports = { sendMail, acceptInvite };
