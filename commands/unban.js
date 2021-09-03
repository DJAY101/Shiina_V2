const {embedColour} = require('./cmdConfig.json');
const Discord = require('discord.js');
module.exports = {
	name: 'unban',
	description: 'unbans a user',
	execute(message, args, mentions, client) {
        
        const embed = new Discord.MessageEmbed()
        .setColor(embedColour);

        if (message.member.hasPermission("BAN_MEMBERS")) {

            if(message.guild.me.hasPermission("BAN_MEMBERS")) {

                if (args[0]) {
                message.guild.fetchBans().then((bans) => {
                    if(bans.get(args[0]) == null) {
                        embed
                        .setDescription("that isn't a valid user that I can unban TwT")
                    } else {
                        message.guild.members.unban(args[0])
                        embed
                        .setThumbnail("https://c.tenor.com/uGN3n2O03GIAAAAC/anime-wave.gif")
                        .setDescription(`I have successfully unbanned **${client.users.cache.find(user => user.id === args[0]).username}** :3`)
                    }
                    message.channel.send(embed);
                    

                }).catch((err)=>{console.error(err)})

                } else {
                    embed
                    .setDescription("You forgot to enter a valid user ID to unban")
                    message.channel.send(embed);
                }
            } else {
                embed
                .setDescription("I'm too weak to unban them ;-;");
                message.channel.send(embed);
            }
        } else {
            embed
            .setDescription("You are too weak too unban them.");
            message.channel.send(embed);
        }
        

	},
};