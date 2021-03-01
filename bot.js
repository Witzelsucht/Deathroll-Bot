const fs = require('fs');
require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()
const token = process.env.BOT_TOKEN


client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log("Deathroll bot is working.")
})

const prefix = '!deathroll';
const shortPrefix = '!dr';
client.on('message', message => {
    if (!(message.content.startsWith(prefix) || message.content.startsWith(shortPrefix)) || message.author.bot) return;
    const args = message.content.slice(message.content.startsWith(prefix) ? prefix.length : shortPrefix.length).trim().split(/ +/)
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) {
        message.channel.send("Couldn't find that command. Type !dr help see all commands");
        return;
    }

    try {
        client.commands.get(command).execute(message, args)
    } catch (error) {
        console.error(error);
        message.reply('Unexpected error occurred while executing command. Please try again.');
    }

})

client.login(token)

