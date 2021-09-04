const {embedColour, prefix} = require('./cmdConfig.json');
const Discord = require('discord.js');
module.exports = {
	name: 'clear',
	description: 'bulk deletes multiple messages',
	execute(message, args, mentions, client) {
        message.delete();
        const embed = new Discord.MessageEmbed()
        .setColor(embedColour);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {embed.setDescription("You're too weak to do that")} 
        else if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            embed
            .setDescription("I don't have enough perms to do that TwT~");
        } else if (!args[0] || isNaN(parseInt(args[0], 10))) {
            embed.setDescription("Please specify the amount of messages to delete~");
        } else if (parseInt(args[0], 10) > 100){
            embed.setDescription("I can only delete 100 messages at a time ;-;");

        } else {
            embed
            .setDescription(`**Successfully cleared ${args[0]} messages**`);
            
            message.channel.bulkDelete(parseInt(args[0], 10));
        }

        message.channel.send(embed).then(async(msg) => {

            await new Promise(resolve => setTimeout(resolve, 3000));
            msg.delete();

        })
	},
};

