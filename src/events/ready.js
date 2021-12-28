/** @format */

const Event = require("../structures/Event.js");

module.exports = new Event("ready", client => {
  console.log(`${client.user.tag} is online!`);
});
