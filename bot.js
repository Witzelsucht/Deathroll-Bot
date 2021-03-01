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
    let args = [];
    if (message.author.bot) return;
    else if (message.content.startsWith(prefix)) {
        args = message.content.slice(prefix.length).trim().split(/ +/)
    }
    else if (message.content.startsWith(shortPrefix)) {
        args = message.content.slice(shortPrefix.length).trim().split(/ +/)
    }
    else {
        return
    }
    let command = args.shift().toLowerCase();
    if (args.length === 0) {
        command = "roll"
    }
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

