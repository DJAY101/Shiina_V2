const {embedColour, ownerID} = require('./cmdConfig.json');
const Discord = require('discord.js');
module.exports = {
	name: 'eval',
	description: 'run any js command',
    DMCommand: true,
	execute(message, args, mentions, client) {
	const args1 = message.content.split(" ").slice(2);
    if(message.author.id !== ownerID) return;
        try {
        const code = args1.join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);

            if(clean(evaled).length < 2000) {
                message.channel.send(clean(evaled), {code:"xl"});
            }else {
                message.channel.send(`\`Eval too long to display\``)
            }
        } catch (err) {
            if (`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``.length < 2000) {
                message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
            } else {
                message.channel.send(`\`ERROR\` \`\`\`Error too long to display\n\`\`\``)
            }
    }

	},
};

const clean = text => {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
  }