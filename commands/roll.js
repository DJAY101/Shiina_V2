const {embedColour, prefix} = require('./cmdConfig.json');
const Discord = require('discord.js');
module.exports = {
	name: 'roll',
	description: 'Rolls a dice',
	execute(message, args, mentions, client) {
        if (args[0] == "a" && args[1] == "dice") {
            var roll = getRandomInt(6) + 1;
             const embed = new Discord.MessageEmbed()
                .setTitle(message.author.username + "-Chan,\nI've rolled a dice for you!")
                .setColor(embedColour)
                .attachFiles(['./Dices/Dice'+ roll +'.png'])
                .setThumbnail('attachment://Dice'+ roll +'.png');
            message.channel.send(embed);
        } else if (args[0] == "a" && args[1] == "number") {
            if (args[2] == "between") {
                if(args.length == 4) {
                    if (args[3].toString().includes('-')) {
                        const range = args[3].split('-')
                            if (parseInt(range[0]) < parseInt(range[1])) {
                                var number = getRandomInt(Math.abs(parseInt(range[1])-parseInt(range[0]))) + parseInt(range[0]);
                            } else { var number = getRandomInt(Math.abs(parseInt(range[0])-parseInt(range[1]))) + parseInt(range[1]); }
                        const embed = new Discord.MessageEmbed()
                            .setTitle(message.author.username + "-Chan,\nI've rolled a number for you!\nYou got a " + number)
                            .setColor(embedColour);
                        message.channel.send(embed)
                    } else {
                        message.channel.send(message.author.username + "-chan, You forgot to tell me a range. (between 5-10)");
                    } 
                } else {message.channel.send(message.author.username + "-chan, You forgot to tell me a range. (between 5-10)");}

            }

        }
	},
};
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }