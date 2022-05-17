const nodemailer = require("nodemailer");
const pool = require("./db");

const sendMail = (player_email, group_id, group_name) => {
  const generateJoinKey = () => {
    let joinKey = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
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
  const joinLink = `http://localhost:3000/groups/${group_id}/join?player_email=${player_email}&join_key=${joinKey}`
  const mailText = `You have been invited to join the ${group_name} game group on Gamenite! Click the following link to join - ${joinLink}`;

  try {
    const playerInvite = await pool.query(`INSERT INTO group_invites (player_email, join_key, group_id) VALUES ($1, $2, $3)`, 
    [player_email, joinKey, group_id])
  } catch (error) {
    console.error(error);
  }

  let mailOptions = {
    from: "noreply@gamenite.com",
    to: "austin.bodin@gmail.com",
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

module.exports = sendMail;
