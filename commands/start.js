let state = require('../gamestate');

module.exports = {
    name: 'start',
    descritpion: "",
    execute(message, args) {
        if (state.started) {
            message.channel.send("There is another game currenty in progress.");
            return;
        }
        if (state.players.length === 0) {
            message.channel.send("Nobody signed for a Deathroll game.");
            return;
        }
        if (Number.isInteger(parseInt(args[1])))
            state.maxRoll = args[1];
        if (args.some(a => a.includes("qc")))
            state.queueCheck = true;
        state.players = shuffle(state.players);
        message.channel.send(`Game starts. Players order: ${state.players}`)
        state.started = true;
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}