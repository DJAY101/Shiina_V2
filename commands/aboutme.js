const {embedColour} = require('./cmdConfig.json');
const Discord = require('discord.js');
module.exports = {
	name: 'aboutme',
	description: 'displays information about myself',
    DMCommand: true,
	execute(message, args, mentions, client) {
        var servers = 0;
        client.guilds.cache.each(()=>{servers += 1;})
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        const embed = new Discord.MessageEmbed()
            .setTitle("__About Me!!!__")
            .setDescription("**Creator:** DJAY \n **Version:** 2.0.0 \n **Name**: Shiina Mashiro \n **Anime:** Sakura-sou no Pet na Kanojo \n **Birthday:** 22/04/2020 \n **Hobbie:** Drawing Manga \n **Servers I reside in** " + servers + `\n**I've been online for: **${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`)
            .setThumbnail(client.user.avatarURL())
            .setAuthor(client.user.tag, client.user.avatarURL())
            .setFooter("ID: " + client.user.id)
            .setColor(embedColour);
        message.channel.send(embed);

	},
};