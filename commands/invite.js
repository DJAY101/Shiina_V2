const {embedColour} = require('./cmdConfig.json');
const Discord = require('discord.js');
module.exports = {
	name: 'invite',
	description: 'displays the link to invite shiina',
	DMCommand: true,
	execute(message, args, mentions, client) {
		
        client.users.fetch("400139249472765962").then((user) => {
            const embed = new Discord.MessageEmbed()
            .setColor(embedColour)
            .setTitle("Invite Me!")
            .setAuthor(client.user.tag, client.user.avatarURL())
            .setDescription("Shiina V2.0")
            .setFooter("Created by " + user.tag)
            .setThumbnail("https://c.tenor.com/6CpJ1R7KamwAAAAC/mashiro-shiina-sakurasou-no-pet-na-kanojo.gif")
            .setURL("https://discordapp.com/oauth2/authorize?client_id=701977620660879460&scope=bot&permissions=8");
            message.channel.send(embed);
        })


	},
};