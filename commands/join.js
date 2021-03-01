let state = require('../gamestate');

module.exports = {
    name: 'join',
    descritpion: "",
    execute(message, args) {
        if (state.started) {
            message.channel.send("There is another game currenty in progress.");
            return;
        }
        if (!state.players.some(p => p === message.author)) {
            state.players.push(message.author)
            message.reply(" joined Deathroll");
        }
        else {
            message.channel.send("You are already signed for Deathroll");
        }
    }
}