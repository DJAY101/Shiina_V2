const fs = require('fs'); // Include Node's native file system module
const Discord = require('discord.js'); //Include Discord js
const { prefix, token } = require('./Config.json') // Include Config.json
const cmdConfig = require("./commands/cmdConfig.json"); // includes cmdConfig
const { timeStamp } = require('console');

const client = new Discord.Client; //Init Client
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); //Place all cmds in a array
// sets commands for client
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}



//when bot init/wakes up
client.on("ready", () => {

    console.log("Shiina is online!");
    client.user.setActivity("Music and Drawing Manga!", { type: "LISTENING"});
    //client.users.fetch("453512559388000257").then(user => console.log(user.username))
    

    //Copies prefix from config json to commands config.json
    jsonReader('./commands/cmdConfig.json', (err, m_cmdConfig) => {
        if (err) {
            console.log('Error reading file:',err);
            return;
        }
        m_cmdConfig.prefix = prefix;
        fs.writeFile('./commands/cmdConfig.json', JSON.stringify(m_cmdConfig), (err) => {
            if (err) console.log('Error writing file:', err)
        })
    })


})

//upon recieving message
client.on('message', message => {

    let msg = message.content.slice(prefix.length).trim().split(' ')
    let args = clean(message.content).slice(prefix.length).trim().split(' ');
    let command = args.shift().toLowerCase();
    let mentions = []


    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return; //checks for prefix and msg author is not itself otherwise end
    
    // Shiina question n reply command
    if(command == "is" || command == "am" || command == "are") {
        const embed = new Discord.MessageEmbed()
        .setColor(cmdConfig.embedColour);

        if (Boolean(+Date.now()%2)) {
            embed.setDescription("No");
            message.channel.send(embed);
            return;
        } else {
            embed.setDescription("Yes");
            message.channel.send(embed);
            return;
        }
    }
    

    // if (msg[1] == "print") {
    //     const embed = new Discord.MessageEmbed()
    //     .setImage("https://cdn.discordapp.com/attachments/852030227919011882/881889055711825940/b963c297-aa28-4498-95b5-ee0734c526c4.png")
    //     .setColor(cmdConfig.embedColour);

    //     message.channel.send(embed);
    // }

    for (index in msg) {
        
        if (getUserFromMention(msg[index])) {
            mentions.push(clean(msg[index]));
        }
    }
    if (command == "spamkim") {

        client.users.cache.get("399925742286405633").send("OWOWOOWOWOWW")

    }

    console.log(`Command: ${command}`);
    console.log(`Arguments: ${args.join(" ")}`);
    console.log(`Mentions: ${mentions}`);

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args, mentions, client);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }

})


client.on('messageDelete', message => {
    
    const embed = new Discord.MessageEmbed()
    .setColor(cmdConfig.embedColour)
    .setAuthor(message.author.username + "#" + message.author.discriminator, message.author.avatarURL({dynamic:true}))
    .setFooter("Author ID: " + message.author.id)
    .setTimestamp()
    .addField("Deleted Message", (message.content)?message.content:"```DELETED IMAGE```")
    .setDescription("**<@" + message.author.id + "> deleted a message in <#" + message.channel.id + ">:**");

    client.channels.cache.get("882486369841197106").send(embed);


})



client.login(token);

//Cleans strings from signs
function clean(str) {
    return str
    .replace(/[^0-9a-z-A-Z ]/g, "").replace(/ +/, " ")
    
}

function getUserFromMention(mention) {
    if (!mention) return;

    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);

        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }

        return client.users.cache.get(mention);
    }
}

function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err)
        }
        try {
            const object = JSON.parse(fileData)
            return cb && cb(null, object)
        } catch(err) {
            return cb && cb(err)
        }
    })
}