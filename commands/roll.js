let state = require('../gamestate');

module.exports = {
    name: 'roll',
    descritpion: "",
    execute(message, args) {
        if (!state.started) {
            message.channel.send("Game has not started yet. To begin type !deathroll start")
            return;
        }
        if (!state.players.some(p => p === message.author)) {
            message.channel.send("You didn't sign for a game.");
            return;
        }
        console.log("DEBUG: Current player: " + state.players[state.currentPlayer].username)
        console.log("DEBUG: Players on roll: \n")
        console.table(state.players)
        if (message.author !== state.players[state.currentPlayer] && state.queueCheck) {
            message.reply("You've rolled out of order, you lose.")
            state.maxRoll = 10000000;
            state.started = false;
            state.queueCheck = false;
            state.players = [];
            state.gameMaster = "";
            state.currentPlayer = 0;
            return;
        }
        if (++state.currentPlayer === state.players.length) {
            state.currentPlayer = 0;
        }
        min = Math.ceil(0);
        max = Math.floor(state.maxRoll);
        let roll = Math.floor(Math.random() * (max - min) + min);
        if (roll === 0) {
            message.reply(` 0 - You died.`);
            state.maxRoll = 10000000;
            state.started = false;
            state.queueCheck = false;
            state.players = [];
            state.gameMaster = "";
            state.currentPlayer = 0;
        }
        else {
            message.channel.send(roll);
            state.maxRoll = roll;
        }
    }
}