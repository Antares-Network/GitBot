const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            aliases: ["latency"],
            group: "user",
            memberName: "ping",
            description: "Sends the ping time of the bot.",
            //clientPermissions: ['MANAGE_MESSAGES'],
            guildOnly: true
        });
    }
    run(message) {
        //message.delete()
        const pingEmbed = new MessageEmbed()
            .setColor("#ff3505")
            .setTitle("Bot/API Ping")
            .setDescription(`Ping: 🏓 | Latency is: **${this.client.ws.ping}**ms.`);
        return message.channel.send(pingEmbed);
    }
};
