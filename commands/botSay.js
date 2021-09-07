const {embedColour, prefix} = require('./cmdConfig.json');
const Discord = require('discord.js');
module.exports = {
	name: 'talk',
	description: 'Shiina says',
	execute(message, args, mentions, client) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            message.delete().catch((err)=>console.log(err));
            msg = message.content.slice(prefix.length + 5)
            const embed = new Discord.MessageEmbed()
                .setColor(embedColour)
                .setDescription(`**${msg}**`)
            message.channel.send(embed);
        }
	},
};