let state = require('../gamestate');

module.exports = {
    name: 'forceend',
    descritpion: "",
    execute(message, args) {
        console.log(message.author)
        if (state.gameMaster === message.author || message.author.id === '184419365494587392') {
            message.channel.send("Game has been forcibly ended.");
            state.maxRoll = 10000000;
            state.started = false;
            state.queueCheck = false;
            state.players = [];
            state.gameMaster = "";
        }
        else {
            message.channel.send("Only person who started the game can end it.");
        }
    }
}