const { embedColour } = require('./cmdConfig.json');
const Discord = require('discord.js');

module.exports = {
	name: 'avatar',
	description: 'Displays users avatar',
	execute(message, args, mentions, client) { 

        const embed = new Discord.MessageEmbed(); // create embed

        if (mentions.length != 0) {
        user = client.users.cache.get(mentions[0]);
        date_created = user.createdAt.toString().substring(0, 15);
        embed
        .setColor(embedColour)
        .setTitle(`${user.username}'s Avatar!`)
        .setDescription(`**User ID:** ${user.id} \n **Joined Discord Since:** ${date_created}`)
        .setImage(user.avatarURL({dynamic: true, size: 512}));
        

        } else {
        user = client.users.cache.get(message.author.id);
        date_created = user.createdAt.toString().substring(0, 15);
        embed
        .setColor(embedColour)
        .setTitle(`${user.username}'s Avatar!`)
        .setDescription(`**User ID:** ${user.id} \n **Joined Discord Since:** ${date_created}`)
        .setImage(user.avatarURL({dynamic: true, size: 512}));
        
        
        
        }
        message.channel.send(embed);

    } 

}
