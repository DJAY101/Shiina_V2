const {embedColour} = require('./cmdConfig.json');
const Discord = require('discord.js');
module.exports = {
	name: 'set',
	description: 'sets server settings',
	execute(message, args, mentions, client, database) {
		
        switch (args[0]) {
            case "log":
                if (!message.member.hasPermission("ADMINISTRATOR")) {message.reply("You need admin to setup a log channel"); return;}
                database.goOnline();
                message.channel.send("Loading~").then(async msg =>{
                    await database.ref("/Servers").once("value", (data) =>{
                        msg.delete();
                        if(data.val == null) {message.reply("This server isn't setup yet, call shiina setup :3"); return}
                        const channel = args[1];
                        if(!channel) {message.reply("you need to include a tag of the channel to log, or to disable 'off'"); return;}
                        if (channel == "off" || channel == "false") {
                            for (const [key, serverData] of Object.entries(data.val())) {
                                if(serverData["ID"] == message.guild.id && serverData["LogChannel"]) {
                                    database.ref("/Servers/" + key +"/LogChannel").set(null);
                                    message.reply("Successfully disabled logging");
                                    
                                    return;
                                } else if (serverData["ID"] == message.guild.id ) {
                                    message.reply("Logging is already disabled")
                                    return;
                                    
                                }
                            }
                            
                        }

                        if(message.guild.channels.cache.get(channel)){
                            for (const [key, serverData] of Object.entries(data.val())) {
                                
                                if(serverData["ID"] == message.guild.id && serverData["LogChannel"] == null) {
                                    database.ref("/Servers/" + key +"/LogChannel").set(channel);
                                    message.reply("Successfully added log channel");
                                    return;
                                } else if (serverData["ID"] == message.guild.id) {
                                    database.ref("/Servers/" + key +"/LogChannel").set(channel);
                                    message.reply("Successfully updated log channel");
                                    return;
                                }
                            }
                        } else {message.reply("I can't find that channel")}
                    })
                    database.goOffline();
                });
                
                break
        
        }


	},
};