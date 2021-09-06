const {embedColour} = require('./cmdConfig.json');
const Discord = require('discord.js');
module.exports = {
	name: 'setup',
	description: 'sets up the server',
	execute(message, args, mentions, client, database) {
		
        if(!message.member.hasPermission("ADMINISTRATOR")) {message.reply("You need admin to setup a server."); return;}
        try {
            database.goOnline();
            database.ref('/Servers').once('value', (data) => {
                if (data.val() == null) {

                    database.ref('/Servers').push({
                    "ID": message.guild.id,
                    "Name": message.guild.name
                    })
                    const embed = new Discord.MessageEmbed()
                    .setColor(embedColour)
                    .setDescription(message.guild.name + " has successfully been added to the database");
                    message.channel.send(embed);
                    return;
                }
                for (const [key, serverData] of Object.entries(data.val())) {
                        console.log(serverData)
                        if(serverData["ID"] == message.guild.id) {message.reply("this server is already in the database"); return;}
                        else {
                            
                            database.ref('/Servers').push({
                            "ID": message.guild.id,
                            "Name": message.guild.name,
                            "LogChannel": null
                            })
                            const embed = new Discord.MessageEmbed()
                            .setColor(embedColour)
                            .setDescription(message.guild.name + " has successfully been added to the database");
                            message.channel.send(embed);
                            return;
                        }
                }
                database.goOffline();
            })

            
            } catch (err) {console.log(err);}

	},
};