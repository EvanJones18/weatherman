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
        let i = Math.random() * 7
        i = Math.floor(i)
        console.log(i)
        if (i === 2) {
            message.channel.send("How's the weather down there?")
        }
        
    }
})

//Fall guys detection
client.on('message', message => {
    let game
})