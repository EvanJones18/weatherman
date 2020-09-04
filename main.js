const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./token.json');
const jokes = require('./jokes.json');
const Config = require('./config.json')

client.once('ready', () => {
    console.log('Ready!');
});

client.login(token.token).then(function () {
    console.log("Authenticated")
})
    .catch(function (error) {
        console.log(error)
    })
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

//Restricted Commands (admin only)
client.on('message', message => {
    let adminRole = message.member.roles.cache.some(r => r.name === "Ketchup Dispenser")
    if (adminRole) {
        if (message.content.startsWith("weatherman") || message.content.startsWith("wm")) {
            let args = message.content.match(/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g)

            //!FUNCTION: Echo
            if (args[1] === "echo") {
                let channel = message.guild.channels.cache.find(ch => ch.name === args[2])
                for (let i = 0; i < args[3]; i++) {
                    channel.send(args[4].slice(1, -1))
                }
            }
        }
    }
})


//Unrestricted Commands (everyone can use)
client.on('message', message => {
    if (message.content.startsWith("weatherman") || message.content.startsWith("wm")) {
        let args = message.content.match(/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g)

        if (args[1] === "status") {
            message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle(":signal_strength: Weatherman is online")
            )
        }

        //!FUNCTION: Poll
        if (args[1] === "poll") {
            let title = args[2].slice(1, -1)
            let items = new Array()
            for (let i = 3; i < args.length; i++) {
                items.push(args[i].slice(1, -1))
            }
            let userPoll = new Poll(message)
            userPoll.setTitle(title)
            userPoll.addItems(items)

            userPoll.send()

            userPoll.printResponses()

            client.on('messageReactionAdd', (reaction, user) => {
                if (user.id !== Config.clientId) {
                    if (reaction.message.id === userPoll.mainId) {
                        reaction.message.delete()
                        userPoll.itemIds.forEach(itemId => {
                            reaction.message.channel.messages.fetch(itemId).then(msg => msg.delete())
                        
                        })
                    console.log("Poll closed")
                    userPoll.printResponses()
                    }
                    
                    for (let i = 0; i < userPoll.itemIds.length; i ++) {
                        if (reaction.message.id === userPoll.itemIds[i]) {
                            userPoll.setResponse(user.id, i)
                        }
                    }
                }
            })

            
        }
    }
})

class Poll {
    constructor(message) {
        this.message = message
        this.responses = []
        this.mainId = ""
        this.itemIds = []
    }

    setTitle(title) {
        this.title = title
    }

    addItems(items) {
        this.items = items
    }

    send() {
        let titleEmbed = new Discord.MessageEmbed()
            .setAuthor("Poll")
            .setTitle(this.title)
            .setDescription("Vote for one of the options below. To prevent users from voting multiple times, only your most recent reaction is counted. Reaction counts do not accurately depict vote counts. React with :white_check_mark: to close the poll and send results.")

        this.message.channel.send(titleEmbed)
            .then(sent => {
                sent.react("✅")
                this.mainId = sent.id
                //console.log(this.mainId)
            })
            .catch(err => console.log(err))

        this.items.forEach(item => {
            let itemEmbed = new Discord.MessageEmbed()
                .setTitle(item)

            this.message.channel.send(itemEmbed)
                .then(sent => {
                    sent.react("☑")
                    this.itemIds.push(sent.id)
                })
                .catch(err => console.log(err))
        })
    }

    setResponse(userId, response) {

        if (this.search(this.responses, "id", userId) === false) {
            this.responses.push({ id: userId, response: response })
        }

        else if (this.search(this.responses, "id", userId) !== false) {
            this.responses.push({ id: userId, response: response })
        }

        else {
            this.responses[this.search(this.responses, "id", userId)]["response"] = response
        }

    }

    printResponses() {
        console.log(this.responses)
    }

    sendResults() {
        let votes = []
        for (let i = 0; i < this.items; i ++) {
            votes.push(0)
        }

        for (let i = 0; i < this.responses; i ++) {
            votes[this.responses.response] += 1
        }

        let responseEmbed = new Discord.MessageEmbed()
            .setTitle("Poll Results")
            .setDescription(`Results of \"${this.title}\"`)
            .addFields(
                function() {
                    for (let i = 0; int i )
                }
            )
    }

    search(object, key, value) {
        if (object.length === 0) {
            return false
        } 
        
        else if (object.length !== 0) {
            for (let i = 0; i < object.length; i++) {
                if (object[i][key] === value) {
                    return i
                }
            }
        }
    }

}







