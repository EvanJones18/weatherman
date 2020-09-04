const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./token.json');
const jokes = require('./jokes.json');
const Config = require('./config.json')

const Poll = require('./Poll.js')

//!AUTHENTICATION 
//.................................................................................................................................................................
//.....AAAA......UUU.....UUU..TTTTTTTTTTHHHH.....HHH..EEEEEEEEEE..NNNN....NNN..TTTTTTTTTTIIII.....CCCCCC.......AAAA....ATTTTTTTTTTTIII....OOOOOOO.....NNN....NNNN..
//.....AAAAA.....UUU.....UUU..TTTTTTTTTTHHHH.....HHH..EEEEEEEEEE..NNNN....NNN..TTTTTTTTTTIIII...CCCCCCCCC......AAAAA...ATTTTTTTTTTTIII...OOOOOOOOO....NNNN...NNNN..
//.....AAAAA.....UUU.....UUU..TTTTTTTTTTHHHH.....HHH..EEEEEEEEEE..NNNNN...NNN..TTTTTTTTTTIIII..CCCCCCCCCCC.....AAAAA...ATTTTTTTTTTTIII..OOOOOOOOOOO...NNNNN..NNNN..
//....AAAAAA.....UUU.....UUU......TTT....HHH.....HHH..EEE.........NNNNN...NNN......TTT....III..CCCC...CCCC....AAAAAA.......TTTT...TIII..OOOO...OOOOO..NNNNN..NNNN..
//....AAAAAAA....UUU.....UUU......TTT....HHH.....HHH..EEE.........NNNNNN..NNN......TTT....III..CCC.....CC.....AAAAAAA......TTTT...TIII.IOOO.....OOOO..NNNNNN.NNNN..
//...AAAA.AAA....UUU.....UUU......TTT....HHHHHHHHHHH..EEEEEEEEEE..NNNNNNN.NNN......TTT....III.CCCC...........AAAA.AAA......TTTT...TIII.IOO.......OOO..NNNNNN.NNNN..
//...AAA..AAAA...UUU.....UUU......TTT....HHHHHHHHHHH..EEEEEEEEEE..NNN.NNN.NNN......TTT....III.CCCC...........AAA..AAAA.....TTTT...TIII.IOO.......OOO..NNNNNNNNNNN..
//...AAAAAAAAA...UUU.....UUU......TTT....HHHHHHHHHHH..EEEEEEEEEE..NNN.NNNNNNN......TTT....III.CCCC...........AAAAAAAAA.....TTTT...TIII.IOO.......OOO..NNN.NNNNNNN..
//..AAAAAAAAAA...UUU.....UUU......TTT....HHH.....HHH..EEE.........NNN..NNNNNN......TTT....III..CCC.....CC...AAAAAAAAAA.....TTTT...TIII.IOOO.....OOOO..NNN.NNNNNNN..
//..AAAAAAAAAAA..UUUU...UUUU......TTT....HHH.....HHH..EEE.........NNN..NNNNNN......TTT....III..CCCC...CCCC..AAAAAAAAAAA....TTTT...TIII..OOOO...OOOOO..NNN..NNNNNN..
//..AAA.....AAA..UUUUUUUUUUU......TTT....HHH.....HHH..EEEEEEEEEEE.NNN...NNNNN......TTT....III..CCCCCCCCCCC..AAA.....AAA....TTTT...TIII..OOOOOOOOOOO...NNN...NNNNN..
//.AAAA.....AAAA..UUUUUUUUU.......TTT....HHH.....HHH..EEEEEEEEEEE.NNN....NNNN......TTT....III...CCCCCCCCC..AAAA.....AAAA...TTTT...TIII...OOOOOOOOO....NNN...NNNNN..
//.AAA......AAAA...UUUUUUU........TTT....HHH.....HHH..EEEEEEEEEEE.NNN....NNNN......TTT....III.....CCCCCC...AAA......AAAA...TTTT...TIII....OOOOOOO.....NNN....NNNN..
//.................................................................................................................................................................

client.once('ready', () => {
    console.log('Ready!');
});

