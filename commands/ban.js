const {embedColour} = require('./cmdConfig.json');
const Discord = require('discord.js');
module.exports = {
	name: 'ban',
	description: 'bans a user',
	execute(message, args, mentions, client) {
        
        const embed = new Discord.MessageEmbed();
        if (message.member.hasPermission("BAN_MEMBERS")) {
            if(mentions.length != 0 && message.guild.member(mentions[0]).bannable && message.guild.me.hasPermission("BAN_MEMBERS")  && client.users.cache.get(mentions[0]).username != message.author.username) {
                embed
                  .setTitle(client.users.cache.get(mentions[0]).username + " has been banned")
                  .setThumbnail("https://c.tenor.com/DLbH0i7N7yIAAAAd/bay-anime-bye-anime.gif")
                  .setColor(embedColour);
                  message.guild.member(mentions[0]).ban({reason:args.slice(1).join(' ')});
            } else {
                if(message.guild.me.hasPermission("BAN_MEMBERS")) {
                    embed 
                      .setColor(embedColour)
                      .setDescription("Please mention a valid member to ban");
                } else {
                    embed
                      .setColor(embedColour)
                      .setDescription("I don't have enough perms to ban. TwT");
                }
            }
        } else {
            embed
              .setColor(embedColour)
              .setDescription("You're too weak to ban.");
        }
        message.channel.send(embed);
	},
};