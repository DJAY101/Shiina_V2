//const {embedColour} = require('');
const fs = require('fs')
const Discord = require('discord.js');
const {embedColour, prefix} = require('./cmdConfig.json')
module.exports = {
	name: 'individualActions',
	description: 'displays an individual action',
	DMCommand: true,
	execute(message, args, mentions, client, tenor, command, action) {
      //   let args1 = clean(message.content).slice(prefix.length).trim().split(' ');
      //   let action = args1.shift().toLowerCase();

        var posts = [];
        const embed = new Discord.MessageEmbed()
        .setColor(embedColour);
        var cache;


        fs.readFile(`commands/actionCommands/actionsCache.json`, 'utf-8', (err, data) => {
              if (err) {
                    throw err;
              }
              cache = JSON.parse(data.toString());
              if(cache[command+"Gifs"] && ((Date.now()/1000) - (cache[command+"Time"]/1000)) < 600) {
                  embed
                  .setDescription(message.author.username + " is " + action)
                  .setImage(cache[command+"Gifs"][Math.round(Math.random()*(cache[command+"Gifs"].length-1))]);
                  message.channel.send(embed);
              } else {
                  tenor.Search.Query("anime " + command, "10").then(Results => {
                        Results.forEach(Post => {
                              //console.log(`Item #${Post.id} (Created: ${Post.created}) @ ${Post.url}`);
                              posts.push(Post.media[0].gif.url)
                              
                        });
            
                        embed
                        .setDescription(message.author.username + " is " + action)
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