client.login(token.token).then(function () {
    console.log("Authenticated")
})
    .catch(function (error) {
        console.log(error)
    })

//!USER-SPECIFIC
//............................................................................................................................................
//.UUU.....UUU....SSSSSS....EEEEEEEEEE..RRRRRRRRR............SSSSSS....PPPPPPPPP...EEEEEEEEEE.....CCCCCC....III..FFFFFFFFFF.III.....CCCCCC....
//.UUU.....UUU..SSSSSSSSS...EEEEEEEEEE..RRRRRRRRRRR........SSSSSSSSS...PPPPPPPPPP..EEEEEEEEEE...CCCCCCCCC...III..FFFFFFFFFF.III...CCCCCCCCC...
//.UUU.....UUU..SSSSSSSSSS..EEEEEEEEEE..RRRRRRRRRRR........SSSSSSSSSS..PPPPPPPPPP..EEEEEEEEEE..CCCCCCCCCCC..III..FFFFFFFFFF.III..CCCCCCCCCCC..
//.UUU.....UUU..SSS...SSSS..EEE.........RRR.....RRR........SSS...SSSS..PPP....PPPP.EEE.........CCCC...CCCC..III..FFF........III..CCCC...CCCC..
//.UUU.....UUU..SSSS........EEE.........RRR.....RRR........SSSS........PPP....PPPP.EEE.........CCC.....CC...III..FFF........III..CCC.....CC...
//.UUU.....UUU..SSSSSSS.....EEEEEEEEEE..RRRRRRRRRRR........SSSSSSS.....PPPPPPPPPP..EEEEEEEEEE.ECCC..........III..FFFFFFFFF..III.ICCC..........
//.UUU.....UUU...SSSSSSSS...EEEEEEEEEE..RRRRRRRRRR..........SSSSSSSS...PPPPPPPPPP..EEEEEEEEEE.ECCC..........III..FFFFFFFFF..III.ICCC..........
//.UUU.....UUU.....SSSSSSS..EEEEEEEEEE..RRRRRRRR....######....SSSSSSS..PPPPPPPPP...EEEEEEEEEE.ECCC..........III..FFFFFFFFF..III.ICCC..........
//.UUU.....UUU.........SSSS.EEE.........RRR..RRRR...######........SSSS.PPP.........EEE.........CCC.....CC...III..FFF........III..CCC.....CC...
//.UUUU...UUUU.USSS....SSSS.EEE.........RRR...RRRR..######.SSS....SSSS.PPP.........EEE.........CCCC...CCCC..III..FFF........III..CCCC...CCCC..
//.UUUUUUUUUUU..SSSSSSSSSS..EEEEEEEEEEE.RRR....RRRR........SSSSSSSSSS..PPP.........EEEEEEEEEEE.CCCCCCCCCCC..III..FFF........III..CCCCCCCCCCC..
//..UUUUUUUUU...SSSSSSSSSS..EEEEEEEEEEE.RRR....RRRR........SSSSSSSSSS..PPP.........EEEEEEEEEEE..CCCCCCCCC...III..FFF........III...CCCCCCCCC...
//...UUUUUUU......SSSSSS....EEEEEEEEEEE.RRR.....RRRR.........SSSSSS....PPP.........EEEEEEEEEEE....CCCCCC....III..FFF........III.....CCCCCC....
//............................................................................................................................................

client.on('message', message => {

    //!AISHA
    //   .d8b.  d888888b .d8888. db   db  .d8b.  
    //  d8' `8b   `88'   88'  YP 88   88 d8' `8b 
    //  88ooo88    88    `8bo.   88ooo88 88ooo88 
    //  88~~~88    88      `Y8b. 88~~~88 88~~~88 
    //  88   88   .88.   db   8D 88   88 88   88 
    //  YP   YP Y888888P `8888Y' YP   YP YP   YP 

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
    //!END AISHA

})

