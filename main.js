const Discord = require('discord.js');
const Config = require('./Config.json')

const client = new Discord.Client;

client.on("ready", () => {

    console.log("Shiina is online!");

})


client.login(Config.token);