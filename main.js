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
    
    let jokeList = [
        "How's the weather down there?",
        "You look like you still have a lot of growing up to do.",
        "I was gonna tell a short joke, but it'll probably go over your head.",
        "One day you might rule the world, all 5 ft of it.",
        "You’re the literal definition of down to earth.",
        "Aisha is oppressed. She's always getting overlooked.",
        "Why would Aisha be a bad chef? Because the steaks are always too high.",
        "Make the little things count. Teach Aisha math.",
        "The key to writing Aisha jokes is keeping them short.",
        "Aisha shut up you're short.",
        "I love short people. They're more down to earth.",
        "You've gotta hand it to short people. They usually can't reach it."
    ]

    function randomInt(min, max) {
        let i = Math.random() * (max - min)
        i = Math.floor(i)
        return(i)
    }

    if (aishaRole) {
        let i = randomInt(0, 0)
        if (i === 0) {
            joke = jokeList[randomInt(0, jokeList.length)]
            
            message.channel.send(joke)
        }
        
    }
})

//Fall guys detection
//client.on('message', message => {
//    let game
//})