//!RESTRICTED
//.....................................................................................................................
//.RRRRRRRRR....EEEEEEEEEE....SSSSSS....TTTTTTTTTTTRRRRRRRRR....III.....CCCCCC....TTTTTTTTTTTEEEEEEEEEE..DDDDDDDDD.....
//.RRRRRRRRRRR..EEEEEEEEEE..SSSSSSSSS...TTTTTTTTTTTRRRRRRRRRRR..III...CCCCCCCCC...TTTTTTTTTTTEEEEEEEEEE..DDDDDDDDDD....
//.RRRRRRRRRRR..EEEEEEEEEE..SSSSSSSSSS..TTTTTTTTTTTRRRRRRRRRRR..III..CCCCCCCCCCC..TTTTTTTTTTTEEEEEEEEEE..DDDDDDDDDDD...
//.RRR.....RRR..EEE.........SSS...SSSS......TTT....RRR.....RRR..III..CCCC...CCCC......TTT....EEE.........DDD....DDDD...
//.RRR.....RRR..EEE.........SSSS............TTT....RRR.....RRR..III..CCC.....CC.......TTT....EEE.........DDD.....DDD...
//.RRRRRRRRRRR..EEEEEEEEEE..SSSSSSS.........TTT....RRRRRRRRRRR..III.ICCC..............TTT....EEEEEEEEEE..DDD.....DDDD..
//.RRRRRRRRRR...EEEEEEEEEE...SSSSSSSS.......TTT....RRRRRRRRRR...III.ICCC..............TTT....EEEEEEEEEE..DDD.....DDDD..
//.RRRRRRRR.....EEEEEEEEEE.....SSSSSSS......TTT....RRRRRRRR.....III.ICCC..............TTT....EEEEEEEEEE..DDD.....DDDD..
//.RRR..RRRR....EEE................SSSS.....TTT....RRR..RRRR....III..CCC.....CC.......TTT....EEE.........DDD.....DDD...
//.RRR...RRRR...EEE........ESSS....SSSS.....TTT....RRR...RRRR...III..CCCC...CCCC......TTT....EEE.........DDD....DDDD...
//.RRR....RRRR..EEEEEEEEEEE.SSSSSSSSSS......TTT....RRR....RRRR..III..CCCCCCCCCCC......TTT....EEEEEEEEEEE.DDDDDDDDDDD...
//.RRR....RRRR..EEEEEEEEEEE.SSSSSSSSSS......TTT....RRR....RRRR..III...CCCCCCCCC.......TTT....EEEEEEEEEEE.DDDDDDDDDD....
//.RRR.....RRRR.EEEEEEEEEEE...SSSSSS........TTT....RRR.....RRRR.III.....CCCCCC........TTT....EEEEEEEEEEE.DDDDDDDDD.....
//.....................................................................................................................

client.on('message', message => {
    let adminRole = message.member.roles.cache.some(r => r.name === "Ketchup Dispenser")
    if (adminRole) {
        if (message.content.startsWith("weatherman") || message.content.startsWith("wm")) {
            let args = message.content.match(/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g)

            //!ECHO
            //  d88888b  .o88b. db   db  .d88b.  
            //  88'     d8P  Y8 88   88 .8P  Y8. 
            //  88ooooo 8P      88ooo88 88    88 
            //  88~~~~~ 8b      88~~~88 88    88 
            //  88.     Y8b  d8 88   88 `8b  d8' 
            //  Y88888P  `Y88P' YP   YP  `Y88P'  

            if (args[1] === "echo") {
                let channel = message.guild.channels.cache.find(ch => ch.name === args[2])
                for (let i = 0; i < args[3]; i++) {
                    channel.send(args[4].slice(1, -1))
                }
            }
            //!END ECHO

        }
    }
})

