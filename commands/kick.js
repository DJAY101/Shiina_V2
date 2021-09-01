const {embedColour} = require('./cmdConfig.json');
const Discord = require('discord.js');
module.exports = {
	name: 'kick',
	description: 'Kicks a user',
	execute(message, args, mentions, client) {
        
        const embed = new Discord.MessageEmbed();
        if (message.member.hasPermission("KICK_MEMBERS")) {
            if(mentions.length != 0 && message.guild.member(mentions[0]).kickable && message.guild.me.hasPermission("KICK_MEMBERS") && client.users.cache.get(mentions[0]).username != message.author.username) {
                embed
                  .setTitle(client.users.cache.get(mentions[0]).username + " has been kicked")
                  .setThumbnail("https://c.tenor.com/DLbH0i7N7yIAAAAd/bay-anime-bye-anime.gif")
                  .setColor(embedColour);
                  message.guild.member(mentions[0]).kick();
            } else {
                if(message.guild.me.hasPermission("KICK_MEMBERS")) {
                    embed 
                      .setColor(embedColour)
                      .setDescription("Please mention a valid member to kick");
                } else {
                    embed
                      .setColor(embedColour)
                      .setDescription("I don't have enough perms to kick. TwT");
                }
            }
        } else {
            embed
              .setColor(embedColour)
              .setDescription("You're too weak to kick.");

        }


        message.channel.send(embed);
	},
};