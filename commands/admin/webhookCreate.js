const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class whCreateCommand extends Command {
    constructor(client) {
        super(client, {
            name: "whcreate",
            group: "admin",
            memberName: "whcreate",
            description: "Creates a webhook .",
            examples: ["say Hi there!"],
            args: [
                {
                    key: "name",
                    prompt: "Please enter the  name",
                    type: "string",
                },
                {
                    key: "icon",
                    prompt: "Please enter the url of the image for your webhook",
                    type: "string"
                }

            ],
            guildOnly: true,
            userPermissions: ["ADMINISTRATOR"],
        });
    }

    run(message, { name, icon }) {
        message.delete()
        message.channel
            .createWebhook(name, {
                avatar: icon,
            })
            .catch(error => {
                console.log(error)
                return;
            })
            .then((webhook) => {
                console.log(`Created webhook ${webhook.name}`)
                const Embed = new MessageEmbed()
                    .setColor("#ff3505")
                    .setTitle("Webhook Information")
                    .addFields(
                        { name: 'Webhook Name:', value: webhook.name },
                        { name: 'Webhook Url', value: `https://canary.discordapp.com/api/webhooks/${webhook.id}/${webhook.token}` })
                message.author.send(Embed);
            })
            .catch(console.error);
    }
};
