const {embedColour} = require('./cmdConfig.json');
const Discord = require('discord.js');
module.exports = {
	name: 'ship',
	description: 'Ill ship someone together',
	DMCommand: true,
	execute(message, args, mentions, client) {
		const embed = new Discord.MessageEmbed().setColor(embedColour);
        if(args.length + mentions.length > 0) {
            var personOne = (mentions[0]) ? client.users.cache.get(mentions[0]).username : args[0];
            var personTwo =  (mentions[1]) ? client.users.cache.get(mentions[1]).username : args[1];
            if(personTwo == null) {personTwo = personOne; personOne = message.author.username};

            if(personTwo == message.author.username) {embed.setDescription("You can't ship yourself baka!"); message.channel.send(embed); return;}
            if(personTwo == personOne) {embed.setDescription("You can't ship the same person together, baka!"); message.channel.send(embed); return;}

            const loveScore = Math.round(Math.random()*100);
            const good = ["Cute couples! ❤️", "All I see is love! ❤️", "Get together already!! ❤️", "Wow, looks like another couple ❤️", "You guy's fit! ❤️", "❤️❤️❤️ ", "Romantic! ❤️"];
            const bad = ["Ehh, it might work out? 💔", "Sorry, but no? 💔", "Things change over time? 💔", "Im sorry ._.", "Try someone else? 💔", "💔💔💔"]; 
            const tip = (loveScore > 40) ? good[Math.round(Math.random()*good.length)] : bad[Math.round(Math.random()*bad.length)]

            embed
            .setTitle(`Shipping ${personOne} and ${personTwo}!`)
            .setFooter("Shiina Certified")
            .setThumbnail("https://media3.giphy.com/media/dp4IpWn6WWDn0aOwLQ/giphy.gif?cid=6c09b952nab9g9anx3ne8krc8ge6brauea8cp6uil1hd12go&rid=giphy.gif&ct=s")
            .setDescription(tip + "\n\nShip name: **" + personOne.substring(Math.round(personOne.length / 2), 0)
            + personTwo.substring(Math.round(personTwo.length / 2), personTwo.length) + "** \n Love score: **" + loveScore + "%**")


        } else {

            embed.description("who am I shipping?")

        }
        message.channel.send(embed)
	},
};