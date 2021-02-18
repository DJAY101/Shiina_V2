const fs = require('fs'); // Include Node's native file system module
const Discord = require('discord.js'); //Include Discord js
const Config = require('./Config.json') // Include Config.json

const client = new Discord.Client; //Init Client
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); //Place all cmds in a array
// sets commands for client
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

//when bot init/wakes up
client.on("ready", () => {

    console.log("Shiina is online!");

})
//upon recieving message
client.on('message', message => {

    if (!message.content.toLowerCase().startsWith(Config.prefix) || message.author.bot) return; //checks for prefix and msg author is not itself otherwise end

    args = clean(message.content).slice(Config.prefix.length).trim().split(' ');
    command = args.shift().toLowerCase();

    console.log(command);
    console.log(args);
    

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }

})


client.login(Config.token);

//Cleans strings from signs
function clean(str) {
    return str
    .replace(/[^0-9a-z-A-Z ]/g, "").replace(/ +/, " ")
    
}