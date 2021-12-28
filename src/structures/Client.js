/** @format */

const Discord = require("discord.js");

const Command = require("./Command.js");

const Event = require("./Event.js");

const fs = require("fs");

const path = require("path");

class Client extends Discord.Client {
  /**
   * @typedef {{prefix: string, clientOptions: Discord.ClientOptions}} Config
   * @param {Config} config
   * @param {token} token
   */
  constructor(config, token) {
    super(config.clientOptions);

    /**
     * @type {Config}
     */
    this.config = config;

    // commands collection
    /**
     * @type {Discord.Collection<string, Command>}
     */
    this.commands = new Discord.Collection();

    this.reload(token);
  }

  /**
   * @param {string} token
   * @returns {Promise<string>}
   */
  async reload(token) {
    // command and event handlers

    // command handler
    fs.readdirSync("./src/commands")
      .filter(file => path.extname(file) === ".js")
      .forEach(file => {
        /**
         * @type {Command}
         */
        const cmd = require(path.join(process.cwd(), "src", "commands", file));

        this.commands.set(cmd.name, cmd);

        console.log(`Command "${cmd.name}" loaded.`);
      });

    // event handler
    fs.readdirSync("./src/events")
      .filter(file => path.extname(file) === ".js")
      .forEach(file => {
        /**
         * @type {Event}
         */
        const event = require(path.join(process.cwd(), "src", "events", file));

        this.on(event.event, event.run.bind(null, this));

        console.log(`Event "${event.event}" loaded.`);
      });

    this.login(token);
  }
}

module.exports = Client;
