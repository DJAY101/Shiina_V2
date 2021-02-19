
module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args, client, Discord) {
		
		message.channel.send('Loading data').then (async (msg) =>{
			msg.delete();
			const embed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle(`🏓Pong  ${msg.createdTimestamp - message.createdTimestamp}ms.`)
			message.channel.send(embed);
		  })
	},
};