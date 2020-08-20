const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.login('NzQ2MTQ1Nzg4NjUyMTU5MDQ4.Xz8Eag.LQDpRzxEjhsqZ72Gk7ER85lA60w')
//Aisha roast
client.on('message', message => {
    let aishaRole = message.member.roles.cache.some(r => r.name === "Not Among Us")
    
    if (aishaRole) {
        message.channel.send("How's the weather down there?")
    }
})