module.exports = {
    name: 'help',
    descritpion: "",
    execute(message, args) {
        message.author.send("!dr join - sign for the next game\n !dr roll - make a roll.\n!dr start {max roll} {qc} - starts a game.\nThe {max roll} parameter sets the maximum value that can be drawn. Default is 10000000\nThe {qc} parameter turns on queue check, type qc to turn on.\n!dr forceend - forcibly end the game. Only the person who started the game can end it.")
    }
}