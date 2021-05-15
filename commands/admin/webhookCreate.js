const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
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
                    prompt: 'What text would you like the bot to say?',
                    type: 'string'
                }
            ],
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR'],
        });
    }

    run(message, { text }) {
        message.delete();
        message.say(text);
        logToConsole.command(message.guild, message);
    }
};