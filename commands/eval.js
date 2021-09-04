const {embedColour, ownerID} = require('./cmdConfig.json');
const Discord = require('discord.js');
module.exports = {
	name: 'eval',
	description: 'run any js command',
	execute(message, args, mentions, client) {
	const args1 = message.content.split(" ").slice(2);
    if(message.author.id !== ownerID) return;
        try {
        const code = args1.join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);

        message.channel.send(clean(evaled), {code:"xl"});
        } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }

	},
};

const clean = text => {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
  }