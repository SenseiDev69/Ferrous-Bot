/** @format */

const Discord = require("discord.js");

const Client = require("./Client.js");

/**
 * @template {keyof Discord.ClientEvents} v
 * @param {Client} client
 * @param  {...Discord.ClientEvents[v]} args
 */
function RunFunction(client, ...args) {}

class Event {
  /**
   * @template {keyof Discord.ClientEvents} event
   * @param {event} event
   * @param {RunFunction<event>} run
   */
  constructor(event, run) {
    this.event = event;
    this.run = run;
  }
}

module.exports = Event;
