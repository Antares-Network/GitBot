const { Command } = require('discord.js-commando');

module.exports = class whCreateCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'whcreate',
            group: 'admin',
            memberName: 'whcreate',
            description: 'Creates a webhook .',
            examples: ['say Hi there!'],
            args: [
                {
                    key: 'text',
                    prompt: 'Please enter the  name',
                    type: 'string'
                }
            ],
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR'],
        });
    }

    run(message, { text }) {
        console.log("WOO")


        message.channel.createWebhook(text, {
            avatar: '/icon.png',
        })
            .then(webhook => console.log(`Created webhook ${webhook}`))
            .catch(console.error);
    }
};