const {embedColour} = require('./cmdConfig.json');
const Discord = require('discord.js');
module.exports = {
	name: '8ball',
	description: 'Ask the 8ball a question',
    DMCommand: true,
	execute(message, args, mentions, client) {
		
        answers = ["It is certain.", "It is decidedly so.", "Without a doubt", "Yes -- definitely.", "Yesh!", "You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.", "Yes!", "signs point to yes.", "My sources say yes", "Better not tell you now.", "Ask again later.", "I'm busy right now.", "Don't count on it.", "My, sources say no.", "NEIN", "Very doubtful", "No!"]
        const embed = new Discord.MessageEmbed()
        if (args[0]) {
            answer = getRandomInt(answers.length);
                embed
                .setTitle(message.author.username + " the 8BALL answered with")
                .setDescription("**" + answers[answer] + "**")
                .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/whatsapp/238/billiards_1f3b1.png")
                .setColor(embedColour);
        } else {

                embed
                .setTitle(message.author.username + " You have to ask a question, baka!")
                .setColor(embedColour);
            }
        message.channel.send(embed);
	},
};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }