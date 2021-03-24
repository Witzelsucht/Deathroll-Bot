let state = require('../gamestate');

module.exports = {
    name: 'forceend',
    descritpion: "",
    execute(message, args) {
        if (state.gameMaster === message.author || message.author.id === '184419365494587392' || message.author.id === "243524957798137856") {
            message.channel.send("Game has been forcibly ended.");
            state.maxRoll = 10000000;
            state.started = false;
            state.queueCheck = false;
            state.players = [];
            state.gameMaster = "";
            state.currentPlayer = 0;
        }
        else {
            message.channel.send("Only person who started the game can end it.");
        }
    }
}