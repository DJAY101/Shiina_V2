const {embedColour} = require('./cmdConfig.json');
const Discord = require('discord.js');
module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args, mentions, client) {
		
		message.channel.send('Loading data').then((msg) =>{
			msg.delete();
			const embed = new Discord.MessageEmbed()
			.setColor(embedColour)
			.setTitle(`🏓 Pong  ${msg.createdTimestamp - message.createdTimestamp}ms.`)
			message.channel.send(embed);
		  })
	},
};