const { CommandoClient } = require('discord.js-commando');
const mongoose = require('mongoose');
const path = require('path');
const MongoDBProvider = require('commando-provider-mongo').MongoDBProvider;
require('dotenv').config();
require('colors');


client = new CommandoClient({
	commandPrefix: '^',
	owner: '603629606154666024',
	disableEveryone: true
});

(async () => {
	var mongo_uri = String(process.env.BOT_MONGO_PATH);
	console.log('Trying to connect to MongoDB\nPlease wait for a connection'.yellow);
	await mongoose.connect(mongo_uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	})
	.catch((error) => {
		console.log(`There was an error connecting to the database:\n ${error}`)
		process.exit(1)
	})
	console.log('Connected to MongoDB'.green.bold);
	
	console.log(`Override default settings provider...`.bold.green)
	client.setProvider(
		new MongoDBProvider(mongoose.connections[0].getClient(), process.env.BOT_SETTINGS_PATH)
	).catch((error) => {
		console.log(`There was an error connecting to the database:\n ${error}`)
		process.exit(1)
	})
	console.log(`Connected MDB settings provider`.bold.cyan)


	//login to the discord api
	console.log('Trying to login to the Discord API\nPlease wait for a connection'.yellow);
	client.login(process.env.BOT_TOKEN).catch((error) => {
		console.log(`There was an error connecting to the database:\n ${error}`)
		process.exit(1)
	})
	console.log("Logged into the Discord API".green.bold);
})() //idk why these () are needed but they are


//register the commands
client.registry
	.registerDefaultTypes()
	.registerGroups([
		['user', 'Commands for regular users'],
		['admin', 'Commands for admins'],
	])
	.registerDefaultGroups()
	.registerDefaultCommands({
		help: false,
		eval: false,
		ping: false,
	})
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.on('message', async (message) => {
	if (message.author.bot) return;
	console.log(`Message: ${message.content}`)

})


process.on('exit', (code) => {
	console.log("Now exiting...");
    console.log(`Exited with status code: ${code}`);
});