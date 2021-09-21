const {embedColour} = require('./cmdConfig.json');
const Discord = require('discord.js');
module.exports = {
	name: 'uptime',
	description: 'Shows the duration of how long shiina has been online',
	DMCommand: true,
	execute(message, args, mentions, client) {

		let totalSeconds = (client.uptime / 1000);
		let days = Math.floor(totalSeconds / 86400);
		totalSeconds %= 86400;
		let hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = Math.floor(totalSeconds % 60);
		let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
		const embed = new Discord.MessageEmbed()
			.setColor(embedColour)
			.setAuthor(client.user.tag, client.user.avatarURL())
			.setTitle("Shiina's Uptime")
			.setDescription(uptime);
		message.channel.send(embed);
	},
};