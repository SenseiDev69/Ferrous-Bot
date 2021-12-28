/** @format */

const Discord = require("discord.js");

class Client extends Discord.Client {
  constructor(config, token) {
    super(config.clientOptions);

    console.log(this.options);

    this.config = config;

    this.reload(token);
  }

  async reload(token) {
    // command and event handlers

    this.login(token);
  }
}

module.exports = Client;
