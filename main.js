const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./token.json');
const jokes = require('./jokes.json');

client.once('ready', () => {
    console.log('Ready!');
});

client.login(token.token)
//Aisha jokes
client.on('message', message => {
    let aishaRole = message.member.roles.cache.some(r => r.name === "Not Among Us")

    let jokeList = jokes.jokes

    function randomInt(min, max) {
        let i = Math.random() * (max - min)
        i = Math.floor(i)
        return (i)
    }

    if (aishaRole) {
        let i = randomInt(0, 8)
        if (i === 0) {
            let joke = jokeList[randomInt(0, jokeList.length)]

            message.channel.send(joke)
        }

    }
})

//Weatherman Control Commands
client.on('message', message => {
    let adminRole = message.member.roles.cache.some(r => r.name === "Ketchup Dispenser")
    if (adminRole) {
        if (message.content.startsWith("weatherman") || message.content.startsWith("wm")) {
            let args = message.content.match(/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g)
            
            //Echo
            if (args[1] === "echo") {
                let channel = message.guild.channels.cache.find(ch => ch.name === args[2])
                for (let i = 0; i < args[3]; i ++) {
                    channel.send(args[4].slice(1, -1))
                }
            }
        }
    }
})