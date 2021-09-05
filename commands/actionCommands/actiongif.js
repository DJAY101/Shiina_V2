//const {embedColour} = require('');
const fs = require('fs')
const Discord = require('discord.js');
const {embedColour, prefix} = require('./cmdConfig.json')
module.exports = {
	name: 'actiongif',
	description: 'actionGif another user',
	DMCommand: true,
	execute(message, args, mentions, client, tenor, command) {
        let args1 = clean(message.content).slice(prefix.length).trim().split(' ');
        let action = args1.shift().toLowerCase();
        if(!mentions[0] && args[0] != "me") {message.channel.send("Who do you want to " +action +"?"); return;}
        var posts = [];
        const embed = new Discord.MessageEmbed()
        .setColor(embedColour);
        var cache;


        fs.readFile(`commands/actionCommands/actionsCache.json`, 'utf-8', (err, data) => {
              if (err) {
                    throw err;
              }
              cache = JSON.parse(data.toString());
              if(cache[command+"Gifs"] && ((Date.now()/1000) - (cache[command+"Time"]/1000)) < 3600) {
                  embed
                  .setDescription((args[0] == "me") ? message.author.username + "is getting a " + action + " by me!" : message.author.username + " is giving " + client.users.cache.get(mentions[0]).username + " a " + action + "\n" + message.content.split(" ").slice(3).join(" "))
                  .setImage(cache[command+"Gifs"][Math.round(Math.random()*(cache[command+"Gifs"].length-1))]);
                  message.channel.send(embed);
              } else {
                  tenor.Search.Query("anime " + command, "50").then(Results => {
                        Results.forEach(Post => {
                              //console.log(`Item #${Post.id} (Created: ${Post.created}) @ ${Post.url}`);
                              posts.push(Post.media[0].gif.url)
                              
                        });
            
                        embed
                        .setDescription((args[0] == "me") ? message.author.username + "is getting a " + action + " by me!" : message.author.username + " is giving " + client.users.cache.get(mentions[0]).username + " a " + action + "\n" + message.content.split(" ").slice(3).join(" "))
                        .setImage(posts[Math.round(Math.random()*(posts.length-1))]);
                        message.channel.send(embed);

                        cache[command+"Gifs"] = posts;
                        cache[command+"Time"] = Date.now();

                        fs.writeFile('commands/actionCommands/actionsCache.json', JSON.stringify(cache), (err) => {
                              if (err) {
                                  throw err;
                              }
                              console.log("JSON data is saved.");
                        });


                  }).catch(console.error);
              }
        })

	},
};


function clean(str) {
      return str
      .replace(/[^0-9a-z-A-Z ]/g, "").replace(/ +/, " ")
      
  }