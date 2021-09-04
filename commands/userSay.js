const {embedColour, prefix} = require('./cmdConfig.json');
const Discord = require('discord.js');
module.exports = {
	name: 'say',
	description: 'The user says',
    DMCommand: true,
	execute(message, args, mentions, client) {
        message.delete();
        msg = message.content.slice(prefix.length + 4)
		const embed = new Discord.MessageEmbed()
            .setColor(embedColour)
            .setDescription(`**${msg}**`)
            .setTitle(message.author.username);
        message.channel.send(embed);
	},
};