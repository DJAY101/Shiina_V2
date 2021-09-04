const {embedColour} = require('./cmdConfig.json');
const Discord = require('discord.js');
module.exports = {
	name: 'userinfo',
	description: 'ill tell you everything I know about them',
	DMCommand: true,
	execute(message, args, mentions, client) {

        const embed = new Discord.MessageEmbed().setColor(embedColour);

        checkUser(client, message, mentions, args).then((user) => {

            if (user == null) {message.channel.send("Unable to find them~"); return;}
            if (message.guild) {
            message.guild.members.fetch(user).then((guildUser)=>{
                var roles = "";
                guildUser.roles.cache.each(role => {roles = roles + "<@&"+ role.id.toString()+">, "})
                embed
                .setTimestamp()
                .setThumbnail(guildUser.user.avatarURL({dynamic:true}))
                .setTitle("Server Member")
                .addFields(
                    {name: "User", value: "<@" + guildUser.user.id + ">", inline:true},
                    {name: "User ID", value: guildUser.user.id, inline:true},
                    {name: "Discord Username", value: guildUser.user.username, inline:true},
                    {name: "Discriminator", value:guildUser.user.discriminator, inline:true},
                    {name: "Account Creation Date", value:guildUser.user.createdAt.toString().substring(0, 15), inline:true},
                    {name: "Account Age", value:Math.round((Date.now()-guildUser.user.createdAt)/1000/60/60/24) + " Days", inline:true},
                    {name: "Server Join Date", value:guildUser.joinedAt.toString().substring(0, 15), inline:true},
                    {name: "Server Booster", value:guildUser.roles.premiumSubscriberRole==true, inline:true},
                    {name: "Roles", value:roles},
                    {name: "Permissions", value:"`"+guildUser.permissions.toArray().join("`, `")+"`"}
                );
                message.channel.send(embed)
            }).catch(()=>{
                client.users.fetch(user).then((discordUser) =>{
                    embed
                    .setTitle("Discord User")
                    .setTimestamp()
                    .setThumbnail(discordUser.avatarURL({dynamic:true}))
                    .addFields(
                        {name: "User", value:discordUser.tag, inline:true},
                        {name: "User ID", value: discordUser.id, inline:true},
                        {name: "Account Creation Date", value: discordUser.createdAt.toString().substring(0, 15), inline:true},
                        {name: "Account Age", value:Math.round((Date.now()-discordUser.createdAt)/1000/60/60/24) + " Days", inline:true}
                    )
                    message.channel.send(embed);
                })


            })
        } else {
            client.users.fetch(user).then((discordUser) =>{
                embed
                .setTitle("Discord User")
                .setTimestamp()
                .setThumbnail(discordUser.avatarURL({dynamic:true}))
                .addFields(
                    {name: "User", value:discordUser.tag, inline:true},
                    {name: "User ID", value: discordUser.id, inline:true},
                    {name: "Account Creation Date", value: discordUser.createdAt.toString().substring(0, 15), inline:true},
                    {name: "Account Age", value:Math.round((Date.now()-discordUser.createdAt)/1000/60/60/24) + " Days", inline:true}
                )
                message.channel.send(embed);
            })
        }
            


        })

	},
};

async function checkUser(client, message, mentions, args) {
    if(!mentions[0]) {
      if(!args[0]) return null;
      var user;
      await client.users.fetch(args[0]).then(()=>{user = args[0]}).catch(()=>{user = null;});
      return user;
    } else {
      return mentions[0]
    }
  
}

