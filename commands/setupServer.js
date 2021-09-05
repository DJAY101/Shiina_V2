const {embedColour} = require('./cmdConfig.json');
const Discord = require('discord.js');
module.exports = {
	name: 'setup',
	description: 'sets up the server',
	execute(message, args, mentions, client, database) {
		

        try {

            database.ref('/Servers').once('value', (data) => {
                var yesTheData = data.val()
                if (data.val() == null) {

                    database.goOnline();
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
                        if(serverData["ID"] == message.guild.id) {message.reply("this server is already in the database")}
                        else {
                            database.goOnline();
                            database.ref('/Servers').push({
                            "ID": message.guild.id,
                            "Name": message.guild.name
                            })
                            const embed = new Discord.MessageEmbed()
                            .setColor(embedColour)
                            .setDescription(message.guild.name + " has successfully been added to the database");
                            message.channel.send(embed);
                        }
                }
            })

            
            } catch (err) {console.log(err);}

	},
};