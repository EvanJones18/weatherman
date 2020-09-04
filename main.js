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
                        //console.log("Poll closed")
                        userPoll.printResponses()
                        userPoll.sendResults()
                    }


                    for (let i = 0; i < userPoll.itemIds.length; i++) {
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
            .setDescription("Vote for one of the options below by reacting with ☑. To prevent users from voting multiple times, only your most recent reaction is counted. Reaction counts do not accurately depict vote counts. React with :white_check_mark: to close the poll and send results.")

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
            
            this.responses[this.search(this.responses, "id", userId)]["response"] = response
        }

        else {
            this.responses.push({ id: userId, response: response })
        }

    }

    printResponses() {
        console.log(this.responses)
    }

    sendResults() {
        let votes = []
        for (let i = 0; i < this.items.length; i++) {
            votes.push(0)
        }
        

        for (let i = 0; i < this.responses.length; i++) {
            votes[this.responses[i].response] += 1
        }
        //console.log(votes)
        let responseEmbed = new Discord.MessageEmbed()
            .setTitle("Poll Results")
            .setDescription(`Results of \"${this.title}\"`)

        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i]
            let totalResponses = this.responses.length
            let numVotes = votes[i]

            let percentBarEmojis = [
                ":white_large_square:",
                ":orange_square:",
                ":blue_square:",
                ":red_square:",
                ":brown_square:",
                ":purple_square:",
                ":green_square:",
                ":yellow_square:"
            ]
            
            function percentageBar() {

                function randomInt(min, max) {
                    let n = Math.random() * (max - min)
                    n = Math.floor(n)
                    return (n)
                }

                let color = randomInt(0, percentBarEmojis.length)
                let percentBar = ""
                for (let i = 0; i < Math.ceil((numVotes / totalResponses) * 20); i++) {
                    percentBar += percentBarEmojis[color]
                }

                for (let i = 0; i < (20 - Math.ceil((numVotes / totalResponses) * 20)); i++) {
                    percentBar += ":black_large_square:"
                }

                if (numVotes === 0) {
                    percentBar = percentBarEmojis[color]
                    for (let i = 0; i < 19; i++) {
                        percentBar += ":black_large_square:"
                    }
                }
                //console.log(percentBar)
                return percentBar
                
            }
            let percentBar2 = percentageBar()
            
            responseEmbed.addFields({
                name: (`${item} - ${Math.floor((numVotes / totalResponses) * 100)}% (${numVotes} votes)`),
                //name: ((numVotes / totalResponses) * 100),
                value: percentBar2
                
                
            })
        }


        this.message.channel.send(responseEmbed)
    }

    search(object, key, value) {
        
        function isInArray() {
            let inArray = false
            for (let i = 0; i < object.length; i++) {
                if (object[i][key] === value) {
                    inArray = true
                }
            }
            //console.log(inArray)
            return inArray
        }
        if (isInArray()) {
            for (let i = 0; i < object.length; i++) {
                if (object[i][key] === value) {
                    return i
                }
            }
            //console.log(true)
        }
        else if (!isInArray()) {
            //console.log(false)
            return false
        }
        else if (object.length === 0) {
            //console.log(false)
            return false
        }
    }

}







