const {embedColour} = require('./cmdConfig.json');
const Discord = require('discord.js');
module.exports = {
	name: 'creator',
	description: 'Displays information about the creator and myself',
	execute(message, args, mentions, client) {
        const embed = new MessageEmbed()
            .setTitle("__About me!!!__")
            .setDescription("**Creator:** DJAY \n **Version:** 2.0.0 \n **Name**: Shiina Mashiro \n **Anime:** Sakura-sou no Pet na Kanojo \n **Birthday:** 22/04/2020 \n **Hobbie:** Drawing Manga")
            .setThumbnail(bot.user.avatarURL())
            .setColor(0xd4423f);
        msg.channel.send(embed);
	},
};