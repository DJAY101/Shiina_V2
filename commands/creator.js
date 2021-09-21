const {embedColour} = require('./cmdConfig.json');
const Discord = require('discord.js');
module.exports = {
	name: 'creator',
	description: 'Displays information about the creator and myself',
	DMCommand: true,
	execute(message, args, mentions, client) {
		client.users.fetch("400139249472765962").then((developer)=>{

        	const embed = new Discord.MessageEmbed()
        	.setColor(embedColour)
			.setAuthor(developer.tag, developer.avatarURL({dynamic:true}))
        	.setTitle("__About My Creator__")
			.setThumbnail(developer.avatarURL({dynamic:true}))
			.setFooter("Nya~ UwU")
			.setDescription("**Name: **" + "DJAY" + "\n\n **A message from him: ** \nHeya! It's me DJAY the developer of Shiina, I've been working on Shiina as a side project and as a hobby on discord, since I always wanted a cute discord bot of my own x3, and as you can tell I'm a programmer, and I often game as well :3 mostly BeatSaber though. Anyways thank you for inviting Shiina into your server and I hope she has been a fun bot to use!\n");

			message.channel.send(embed);

		})
	},
};