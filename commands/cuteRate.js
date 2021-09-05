const {embedColour} = require('./cmdConfig.json');
const Discord = require('discord.js');
module.exports = {
	name: 'cute',
	description: 'cute rate someone',
	DMCommand: true,
	execute(message, args, mentions, client) {
        if (args[0]!="rate") {return;}
		var username = (!args[1]||args[1]=="me") ? message.author.username : (client.users.cache.get(mentions[0])) ? client.users.cache.get(mentions[0]).username : null;
        const userUrl = (!args[1]||args[1]=="me") ? message.author.avatarURL({dynamic:true}) : (client.users.cache.get(mentions[0])) ? client.users.cache.get(mentions[0]).avatarURL({dynamic:true}) : null;
        if(!username && !args[1]) {message.channel.send("Who's cuteness do you want me to rate?"); return;} else if (!username) {username = args[1]}
        const cuteness = Math.round(Math.random()*100);
        const embed = new Discord.MessageEmbed()
        .setColor(embedColour)
        .setAuthor(username + "'s", (userUrl) ? userUrl:null)
        .setTitle("Cuteness: " + cuteness + "%")
        .setThumbnail("https://gifimage.net/wp-content/uploads/2017/09/anime-gif-300x300-5.gif");
        message.channel.send(embed);

	},
};