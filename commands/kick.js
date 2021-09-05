const {embedColour} = require('./cmdConfig.json');
const Discord = require('discord.js');
module.exports = {
	name: 'kick',
	description: 'Kicks a user',
	execute(message, args, mentions, client) {
        
    const embed = new Discord.MessageEmbed()
    .setColor(embedColour);


  const kickReason = args.slice(1).join(" ")
  checkKickUser(message, mentions, args).then((kickMember) => {
    console.log(kickMember);
  if (message.member.hasPermission("KICK_MEMBERS")) {

    if (message.guild.me.hasPermission("KICK_MEMBERS")) {
      
      if(kickMember != null) {
        if (kickMember != message.author.id) {
          
          
          
          message.guild.members.fetch(kickMember).then((member) =>{
            if (!member.kickable) {embed.setDescription("I can't kick that person~"); message.channel.send(embed) ;return;}
            embed
            .setAuthor(member.user.username + "#" + member.user.discriminator, member.user.avatarURL({dynamic:true}))
            .setTitle("**" + member.user.username +"#"+ member.user.discriminator +"** has been kicked")
            .addField("Reason", (kickReason) ? kickReason : "Not Provided")
            .setThumbnail("https://c.tenor.com/DLbH0i7N7yIAAAAd/bay-anime-bye-anime.gif");
            
            member.kick().then(() => {
              message.channel.send(embed);
            }).catch((err)=>{
              message.channel.send("An error occured kicking the user " + err);
            })
        })

        } else {
          embed.setDescription("You sure you wanna kick yourself?");
          message.channel.send(embed);
        }

      } else {
        embed.setDescription("You either forgot to mention someone to kick or just wrote something random =-=");
        message.channel.send(embed);
      }


    } else {

      embed.setDescription("I'm too weak to kick TwT");
      message.channel.send(embed);

    }

  } else {

    embed.setDescription("You're too weak to kick.");
    message.channel.send(embed);

  }
})
	},
};

async function checkKickUser(message, mentions, args) {
  if(!mentions[0]) {
    if(!args[0]) return null;
    var user;
    await message.guild.members.fetch(args[0]).then(()=>{user = args[0]}).catch(()=>{user = null;});
    return user;
  } else {
    return mentions[0]
  }

}