//!UNRESTRICTED
//...............................................................................................................................................
//.UUU.....UUU..NNNN....NNN..RRRRRRRRR....EEEEEEEEEE....SSSSSS....TTTTTTTTTTTRRRRRRRRR....III.....CCCCCC....TTTTTTTTTTTEEEEEEEEEE..DDDDDDDDD.....
//.UUU.....UUU..NNNN....NNN..RRRRRRRRRRR..EEEEEEEEEE..SSSSSSSSS...TTTTTTTTTTTRRRRRRRRRRR..III...CCCCCCCCC...TTTTTTTTTTTEEEEEEEEEE..DDDDDDDDDD....
//.UUU.....UUU..NNNNN...NNN..RRRRRRRRRRR..EEEEEEEEEE..SSSSSSSSSS..TTTTTTTTTTTRRRRRRRRRRR..III..CCCCCCCCCCC..TTTTTTTTTTTEEEEEEEEEE..DDDDDDDDDDD...
//.UUU.....UUU..NNNNN...NNN..RRR.....RRR..EEE.........SSS...SSSS......TTT....RRR.....RRR..III..CCCC...CCCC......TTT....EEE.........DDD....DDDD...
//.UUU.....UUU..NNNNNN..NNN..RRR.....RRR..EEE.........SSSS............TTT....RRR.....RRR..III..CCC.....CC.......TTT....EEE.........DDD.....DDD...
//.UUU.....UUU..NNNNNNN.NNN..RRRRRRRRRRR..EEEEEEEEEE..SSSSSSS.........TTT....RRRRRRRRRRR..III.ICCC..............TTT....EEEEEEEEEE..DDD.....DDDD..
//.UUU.....UUU..NNN.NNN.NNN..RRRRRRRRRR...EEEEEEEEEE...SSSSSSSS.......TTT....RRRRRRRRRR...III.ICCC..............TTT....EEEEEEEEEE..DDD.....DDDD..
//.UUU.....UUU..NNN.NNNNNNN..RRRRRRRR.....EEEEEEEEEE.....SSSSSSS......TTT....RRRRRRRR.....III.ICCC..............TTT....EEEEEEEEEE..DDD.....DDDD..
//.UUU.....UUU..NNN..NNNNNN..RRR..RRRR....EEE................SSSS.....TTT....RRR..RRRR....III..CCC.....CC.......TTT....EEE.........DDD.....DDD...
//.UUUU...UUUU..NNN..NNNNNN..RRR...RRRR...EEE........ESSS....SSSS.....TTT....RRR...RRRR...III..CCCC...CCCC......TTT....EEE.........DDD....DDDD...
//.UUUUUUUUUUU..NNN...NNNNN..RRR....RRRR..EEEEEEEEEEE.SSSSSSSSSS......TTT....RRR....RRRR..III..CCCCCCCCCCC......TTT....EEEEEEEEEEE.DDDDDDDDDDD...
//..UUUUUUUUU...NNN....NNNN..RRR....RRRR..EEEEEEEEEEE.SSSSSSSSSS......TTT....RRR....RRRR..III...CCCCCCCCC.......TTT....EEEEEEEEEEE.DDDDDDDDDD....
//...UUUUUUU....NNN....NNNN..RRR.....RRRR.EEEEEEEEEEE...SSSSSS........TTT....RRR.....RRRR.III.....CCCCCC........TTT....EEEEEEEEEEE.DDDDDDDDD.....
//...............................................................................................................................................

client.on('message', message => {
    if (message.content.startsWith("weatherman") || message.content.startsWith("wm")) {
        let args = message.content.match(/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g)

        //!STATUS
        //  .d8888. d888888b  .d8b.  d888888b db    db .d8888. 
        //  88'  YP `~~88~~' d8' `8b `~~88~~' 88    88 88'  YP 
        //  `8bo.      88    88ooo88    88    88    88 `8bo.   
        //    `Y8b.    88    88~~~88    88    88    88   `Y8b. 
        //  db   8D    88    88   88    88    88b  d88 db   8D 
        //  `8888Y'    YP    YP   YP    YP    ~Y8888P' `8888Y'

        if (args[1] === "status") {
            message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle(":signal_strength: Weatherman is online")
            )
        }
        //!END STATUS
        
        //!POLL
        //  d8888b.  .d88b.  db      db      
        //  88  `8D .8P  Y8. 88      88      
        //  88oodD' 88    88 88      88      
        //  88~~~   88    88 88      88      
        //  88      `8b  d8' 88booo. 88booo. 
        //  88       `Y88P'  Y88888P Y88888P


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
        //!END POLL


    }
})











