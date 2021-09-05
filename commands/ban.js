const {embedColour} = require('./cmdConfig.json');
const Discord = require('discord.js');
module.exports = {
	name: 'ban',
	description: 'bans a user',
	execute(message, args, mentions, client) {
        
        const embed = new Discord.MessageEmbed()
          .setColor(embedColour);


        //const banMember = (!mentions[0] && message.guild.members.fetch(args[0]).then(()=> {return true}).catch(() => {return false}) ) ? args[0] : mentions[0]
        const banReason = args.slice(1).join(' ');

        checkBanUser(message, mentions, args).then((banMember) => {
          console.log(banMember);
        if (message.member.hasPermission("BAN_MEMBERS")) {

          if (message.guild.me.hasPermission("BAN_MEMBERS")) {
            
            if(banMember != null) {
              if (banMember != message.author.id) {
                
                
                
                message.guild.members.fetch(banMember).then((member) =>{
                  if (!member.bannable) {embed.setDescription("I can't ban that person~"); message.channel.send(embed) ;return;}
                  embed
                  .setAuthor(member.user.username + "#" + member.user.discriminator, member.user.avatarURL({dynamic:true}))
                  .setTitle("**" + member.user.username +"#"+ member.user.discriminator +"** has been banned")
                  .addField("Reason", (banReason) ? banReason : "Not Provided")
                  .setThumbnail("https://c.tenor.com/DLbH0i7N7yIAAAAd/bay-anime-bye-anime.gif");
                  
                  member.ban({reason:banReason}).then(() => {
                    message.channel.send(embed);
                  }).catch((err)=>{
                    message.channel.send("An error occured banning the user " + err);
                  })
              })

              } else {
                embed.setDescription("You sure you wanna ban yourself?");
                message.channel.send(embed);
              }

            } else {
              embed.setDescription("You either forgot to mention someone to ban or just wrote something random =-=");
              message.channel.send(embed);
            }


          } else {

            embed.setDescription("I'm too weak to ban TwT");
            message.channel.send(embed);

          }

        } else {

          embed.setDescription("You're too weak to ban.");
          message.channel.send(embed);

        }
      })



	},
};

async function checkBanUser(message, mentions, args) {
  if(!mentions[0]) {
    if(!args[0]) return null;
    var user;
    await message.guild.members.fetch(args[0]).then(()=>{user = args[0]}).catch(()=>{user = null;});
    return user;
  } else {
    return mentions[0]
  }

}