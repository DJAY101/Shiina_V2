const fs = require('fs')
const Discord = require('discord.js');
const {embedColour, prefix} = require('./cmdConfig.json')
module.exports = {
	name: 'search',
	description: 'search for a gif',
	DMCommand: true,
	execute(message, args, mentions, client, tenor) {

        if(!args[0]) {message.channel.send("what gif do you want?")}
        var posts = [];
        const embed = new Discord.MessageEmbed()
        .setColor(embedColour);
        tenor.Search.Query(args.join(" "), "10").then(Results => {
            Results.forEach(Post => {
                //console.log(`Item #${Post.id} (Created: ${Post.created}) @ ${Post.url}`);
                posts.push(Post.media[0].gif.url)

            });
            embed
                .setDescription(args.join(" "))
                .setImage(posts[Math.round(Math.random() * (posts.length - 1))]);
            message.channel.send(embed);

        }).catch(console.error);



	},
};
