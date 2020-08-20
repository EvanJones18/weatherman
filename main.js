const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./token.json')

client.once('ready', () => {
	console.log('Ready!');
});

client.login(token.token)
//Aisha roast
client.on('message', message => {
    let aishaRole = message.member.roles.cache.some(r => r.name === "Not Among Us")
    
    if (aishaRole) {
        message.channel.send("How's the weather down there?")
    }
})