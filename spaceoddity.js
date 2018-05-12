const express = require('express')
const app = express()

const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json')
const participants = require('./participants.json')
const results = require('./results.json')
const events = require('./events.json')

// app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')

    client.on('ready', () => {
        console.log('Space Oddity bot ready!');

        let changeActivity = () => {client.user.setActivity("Space Oddity")};
        setTimeout(changeActivity, 6000);
        setInterval(changeActivity, 300000);
        });

        /******************
         * Commands        
         ******************/
        client.on('message', message => {
            var spaceoddityMembers = "427407748410376192"
            var spaceoddityChannel = "424773922672738310"
            var secretMembers = "427773522194989056"

            var idMarcella = '235688549343559680'
            var idSebastian = '157392505032146945'

            var id = message.author.id
            var content = message.content.toLowerCase()

            if(id == idMarcella || id == idSebastian){
                switch (content) {

                    case '!bot get spaceoddityids':
                        console.log("Deploying '!bot get spaceoddityIds'")
                        var reply = []
                        message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{
                            reply.push({
                                name: member.displayName,
                                id: member.id
                            })
                        })
                        var replyString = ``
                        reply.forEach((member)=> {
                            replyString += member.name + ` | id: ` + member.id + `\n`
                        })
                        message.reply(replyString)
                        break
                        
                    case '!bot get secretids':
                        console.log("Deploying '!bot get secretids'")
                        var reply = []
                        message.guild.roles.get(secretMembers).members.forEach((member)=>{
                            reply.push({
                                name: member.displayName,
                                id: member.id
                            })
                        })
                        var replyString = ``
                        reply.forEach((member)=> {
                            replyString += member.name + ` | id: ` + member.id + `\n`
                        })
                        message.reply(replyString)
                        break

                    case '!send secret members a message':
                        message.guild.roles.get('427773522194989056').members.forEach((member)=>{
                            member.send('Hi!! Please ignore this message, this is just a test.')
                        })
                        message.react('👌')
                        break

                    case '!test delete':
                        console.log("deleting last DM")
                        message.author.createDM().then((channel)=>{
                            channel.fetchMessages({limit:1}).then((messages)=>{
                                messages.deleteAll()
                                message.react('👌')
                            })
                        })
                        break

                    case '!bot post channel intro':
                        client.channels.get(spaceoddityChannel).send(
                            `@Space Oddity\n\`The year is 2128, a year of great technological excitement and upheaval in the middle of the Greatest Space Age known to man. Continued environmental decline has forced humanity to embark on brave crusades off-world in search for greener pastures… including yourself. \n\nHumankind’s reach now expands across Solar Systems and has made contact with other civilisations, forming the Intergalactic Alliance. Armed with pencils, artefacts thought to channel a mystical force, we mark our new place in the galaxy. \n\nWhat awaits you in this world?\``
                        )
                        message.react('👌')
                        message.reply('Message posted to channel!')
                        break

                    case '!bot so-r1':
                        console.log("Deploying '!bot so-r1'")

                        var payload = `\`\`\`md\n**A SPACE ODDITY BEGINS...**\n\n# EVENT: 01 \n# HP: 25/25\n# STATUS: ALIVE\n\n--------\n\nUPDATE: \nIt is Day 23. Life aboard an Intergalactic ship is strange, but not terribly unfamiliar. The same meals are always served at the same times. You see the same people at the same places. You’ve made a few friends here and there, and even had a chat with the Captain every now and then. Life’s been nice... but you can’t wait to get off this ship. Somehow, something doesn’t feel quite right...\n\nYou are in the middle of eating lunch in the ship’s cafeteria when the floor begins to shake. No, not just the floor — the whole ship is trembling with alarming force. As one, you all look out the nearest bay window to see a massive asteroid hurtling straight for the wing of the ship! You barely have the time to throw yourselves to the floor before the rock collides...\n\n*Tune in again in the next three days for the next update!*\`\`\``

                        message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{
                            member.send(payload)
                        })
                        message.guild.roles.get(secretMembers).members.forEach((member)=>{
                            member.send(payload)
                        })
                        message.react('👌')
                        message.reply('Message sent to secret & spaceoddity members!')
                        break

                    // BUILD RESULTS
                    // case '!bot so-r2':
                    //     console.log("TEST Deploying '!bot so-r2'")

                    //     message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{

                    //         var payload = ``
                    //         // member.send(payload)
                    //         var memberId = member.id
                    //         const round = 2
                    //         var replyString
                    //         var currentState
                    //         var outcomes = {
                    //             outcomes: [
                    //                 {"range": [1, 10], "result": -1, "status": "BRUISED", "message": `The impact of the asteroid collision shakes the ship … but doesn’t hit directly. The ship is spun off-course, resulting in the diners of the cafeteria, including yourself, to tumble uncontrollably across the room until it recovers. You suffer a few scrapes and bruises through the chaos, but nothing worse than that. Phew!\n\nAs you stumble to your feet, you suddenly hear a loud hissing coming from somewhere below you … Everyone looks at each other, perhaps simultaneously remembering exactly where the cafeteria was — directly above the Lower Deck. A poisonous-looking green gas begins to filter through the vents of the cafeteria, smelling uncomfortably like your little brother’s gym shoes …`},
                    //                 {"range": [11, 15], "result": -3, "status": "BRUISED", "message": `The impact of the asteroid collision shakes the ship … but doesn’t hit directly. The ship is spun off-course, resulting in the diners of the cafeteria, including yourself, to tumble uncontrollably across the room until it recovers. You suffer a few scrapes and bruises through the chaos, but nothing worse than that. Phew!\n\nAs you stumble to your feet, you suddenly hear a loud hissing coming from somewhere below you … Everyone looks at each other, perhaps simultaneously remembering exactly where the cafeteria was — directly above the Lower Deck. A poisonous-looking green gas begins to filter through the vents of the cafeteria, smelling uncomfortably like your little brother’s gym shoes …`},
                    //                 {"range": [16, 20], "result": 0, "status": "UNHARMED", "message": `The impact of the asteroid collision shakes the ship … but doesn’t hit directly. The ship is spun off-course, resulting in the diners of the cafeteria, including yourself, to tumble uncontrollably across the room until it recovers. Your quick reflexes, however, get you through the chaos unscathed. Phew!\n\nAs you stumble to your feet, you suddenly hear a loud hissing coming from somewhere below you … Everyone looks at each other, perhaps simultaneously remembering exactly where the cafeteria was— directly above the Lower Deck. A poisonous-looking green gas begins to filter through the vents of the cafeteria, smelling uncomfortably like your little brother’s gym shoes …`}
                    //             ]
                    //         }
                    //         // console.log(participants[memberId])
                    //         if (!!participants[memberId] || participants[memberId] == 0){
                                
                    //             console.log("Exists -- "+member.displayName)
                    //             currentState = results.players[participants[memberId]].history[round - 1]
                    //             // console.log(currentState)
                    //             // console.log(currentState.health+`\n`)
                    //             var roundFormatted = (round).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                    //             var health = currentState.health
                    //             var status = ''
                                
                                
                    //             outcomes.outcomes.forEach((outcome)=>{
                    //                 if( currentState.rollResult >= outcome.range[0] && currentState.rollResult <= outcome.range[1] ){
                    //                     status = outcome.status
                                        
                    //                     payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`

                    //                     payload += outcome.message
                    //                 }
                    //             })


                    //             payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``
                                
                    //             // Send payload
                    //             message.reply(payload)
                    //         } else {
                    //             console.log("FAILED -- "+member.displayName)
                    //         }
                    //     })

                    //     message.reply("Test complete!")

                    //     break

                    // case '!bot so-r2':
                    //     console.log("LIVE Deploying '!bot so-r2'")

                    //     message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{

                    //         var payload = ``
                    //         // member.send(payload)
                    //         var memberId = member.id
                    //         const round = 2
                    //         var replyString
                    //         var currentState
                    //         var outcomes = {
                    //             outcomes: [
                    //                 {"range": [1, 10], "result": -1, "status": "BRUISED", "message": `The impact of the asteroid collision shakes the ship … but doesn’t hit directly. The ship is spun off-course, resulting in the diners of the cafeteria, including yourself, to tumble uncontrollably across the room until it recovers. You suffer a few scrapes and bruises through the chaos, but nothing worse than that. Phew!\n\nAs you stumble to your feet, you suddenly hear a loud hissing coming from somewhere below you … Everyone looks at each other, perhaps simultaneously remembering exactly where the cafeteria was — directly above the Lower Deck. A poisonous-looking green gas begins to filter through the vents of the cafeteria, smelling uncomfortably like your little brother’s gym shoes …`},
                    //                 {"range": [11, 15], "result": -3, "status": "BRUISED", "message": `The impact of the asteroid collision shakes the ship … but doesn’t hit directly. The ship is spun off-course, resulting in the diners of the cafeteria, including yourself, to tumble uncontrollably across the room until it recovers. You suffer a few scrapes and bruises through the chaos, but nothing worse than that. Phew!\n\nAs you stumble to your feet, you suddenly hear a loud hissing coming from somewhere below you … Everyone looks at each other, perhaps simultaneously remembering exactly where the cafeteria was — directly above the Lower Deck. A poisonous-looking green gas begins to filter through the vents of the cafeteria, smelling uncomfortably like your little brother’s gym shoes …`},
                    //                 {"range": [16, 20], "result": 0, "status": "UNHARMED", "message": `The impact of the asteroid collision shakes the ship … but doesn’t hit directly. The ship is spun off-course, resulting in the diners of the cafeteria, including yourself, to tumble uncontrollably across the room until it recovers. Your quick reflexes, however, get you through the chaos unscathed. Phew!\n\nAs you stumble to your feet, you suddenly hear a loud hissing coming from somewhere below you … Everyone looks at each other, perhaps simultaneously remembering exactly where the cafeteria was— directly above the Lower Deck. A poisonous-looking green gas begins to filter through the vents of the cafeteria, smelling uncomfortably like your little brother’s gym shoes …`}
                    //             ]
                    //         }
                    //         // console.log(participants[memberId])
                    //         if (!!participants[memberId] || participants[memberId] == 0){
                                
                    //             console.log("Exists -- "+member.displayName)
                    //             currentState = results.players[participants[memberId]].history[round - 1]
                    //             // console.log(currentState)
                    //             // console.log(currentState.health+`\n`)
                    //             var roundFormatted = (round).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                    //             var health = currentState.health
                    //             var status = ''
                                
                                
                    //             outcomes.outcomes.forEach((outcome)=>{
                    //                 if( currentState.rollResult >= outcome.range[0] && currentState.rollResult <= outcome.range[1] ){
                    //                     status = outcome.status
                                        
                    //                     payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`

                    //                     payload += outcome.message
                    //                 }
                    //             })


                    //             payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``
                                
                    //             // Send payload
                    //             member.send(payload)
                    //             message.reply("Round 2 Update sent successfully to "+member.displayName)
                    //         } else {
                    //             console.log("FAILED -- "+member.displayName)
                    //             message.reply("Round 2 Update failed for "+member.displayName)
                    //         }
                    //     })

                    //     message.reply("Deploy complete!")

                    //     break
                    
                    // case '!bot test so-r3':
                    //     console.log("TEST Deploying '!bot so-r3'")

                    //     message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{

                    //         var payload = ``
                    //         var memberId = member.id
                    //         // CHANGE THE ROUND EVERY ROUND PLEASE.
                    //         const round = 3
                    //         var replyString
                    //         var currentState
                    //         var outcomes = {
                    //             outcomes: [
                    //                 {"range": [1, 12], "result": 0, "status": "POISONED", "message": `You all run as fast as you can for the cafeteria exit. Unfortunately, there are a lot of you, and patience is not your highest priority when your life is on the line. You are caught in the stampede of bodies and the haze of pungent green gas, making your stomach roll sickeningly [Poisoned][-1hp]. Either way, you at least all manage to escape the cafeteria, and seal it tightly shut behind you. \n\nAs you are catching your breath in the corridor, the captain’s voice comes on the speakers, ordering you all to return to your rooms until further notice. It makes sense, as your rooms are airtight and are stocked with emergency supplies. As the raggled crowd begins to disperse, the lights flicker, then turn off completely, plunging the ship into darkness. You hear an eerie static sound crackle from the speakers, then silence. Then you hear a scream …`},
                    //                 {"range": [13, 20], "result": 0, "status": "BREATHING HEAVILY", "message": `You all run as fast as you can for the cafeteria exit. Unfortunately, there is a lot of you, and patience is not your highest priority when your life is on the line. You are quick enough on your feet to be one of the first to reach the door, and escape the worst of the pungent green gas. The rest are not so lucky. Either way, you all manage to escape the cafeteria, and seal it tightly shut behind you. \n\nAs you are catching your breath in the corridor, the captain’s voice comes on the speakers, ordering you all to return to your rooms until further notice. It makes sense, as your rooms are airtight and are stocked with emergency supplies. As the raggled crowd begins to disperse, the lights flicker, then turn off completely, plunging the ship into darkness. You hear an eerie static sound crackle from the speakers, then silence. Then you hear a scream …`},
                    //             ]
                    //         }
                    //         // console.log(participants[memberId])
                    //         if (!!participants[memberId] || participants[memberId] == 0){
                                
                    //             console.log("Exists -- "+member.displayName)
                    //             currentState = results.players[participants[memberId]].history[round - 1]
                    //             // console.log(currentState)
                    //             // console.log(currentState.health+`\n`)
                    //             var roundFormatted = (round).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                    //             var health = currentState.health
                    //             var status = ''
                                
                                
                    //             outcomes.outcomes.forEach((outcome)=>{
                    //                 if( currentState.rollResult >= outcome.range[0] && currentState.rollResult <= outcome.range[1] ){
                    //                     status = outcome.status
                                        
                    //                     payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`

                    //                     payload += outcome.message
                    //                 }
                    //             })


                    //             payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``
                                
                    //             // Send payload
                    //             // member.send(payload)
                    //             message.reply("Round 3 Update: "+member.displayName+`\n\n`+payload)
                    //         } else {
                    //             console.log("FAILED -- "+member.displayName)
                    //             message.reply("Round 3 Update failed for "+member.displayName)
                    //         }
                    //     })

                    //     message.reply("Test complete!")

                    //     break

                    // case '!bot so-r3':
                    //     console.log("LIVE Deploying '!bot so-r3'")

                    //     message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{

                    //         var payload = ``
                    //         var memberId = member.id
                    //         // CHANGE THE ROUND EVERY ROUND PLEASE.
                    //         const round = 3
                    //         var replyString
                    //         var currentState
                    //         var outcomes = {
                    //             outcomes: [
                    //                 {"range": [1, 12], "result": 0, "status": "POISONED", "message": `You all run as fast as you can for the cafeteria exit. Unfortunately, there are a lot of you, and patience is not your highest priority when your life is on the line. You are caught in the stampede of bodies and the haze of pungent green gas, making your stomach roll sickeningly [Poisoned][-1hp]. Either way, you at least all manage to escape the cafeteria, and seal it tightly shut behind you. \n\nAs you are catching your breath in the corridor, the captain’s voice comes on the speakers, ordering you all to return to your rooms until further notice. It makes sense, as your rooms are airtight and are stocked with emergency supplies. As the raggled crowd begins to disperse, the lights flicker, then turn off completely, plunging the ship into darkness. You hear an eerie static sound crackle from the speakers, then silence. Then you hear a scream …`},
                    //                 {"range": [13, 20], "result": 0, "status": "BREATHING HEAVILY", "message": `You all run as fast as you can for the cafeteria exit. Unfortunately, there is a lot of you, and patience is not your highest priority when your life is on the line. You are quick enough on your feet to be one of the first to reach the door, and escape the worst of the pungent green gas. The rest are not so lucky. Either way, you all manage to escape the cafeteria, and seal it tightly shut behind you. \n\nAs you are catching your breath in the corridor, the captain’s voice comes on the speakers, ordering you all to return to your rooms until further notice. It makes sense, as your rooms are airtight and are stocked with emergency supplies. As the raggled crowd begins to disperse, the lights flicker, then turn off completely, plunging the ship into darkness. You hear an eerie static sound crackle from the speakers, then silence. Then you hear a scream …`},
                    //             ]
                    //         }
                    //         // console.log(participants[memberId])
                    //         if (!!participants[memberId] || participants[memberId] == 0){
                                
                    //             console.log("Exists -- "+member.displayName)
                    //             currentState = results.players[participants[memberId]].history[round - 1]
                    //             // console.log(currentState)
                    //             // console.log(currentState.health+`\n`)
                    //             var roundFormatted = (round).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                    //             var health = currentState.health
                    //             var status = ''
                                
                                
                    //             outcomes.outcomes.forEach((outcome)=>{
                    //                 if( currentState.rollResult >= outcome.range[0] && currentState.rollResult <= outcome.range[1] ){
                    //                     status = outcome.status
                                        
                    //                     payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`

                    //                     payload += outcome.message
                    //                 }
                    //             })


                    //             payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``
                                
                    //             // Send payload
                    //             member.send(payload)
                    //             message.reply("Round 3 Update sent successfully to "+member.displayName)
                    //         } else {
                    //             console.log("FAILED -- "+member.displayName)
                    //             message.reply("Round 3 Update failed for "+member.displayName)
                    //         }
                    //     })

                    //     message.reply("Deploy complete!")

                    //     break
                    
                    // case '!bot test so-r4':
                    //     console.log("TEST Deploying '!bot so-r4'")

                    //     message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{

                    //         var payload = ``
                    //         var memberId = member.id
                    //         // CHANGE THE ROUND EVERY ROUND PLEASE.
                    //         const round = 4
                    //         var replyString
                    //         var currentState
                    //         var outcomes = {
                    //             outcomes: [
                    //                 {"range": [1, 3], "result": -1, "status": "TRAMPLED", "message": `Everyone begins moving at once! Not wanting to find out the source of that scream, you bolt for the nearest room you remember seeing before the lights went out. Unfortunately, everyone else seems to be thinking the same. You are caught in the stampede of bodies, and shoved roughly into the wall as they surge past [Trampled][-1hp] Still, you manage to stumble to the doorway just in time. You fling yourself inside and seal the door behind—you only to find you are not the only person in this room…\n\nTo your surprise, there is an Intergalactic Alliance officer standing before you, holding a torch in one hand and a firearm in the other. A crew of them had boarded the ship only the day before, but you hadn’t seen any until now. He offers you help with your injuries... but should you accept it?`},
                                    // {"range": [4, 6], "result": 0, "status": "BREATHING HARD", "message": `You don’t bother to wait to find out what happened! You bolt for the nearest room you remember seeing before the lights went out. Your quick thinking and agility help you keep ahead of the stampeding crowd and to the doorway in time. You fling yourself inside and seal the door behind—you only to find you are not the only person in this room…\n\nTo your surprise, there is an Intergalactic Alliance officer standing before you, holding a torch in one hand and a firearm in the other. A crew of them had boarded the ship only the day before, but you hadn’t seen any until now. He offers you help with your injuries... but should you accept it?`},
                    //             ]
                    //         }
                    //         // console.log(participants[memberId])
                    //         if (!!participants[memberId] || participants[memberId] == 0){
                                
                    //             console.log("Exists -- "+member.displayName)
                    //             currentState = results.players[participants[memberId]].history[round - 1]
                    //             // console.log(currentState)
                    //             // console.log(currentState.health+`\n`)
                    //             var roundFormatted = (round).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                    //             var health = currentState.health
                    //             var status = ''
                                
                                
                    //             outcomes.outcomes.forEach((outcome)=>{
                    //                 if( currentState.rollResult >= outcome.range[0] && currentState.rollResult <= outcome.range[1] ){
                    //                     status = outcome.status
                                        
                    //                     payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`

                    //                     payload += outcome.message

                    //                     if(currentState.poisoned == true){
                    //                         payload += `\n\n*You feel a bit sick* [Poisoned][-1hp]`
                    //                     }

                    //                     payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``
                    //                 }
                    //                 else if(currentState.rollResult == "lowest"){
                    //                     status = "DEAD"

                    //                     payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`

                    //                     payload += `The echoes of the corridor reveal your own scream. The corridor’s emergency beacon reveals a disfigured man, lumped over… approaching you. Bones extrude from the man’s arms, blackened and claw-like. The beacon flashes – every flash shows the figure closer and close than before. You hear several doors in the corridor close in succession… Just as you think you have enough time to turn and run, your legs are swept and you fall forward. As you try to bring yourself up, razor sharp claws embed themselves into your back and push you straight back down. The pressure intensifies and you feel your breath leaving you. The claws violently tear from your back. Your vision turns red. As you lie mangled on the floor, your last sight is that of a figure walking over you, further down into the blackness of the corridor… You try to scream for help, but nothing comes out… [Instant death][-25hp]\n\n\n\n*Game over! Better luck next time!*\`\`\``
                    //                 }

                    //             })
                                
                    //             // Send payload
                    //             // member.send(payload)
                    //             message.reply("Round "+round+" Update: "+member.displayName+`\n\n`+payload)
                    //         } else {
                    //             console.log("FAILED -- "+member.displayName)
                    //             message.reply("Round "+round+" Update failed for "+member.displayName)
                    //         }
                    //     })

                    //     message.reply("Test complete!")

                    //     break

                    // case '!bot so-r4':
                    //     console.log("LIVE Deploying '!bot so-r4'")

                    //     message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{

                    //         var payload = ``
                    //         var memberId = member.id
                    //         // CHANGE THE ROUND EVERY ROUND PLEASE.
                    //         const round = 4
                    //         var replyString
                    //         var currentState
                    //         var outcomes = {
                    //             outcomes: [
                    //                 {"range": [1, 3], "result": -1, "status": "TRAMPLED", "message": `Everyone begins moving at once! Not wanting to find out the source of that scream, you bolt for the nearest room you remember seeing before the lights went out. Unfortunately, everyone else seems to be thinking the same. You are caught in the stampede of bodies, and shoved roughly into the wall as they surge past [Trampled][-1hp] Still, you manage to stumble to the doorway just in time. You fling yourself inside and seal the door behind—you only to find you are not the only person in this room…\n\nTo your surprise, there is an Intergalactic Alliance officer standing before you, holding a torch in one hand and a firearm in the other. A crew of them had boarded the ship only the day before, but you hadn’t seen any until now. He offers you help with your injuries... but should you accept it?`},
                                    // {"range": [4, 6], "result": 0, "status": "BREATHING HARD", "message": `You don’t bother to wait to find out what happened! You bolt for the nearest room you remember seeing before the lights went out. Your qdzuick thinking and agility help you keep ahead of the stampeding crowd and to the doorway in time. You fling yourself inside and seal the door behind—you only to find you are not the only person in this room…\n\nTo your surprise, there is an Intergalactic Alliance officer standing before you, holding a torch in one hand and a firearm in the other. A crew of them had boarded the ship only the day before, but you hadn’t seen any until now. He offers you help with your injuries... but should you accept it?`},
                    //             ]
                    //         }
                    //         // console.log(participants[memberId])
                    //         if (!!participants[memberId] || participants[memberId] == 0){
                                
                    //             console.log("Exists -- "+member.displayName)
                    //             currentState = results.players[participants[memberId]].history[round - 1]
                    //             // console.log(currentState)
                    //             // console.log(currentState.health+`\n`)
                    //             var roundFormatted = (round).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                    //             var health = currentState.health
                    //             var status = ''
                                
                                
                    //             outcomes.outcomes.forEach((outcome)=>{
                    //                 if( currentState.rollResult >= outcome.range[0] && currentState.rollResult <= outcome.range[1] ){
                    //                     status = outcome.status
                                        
                    //                     payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`

                    //                     payload += outcome.message

                    //                     if(currentState.poisoned == true){
                    //                         payload += `\n\n*You feel a bit sick* [Poisoned][1-hp]`
                    //                     }

                    //                     payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``
                    //                 }
                    //                 else if(currentState.rollResult == "lowest"){
                    //                     status = "DEAD"

                    //                     payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`

                    //                     payload += `The echoes of the corridor reveal your own scream. The corridor’s emergency beacon reveals a disfigured man, lumped over… approaching you. Bones extrude from the man’s arms, blackened and claw-like. The beacon flashes – every flash shows the figure closer and close than before. You hear several doors in the corridor close in succession… Just as you think you have enough time to turn and run, your legs are swept and you fall forward. As you try to bring yourself up, razor sharp claws embed themselves into your back and push you straight back down. The pressure intensifies and you feel your breath leaving you. The claws violently tear from your back. Your vision turns red. As you lie mangled on the floor, your last sight is that of a figure walking over you, further down into the blackness of the corridor… You try to scream for help, but nothing comes out… [Instant death][-25hp]\n\n\n\n*Game over! Better luck next time!*\`\`\``
                    //                 }

                    //             })
                                
                    //             // Send payload
                    //             member.send(payload)
                    //             message.reply("Round "+round+" Update sent successfully to "+member.displayName)
                    //         } else {
                    //             console.log("FAILED -- "+member.displayName)
                    //             message.reply("Round "+round+" Update failed for "+member.displayName)
                    //         }
                    //     })

                    //     message.reply("Deploy complete!")

                    //     break

                    // case '!bot test so-r5':
                    //     console.log("TEST Deploying '!bot so-r5'")

                    //     message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{

                    //         var payload = ``
                    //         var memberId = member.id
                    //         // CHANGE THE ROUND EVERY ROUND PLEASE.
                    //         const round = 5
                    //         var replyString
                    //         var currentState
                    //         var outcomes = {
                    //             outcomes: [
                    //                 {"range": [1, 3], "result": 0, "status": "SUSPICIOUS", "message": `You are suspicious of his offer… and decide to turn him down. Too much has happened in the past few minutes for you to trust his unerringly convenient appearance. He doesn’t seem to take offence either way, and simply gives you a nod of acknowledgment before returning to gazing out the window. Despite your apprehension, you appreciate the silent company.\n\nThe officer seems content to simply waiting out the event until the Captain returns on speaker. You try to calm yourself by walking over to the small window in your room and peering out into space. There is an unfamiliar planet nearby that could be a possible emergency landing point. However, you also notice something else—a small and unfamiliar ship descending and attaching itself to yours. Another terrifying tremor runs through the ship…`},
                    //                 {"range": [4, 14], "result": 1, "status": "FEELING BETTER", "message": `You are wary of his offer, but decide there is no harm in accepting. However, you insist on tending to your wounds yourself. He seems to take no offence, and hands over the first-aid kit in the room without protest [Healed][+1hp] After the trauma of the past few minutes, it is nice to have this small time to breathe. Despite your apprehension, you feel somewhat safer with a trained officer at your side.\n\nAfterwards, the officer seems content to simply waiting out the event until the Captain returns on speaker. You try to calm yourself by walking over to the small window in your room and peering out into space. There is an unfamiliar planet nearby that could be a possible emergency landing point. However, you also notice something else—a small and unfamiliar ship descending and attaching itself to yours. Another terrifying tremor runs through the ship… `},
                    //                 {"range": [15, 18], "result": 2, "status": "FEELING BETTER", "message": `You are wary of his offer, but decide there is no harm in letting him help. He uses the first-aid kit in the room to help tend to your wounds, cleaning any scrapes and bruises [Healed][+2hp] After the trauma of the past few minutes, it is nice to have this small time to breathe. Despite your apprehension, you feel somewhat safer with a trained officer at your side.\n\nAfterwards, the officer seems content to simply waiting out the event until the Captain returns on speaker. You try to calm yourself by walking over to the small window in your room and peering out into space. There is an unfamiliar planet nearby that could be a possible emergency landing point. However, you also notice something else—a small and unfamiliar ship descending and attaching itself to yours. Another terrifying tremor runs through the ship…`},
                    //                 {"range": [19, 20], "result": 3, "status": "FEELING GOOD", "message": `You are wary of his offer, but decide there is no harm in letting him help. He uses the first-aid kit in the room to help tend to your wounds, cleaning any scrapes and bruises [Healed][+2hp] After the trauma of the past few minutes, it is nice to have this small time to breathe. Despite your apprehension, you feel somewhat safer with a trained officer at your side.\n\nAfterwards, the officer seems content to simply waiting out the event until the Captain returns on speaker. You try to calm yourself by walking over to the small window in your room and peering out into space. There is an unfamiliar planet nearby that could be a possible emergency landing point. However, you also notice something else—a small and unfamiliar ship descending and attaching itself to yours. Another terrifying tremor runs through the ship… `}
                    //             ]
                    //         }
                    //         // console.log(participants[memberId])
                    //         if (!!participants[memberId] || participants[memberId] == 0){
                                
                    //             console.log("Exists -- "+member.displayName)
                    //             if(results.players[participants[memberId]].history.length >= round){
                    //                 currentState = results.players[participants[memberId]].history[round - 1]
                    //                 // console.log(currentState)
                    //                 // console.log(currentState.health+`\n`)
                    //                 var roundFormatted = (round).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                    //                 var health = currentState.health
                    //                 var status = ''
                                    
                                    
                    //                 outcomes.outcomes.forEach((outcome)=>{
                    //                     if( currentState.rollResult >= outcome.range[0] && currentState.rollResult <= outcome.range[1] ){
                    //                         status = outcome.status
                                            
                    //                         payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`
    
                    //                         payload += outcome.message
    
                    //                         if(currentState.poisoned == true){
                    //                             payload += `\n\n*Poison courses through your body* [Poisoned][-1hp]`
                    //                         }
    
                    //                         payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``
                    //                     }
                    //                     else if(currentState.rollResult == "lowest"){
                    //                     }
    
                    //                 })
                                    
                    //                 // Send payload
                    //                 // member.send(payload)
                    //                 message.reply("Round "+round+" Update: "+member.displayName+`\n\n`+payload)
                    //             } else {
                    //                 message.reply("Round "+round+" Update: "+member.displayName+`\n\n`+`**THEY DIED x_x**`)
                    //             }
                    //         } else {
                    //             console.log("FAILED -- "+member.displayName)
                    //             message.reply("Round "+round+" Update failed for "+member.displayName)
                    //         }
                    //     })

                    //     message.reply("Test complete!")

                    //     break

                    // case '!bot so-r5':
                    //     console.log("LIVE Deploying '!bot so-r5'")

                    //     message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{

                    //         var payload = ``
                    //         var memberId = member.id
                    //         // CHANGE THE ROUND EVERY ROUND PLEASE.
                    //         const round = 5
                    //         var replyString
                    //         var currentState
                    //         var outcomes = {
                    //             outcomes: [
                    //                 {"range": [1, 3], "result": 0, "status": "SUSPICIOUS", "message": `You are suspicious of his offer… and decide to turn him down. Too much has happened in the past few minutes for you to trust his unerringly convenient appearance. He doesn’t seem to take offence either way, and simply gives you a nod of acknowledgment before returning to gazing out the window. Despite your apprehension, you appreciate the silent company.\n\nThe officer seems content to simply waiting out the event until the Captain returns on speaker. You try to calm yourself by walking over to the small window in your room and peering out into space. There is an unfamiliar planet nearby that could be a possible emergency landing point. However, you also notice something else—a small and unfamiliar ship descending and attaching itself to yours. Another terrifying tremor runs through the ship…`},
                    //                 {"range": [4, 14], "result": 1, "status": "FEELING BETTER", "message": `You are wary of his offer, but decide there is no harm in accepting. However, you insist on tending to your wounds yourself. He seems to take no offence, and hands over the first-aid kit in the room without protest [Healed][+1hp] After the trauma of the past few minutes, it is nice to have this small time to breathe. Despite your apprehension, you feel somewhat safer with a trained officer at your side.\n\nAfterwards, the officer seems content to simply waiting out the event until the Captain returns on speaker. You try to calm yourself by walking over to the small window in your room and peering out into space. There is an unfamiliar planet nearby that could be a possible emergency landing point. However, you also notice something else—a small and unfamiliar ship descending and attaching itself to yours. Another terrifying tremor runs through the ship… `},
                    //                 {"range": [15, 18], "result": 2, "status": "FEELING BETTER", "message": `You are wary of his offer, but decide there is no harm in letting him help. He uses the first-aid kit in the room to help tend to your wounds, cleaning any scrapes and bruises [Healed][+2hp] After the trauma of the past few minutes, it is nice to have this small time to breathe. Despite your apprehension, you feel somewhat safer with a trained officer at your side.\n\nAfterwards, the officer seems content to simply waiting out the event until the Captain returns on speaker. You try to calm yourself by walking over to the small window in your room and peering out into space. There is an unfamiliar planet nearby that could be a possible emergency landing point. However, you also notice something else—a small and unfamiliar ship descending and attaching itself to yours. Another terrifying tremor runs through the ship…`},
                    //                 {"range": [19, 20], "result": 3, "status": "FEELING GOOD", "message": `You are wary of his offer, but decide there is no harm in letting him help. He uses the first-aid kit in the room to help tend to your wounds, cleaning any scrapes and bruises [Healed][+2hp] After the trauma of the past few minutes, it is nice to have this small time to breathe. Despite your apprehension, you feel somewhat safer with a trained officer at your side.\n\nAfterwards, the officer seems content to simply waiting out the event until the Captain returns on speaker. You try to calm yourself by walking over to the small window in your room and peering out into space. There is an unfamiliar planet nearby that could be a possible emergency landing point. However, you also notice something else—a small and unfamiliar ship descending and attaching itself to yours. Another terrifying tremor runs through the ship… `}
                    //             ]
                    //         }
                    //         // console.log(participants[memberId])
                    //         if (!!participants[memberId] || participants[memberId] == 0){
                                
                    //             console.log("Exists -- "+member.displayName)
                    //             // This checks if the player has existence in this round (i.e. not dead from a previous round)
                    //             if(results.players[participants[memberId]].history.length >= round){
                    //                 currentState = results.players[participants[memberId]].history[round - 1]
                    //                 // console.log(currentState)
                    //                 // console.log(currentState.health+`\n`)
                    //                 var roundFormatted = (round).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                    //                 var health = currentState.health
                    //                 var status = ''
                                    
                                    
                    //                 outcomes.outcomes.forEach((outcome)=>{
                    //                     if( currentState.rollResult >= outcome.range[0] && currentState.rollResult <= outcome.range[1] ){
                    //                         status = outcome.status
                                            
                    //                         payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`

                    //                         payload += outcome.message

                    //                         if(currentState.poisoned == true){
                    //                             payload += `\n\n*Poison courses through your body* [Poisoned][-1hp]`
                    //                         }

                    //                         payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``
                    //                     }
                    //                     else if(currentState.rollResult == "lowest"){
                    //                     }

                    //                 })
                                    
                    //                 // Send payload
                    //                 member.send(payload)
                    //                 message.reply("Round "+round+" Update sent successfully to "+member.displayName)
                    //             } else {
                    //                 // Alternative response if player has died previously.
                    //                 message.reply("Round "+round+" Update was not send because "+member.displayName+" is **DEAD**")
                    //             }
                    //         } else {
                    //             console.log("FAILED -- "+member.displayName)
                    //             message.reply("Round "+round+" Update failed for "+member.displayName)
                    //         }
                    //     })

                    //     message.reply("Deploy complete!")

                    //     break

                    // case '!bot test so-r6':
                    //     console.log("TEST Deploying '!bot so-r6'")
                    //     message.reply("TEST Deploying '!bot so-r6'")

                    //     message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{

                    //         var payload = ``
                    //         var memberId = member.id
                    //         // CHANGE THE ROUND EVERY ROUND PLEASE.
                    //         const round = 6
                    //         var replyString
                    //         var currentState
                    //         var outcomes = {
                    //             outcomes: [
                    //                 {"range": [1, 2], "result": 0, "status": "SCARED", "message": `The ship trembles violently, causing both you and the officer to stumble. You grab the window frame tightly to keep balance. The officer, on the other hand, fumbles and drops his gun. It misfires with a bang—but only the officer himself is grazed. He curses under his breath, but grits his teeth to point out the window. “Pirates,” he hisses, and a chill runs down your spine. \n\nThe idea that you are on a damaged ship, filled with poison gas and now being boarded by space pirates, make you both reluctant to stay in your room to be slaughtered. You agree that the best course of action would be to get out of the ship altogether. With no time to tend to wounds, you change into the protective space suits that were stored in your room, and attach the spare oxygen to yourselves. Then, with his torch out like a shield, he slowly opens the door of your cabin, and you brave the dark corridor outside… `},
                    //                 {"range": [3, 5], "result": -1, "status": "GRAZED", "message": `The ship trembles violently, causing both you and the officer to stumble. You grab the window frame tightly to keep balance. The officer, on the other hand, fumbles and drops his gun. It misfires with a bang—the bullet almost misses you, but leaves a painful graze behind [Grazed][-1hp]. He apologises, but then points urgently out the window—it seems you have a worse problem on the horizon. “Pirates,” he hisses, and a chill runs down your spine. \n\nThe idea that you are on a damaged ship, filled with poison gas and now being boarded by space pirates, make you both reluctant to stay in your room to be slaughtered. You agree that the best course of action would be to get out of the ship altogether. With no time to tend to wounds, you change into the protective space suits that were stored in your room, and attach the spare oxygen to yourselves. Then, with his torch out like a shield, he slowly opens the door of your cabin, and you brave the dark corridor outside… `},
                    //                 {"range": [6, 6], "result": -3, "status": "SHOT", "message": `The ship trembles violently, causing both you and the officer to stumble. You grab the window frame tightly to keep balance. The officer, on the other hand, fumbles and drops his gun. It misfires with a bang—the bullet takes out a chunk of your arm [Shot][-3hp]. You cry out and he apologises, but then points urgently out the window—it seems you have a worse problem on the horizon. “Pirates,” he hisses, and a chill runs down your spine. \n\nThe idea that you are on a damaged ship, filled with poison gas and now being boarded by space pirates, make you both reluctant to stay in your room to be slaughtered. You agree that the best course of action would be to get out of the ship altogether. With no time to tend to wounds, you change into the protective space suits that were stored in your room, and attach the spare oxygen to yourselves. Then, with his torch out like a shield, he slowly opens the door of your cabin, and you brave the dark corridor outside… `},
                    //             ]
                    //         }
                    //         // console.log(participants[memberId])
                    //         if (!!participants[memberId] || participants[memberId] == 0){
                                
                    //             console.log("Exists -- "+member.displayName)
                    //             if(results.players[participants[memberId]].history.length >= round){
                    //                 currentState = results.players[participants[memberId]].history[round - 1]
                    //                 // console.log(currentState)
                    //                 // console.log(currentState.health+`\n`)
                    //                 var roundFormatted = (round).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                    //                 var health = currentState.health
                    //                 var status = ''
                                    
                                    
                    //                 outcomes.outcomes.forEach((outcome)=>{
                    //                     if( currentState.rollResult >= outcome.range[0] && currentState.rollResult <= outcome.range[1] ){
                    //                         status = outcome.status
                                            
                    //                         payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`
    
                    //                         payload += outcome.message
    
                    //                         if(currentState.poisoned == true){
                    //                             payload += `\n\n*Your head throbs...* [Poisoned][-1hp]`
                    //                         }
    
                    //                         payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``
                    //                     }
                    //                     else if(currentState.rollResult == "lowest"){
                    //                     }
    
                    //                 })
                                    
                    //                 // Send payload
                    //                 // member.send(payload)
                    //                 message.channel.send("Round "+round+" Update: (Player #"+participants[memberId]+") "+member.displayName+`\n`+payload)
                    //             } else {
                    //                 message.channel.send("Round "+round+" Update: (Player #"+participants[memberId]+") "+member.displayName+`\n`+`**THEY DIED x_x**`)
                    //             }
                    //         } else {
                    //             console.log("FAILED -- "+member.displayName)
                    //             message.channel.send("Round "+round+" Update failed for "+member.displayName)
                    //         }
                    //     })

                    //     message.reply("Test complete!")

                    //     break

                    // case '!bot so-r6':
                    //     console.log("LIVE Deploying '!bot so-r6'")
                    //     message.reply("LIVE Deploying '!bot so-r6'")

                    //     message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{

                    //         var payload = ``
                    //         var memberId = member.id
                    //         // CHANGE THE ROUND EVERY ROUND PLEASE.
                    //         const round = 6
                    //         var replyString
                    //         var currentState
                    //         var outcomes = {
                    //             outcomes: [
                    //                 {"range": [1, 2], "result": 0, "status": "SCARED", "message": `The ship trembles violently, causing both you and the officer to stumble. You grab the window frame tightly to keep balance. The officer, on the other hand, fumbles and drops his gun. It misfires with a bang—but only the officer himself is grazed. He curses under his breath, but grits his teeth to point out the window. “Pirates,” he hisses, and a chill runs down your spine. \n\nThe idea that you are on a damaged ship, filled with poison gas and now being boarded by space pirates, make you both reluctant to stay in your room to be slaughtered. You agree that the best course of action would be to get out of the ship altogether. With no time to tend to wounds, you change into the protective space suits that were stored in your room, and attach the spare oxygen to yourselves. Then, with his torch out like a shield, he slowly opens the door of your cabin, and you brave the dark corridor outside… `},
                    //                 {"range": [3, 5], "result": -1, "status": "GRAZED", "message": `The ship trembles violently, causing both you and the officer to stumble. You grab the window frame tightly to keep balance. The officer, on the other hand, fumbles and drops his gun. It misfires with a bang—the bullet almost misses you, but leaves a painful graze behind [Grazed][-1hp]. He apologises, but then points urgently out the window—it seems you have a worse problem on the horizon. “Pirates,” he hisses, and a chill runs down your spine. \n\nThe idea that you are on a damaged ship, filled with poison gas and now being boarded by space pirates, make you both reluctant to stay in your room to be slaughtered. You agree that the best course of action would be to get out of the ship altogether. With no time to tend to wounds, you change into the protective space suits that were stored in your room, and attach the spare oxygen to yourselves. Then, with his torch out like a shield, he slowly opens the door of your cabin, and you brave the dark corridor outside… `},
                    //                 {"range": [6, 6], "result": -3, "status": "SHOT", "message": `The ship trembles violently, causing both you and the officer to stumble. You grab the window frame tightly to keep balance. The officer, on the other hand, fumbles and drops his gun. It misfires with a bang—the bullet takes out a chunk of your arm [Shot][-3hp]. You cry out and he apologises, but then points urgently out the window—it seems you have a worse problem on the horizon. “Pirates,” he hisses, and a chill runs down your spine. \n\nThe idea that you are on a damaged ship, filled with poison gas and now being boarded by space pirates, make you both reluctant to stay in your room to be slaughtered. You agree that the best course of action would be to get out of the ship altogether. With no time to tend to wounds, you change into the protective space suits that were stored in your room, and attach the spare oxygen to yourselves. Then, with his torch out like a shield, he slowly opens the door of your cabin, and you brave the dark corridor outside… `},
                    //             ]
                    //         }
                    //         // console.log(participants[memberId])
                    //         if (!!participants[memberId] || participants[memberId] == 0){
                                
                    //             console.log("Exists -- "+member.displayName)
                    //             // This checks if the player has existence in this round (i.e. not dead from a previous round)
                    //             if(results.players[participants[memberId]].history.length >= round){
                    //                 currentState = results.players[participants[memberId]].history[round - 1]
                    //                 // console.log(currentState)
                    //                 // console.log(currentState.health+`\n`)
                    //                 var roundFormatted = (round).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                    //                 var health = currentState.health
                    //                 var status = ''
                                    
                                    
                    //                 outcomes.outcomes.forEach((outcome)=>{
                    //                     if( currentState.rollResult >= outcome.range[0] && currentState.rollResult <= outcome.range[1] ){
                    //                         status = outcome.status
                                            
                    //                         payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`

                    //                         payload += outcome.message

                    //                         if(currentState.poisoned == true){
                    //                             payload += `\n\n*Your head pulses...* [Poisoned][-1hp]`
                    //                         }

                    //                         payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``
                    //                     }
                    //                     else if(currentState.rollResult == "lowest"){
                    //                     }

                    //                 })
                                    
                    //                 // Send payload
                    //                 member.send(payload)
                    //                 message.channel.send("Round "+round+" Update sent successfully to (Player #"+participants[memberId]+") "+member.displayName)
                    //             } else {
                    //                 // Alternative response if player has died previously.
                    //                 message.channel.send("Round "+round+" Update was not sent because (Player #"+participants[memberId]+") "+member.displayName+" is **DEAD**")
                    //             }
                    //         } else {
                    //             console.log("FAILED -- "+member.displayName)
                    //             message.channel.send("Round "+round+" Update failed for "+member.displayName)
                    //         }
                    //     })

                    //     message.reply("LIVE Deploy complete!")

                    //     break

                    // case '!bot test so-r7':
                    //     console.log("TEST Deploying '!bot so-r7'")
                    //     message.reply("TEST Deploying '!bot so-r7'")

                    //     message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{

                    //         var payload = ``
                    //         var memberId = member.id
                    //         // CHANGE THE ROUND EVERY ROUND PLEASE.
                    //         const round = 7
                    //         var replyString
                    //         var currentState
                    //         var outcomes = {
                    //             outcomes: [
                    //                 {"range": [1, 10], "result": -5, "status": "BLEEDING", "message": `It is pitch black outside, and the officer’s torch can only shine so far. You barely see a flash of movement before something lunges towards you! You are slammed into the opposite wall, your head hitting metal and for a split second, your vision goes white [HEAD INJURY][-5hp]. Your officer friend acts instinctively. He flings your assailant off you and swiftly shoots it dead on the floor. When he shines his torch upon it, you are shocked to see it is what looks like another Intergalactic officer. Your companion steps closer, but before your eyes, the dead man’s features melt into a strange alien’s.\n\nThe alien is like nothing you have seen before. You tug on your companion’s arm to urge him to leave the body, but instead he steps forward with curiosity and fascinated horror. The alien’s body bleeds green liquid onto the floor, but you catch a flicker of movement behind its eyelids…`},
                    //                 {"range": [11, 20], "result": -1, "status": "SCRATCHED", "message": `It is pitch black outside, and the officer’s torch can only shine so far. You barely see a flash of movement before something lunges towards you! You jerk back but not quick enough [Scratched][-1hp]. Your officer friend acts instinctively. He flings your assailant off you and swiftly shoots it dead on the floor. When he shines his torch upon it, you are shocked to see it is what looks like another Intergalactic officer. Your companion steps closer, but before your eyes, the dead man’s features melt into a strange alien’s.\n\nThe alien is like nothing you have seen before. You tug on your companion’s arm to urge him to leave the body, but instead he steps forward with curiosity and fascinated horror. The alien’s body bleeds green liquid onto the floor, but you catch a flicker of movement behind its eyelids…`},
                    //             ]
                    //         }
                    //         // console.log(participants[memberId])
                    //         if (!!participants[memberId] || participants[memberId] == 0){
                                
                    //             console.log("Exists -- "+member.displayName)
                    //             if(results.players[participants[memberId]].history.length >= round){
                    //                 currentState = results.players[participants[memberId]].history[round - 1]
                    //                 // console.log(currentState)
                    //                 // console.log(currentState.health+`\n`)
                    //                 var roundFormatted = (round).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                    //                 var health = currentState.health
                    //                 var status = ''
                                    
                                    
                    //                 outcomes.outcomes.forEach((outcome)=>{
                    //                     if( currentState.rollResult >= outcome.range[0] && currentState.rollResult <= outcome.range[1] ){
                    //                         status = outcome.status
                                            
                    //                         payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`
    
                    //                         payload += outcome.message
    
                    //                         if(currentState.poisoned == true){
                    //                             payload += `\n\n*Your space suit is punctured...* [Poisoned][-1hp]`
                    //                         }
    
                    //                         payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``
                    //                     }
                    //                     else if(currentState.rollResult == "lowest"){
                    //                         status = "DEAD"

                    //                         payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`

                    //                         payload += `It is pitch black outside, and the officer’s torch can only shine so far. You barely see a flash of movement before something lunges towards you! You are slammed into the opposite wall, your head hitting metal and for a split second, your vision goes white. You can hear your officer friend yelling something, but the ringing in your ears is too much. Your assailant doesn’t relent. You heard gun shots, though you aren’t sure from whom, before pain blooms abruptly from your abdomen. When you look down, all you see is red. \n\nAs you slump slowly to the floor, ears still ringing, you come to the realisation that you recognise the boots of the monster before you. And when you look up, your vision fading, your last thoughts are that your murderer looks eerily like another Intergalactic officer… [Instant death][-25hp]\n\n*Game over! Better luck next time!*\`\`\``
                    //                     }
    
                    //                 })
                                    
                    //                 // Send payload
                    //                 // member.send(payload)
                    //                 message.channel.send("Round "+round+" Update: (Player #"+participants[memberId]+") "+member.displayName+`\n`+payload)
                    //             } else {
                    //                 message.channel.send("Round "+round+" Update: (Player #"+participants[memberId]+") "+member.displayName+`\n`+`**THEY DIED x_x**`)
                    //             }
                    //         } else {
                    //             console.log("FAILED -- "+member.displayName)
                    //             message.channel.send("Round "+round+" Update failed for "+member.displayName)
                    //         }
                    //     })

                    //     message.reply("Test complete!")

                    //     break

                    // case '!bot so-r7':
                    //     console.log("LIVE Deploying '!bot so-r7'")
                    //     message.reply("LIVE Deploying '!bot so-r7'")

                    //     message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{

                    //         var payload = ``
                    //         var memberId = member.id
                    //         // CHANGE THE ROUND EVERY ROUND PLEASE.
                    //         const round = 7
                    //         var replyString
                    //         var currentState
                    //         var outcomes = {
                    //             outcomes: [
                    //                 {"range": [1, 10], "result": -5, "status": "BLEEDING", "message": `It is pitch black outside, and the officer’s torch can only shine so far. You barely see a flash of movement before something lunges towards you! You are slammed into the opposite wall, your head hitting metal and for a split second, your vision goes white [HEAD INJURY][-5hp]. Your officer friend acts instinctively. He flings your assailant off you and swiftly shoots it dead on the floor. When he shines his torch upon it, you are shocked to see it is what looks like another Intergalactic officer. Your companion steps closer, but before your eyes, the dead man’s features melt into a strange alien’s.\n\nThe alien is like nothing you have seen before. You tug on your companion’s arm to urge him to leave the body, but instead he steps forward with curiosity and fascinated horror. The alien’s body bleeds green liquid onto the floor, but you catch a flicker of movement behind its eyelids…`},
                    //                 {"range": [11, 20], "result": -1, "status": "SCRATCHED", "message": `It is pitch black outside, and the officer’s torch can only shine so far. You barely see a flash of movement before something lunges towards you! You jerk back but not quick enough [Scratched][-1hp]. Your officer friend acts instinctively. He flings your assailant off you and swiftly shoots it dead on the floor. When he shines his torch upon it, you are shocked to see it is what looks like another Intergalactic officer. Your companion steps closer, but before your eyes, the dead man’s features melt into a strange alien’s.\n\nThe alien is like nothing you have seen before. You tug on your companion’s arm to urge him to leave the body, but instead he steps forward with curiosity and fascinated horror. The alien’s body bleeds green liquid onto the floor, but you catch a flicker of movement behind its eyelids…`},
                    //             ]
                    //         }
                    //         // console.log(participants[memberId])
                    //         if (!!participants[memberId] || participants[memberId] == 0){
                                
                    //             console.log("Exists -- "+member.displayName)
                    //             // This checks if the player has existence in this round (i.e. not dead from a previous round)
                    //             if(results.players[participants[memberId]].history.length >= round){
                    //                 currentState = results.players[participants[memberId]].history[round - 1]
                    //                 // console.log(currentState)
                    //                 // console.log(currentState.health+`\n`)
                    //                 var roundFormatted = (round).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                    //                 var health = currentState.health
                    //                 var status = ''
                                    
                                    
                    //                 outcomes.outcomes.forEach((outcome)=>{
                    //                     if( currentState.rollResult >= outcome.range[0] && currentState.rollResult <= outcome.range[1] ){
                    //                         status = outcome.status
                                            
                    //                         payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`

                    //                         payload += outcome.message

                    //                         if(currentState.poisoned == true){
                    //                             payload += `\n\n*Your head pulses...* [Poisoned][-1hp]`
                    //                         }

                    //                         payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``
                    //                     }
                    //                     else if(currentState.rollResult == "lowest"){
                    //                         status = "DEAD"

                    //                         payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`

                    //                         payload += `It is pitch black outside, and the officer’s torch can only shine so far. You barely see a flash of movement before something lunges towards you! You are slammed into the opposite wall, your head hitting metal and for a split second, your vision goes white. You can hear your officer friend yelling something, but the ringing in your ears is too much. Your assailant doesn’t relent. You heard gun shots, though you aren’t sure from whom, before pain blooms abruptly from your abdomen. When you look down, all you see is red. \n\nAs you slump slowly to the floor, ears still ringing, you come to the realisation that you recognise the boots of the monster before you. And when you look up, your vision fading, your last thoughts are that your murderer looks eerily like another Intergalactic officer… [Instant death][-25hp]\n\n*Game over! Better luck next time!*\`\`\``
                    //                     }

                    //                 })
                                    
                    //                 // Send payload
                    //                 member.send(payload)
                    //                 message.channel.send("Round "+round+" Update sent successfully to (Player #"+participants[memberId]+") "+member.displayName)
                    //             } else {
                    //                 // Alternative response if player has died previously.
                    //                 message.channel.send("Round "+round+" Update was not sent because (Player #"+participants[memberId]+") "+member.displayName+" is **DEAD**")
                    //             }
                    //         } else {
                    //             console.log("FAILED -- "+member.displayName)
                    //             message.channel.send("Round "+round+" Update failed for "+member.displayName)
                    //         }
                    //     })

                    //     message.reply("LIVE Deploy complete!")

                    //     break

                    
                    // case '!bot test so-r8':
                    //     console.log("TEST Deploying '!bot so-r8'")
                    //     message.reply("TEST Deploying '!bot so-r8'")

                    //     message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{

                    //         var payload = ``
                    //         var memberId = member.id
                    //         // CHANGE THE ROUND EVERY ROUND PLEASE.
                    //         const round = 8
                    //         var replyString
                    //         var currentState
                    //         var outcomes = {
                    //             outcomes: [
                    //                 {"range": [1, 5], "result": -2, "status": "FREAKING OUT", "message": `You are just a second too late in shouting a warning to your friend. He freezes, then staggers back just as the alien seems to come to life for one more desperate attack. It lunges for you. You try to run, but you’re just not fast enough [TRIPPED][-2hp]. You fall to the floor, but it seems at least your companion has finally snapped out of his horrified trance. He begins to shoot the creature, again and again, until it slumps, lifeless for sure this time, to the floor. The officer gives you an apologetic look and gives you a pat on the shoulder.\n\nUnnerved, you try to shake off what just happened and focus on getting out of here. As you turn to leave the corridor, a mysterious glow coming from the Lower Deck catches your eye. The warmth of the glow is strangely familiar. You point it out to your companion. He looks at you as if you’ve gone crazy, then shakes his head aggressively. He insists it is better to forget about it…`},
                    //                 {"range": [6, 10], "result": 0, "status": "WRECKED", "message": `The alien seems to come to life before your eyes for one last, desperate attack. Neither you nor your companion were fast enough to react. It lunges for you, sinking razor sharp claws around your legs [SLASHED][-8hp]. You cry out in pain and fall to the floor, but it seems at least your companion has finally snapped out of his horrified trance. He begins to shoot the creature, again and again, until it slumps, lifeless for sure this time, to the floor. The officer gives you an apologetic look and helps you stumble to your feet. \n\nUnnerved, you try to shake off what just happened and focus on getting out of here. As you turn to leave the corridor, a mysterious glow coming from the Lower Deck catches your eye. The warmth of the glow is strangely familiar. You point it out to your companion. He looks at you as if you’ve gone crazy, then shakes his head aggressively. He insists it is better to forget about it…`},
                    //                 {"range": [11, 15], "result": -2, "status": "FREAKING OUT", "message": `You are just a second too late in shouting a warning to your friend. He freezes, then staggers back just as the alien seems to come to life for one more desperate attack. It lunges for you. You try to run, but you’re just not fast enough [TRIPPED][-2hp]. You fall to the floor, but it seems at least your companion has finally snapped out of his horrified trance. He begins to shoot the creature, again and again, until it slumps, lifeless for sure this time, to the floor. The officer gives you an apologetic look and gives you a pat on the shoulder.\n\nUnnerved, you try to shake off what just happened and focus on getting out of here. As you turn to leave the corridor, a mysterious glow coming from the Lower Deck catches your eye. The warmth of the glow is strangely familiar. You point it out to your companion. He looks at you as if you’ve gone crazy, then shakes his head aggressively. He insists it is better to forget about it…`},
                    //                 {"range": [16, 20], "result": 0, "status": "HEART RACING", "message": `You act on instinct and shout a warning to your friend. You pull him back, just as the alien seems to come to life for one more desperate attack. Your warning serves you well. Your companion snaps out of his horrified trance and begins to shoot the creature, again and again, until it slumps, lifeless for sure this time, to the floor. The officer gives you a grateful look and gives you a pat on the shoulder.\n\nUnnerved, you try to shake off what just happened and focus on getting out of here. As you turn to leave the corridor, a mysterious glow coming from the Lower Deck catches your eye. The warmth of the glow is strangely familiar. You point it out to your companion. He looks at you as if you’ve gone crazy, then shakes his head aggressively. He insists it is better to forget about it…`},
                    //             ]
                    //         }
                    //         // console.log(participants[memberId])
                    //         if (!!participants[memberId] || participants[memberId] == 0){
                                
                    //             console.log("Exists -- "+member.displayName)
                    //             if(results.players[participants[memberId]].history.length >= round){
                    //                 currentState = results.players[participants[memberId]].history[round - 1]
                    //                 // console.log(currentState)
                    //                 // console.log(currentState.health+`\n`)
                    //                 var roundFormatted = (round).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                    //                 var health = currentState.health
                    //                 var status = ''
                                    
                                    
                    //                 outcomes.outcomes.forEach((outcome)=>{
                    //                     if( currentState.rollResult >= outcome.range[0] && currentState.rollResult <= outcome.range[1] ){
                    //                         status = outcome.status
                                            
                    //                         payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`
    
                    //                         payload += outcome.message
    
                    //                         if(currentState.poisoned == true){
                    //                             payload += `\n\n*You feel an ache in your limbs* [Poisoned][-1hp]`
                    //                         }
    
                    //                         payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``
                    //                     }
                    //                     else if(currentState.rollResult == "lowest"){
                    //                     }
    
                    //                 })
                                    
                    //                 // Send payload
                    //                 // member.send(payload)
                    //                 message.channel.send("Round "+round+" Update: (Player #"+participants[memberId]+") "+member.displayName+`\n`+payload)
                    //             } else {
                    //                 message.channel.send("Round "+round+" Update: (Player #"+participants[memberId]+") "+member.displayName+`\n`+`**THEY DIED x_x**`)
                    //             }
                    //         } else {
                    //             console.log("FAILED -- "+member.displayName)
                    //             message.channel.send("Round "+round+" Update failed for "+member.displayName)
                    //         }
                    //     })

                    //     message.reply("Test complete!")

                    //     break

                    // case '!bot so-r8':
                    //     console.log("LIVE Deploying '!bot so-r8'")
                    //     message.reply("LIVE Deploying '!bot so-r8'")

                    //     message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{

                    //         var payload = ``
                    //         var memberId = member.id
                    //         // CHANGE THE ROUND EVERY ROUND PLEASE.
                    //         const round = 8
                    //         var replyString
                    //         var currentState
                    //         var outcomes = {
                    //             outcomes: [
                    //                 {"range": [1, 5], "result": -2, "status": "FREAKING OUT", "message": `You are just a second too late in shouting a warning to your friend. He freezes, then staggers back just as the alien seems to come to life for one more desperate attack. It lunges for you. You try to run, but you’re just not fast enough [TRIPPED][-2hp]. You fall to the floor, but it seems at least your companion has finally snapped out of his horrified trance. He begins to shoot the creature, again and again, until it slumps, lifeless for sure this time, to the floor. The officer gives you an apologetic look and gives you a pat on the shoulder.\n\nUnnerved, you try to shake off what just happened and focus on getting out of here. As you turn to leave the corridor, a mysterious glow coming from the Lower Deck catches your eye. The warmth of the glow is strangely familiar. You point it out to your companion. He looks at you as if you’ve gone crazy, then shakes his head aggressively. He insists it is better to forget about it…`},
                    //                 {"range": [6, 10], "result": 0, "status": "WRECKED", "message": `The alien seems to come to life before your eyes for one last, desperate attack. Neither you nor your companion were fast enough to react. It lunges for you, sinking razor sharp claws around your legs [SLASHED][-8hp]. You cry out in pain and fall to the floor, but it seems at least your companion has finally snapped out of his horrified trance. He begins to shoot the creature, again and again, until it slumps, lifeless for sure this time, to the floor. The officer gives you an apologetic look and helps you stumble to your feet. \n\nUnnerved, you try to shake off what just happened and focus on getting out of here. As you turn to leave the corridor, a mysterious glow coming from the Lower Deck catches your eye. The warmth of the glow is strangely familiar. You point it out to your companion. He looks at you as if you’ve gone crazy, then shakes his head aggressively. He insists it is better to forget about it…`},
                    //                 {"range": [11, 15], "result": -2, "status": "FREAKING OUT", "message": `You are just a second too late in shouting a warning to your friend. He freezes, then staggers back just as the alien seems to come to life for one more desperate attack. It lunges for you. You try to run, but you’re just not fast enough [TRIPPED][-2hp]. You fall to the floor, but it seems at least your companion has finally snapped out of his horrified trance. He begins to shoot the creature, again and again, until it slumps, lifeless for sure this time, to the floor. The officer gives you an apologetic look and gives you a pat on the shoulder.\n\nUnnerved, you try to shake off what just happened and focus on getting out of here. As you turn to leave the corridor, a mysterious glow coming from the Lower Deck catches your eye. The warmth of the glow is strangely familiar. You point it out to your companion. He looks at you as if you’ve gone crazy, then shakes his head aggressively. He insists it is better to forget about it…`},
                    //                 {"range": [16, 20], "result": 0, "status": "HEART RACING", "message": `You act on instinct and shout a warning to your friend. You pull him back, just as the alien seems to come to life for one more desperate attack. Your warning serves you well. Your companion snaps out of his horrified trance and begins to shoot the creature, again and again, until it slumps, lifeless for sure this time, to the floor. The officer gives you a grateful look and gives you a pat on the shoulder.\n\nUnnerved, you try to shake off what just happened and focus on getting out of here. As you turn to leave the corridor, a mysterious glow coming from the Lower Deck catches your eye. The warmth of the glow is strangely familiar. You point it out to your companion. He looks at you as if you’ve gone crazy, then shakes his head aggressively. He insists it is better to forget about it…`},
                    //             ]
                    //         }
                    //         // console.log(participants[memberId])
                    //         if (!!participants[memberId] || participants[memberId] == 0){
                                
                    //             console.log("Exists -- "+member.displayName)
                    //             // This checks if the player has existence in this round (i.e. not dead from a previous round)
                    //             if(results.players[participants[memberId]].history.length >= round){
                    //                 currentState = results.players[participants[memberId]].history[round - 1]
                    //                 // console.log(currentState)
                    //                 // console.log(currentState.health+`\n`)
                    //                 var roundFormatted = (round).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                    //                 var health = currentState.health
                    //                 var status = ''
                                    
                                    
                    //                 outcomes.outcomes.forEach((outcome)=>{
                    //                     if( currentState.rollResult >= outcome.range[0] && currentState.rollResult <= outcome.range[1] ){
                    //                         status = outcome.status
                                            
                    //                         payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`

                    //                         payload += outcome.message

                    //                         if(currentState.poisoned == true){
                    //                             payload += `\n\n*You feel an ache in your limbs* [Poisoned][-1hp]`
                    //                         }

                    //                         payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``
                    //                     }
                    //                     else if(currentState.rollResult == "lowest"){
                    //                     }

                    //                 })
                                    
                    //                 // Send payload
                    //                 member.send(payload)
                    //                 message.channel.send("Round "+round+" Update sent successfully to (Player #"+participants[memberId]+") "+member.displayName)
                    //             } else {
                    //                 // Alternative response if player has died previously.
                    //                 message.channel.send("Round "+round+" Update was not sent because (Player #"+participants[memberId]+") "+member.displayName+" is **DEAD**")
                    //             }
                    //         } else {
                    //             console.log("FAILED -- "+member.displayName)
                    //             message.channel.send("Round "+round+" Update failed for "+member.displayName)
                    //         }
                    //     })

                    //     message.reply("LIVE Deploy complete!")

                    //     break
                    
                    
                    // case '!bot test so-r9':
                    //     console.log("TEST Deploying '!bot so-r9'")
                    //     message.reply("TEST Deploying '!bot so-r9'")

                    //     message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{

                    //         var payload = ``
                    //         var memberId = member.id
                    //         // CHANGE THE ROUND EVERY ROUND PLEASE.
                    //         const round = 9
                    //         var replyString
                    //         var currentState
                    //         var outcomes = {
                    //             outcomes: [
                    //                 {"range": [1, 20], "result": 0, "status": "HOPEFUL", "message": `You attempt to argue your case with the officer. He is obviously unwilling to risk the detour, but you insist you have a good feeling about this. After all that’s happened, what’s one more risk? Despite his reluctance, you eventually manage to persuade him, and the both of you trek your way slowly down the darkness and towards the elusive glow. You stumble over what feels suspiciously like bodies on the way, but you don’t dare to look. You descend into the Lower Decks, where a carnage is all that remains of the once precious cargo aboard the ship.\n\nYou pick your way across the remains of boxes and containers, including that which once held the poisonous gas now permeating most parts of the ship. Eventually, the glowing leads to a pile of broken crates that seem to hold ancient artefacts, native to your homeworld… `},
                    //             ]
                    //         }
                    //         // console.log(participants[memberId])
                    //         if (!!participants[memberId] || participants[memberId] == 0){
                                
                    //             console.log("Exists -- "+member.displayName)
                    //             if(results.players[participants[memberId]].history.length >= round){
                    //                 currentState = results.players[participants[memberId]].history[round - 1]
                    //                 // console.log(currentState)
                    //                 // console.log(currentState.health+`\n`)
                    //                 var roundFormatted = (round).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                    //                 var health = currentState.health
                    //                 var status = ''
                                    
                                    
                    //                 outcomes.outcomes.forEach((outcome)=>{
                    //                     if( currentState.rollResult >= outcome.range[0] && currentState.rollResult <= outcome.range[1] ){
                    //                         status = outcome.status
                                            
                    //                         payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`
    
                    //                         payload += outcome.message
    
                    //                         if(currentState.poisoned == true){
                    //                             payload += `\n\n*Your vision blurs for a moment...* [Poisoned][-1hp]`
                    //                         }
    
                    //                         payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``
                    //                     }
                    //                     else if(currentState.rollResult == "lowest"){
                    //                         status = "DEAD"

                    //                         payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`

                    //                         payload += `You attempt to argue your case with the officer. He is obviously unwilling to risk the detour, but you insist you have a good feeling about this. He paces restlessly as you try to talk him into it, but it seems he’s not listening. In fact, he seems to be thinking very hard about something else…\n\nYou stop pleading mid-sentence when his head suddenly snaps up to look at you. There is an eerie determination in his eyes. “I’m sorry,” he says, and he seems sincere in this, “But I can’t let you do this.” He raises his firearm to your chest. You slowly back away.\n\n“You can go on without me,” you try, but it seems his mind is made up.\n\nHe shakes his head. “I can’t risk loose ends… and you’re far too suspicious to be left alone. Forgive me.” You hear the loud ‘BANG!’ but don’t dare look down, even as you feel a ripping pain through your abdomen [Instant Death][-25hp]. He watches as your legs give out beneath you and you sink to the floor, with something like pity in his eyes. The last thing you see before your vision turns to black are his steel-soled boots walking away... \n\n*Game over! Better luck next time!*\`\`\``
                    //                     }
    
                    //                 })
                                    
                    //                 // Send payload
                    //                 // member.send(payload)
                    //                 message.channel.send("Round "+round+" Update: (Player #"+participants[memberId]+") "+member.displayName+`\n`+payload)
                    //             } else {
                    //                 message.channel.send("Round "+round+" Update: (Player #"+participants[memberId]+") "+member.displayName+`\n`+`**THEY DIED x_x**`)
                    //             }
                    //         } else {
                    //             console.log("FAILED -- "+member.displayName)
                    //             message.channel.send("Round "+round+" Update failed for "+member.displayName)
                    //         }
                    //     })

                    //     message.reply("Test complete!")

                    //     break

                    // case '!bot so-r9':
                    //     console.log("LIVE Deploying '!bot so-r9'")
                    //     message.reply("LIVE Deploying '!bot so-r9'")

                    //     message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{

                    //         var payload = ``
                    //         var memberId = member.id
                    //         // CHANGE THE ROUND EVERY ROUND PLEASE.
                    //         const round = 9
                    //         var replyString
                    //         var currentState
                    //         var outcomes = {
                    //             outcomes: [
                    //                 {"range": [1, 20], "result": 0, "status": "HOPEFUL", "message": `You attempt to argue your case with the officer. He is obviously unwilling to risk the detour, but you insist you have a good feeling about this. After all that’s happened, what’s one more risk? Despite his reluctance, you eventually manage to persuade him, and the both of you trek your way slowly down the darkness and towards the elusive glow. You stumble over what feels suspiciously like bodies on the way, but you don’t dare to look. You descend into the Lower Decks, where a carnage is all that remains of the once precious cargo aboard the ship.\n\nYou pick your way across the remains of boxes and containers, including that which once held the poisonous gas now permeating most parts of the ship. Eventually, the glowing leads to a pile of broken crates that seem to hold ancient artefacts, native to your homeworld… `},
                    //             ]
                    //         }
                    //         // console.log(participants[memberId])
                    //         if (!!participants[memberId] || participants[memberId] == 0){
                                
                    //             console.log("Exists -- "+member.displayName)
                    //             // This checks if the player has existence in this round (i.e. not dead from a previous round)
                    //             if(results.players[participants[memberId]].history.length >= round){
                    //                 currentState = results.players[participants[memberId]].history[round - 1]
                    //                 // console.log(currentState)
                    //                 // console.log(currentState.health+`\n`)
                    //                 var roundFormatted = (round).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                    //                 var health = currentState.health
                    //                 var status = ''
                                    
                                    
                    //                 outcomes.outcomes.forEach((outcome)=>{
                    //                     if( currentState.rollResult >= outcome.range[0] && currentState.rollResult <= outcome.range[1] ){
                    //                         status = outcome.status
                                            
                    //                         payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`

                    //                         payload += outcome.message

                    //                         if(currentState.poisoned == true){
                    //                             payload += `\n\n*Your vision blurs for a moment...* [Poisoned][-1hp]`
                    //                         }

                    //                         payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``
                    //                     }
                    //                     else if(currentState.rollResult == "lowest"){
                    //                         status = "DEAD"

                    //                         payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`

                    //                         payload += `You attempt to argue your case with the officer. He is obviously unwilling to risk the detour, but you insist you have a good feeling about this. He paces restlessly as you try to talk him into it, but it seems he’s not listening. In fact, he seems to be thinking very hard about something else…\n\nYou stop pleading mid-sentence when his head suddenly snaps up to look at you. There is an eerie determination in his eyes. “I’m sorry,” he says, and he seems sincere in this, “But I can’t let you do this.” He raises his firearm to your chest. You slowly back away.\n\n“You can go on without me,” you try, but it seems his mind is made up.\n\nHe shakes his head. “I can’t risk loose ends… and you’re far too suspicious to be left alone. Forgive me.” You hear the loud ‘BANG!’ but don’t dare look down, even as you feel a ripping pain through your abdomen [Instant Death][-25hp]. He watches as your legs give out beneath you and you sink to the floor, with something like pity in his eyes. The last thing you see before your vision turns to black are his steel-soled boots walking away... \n\n*Game over! Better luck next time!*\`\`\``
                    //                     }

                    //                 })
                                    
                    //                 // Send payload
                    //                 member.send(payload)
                    //                 message.channel.send("Round "+round+" Update sent successfully to (Player #"+participants[memberId]+") "+member.displayName)
                    //             } else {
                    //                 // Alternative response if player has died previously.
                    //                 message.channel.send("Round "+round+" Update was not sent because (Player #"+participants[memberId]+") "+member.displayName+" is **DEAD**")
                    //             }
                    //         } else {
                    //             console.log("FAILED -- "+member.displayName)
                    //             message.channel.send("Round "+round+" Update failed for "+member.displayName)
                    //         }
                    //     })

                    //     message.reply("LIVE Deploy complete!")

                    //     break
                     
                    // case '!bot test so-r10':
                    //     console.log("TEST Deploying '!bot so-r10'")
                    //     message.reply("TEST Deploying '!bot so-r10'")

                    //     message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{

                    //         var payload = ``
                    //         var memberId = member.id
                    //         // CHANGE THE ROUND EVERY ROUND PLEASE.
                    //         const round = 10
                    //         var replyString
                    //         var currentState
                    //         var outcomes = {
                    //             outcomes: [
                    //                 {"range": [1, 19], "result": 0, "status": "HOMESICK", "message": `Amid the carnage you see a collection of Golden Pencils, nestled under the ruins of wooden crates. Even through your space suit, you can feel a familiar warmth coming from them, and you swear for an instant you can smell home. Your officer friend however, is wary of the artefacts, and regards them with a great deal of suspicion… despite your pleas, he determines they are too dangerous to bring along. You are reluctant to leave them behind, but it isn’t the time to argue.\n\nYou both begin to make it back up to the upper levels. However, as you stumble through the wrecked cargo, your foot sends something skidding harshly across the floor. You look, as if in slow motion, to see the object spark from the impact, then flicker into flame upon contact with the poison gas that permeates the room…`},
                    //                 {"range": [20, 20], "result": 0, "status": "FEELING SAFE", "message": `Amid the carnage you see a collection of Golden Pencils, nestled under the ruins of wooden crates. Even through your space suit, you can feel a familiar warmth coming from them, and you swear for an instant you can smell home. Your officer friend however, is wary of the artefacts, and regards them with a great deal of suspicion… but you manage to convince him to bring along at least one piece with you [Golden Pencil obtained][+1 life saving on an event that would kill you].\n\nOnce the item is safely stored away on your person, you both begin to make it back up to the upper levels. However, as you stumble through the wrecked cargo, your foot sends something skidding harshly across the floor. You look, as if in slow motion, to see the object spark from the impact, then flicker into flame upon contact with the poison gas that permeates the room… `},
                    //             ]
                    //         }
                    //         // console.log(participants[memberId])
                    //         if (!!participants[memberId] || participants[memberId] == 0){
                                
                    //             console.log("Exists -- "+member.displayName)
                    //             if(results.players[participants[memberId]].history.length >= round){
                    //                 currentState = results.players[participants[memberId]].history[round - 1]
                    //                 // console.log(currentState)
                    //                 // console.log(currentState.health+`\n`)
                    //                 var roundFormatted = (round).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                    //                 var health = currentState.health
                    //                 var status = ''

                                    
                    //                 outcomes.outcomes.forEach((outcome)=>{
                    //                     if( currentState.rollResult >= outcome.range[0] && currentState.rollResult <= outcome.range[1] ){
                    //                         status = outcome.status
                                            
                    //                         payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status

                    //                         if( currentState.item == "pencil") {
                    //                             payload += `\n> You have a Golden Pencil!`
                    //                         }

                    //                         payload += `\n\n--------\n\nUPDATE: \n`
    
                    //                         payload += outcome.message
    
                    //                         if(currentState.poisoned == true){
                    //                             payload += `\n\n*You feel a cold sweat...* [Poisoned][-1hp]`
                    //                         }
    
                    //                         payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``
                    //                     }
                    //                     else if(currentState.rollResult == "lowest"){
                    //                         // status = "DEAD"

                    //                         // payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`

                    //                         // payload += `\n\n*Game over! Better luck next time!*\`\`\``
                    //                     }
    
                    //                 })
                                    
                    //                 // Send payload
                    //                 // member.send(payload)
                    //                 message.channel.send("Round "+round+" Update: (Player #"+participants[memberId]+") "+member.displayName+`\n`+payload)
                    //             } else {
                    //                 message.channel.send("Round "+round+" Update: (Player #"+participants[memberId]+") "+member.displayName+`\n`+`**THEY DIED x_x**`)
                    //             }
                    //         } else {
                    //             console.log("FAILED -- "+member.displayName)
                    //             message.channel.send("Round "+round+" Update failed for "+member.displayName)
                    //         }
                    //     })

                    //     message.reply("Test complete!")

                    //     break

                    // case '!bot so-r10':
                    //     console.log("LIVE Deploying '!bot so-r10'")
                    //     message.reply("LIVE Deploying '!bot so-r10'")

                    //     message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{

                    //         var payload = ``
                    //         var memberId = member.id
                    //         // CHANGE THE ROUND EVERY ROUND PLEASE.
                    //         const round = 10
                    //         var replyString
                    //         var currentState
                    //         var outcomes = {
                    //             outcomes: [
                    //                 {"range": [1, 19], "result": 0, "status": "HOMESICK", "message": `Amid the carnage you see a collection of Golden Pencils, nestled under the ruins of wooden crates. Even through your space suit, you can feel a familiar warmth coming from them, and you swear for an instant you can smell home. Your officer friend however, is wary of the artefacts, and regards them with a great deal of suspicion… despite your pleas, he determines they are too dangerous to bring along. You are reluctant to leave them behind, but it isn’t the time to argue.\n\nYou both begin to make it back up to the upper levels. However, as you stumble through the wrecked cargo, your foot sends something skidding harshly across the floor. You look, as if in slow motion, to see the object spark from the impact, then flicker into flame upon contact with the poison gas that permeates the room…`},
                    //                 {"range": [20, 20], "result": 0, "status": "FEELING SAFE", "message": `Amid the carnage you see a collection of Golden Pencils, nestled under the ruins of wooden crates. Even through your space suit, you can feel a familiar warmth coming from them, and you swear for an instant you can smell home. Your officer friend however, is wary of the artefacts, and regards them with a great deal of suspicion… but you manage to convince him to bring along at least one piece with you [Golden Pencil obtained][+1 life saving on an event that would kill you].\n\nOnce the item is safely stored away on your person, you both begin to make it back up to the upper levels. However, as you stumble through the wrecked cargo, your foot sends something skidding harshly across the floor. You look, as if in slow motion, to see the object spark from the impact, then flicker into flame upon contact with the poison gas that permeates the room… `},
                    //             ]
                    //         }
                    //         // console.log(participants[memberId])
                    //         if (!!participants[memberId] || participants[memberId] == 0){
                                
                    //             console.log("Exists -- "+member.displayName)
                    //             // This checks if the player has existence in this round (i.e. not dead from a previous round)
                    //             if(results.players[participants[memberId]].history.length >= round){
                    //                 currentState = results.players[participants[memberId]].history[round - 1]
                    //                 // console.log(currentState)
                    //                 // console.log(currentState.health+`\n`)
                    //                 var roundFormatted = (round).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                    //                 var health = currentState.health
                    //                 var status = ''
                                    
                                    
                    //                 outcomes.outcomes.forEach((outcome)=>{
                    //                     if( currentState.rollResult >= outcome.range[0] && currentState.rollResult <= outcome.range[1] ){
                    //                         status = outcome.status
                                            
                    //                         payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status

                    //                         if( currentState.item == "pencil") {
                    //                             payload += `\n> You have a Golden Pencil!`
                    //                         }

                    //                         payload += `\n\n--------\n\nUPDATE: \n`
    
                    //                         payload += outcome.message
    
                    //                         if(currentState.poisoned == true){
                    //                             payload += `\n\n*You feel a cold sweat...* [Poisoned][-1hp]`
                    //                         }
    
                    //                         payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``
                    //                     }
                    //                     else if(currentState.rollResult == "lowest"){
                    //                         // status = "DEAD"

                    //                         // payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`

                    //                         // payload += `\n\n*Game over! Better luck next time!*\`\`\``
                    //                     }

                    //                 })
                                    
                    //                 // Send payload
                    //                 member.send(payload)
                    //                 message.channel.send("Round "+round+" Update sent successfully to (Player #"+participants[memberId]+") "+member.displayName)
                    //             } else {
                    //                 // Alternative response if player has died previously.
                    //                 message.channel.send("Round "+round+" Update was not sent because (Player #"+participants[memberId]+") "+member.displayName+" is **DEAD**")
                    //             }
                    //         } else {
                    //             console.log("FAILED -- "+member.displayName)
                    //             message.channel.send("Round "+round+" Update failed for "+member.displayName)
                    //         }
                    //     })

                    //     message.reply("LIVE Deploy complete!")

                    //     break

                //     case '!bot test so-r11':
                //     console.log("TEST Deploying '!bot so-r11'")
                //     message.reply("TEST Deploying '!bot so-r11'")

                //     message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{

                //         var payload = ``
                //         var memberId = member.id
                //         // CHANGE THE ROUND EVERY ROUND PLEASE.
                //         const round = 11
                //         var replyString
                //         var currentState
                //         var outcomes = {
                //             outcomes: [
                //                 {"range": [1, 5], "result": -3, "status": "SCORCHED", "message": `The Lower Deck lights up in a matter of seconds. You and the officer bolt for the exit as the room becomes engulfed in flames. The wall of fire chases you through the exit, and out into the corridor. You can feel the flames lick your feet and sweat pour down your back [SCORCHED][-3hp], but you somehow manage to stay just ahead of the blaze. Once you make it out of the corridor, you throw yourselves into the next unlocked room you could find, and seal the door shut behind you, leaving the fiery explosion to blow past without any more incident.\n\nHowever, the room you find yourselves in happens to be the Communications Room. While the rest of the ship is plunged in darkness, this room alone is lit with an array of screens, buttons and flashing wires. At the front of the room is what remains of the ship’s staff, kneeling with their hands behind their heads on the floor. Opposite them, with firearms raised, are a jeering crew of pirates...`},
                //                 {"range": [6, 6], "result": -5, "status": "SEVERE BURNS", "message": `The Lower Deck lights up in a matter of seconds. You and the officer bolt for the exit as the room becomes engulfed in flames. The wall of fire chases you through the exit, and out into the corridor. You can feel your boots beginning to melt and your hair begin to smoke [SEVERE BURNS][-5hp], but you somehow manage to stay just ahead of the blaze. Once you make it out of the corridor, you throw yourselves into the next unlocked room you could find, and seal the door shut behind you, leaving the fiery explosion to blow past without any more incident.\n\nHowever, the room you find yourselves in happens to be the Communications Room. While the rest of the ship is plunged in darkness, this room alone is lit with an array of screens, buttons and flashing wires. At the front of the room is what remains of the ship’s staff, kneeling with their hands behind their heads on the floor. Opposite them, with firearms raised, are a jeering crew of pirates...`},
                //             ]
                //         }
                //         // console.log(participants[memberId])
                //         if (!!participants[memberId] || participants[memberId] == 0){
                            
                //             console.log("Exists -- "+member.displayName)
                //             if(results.players[participants[memberId]].history.length >= round){
                //                 currentState = results.players[participants[memberId]].history[round - 1]
                //                 // console.log(currentState)
                //                 // console.log(currentState.health+`\n`)
                //                 var roundFormatted = (round).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                //                 var health = currentState.health
                //                 var status = ''

                                
                //                 outcomes.outcomes.forEach((outcome)=>{
                //                     if( currentState.rollResult >= outcome.range[0] && currentState.rollResult <= outcome.range[1] ){
                //                         status = outcome.status
                //                         if(currentState.alive == false){
                //                             status = "DEAD"
                //                         }
                                        
                //                         payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status

                //                         if(currentState.alive == true){

                //                             if( currentState.item == "pencil") {
                //                                 payload += `\n> You have a Golden Pencil!`
                //                             }
    
                //                             payload += `\n\n--------\n\nUPDATE: \n`
    
                //                             payload += outcome.message
    
                //                             if(currentState.poisoned == true){
                //                                 payload += `\n\n*For a moment, you see doubles of everything in the room...* [Poisoned][-1hp]`
                //                             }
    
                //                             payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``

                //                         } else if(currentState.alive == false){

                //                             payload += `\n\n--------\n\nUPDATE: \n`
    
                //                             payload += outcome.message

                //                             payload += `\n\nBefore you can react, your knees give way under you. Your head spins, your vision fades... The injuries you've experienced have finally taken their toll...`
    
                //                             payload += `\n\n\n\n*Game over! Better luck next time!*\`\`\``

                //                         }

                //                     }
                //                     else if(currentState.rollResult == "lowest"){
                //                         status = "DEAD"

                //                         payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`

                //                         payload += `The Lower Deck lights up in a matter of seconds. You and the officer bolt for the exit as the room becomes engulfed in flames. The wall of fire chases you through the exit, and out into the corridor, faster than you can keep up. Your injuries so far have slowed you down, and your officer friend doesn’t seem to hear you call for help through the acrid smoke. \n\nYou watch in horror and helplessness as he disappears ahead in a swirl of flames, your boots searing your feet as they melt into the ground. You can feel your whole body burning with a searing heat, and you know it’s too late for you… [Instant Death][-25hp]\n\n\n\n*Game over! Better luck next time!*\`\`\``
                //                     }

                //                 })
                                
                //                 // Send payload
                //                 // member.send(payload)
                //                 message.channel.send("Round "+round+" Update: (Player #"+participants[memberId]+") "+member.displayName+`\n`+payload)
                //             } else {
                //                 message.channel.send("Round "+round+" Update: (Player #"+participants[memberId]+") "+member.displayName+`\n`+`**THEY DIED x_x**`)
                //             }
                //         } else {
                //             console.log("FAILED -- "+member.displayName)
                //             message.channel.send("Round "+round+" Update failed for "+member.displayName)
                //         }
                //     })

                //     message.reply("Test complete!")

                //     break

                // case '!bot so-r11':
                //     console.log("LIVE Deploying '!bot so-r11'")
                //     message.reply("LIVE Deploying '!bot so-r11'")

                //     message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{

                //         var payload = ``
                //         var memberId = member.id
                //         // CHANGE THE ROUND EVERY ROUND PLEASE.
                //         const round = 11
                //         var replyString
                //         var currentState
                //         var outcomes = {
                //             outcomes: [
                //                 {"range": [1, 5], "result": -3, "status": "SCORCHED", "message": `The Lower Deck lights up in a matter of seconds. You and the officer bolt for the exit as the room becomes engulfed in flames. The wall of fire chases you through the exit, and out into the corridor. You can feel the flames lick your feet and sweat pour down your back [SCORCHED][-3hp], but you somehow manage to stay just ahead of the blaze. Once you make it out of the corridor, you throw yourselves into the next unlocked room you could find, and seal the door shut behind you, leaving the fiery explosion to blow past without any more incident.\n\nHowever, the room you find yourselves in happens to be the Communications Room. While the rest of the ship is plunged in darkness, this room alone is lit with an array of screens, buttons and flashing wires. At the front of the room is what remains of the ship’s staff, kneeling with their hands behind their heads on the floor. Opposite them, with firearms raised, are a jeering crew of pirates...`},
                //                 {"range": [6, 6], "result": -5, "status": "SEVERE BURNS", "message": `The Lower Deck lights up in a matter of seconds. You and the officer bolt for the exit as the room becomes engulfed in flames. The wall of fire chases you through the exit, and out into the corridor. You can feel your boots beginning to melt and your hair begin to smoke [SEVERE BURNS][-5hp], but you somehow manage to stay just ahead of the blaze. Once you make it out of the corridor, you throw yourselves into the next unlocked room you could find, and seal the door shut behind you, leaving the fiery explosion to blow past without any more incident.\n\nHowever, the room you find yourselves in happens to be the Communications Room. While the rest of the ship is plunged in darkness, this room alone is lit with an array of screens, buttons and flashing wires. At the front of the room is what remains of the ship’s staff, kneeling with their hands behind their heads on the floor. Opposite them, with firearms raised, are a jeering crew of pirates...`},
                //             ]
                //         }
                //         // console.log(participants[memberId])
                //         if (!!participants[memberId] || participants[memberId] == 0){
                            
                //             console.log("Exists -- "+member.displayName)
                //             // This checks if the player has existence in this round (i.e. not dead from a previous round)
                //             if(results.players[participants[memberId]].history.length >= round){
                //                 currentState = results.players[participants[memberId]].history[round - 1]
                //                 // console.log(currentState)
                //                 // console.log(currentState.health+`\n`)
                //                 var roundFormatted = (round).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                //                 var health = currentState.health
                //                 var status = ''
                                
                                
                //                 outcomes.outcomes.forEach((outcome)=>{
                //                     if( currentState.rollResult >= outcome.range[0] && currentState.rollResult <= outcome.range[1] ){
                //                         status = outcome.status
                //                         if(currentState.alive == false){
                //                             status = "DEAD"
                //                         }
                                        
                //                         payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status

                //                         if(currentState.alive == true){

                //                             if( currentState.item == "pencil") {
                //                                 payload += `\n> You have a Golden Pencil!`
                //                             }
    
                //                             payload += `\n\n--------\n\nUPDATE: \n`
    
                //                             payload += outcome.message
    
                //                             if(currentState.poisoned == true){
                //                                 payload += `\n\n*For a moment, you see doubles of everything in the room...* [Poisoned][-1hp]`
                //                             }
    
                //                             payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``

                //                         } else if(currentState.alive == false){

                //                             payload += `\n\n--------\n\nUPDATE: \n`
    
                //                             payload += outcome.message

                //                             payload += `\n\nBefore you can react, your knees give way under you. Your head spins, your vision fades... The injuries you've experienced have finally taken their toll...`
    
                //                             payload += `\n\n\n\n*Game over! Better luck next time!*\`\`\``

                //                         }

                //                     }
                //                     else if(currentState.rollResult == "lowest"){
                //                         status = "DEAD"

                //                         payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`

                //                         payload += `The Lower Deck lights up in a matter of seconds. You and the officer bolt for the exit as the room becomes engulfed in flames. The wall of fire chases you through the exit, and out into the corridor, faster than you can keep up. Your injuries so far have slowed you down, and your officer friend doesn’t seem to hear you call for help through the acrid smoke. \n\nYou watch in horror and helplessness as he disappears ahead in a swirl of flames, your boots searing your feet as they melt into the ground. You can feel your whole body burning with a searing heat, and you know it’s too late for you… [Instant Death][-25hp]\n\n\n\n*Game over! Better luck next time!*\`\`\``
                //                     }

                //                 })
                                
                //                 // Send payload
                //                 member.send(payload)
                //                 message.channel.send("Round "+round+" Update sent successfully to (Player #"+participants[memberId]+") "+member.displayName)
                //             } else {
                //                 // Alternative response if player has died previously.
                //                 message.channel.send("Round "+round+" Update was not sent because (Player #"+participants[memberId]+") "+member.displayName+" is **DEAD**")
                //             }
                //         } else {
                //             console.log("FAILED -- "+member.displayName)
                //             message.channel.send("Round "+round+" Update failed for "+member.displayName)
                //         }
                //     })

                //     message.reply("LIVE Deploy complete!")

                //     break

                // case '!bot test so-r12':
                //     console.log("TEST Deploying '!bot so-r12'")
                //     message.reply("TEST Deploying '!bot so-r12'")

                //     message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{

                //         var payload = ``
                //         var memberId = member.id
                //         // CHANGE THE ROUND EVERY ROUND PLEASE.
                //         const round = 12
                //         var replyString
                //         var currentState
                //         var previousState
                //         var outcomes = {
                //             outcomes: [
                //                 {"range": [1, 6], "result": -2, "status": "OW!", "message": `The pirates’ attention turns in surprise to the two of you, as you stand panting at the door. You exchange exasperated glances with your friend. Here you go again… Both you and your officer do the best you can against the pirates, but it is not without injury. However, your officer friend is well trained, and you apparently just have a great deal of luck (if you could count this situation as lucky). You get a little battered and bruised [BATTERED][-2hp], but neither of you are going to die now after all that. The remaining pirates surrender, and hand over their weapons. The ship’s staff are freed, along with the ship’s captain. \n\nThe captain, normally a calm man, nervously expresses his gratitude for your help. He stutters through his explanation of how he was trying to land the ship on the closest planet before the pirates had attacked. Huh. Strange. You had never known him to stutter before. He continues to give shrill instructions on what to do and how to disembark once the ship has landed. You give your officer friend a side glance, and know he is suspicious as well…`},
                //                 {"range": [7, 15], "result": -3, "status": "OUCH!", "message": `The pirates’ attention turns in surprise to the two of you, as you stand panting at the door. You exchange exasperated glances with your friend. Here you go again… Both you and your officer do the best you can against the pirates, but it is not without injury. Your officer friend is well trained, but you are beginning to run out of luck. You manage to take down two pirates before the third knocks you to the ground [ROLLED ANKLE][-3hp]. It is only with the quick reflexes of your officer friend, spinning around and shooting him swiftly, that you survive.The remaining pirates surrender, and hand over their weapons. The ship’s staff are freed, along with the ship’s captain. \n\nThe captain, normally a calm man, nervously expresses his gratitude for your help. He stutters through his explanation of how he was trying to land the ship on the closest planet before the pirates had attacked. Huh. Strange. You had never known him to stutter before. He continues to give shrill instructions on what to do and how to disembark once the ship has landed. You give your officer friend a side glance, and know he is suspicious as well…`},
                //                 {"range": [16, 20], "result": -5, "status": "NGH!!!", "message": `The pirates’ attention turns in surprise to the two of you, as you stand panting at the door. You exchange exasperated glances with your friend. Here you go again… Both you and your officer do the best you can against the pirates, but it is not without injury. Your officer friend is well trained, but you are running out of luck. You manage to take down two pirates before pain explodes behind your eyes and the world goes white [KING HIT][-5hp]. You’re not quite sure what happened after that, but when everything comes back into focus, your officer friend is there helping you to your feet. The remaining pirates seem to have surrendered, and hand over their weapons. The ship’s staff are freed, along with the ship’s captain. \n\nThe captain, normally a calm man, nervously expresses his gratitude for your help. He stutters through his explanation of how he was trying to land the ship on the closest planet before the pirates had attacked. Huh. Strange. You had never known him to stutter before. He continues to give shrill instructions on what to do and how to disembark once the ship has landed. You give your officer friend a side glance, and know he is suspicious as well… `},
                //             ]
                //         }
                //         // console.log(participants[memberId])
                //         if (!!participants[memberId] || participants[memberId] == 0){
                //         // if (participants[memberId] == 21){
                            
                //             console.log("Exists -- "+member.displayName)
                //             if(results.players[participants[memberId]].history.length >= round){
                //                 currentState = results.players[participants[memberId]].history[round - 1]
                //                 previousState = results.players[participants[memberId]].history[round - 2]
                //                 // console.log(currentState)
                //                 // console.log(currentState.health+`\n`)
                //                 var roundFormatted = (round).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                //                 var health = currentState.health
                //                 var status = ''

                                
                //                 outcomes.outcomes.forEach((outcome)=>{
                //                     if( currentState.rollResult >= outcome.range[0] && currentState.rollResult <= outcome.range[1] ){
                //                         status = outcome.status
                //                         if(currentState.alive == false){
                //                             status = "DEAD"
                //                         }
                                        
                //                         payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status

                //                         if(currentState.alive == true){

                //                             if( currentState.item == "pencil") {
                //                                 payload += `\n> You have a Golden Pencil!`
                //                             }
    
                //                             payload += `\n\n--------\n\nUPDATE: \n`
    
                //                             payload += outcome.message
    
                //                             if(currentState.poisoned == true){
                //                                 payload += `\n\n*You notice your hands trembling uncontrollably* [Poisoned][-1hp]`
                //                             }
    
                //                             payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``

                //                         } else if(currentState.alive == false){

                //                             payload += `\n\n--------\n\nUPDATE: \n`
                                            
                //                             // This checks if the player died from poison by checking if the roll result set them to 0 health. If it doesn't, then the player died to the poison.
                //                             if (previousState.health - Math.abs(outcome.result) <= 0){
                //                                 console.log(member.displayName+" "+participants[memberId]+" Died to roll")
                //                                 payload += `The pirates’ attention turns in surprise to the two of you, as you stand panting at the door. Exhausted from your sudden sprint, neither of you were prepared for this. You exchange glances too late. After all you’d been through together, it was a little sad it would end like this.\n\nIt happened like in the movies. You heard the gunshots but nothing else, the sound ringing in your ears with an empty finality. You barely felt the pain too [Shot][`+outcome.result+`hp]. The world tilted and your knees hit the ground, a calming fog beginning to creep into all your senses. And as you lay on the cold floor, your vision slowly beginning to darken, you see your officer friend smile at you from where he lay, bleeding out. You think that at least, you didn’t die alone…`
                //                             } else {
                //                                 console.log(member.displayName+" "+participants[memberId]+" Died to poison")
                //                                 payload += `The pirates’ attention turns in surprise to the two of you, as you stand panting at the door. You exchange exasperated glances with your friend. Here you go again… Both you and your officer do the best you can against the pirates, but it is not without injury. Your officer friend is well trained, but you are beginning to run out of luck. You manage to take down two pirates before the third knocks you to the ground [ROLLED ANKLE][`+outcome.result+`hp]. It is only with the quick reflexes of your officer friend, spinning around and shooting him swiftly, that you survive.The remaining pirates surrender, and hand over their weapons. The ship’s staff are freed, along with the ship’s captain.\n\nJust as the captain is about to thank you, you lurch forward and throw up [Poisoned][-1hp]. You try to bring yourself up but your insides give and you throw up once more. Your vision loses all focus and you collapse to the ground. The room feels cold. You roll to your side and embrace yourself... You close your eyes to the now muffled concerned clamouring of the people around you... You stop breathing.`
                //                             }

                //                             payload += `\n\n\n\n*Game over! Better luck next time!*\`\`\``

                //                         }

                //                     }
                //                     else if(currentState.rollResult == "lowest"){
                //                         // status = "DEAD"

                //                         // payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`

                //                         // payload += `The pirates’ attention turns in surprise to the two of you, as you stand panting at the door. Exhausted from your sudden sprint, neither of you were prepared for this. You exchange glances too late. After all you’d been through together, it was a little sad it would end like this.\n\nIt happened like in the movies. You heard the gunshots but nothing else, the sound ringing in your ears with an empty finality. You barely felt the pain to [Shot][`+outcome.result+`]. The world tilted and your knees hit the ground, a calming fog beginning to creep into all your senses. And as you lay on the cold floor, your vision slowly beginning to darken, you see your officer friend smile at you from where he lay, bleeding out. You think that at least, you didn’t die alone… \n\n\n\n*Game over! Better luck next time!*\`\`\``
                //                     }

                //                 })
                                
                //                 // Send payload
                //                 // member.send(payload)
                //                 message.channel.send("Round "+round+" Update: (Player #"+participants[memberId]+") "+member.displayName+`\n`+payload)
                //             } else {
                //                 message.channel.send("Round "+round+" Update: (Player #"+participants[memberId]+") "+member.displayName+`\n`+`**THEY DIED x_x**`)
                //             }
                //         } else {
                //             console.log("FAILED -- "+member.displayName)
                //             message.channel.send("Round "+round+" Update failed for "+member.displayName)
                //         }
                //     })

                //     message.reply("Test complete!")

                //     break

                // case '!bot so-r12':
                //     console.log("LIVE Deploying '!bot so-r12'")
                //     message.reply("LIVE Deploying '!bot so-r12'")

                //     message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{

                //         var payload = ``
                //         var memberId = member.id
                //         // CHANGE THE ROUND EVERY ROUND PLEASE.
                //         const round = 12
                //         var replyString
                //         var currentState
                //         var previousState
                //         var outcomes = {
                //             outcomes: [
                //                 {"range": [1, 6], "result": -2, "status": "OW!", "message": `The pirates’ attention turns in surprise to the two of you, as you stand panting at the door. You exchange exasperated glances with your friend. Here you go again… Both you and your officer do the best you can against the pirates, but it is not without injury. However, your officer friend is well trained, and you apparently just have a great deal of luck (if you could count this situation as lucky). You get a little battered and bruised [BATTERED][-2hp], but neither of you are going to die now after all that. The remaining pirates surrender, and hand over their weapons. The ship’s staff are freed, along with the ship’s captain. \n\nThe captain, normally a calm man, nervously expresses his gratitude for your help. He stutters through his explanation of how he was trying to land the ship on the closest planet before the pirates had attacked. Huh. Strange. You had never known him to stutter before. He continues to give shrill instructions on what to do and how to disembark once the ship has landed. You give your officer friend a side glance, and know he is suspicious as well…`},
                //                 {"range": [7, 15], "result": -3, "status": "OUCH!", "message": `The pirates’ attention turns in surprise to the two of you, as you stand panting at the door. You exchange exasperated glances with your friend. Here you go again… Both you and your officer do the best you can against the pirates, but it is not without injury. Your officer friend is well trained, but you are beginning to run out of luck. You manage to take down two pirates before the third knocks you to the ground [ROLLED ANKLE][-3hp]. It is only with the quick reflexes of your officer friend, spinning around and shooting him swiftly, that you survive.The remaining pirates surrender, and hand over their weapons. The ship’s staff are freed, along with the ship’s captain. \n\nThe captain, normally a calm man, nervously expresses his gratitude for your help. He stutters through his explanation of how he was trying to land the ship on the closest planet before the pirates had attacked. Huh. Strange. You had never known him to stutter before. He continues to give shrill instructions on what to do and how to disembark once the ship has landed. You give your officer friend a side glance, and know he is suspicious as well…`},
                //                 {"range": [16, 20], "result": -5, "status": "NGH!!!", "message": `The pirates’ attention turns in surprise to the two of you, as you stand panting at the door. You exchange exasperated glances with your friend. Here you go again… Both you and your officer do the best you can against the pirates, but it is not without injury. Your officer friend is well trained, but you are running out of luck. You manage to take down two pirates before pain explodes behind your eyes and the world goes white [KING HIT][-5hp]. You’re not quite sure what happened after that, but when everything comes back into focus, your officer friend is there helping you to your feet. The remaining pirates seem to have surrendered, and hand over their weapons. The ship’s staff are freed, along with the ship’s captain. \n\nThe captain, normally a calm man, nervously expresses his gratitude for your help. He stutters through his explanation of how he was trying to land the ship on the closest planet before the pirates had attacked. Huh. Strange. You had never known him to stutter before. He continues to give shrill instructions on what to do and how to disembark once the ship has landed. You give your officer friend a side glance, and know he is suspicious as well… `},
                //             ]
                //         }
                //         // console.log(participants[memberId])
                //         if (!!participants[memberId] || participants[memberId] == 0){
                            
                //             console.log("Exists -- "+member.displayName)
                //             if(results.players[participants[memberId]].history.length >= round){
                //                 currentState = results.players[participants[memberId]].history[round - 1]
                //                 previousState = results.players[participants[memberId]].history[round - 2]
                //                 // console.log(currentState)
                //                 // console.log(currentState.health+`\n`)
                //                 var roundFormatted = (round).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                //                 var health = currentState.health
                //                 var status = ''

                                
                //                 outcomes.outcomes.forEach((outcome)=>{
                //                     if( currentState.rollResult >= outcome.range[0] && currentState.rollResult <= outcome.range[1] ){
                //                         status = outcome.status
                //                         if(currentState.alive == false){
                //                             status = "DEAD"
                //                         }
                                        
                //                         payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status

                //                         if(currentState.alive == true){

                //                             if( currentState.item == "pencil") {
                //                                 payload += `\n> You have a Golden Pencil!`
                //                             }
    
                //                             payload += `\n\n--------\n\nUPDATE: \n`
    
                //                             payload += outcome.message
    
                //                             if(currentState.poisoned == true){
                //                                 payload += `\n\n*You notice your hands trembling uncontrollably* [Poisoned][-1hp]`
                //                             }
    
                //                             payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``

                //                         } else if(currentState.alive == false){

                //                             payload += `\n\n--------\n\nUPDATE: \n`
                                            
                //                             // This checks if the player died from poison by checking if the roll result set them to 0 health. If it doesn't, then the player died to the poison.
                //                             if (previousState.health - Math.abs(outcome.result) <= 0){
                //                                 console.log(member.displayName+" "+participants[memberId]+" Died to roll")
                //                                 payload += `The pirates’ attention turns in surprise to the two of you, as you stand panting at the door. Exhausted from your sudden sprint, neither of you were prepared for this. You exchange glances too late. After all you’d been through together, it was a little sad it would end like this.\n\nIt happened like in the movies. You heard the gunshots but nothing else, the sound ringing in your ears with an empty finality. You barely felt the pain too [Shot][`+outcome.result+`hp]. The world tilted and your knees hit the ground, a calming fog beginning to creep into all your senses. And as you lay on the cold floor, your vision slowly beginning to darken, you see your officer friend smile at you from where he lay, bleeding out. You think that at least, you didn’t die alone…`
                //                             } else {
                //                                 console.log(member.displayName+" "+participants[memberId]+" Died to poison")
                //                                 payload += `The pirates’ attention turns in surprise to the two of you, as you stand panting at the door. You exchange exasperated glances with your friend. Here you go again… Both you and your officer do the best you can against the pirates, but it is not without injury. Your officer friend is well trained, but you are beginning to run out of luck. You manage to take down two pirates before the third knocks you to the ground [ROLLED ANKLE][`+outcome.result+`hp]. It is only with the quick reflexes of your officer friend, spinning around and shooting him swiftly, that you survive.The remaining pirates surrender, and hand over their weapons. The ship’s staff are freed, along with the ship’s captain.\n\nJust as the captain is about to thank you, you lurch forward and throw up [Poisoned][-1hp]. You try to bring yourself up but your insides give and you throw up once more. Your vision loses all focus and you collapse to the ground. The room feels cold. You roll to your side and embrace yourself... You close your eyes to the now muffled concerned clamouring of the people around you... You stop breathing.`
                //                             }

                //                             payload += `\n\n\n\n*Game over! Better luck next time!*\`\`\``

                //                         }

                //                     }
                //                     else if(currentState.rollResult == "lowest"){
                //                         // status = "DEAD"

                //                         // payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`

                //                         // payload += `The pirates’ attention turns in surprise to the two of you, as you stand panting at the door. Exhausted from your sudden sprint, neither of you were prepared for this. You exchange glances too late. After all you’d been through together, it was a little sad it would end like this.\n\nIt happened like in the movies. You heard the gunshots but nothing else, the sound ringing in your ears with an empty finality. You barely felt the pain to [Shot][`+outcome.result+`]. The world tilted and your knees hit the ground, a calming fog beginning to creep into all your senses. And as you lay on the cold floor, your vision slowly beginning to darken, you see your officer friend smile at you from where he lay, bleeding out. You think that at least, you didn’t die alone… \n\n\n\n*Game over! Better luck next time!*\`\`\``
                //                     }

                //                 })
                                
                //                 // Send payload
                //                 member.send(payload)
                //                 message.channel.send("Round "+round+" Update sent successfully to (Player #"+participants[memberId]+") "+member.displayName)
                //             } else {
                //                 // Alternative response if player has died previously.
                //                 message.channel.send("Round "+round+" Update was not sent because (Player #"+participants[memberId]+") "+member.displayName+" is **DEAD**")
                //             }
                //         } else {
                //             console.log("FAILED -- "+member.displayName)
                //             message.channel.send("Round "+round+" Update failed for "+member.displayName)
                //         }
                //     })

                //     message.reply("LIVE Deploy complete!")

                //     break

                
                // case '!bot test so-r13':
                //     console.log("TEST Deploying '!bot so-r13'")
                //     message.reply("TEST Deploying '!bot so-r13'")

                //     message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{

                //         var payload = ``
                //         var memberId = member.id
                //         // CHANGE THE ROUND EVERY ROUND PLEASE.
                //         const round = 13
                //         var replyString
                //         var currentState
                //         var previousState
                //         var outcomes = {
                //             outcomes: [
                //                 {"range": [4, 6], "result": -4, "status": "BLEEDING OUT", "message": `You only have moments to make your decision. Unfortunately, the Captain also seems to notice your deliberation. He stops talking abruptly, his nervous demeanor turning into an eerie calmness as he smirks. Then he suddenly lunges towards you, his head mutating horrifically into that of an unknown species! You stumble back, but not fast enough—his razor sharp teeth sink deep into the arm you’d raised to defend yourself [BITTEN][-4hp] The officer beside you is quick to save you, and taking no chances this time, shoots him thrice. The body drops to the floor in a writhing mass of alien flesh, but the officer barely stops to look. \n\nShaken, you can only watch as the officer attempts to land the ship. He is eerily calm now, considering all the things that have happened so far. He delivers commands to the remaining Communications team with ease, before briskly telling you to brace yourself for the landing…`},
                //                 {"range": [3, 3], "result": -10, "status": "CRITICAL HIT", "message": `You only have moments to make your decision. Unfortunately, the Captain also seems to notice your deliberation. He stops talking abruptly, his nervous demeanor turning into an eerie calmness as he smirks. Then he suddenly lunges towards you, his head mutating horrifically into that of an unknown species! You stumble back, but not fast enough—his razor sharp teeth sink deep into the base of your neck [SAVAGED][-10hp] You think you’d be dead, but somehow you still manage to scream. The officer beside you is quick to save you, and taking no chances this time, shoots him thrice. The body drops to the floor in a writhing mass of alien flesh, but the officer barely stops to look. \n\nShaken and bleeding profusely, you can only watch as the officer attempts to land the ship. He is eerily calm now, considering all the things that have happened so far. He delivers commands to the remaining Communications team with ease, before briskly telling you to brace yourself for the landing… `},
                //             ]
                //         }
                //         // console.log(participants[memberId])
                //         if (!!participants[memberId] || participants[memberId] == 0){
                //         // if (participants[memberId] == 21){
                            
                //             console.log("Exists -- "+member.displayName)
                //             if(results.players[participants[memberId]].history.length >= round){
                //                 currentState = results.players[participants[memberId]].history[round - 1]
                //                 previousState = results.players[participants[memberId]].history[round - 2]
                //                 // console.log(currentState)
                //                 // console.log(currentState.health+`\n`)
                //                 var roundFormatted = (round).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                //                 var health = currentState.health
                //                 var status = ''

                                
                //                 outcomes.outcomes.forEach((outcome)=>{
                //                     if( currentState.rollResult >= outcome.range[0] && currentState.rollResult <= outcome.range[1] ){
                //                         status = outcome.status
                //                         if(currentState.alive == false){
                //                             status = "DEAD"
                //                         }
                                        
                //                         payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status

                //                         if(currentState.alive == true){

                //                             if( currentState.item == "pencil") {
                //                                 payload += `\n> You have a Golden Pencil!`
                //                             }
    
                //                             payload += `\n\n--------\n\nUPDATE: \n`
    
                //                             payload += outcome.message
    
                //                             if(currentState.poisoned == true){
                //                                 payload += `\n\n*Your wounds feel like they're on fire...* [Poisoned][-1hp]`
                //                             }
    
                //                             payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``

                //                         } else if(currentState.alive == false){

                //                             payload += `\n\n--------\n\nUPDATE: \n`
                                            
                //                             // This checks if the player died from poison by checking if the roll result set them to 0 health. If it doesn't, then the player died to the poison.
                //                             if (previousState.health - Math.abs(outcome.result) <= 0){
                //                                 console.log(member.displayName+" "+participants[memberId]+" Died to roll")
                //                                 console.log(previousState.health - Math.abs(outcome.result))
                //                                 if(outcome.result == -4){
                //                                     payload += `You only have moments to make your decision. Unfortunately, the Captain also seems to notice your deliberation. He stops talking abruptly, his nervous demeanor turning into an eerie calmness as he smirks. Then he suddenly lunges towards you, his head mutating horrifically into that of an unknown species! You stumble back, but not fast enough—his razor sharp teeth sink deep into the arm you’d raised to defend yourself [BITTEN][-4hp] The officer beside you is quick to save you, and taking no chances this time, shoots him thrice. The body drops to the floor in a writhing mass of alien flesh, but it is too late for you. Your savaged arm begins burning with incredible pain, as the alien’s acidic saliva seems to eat away your skin and bones! You scream and scream, but there is nothing you nor your officer friend can do. You are faintly aware of his shouting words, and of yourself being lowered to the ground, but soon your entire vision turns red, and you slip away into unconsciousness...`
                //                                 }
                //                                 else if(outcome.result == -10){
                //                                     payload += `You only have moments to make your decision. Unfortunately, the Captain also seems to notice your deliberation. He stops talking abruptly, his nervous demeanor turning into an eerie calmness as he smirks. Then he suddenly lunges towards you, his head mutating horrifically into that of an unknown species! You stumble back, but not fast enough—his razor sharp teeth sink deep into your neck [SAVAGED][-10hp] You manage to scream for half a second before the monster jerks its head abruptly to the side, instantly tearing your throat out...`
                //                                 }
                //                             } else {
                //                                 console.log(member.displayName+" "+participants[memberId]+" Died to poison. Their previous health was: "+previousState.health)
                //                                 console.log(previousState.health - Math.abs(outcome.result))
                //                                 if(outcome.result == -4){
                //                                     payload += `You only have moments to make your decision. Unfortunately, the Captain also seems to notice your deliberation. He stops talking abruptly, his nervous demeanor turning into an eerie calmness as he smirks. Then he suddenly lunges towards you, his head mutating horrifically into that of an unknown species! You stumble back, but not fast enough—his razor sharp teeth sink deep into the arm you’d raised to defend yourself [BITTEN][-4hp] The officer beside you is quick to save you, and taking no chances this time, shoots him thrice. The body drops to the floor in a writhing mass of alien flesh, but the officer barely stops to look. \n\nShaken, you can only watch as the officer attempts to land the ship. He is eerily calm now, considering all the things that have happened so far. He delivers commands to the remaining Communications team with ease, before briskly telling you to brace yourself for the landing—but as you move to do so, you are wracked with a sudden cold tremor. You cough up hard into your hands and see green slime coating your fingers [POISONED][-1hp] You try to tell the officer, but are overcome with another violent coughing fit and fall to your knees. More green slime splashes onto the floor as your insides seem to squeeze uncontrollably inside of you. The last thing you see before you black out are the boots of your officer friend, running to save you… `
                //                                 }
                //                             }

                //                             payload += `\n\n\n\n*Game over! Better luck next time!*\`\`\``

                //                         }

                //                     }
                //                     else if(currentState.rollResult == "lowest"){
                //                         // status = "DEAD"

                //                         // payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`

                //                         // payload += `The pirates’ attention turns in surprise to the two of you, as you stand panting at the door. Exhausted from your sudden sprint, neither of you were prepared for this. You exchange glances too late. After all you’d been through together, it was a little sad it would end like this.\n\nIt happened like in the movies. You heard the gunshots but nothing else, the sound ringing in your ears with an empty finality. You barely felt the pain to [Shot][`+outcome.result+`]. The world tilted and your knees hit the ground, a calming fog beginning to creep into all your senses. And as you lay on the cold floor, your vision slowly beginning to darken, you see your officer friend smile at you from where he lay, bleeding out. You think that at least, you didn’t die alone… \n\n\n\n*Game over! Better luck next time!*\`\`\``
                //                     } else if(currentState.rollResult == "SAVED"){
                //                         status = "RESURRECTED"

                //                         payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n> The pencil appears to be useless now... (ability consumed)\n\n--------\n\nUPDATE: \n`

                //                         payload += `You only have moments to make your decision. Unfortunately, the Captain also seems to notice your deliberation. He stops talking abruptly, his nervous demeanor turning into an eerie calmness as he smirks. Then he suddenly lunges towards you, his head mutating horrifically into that of an unknown species! You stumble back, but not fast enough—his razor sharp teeth sink deep into your neck [SAVAGED][-10hp] You manage to scream for half a second before the monster jerks its head abruptly to the side, instantly tearing your throat out…\n\n… For some reason, you can still hear yourself screaming. You look across to see your officer friend staring in shock at you. When you look down, you see you are enveloped in a warm, golden glow that appears to be coming from… the Golden Pencil you have stashed in your pocket! [RESURRECTED][IMMUNITY FOR ONE ROUND] In fact, when you touch your throat, it seems to have magically healed back together. Was this the power of the object from your homeworld?\n\nThe officer beside you is quick to react after that, and taking no chances this time, shoots the alien thrice. The body drops to the floor in a writhing mass of alien flesh, but the officer barely stops to look. He gives you a relieved shake of his head before turning back to the control panel to attempt to land the ship. He is eerily calm now, considering all the things that have happened so far. He delivers commands to the remaining Communications team with ease, before briskly telling you to brace yourself for the landing… `

                //                         if(currentState.poisoned == true){
                //                             payload += `\n\n*The site of the bite, though healed, feels like it's on fire.* [Poisoned][-1hp]`
                //                         }

                //                         payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``
                //                     }

                //                 })
                                
                //                 // Send payload
                //                 // member.send(payload)
                //                 message.channel.send("Round "+round+" Update: (Player #"+participants[memberId]+") "+member.displayName+`\n`+payload)
                //             } else {
                //                 message.channel.send("Round "+round+" Update: (Player #"+participants[memberId]+") "+member.displayName+`\n`+`**THEY DIED x_x**`)
                //             }
                //         } else {
                //             console.log("FAILED -- "+member.displayName)
                //             message.channel.send("Round "+round+" Update failed for "+member.displayName)
                //         }
                //     })

                //     message.reply("Test complete!")

                //     break

                // case '!bot so-r13':
                //     console.log("LIVE Deploying '!bot so-r13'")
                //     message.reply("LIVE Deploying '!bot so-r13'")

                //     message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{

                //         var payload = ``
                //         var memberId = member.id
                //         // CHANGE THE ROUND EVERY ROUND PLEASE.
                //         const round = 13
                //         var replyString
                //         var currentState
                //         var previousState
                //         var outcomes = {
                //             outcomes: [
                //                 {"range": [4, 6], "result": -4, "status": "BLEEDING OUT", "message": `You only have moments to make your decision. Unfortunately, the Captain also seems to notice your deliberation. He stops talking abruptly, his nervous demeanor turning into an eerie calmness as he smirks. Then he suddenly lunges towards you, his head mutating horrifically into that of an unknown species! You stumble back, but not fast enough—his razor sharp teeth sink deep into the arm you’d raised to defend yourself [BITTEN][-4hp] The officer beside you is quick to save you, and taking no chances this time, shoots him thrice. The body drops to the floor in a writhing mass of alien flesh, but the officer barely stops to look. \n\nShaken, you can only watch as the officer attempts to land the ship. He is eerily calm now, considering all the things that have happened so far. He delivers commands to the remaining Communications team with ease, before briskly telling you to brace yourself for the landing…`},
                //                 {"range": [3, 3], "result": -10, "status": "CRITICAL HIT", "message": `You only have moments to make your decision. Unfortunately, the Captain also seems to notice your deliberation. He stops talking abruptly, his nervous demeanor turning into an eerie calmness as he smirks. Then he suddenly lunges towards you, his head mutating horrifically into that of an unknown species! You stumble back, but not fast enough—his razor sharp teeth sink deep into the base of your neck [SAVAGED][-10hp] You think you’d be dead, but somehow you still manage to scream. The officer beside you is quick to save you, and taking no chances this time, shoots him thrice. The body drops to the floor in a writhing mass of alien flesh, but the officer barely stops to look. \n\nShaken and bleeding profusely, you can only watch as the officer attempts to land the ship. He is eerily calm now, considering all the things that have happened so far. He delivers commands to the remaining Communications team with ease, before briskly telling you to brace yourself for the landing… `},
                //             ]
                //         }
                //         // console.log(participants[memberId])
                //         if (!!participants[memberId] || participants[memberId] == 0){
                            
                //             console.log("Exists -- "+member.displayName)
                //             if(results.players[participants[memberId]].history.length >= round){
                //                 currentState = results.players[participants[memberId]].history[round - 1]
                //                 previousState = results.players[participants[memberId]].history[round - 2]
                //                 // console.log(currentState)
                //                 // console.log(currentState.health+`\n`)
                //                 var roundFormatted = (round).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                //                 var health = currentState.health
                //                 var status = ''

                                
                //                 outcomes.outcomes.forEach((outcome)=>{
                //                     if( currentState.rollResult >= outcome.range[0] && currentState.rollResult <= outcome.range[1] ){
                //                         status = outcome.status
                //                         if(currentState.alive == false){
                //                             status = "DEAD"
                //                         }
                                        
                //                         payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status

                //                         if(currentState.alive == true){

                //                             if( currentState.item == "pencil") {
                //                                 payload += `\n> You have a Golden Pencil!`
                //                             }
    
                //                             payload += `\n\n--------\n\nUPDATE: \n`
    
                //                             payload += outcome.message
    
                //                             if(currentState.poisoned == true){
                //                                 payload += `\n\n*Your wounds feel like they're on fire...* [Poisoned][-1hp]`
                //                             }
    
                //                             payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``

                //                         } else if(currentState.alive == false){

                //                             payload += `\n\n--------\n\nUPDATE: \n`
                                            
                //                             // This checks if the player died from poison by checking if the roll result set them to 0 health. If it doesn't, then the player died to the poison.
                //                             if (previousState.health - Math.abs(outcome.result) <= 0){
                //                                 console.log(member.displayName+" "+participants[memberId]+" Died to roll")
                //                                 console.log(previousState.health - Math.abs(outcome.result))
                //                                 if(outcome.result == -4){
                //                                     payload += `You only have moments to make your decision. Unfortunately, the Captain also seems to notice your deliberation. He stops talking abruptly, his nervous demeanor turning into an eerie calmness as he smirks. Then he suddenly lunges towards you, his head mutating horrifically into that of an unknown species! You stumble back, but not fast enough—his razor sharp teeth sink deep into the arm you’d raised to defend yourself [BITTEN][-4hp] The officer beside you is quick to save you, and taking no chances this time, shoots him thrice. The body drops to the floor in a writhing mass of alien flesh, but it is too late for you. Your savaged arm begins burning with incredible pain, as the alien’s acidic saliva seems to eat away your skin and bones! You scream and scream, but there is nothing you nor your officer friend can do. You are faintly aware of his shouting words, and of yourself being lowered to the ground, but soon your entire vision turns red, and you slip away into unconsciousness...`
                //                                 }
                //                                 else if(outcome.result == -10){
                //                                     payload += `You only have moments to make your decision. Unfortunately, the Captain also seems to notice your deliberation. He stops talking abruptly, his nervous demeanor turning into an eerie calmness as he smirks. Then he suddenly lunges towards you, his head mutating horrifically into that of an unknown species! You stumble back, but not fast enough—his razor sharp teeth sink deep into your neck [SAVAGED][-10hp] You manage to scream for half a second before the monster jerks its head abruptly to the side, instantly tearing your throat out...`
                //                                 }
                //                             } else {
                //                                 console.log(member.displayName+" "+participants[memberId]+" Died to poison. Their previous health was: "+previousState.health)
                //                                 console.log(previousState.health - Math.abs(outcome.result))
                //                                 if(outcome.result == -4){
                //                                     payload += `You only have moments to make your decision. Unfortunately, the Captain also seems to notice your deliberation. He stops talking abruptly, his nervous demeanor turning into an eerie calmness as he smirks. Then he suddenly lunges towards you, his head mutating horrifically into that of an unknown species! You stumble back, but not fast enough—his razor sharp teeth sink deep into the arm you’d raised to defend yourself [BITTEN][-4hp] The officer beside you is quick to save you, and taking no chances this time, shoots him thrice. The body drops to the floor in a writhing mass of alien flesh, but the officer barely stops to look. \n\nShaken, you can only watch as the officer attempts to land the ship. He is eerily calm now, considering all the things that have happened so far. He delivers commands to the remaining Communications team with ease, before briskly telling you to brace yourself for the landing—but as you move to do so, you are wracked with a sudden cold tremor. You cough up hard into your hands and see green slime coating your fingers [POISONED][-1hp] You try to tell the officer, but are overcome with another violent coughing fit and fall to your knees. More green slime splashes onto the floor as your insides seem to squeeze uncontrollably inside of you. The last thing you see before you black out are the boots of your officer friend, running to save you… `
                //                                 }
                //                             }

                //                             payload += `\n\n\n\n*Game over! Better luck next time!*\`\`\``

                //                         }

                //                     }
                //                     else if(currentState.rollResult == "lowest"){
                //                         // status = "DEAD"

                //                         // payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`

                //                         // payload += `The pirates’ attention turns in surprise to the two of you, as you stand panting at the door. Exhausted from your sudden sprint, neither of you were prepared for this. You exchange glances too late. After all you’d been through together, it was a little sad it would end like this.\n\nIt happened like in the movies. You heard the gunshots but nothing else, the sound ringing in your ears with an empty finality. You barely felt the pain to [Shot][`+outcome.result+`]. The world tilted and your knees hit the ground, a calming fog beginning to creep into all your senses. And as you lay on the cold floor, your vision slowly beginning to darken, you see your officer friend smile at you from where he lay, bleeding out. You think that at least, you didn’t die alone… \n\n\n\n*Game over! Better luck next time!*\`\`\``
                //                     } else if(currentState.rollResult == "SAVED"){
                //                         status = "RESURRECTED"

                //                         payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n> The pencil appears to be useless now... (ability consumed)\n\n--------\n\nUPDATE: \n`

                //                         payload += `You only have moments to make your decision. Unfortunately, the Captain also seems to notice your deliberation. He stops talking abruptly, his nervous demeanor turning into an eerie calmness as he smirks. Then he suddenly lunges towards you, his head mutating horrifically into that of an unknown species! You stumble back, but not fast enough—his razor sharp teeth sink deep into your neck [SAVAGED][-10hp] You manage to scream for half a second before the monster jerks its head abruptly to the side, instantly tearing your throat out…\n\n… For some reason, you can still hear yourself screaming. You look across to see your officer friend staring in shock at you. When you look down, you see you are enveloped in a warm, golden glow that appears to be coming from… the Golden Pencil you have stashed in your pocket! [RESURRECTED][IMMUNITY FOR ONE ROUND] In fact, when you touch your throat, it seems to have magically healed back together. Was this the power of the object from your homeworld?\n\nThe officer beside you is quick to react after that, and taking no chances this time, shoots the alien thrice. The body drops to the floor in a writhing mass of alien flesh, but the officer barely stops to look. He gives you a relieved shake of his head before turning back to the control panel to attempt to land the ship. He is eerily calm now, considering all the things that have happened so far. He delivers commands to the remaining Communications team with ease, before briskly telling you to brace yourself for the landing… `

                //                         if(currentState.poisoned == true){
                //                             payload += `\n\n*The site of the bite, though healed, feels like it's on fire.* [Poisoned][-1hp]`
                //                         }

                //                         payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``
                //                     }

                //                 })
                                
                //                 // Send payload
                //                 member.send(payload)
                //                 message.channel.send("Round "+round+" Update sent successfully to (Player #"+participants[memberId]+") "+member.displayName)
                //             } else {
                //                 // Alternative response if player has died previously.
                //                 message.channel.send("Round "+round+" Update was not sent because (Player #"+participants[memberId]+") "+member.displayName+" is **DEAD**")
                //             }
                //         } else {
                //             console.log("FAILED -- "+member.displayName)
                //             message.channel.send("Round "+round+" Update failed for "+member.displayName)
                //         }
                //     })

                //     message.reply("LIVE Deploy complete!")

                //     break

                case '!bot test so-r14':
                    console.log("TEST Deploying '!bot test so-r14'")
                    message.reply("TEST Deploying '!bot test so-r14'")

                    message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{

                        var payload = ``
                        var memberId = member.id
                        // CHANGE THE ROUND EVERY ROUND PLEASE.
                        const round = 14
                        var replyString
                        var currentState
                        var previousState
                        var outcomes = {
                            outcomes: [
                                {"range": [1, 6], "result": 0, "status": "PLAYED IT COOL", "message": `You brace yourself for impact! The ship lands violently on foreign soil. People, furniture, and aliens alike go flying across the room as the ship bounces once, then twice, before sliding to a jerky halt. You manage to hold on tight enough to emerge out of the landing virtually unscathed. Whew! Your officer friend staggers to his feet, before helping you up as well. “Let’s leave this cursed ship.”\n\nYou follow him out of the Communications Room and into the deserted corridor. If there were any other survivors aboard, you doubt there are many left now, if at all. Bruised and exhausted, you stumble behind your companion. He seems to know his way through the ship, and leads you through several rooms and corridors, all of which are in varying stages of carnage. Despite his injuries, he moves with ease. As you cross the common room of the ship, you cough violently into the helmet of your space suit… `},
                                {"range": [7, 15], "result": -2, "status": "TOOK A TUMBLE", "message": `You brace yourself for impact! The ship lands violently on foreign soil. People, furniture, and aliens alike go flying across the room as the ship bounces once, then twice, before sliding to a jerky halt. You try to hold on, but lose your grip at the last second, and make a rough tumble across the room [TUMBLED][-2hp]. Your officer friend staggers to his feet, before helping you up as well. “Let’s leave this cursed ship.”\n\nYou follow him out of the Communications Room and into the deserted corridor. If there were any other survivors aboard, you doubt there are many left now, if at all. Bruised and exhausted, you stumble behind your companion. He seems to know his way through the ship, and leads you through several rooms and corridors, all of which are in varying stages of carnage. Despite his injuries, he moves with ease. As you cross the common room of the ship, you cough violently into the helmet of your space suit… `},
                                {"range": [16, 20], "result": -5, "status": "SENT FLYING", "message": `You brace yourself for impact! The ship lands violently on foreign soil. People, furniture, and aliens alike go flying across the room as the ship bounces once, then twice, before sliding to a jerky halt. You didn’t get the chance to hold on-you are sent airborne amidst the chaos, and are buffeted by the debris that fly by [OBJECT COLLISION][-5hp]. Once the ship finally stops spinning, your officer friend staggers to his feet, before helping you up as well. “Let’s leave this cursed ship.”\n\nYou follow him out of the Communications Room and into the deserted corridor. If there were any other survivors aboard, you doubt there are many left now, if at all. Bruised and exhausted, you stumble behind your companion. He seems to know his way through the ship, and leads you through several rooms and corridors, all of which are in varying stages of carnage. Despite his injuries, he moves with ease. As you cross the common room of the ship, you cough violently into the helmet of your space suit… `},
                            ]
                        }
                        // console.log(participants[memberId])
                        if (!!participants[memberId] || participants[memberId] == 0){
                        // if (participants[memberId] == 21){
                            
                            console.log("Exists -- "+member.displayName)
                            if(results.players[participants[memberId]].history.length >= round){
                                currentState = results.players[participants[memberId]].history[round - 1]
                                previousState = results.players[participants[memberId]].history[round - 2]
                                // console.log(currentState)
                                // console.log(currentState.health+`\n`)
                                var roundFormatted = (round).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                                var health = currentState.health
                                var status = ''

                                
                                outcomes.outcomes.forEach((outcome)=>{
                                    if( currentState.rollResult >= outcome.range[0] && currentState.rollResult <= outcome.range[1] ){
                                        status = outcome.status
                                        if(currentState.alive == false){
                                            status = "DEAD"
                                        }
                                        
                                        payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status

                                        if(currentState.alive == true){

                                            if( currentState.item == "pencil") {
                                                payload += `\n> You have a Golden Pencil!`
                                            }
    
                                            payload += `\n\n--------\n\nUPDATE: \n`
    
                                            payload += outcome.message
    
                                            if(currentState.poisoned == true){
                                                payload += `\n\n*You're coughing badly. Like pretty bad.* [Poisoned][-1hp]`
                                            }
    
                                            payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``

                                        } else if(currentState.alive == false){

                                            payload += `\n\n--------\n\nUPDATE: \n`
                                            
                                            // This checks if the player died from poison by checking if the roll result set them to 0 health. If it doesn't, then the player died to the poison.
                                            if (previousState.health - Math.abs(outcome.result) <= 0){
                                                console.log(member.displayName+" "+participants[memberId]+" Died to roll")
                                                console.log(previousState.health - Math.abs(outcome.result))
                                                if(outcome.result == -5){
                                                    payload += `You brace yourself for impact! The ship lands violently on foreign soil. People, furniture, and aliens alike go flying across the room as the ship bounces once, then twice, before sliding to a jerky halt. You didn’t get the chance to hold on-you are sent airborne amidst the chaos, and are buffeted by the debris that fly by [OBJECT COLLISION][-5hp]. However, when you land an excruciating pain suddenly lances through your stomach. Looking down, you see your hands stained red, and a wickedly sharp, jagged piece of glass and metal, broken from some of the debris, impaled through your abdomen. Panicking, you reach down and with both hands, attempt to yank it out despite your officer friend yelling at you to stop. The debris comes out of you, but so does an alarming flood of blood that pools onto the ground. The blood loss is too much. “Officer…” you whisper, “...I don’t feel so good…” You feel yourself pale and shiver, even as the world around you starts to spin and go white. The last thing you feel before everything fades away is your friend, gently lowering you to the ground… `
                                                }
                                            } else {
                                                console.log(member.displayName+" "+participants[memberId]+" Died to poison. Their previous health was: "+previousState.health)
                                                console.log(previousState.health - Math.abs(outcome.result))
                                                if(outcome.result == -2){
                                                    payload += `You brace yourself for impact! The ship lands violently on foreign soil. People, furniture, and aliens alike go flying across the room as the ship bounces once, then twice, before sliding to a jerky halt. You try to hold on, but lose your grip at the last second, and make a rough tumble across the room [TUMBLED][-2hp]. Your officer friend staggers to his feet, before helping you up as well. “Let’s leave this cursed ship.”\n\nYou  make to follow him out of the Communications Room when a hacking cough comes over you. He pauses to look back as your whole body is wracked with a violent fit, and you fall to your knees as you cough uncontrollably. You see blood speckled across the inside of your helmet. Panicking, you yank the helm from your head, just as a jolt of pain explodes in your stomach [POISONED][-1hp]. This time, you cough up a pool of blood as your lungs fill with fluid, along with something unnaturally green… You look up at your friend, even as you feel a strong wave of dizziness come over you. The last thing you feel before everything fades away is your friend, gently lowering you to the ground… `
                                                }
                                            }

                                            payload += `\n\n\n\n*Game over! Better luck next time!*\`\`\``

                                        }

                                    }
                                    else if(currentState.rollResult == "lowest"){
                                        // status = "DEAD"

                                        // payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`

                                        // payload += `The pirates’ attention turns in surprise to the two of you, as you stand panting at the door. Exhausted from your sudden sprint, neither of you were prepared for this. You exchange glances too late. After all you’d been through together, it was a little sad it would end like this.\n\nIt happened like in the movies. You heard the gunshots but nothing else, the sound ringing in your ears with an empty finality. You barely felt the pain to [Shot][`+outcome.result+`]. The world tilted and your knees hit the ground, a calming fog beginning to creep into all your senses. And as you lay on the cold floor, your vision slowly beginning to darken, you see your officer friend smile at you from where he lay, bleeding out. You think that at least, you didn’t die alone… \n\n\n\n*Game over! Better luck next time!*\`\`\``
                                    } else if(currentState.rollResult == "SAVED"){
                                        // status = "RESURRECTED"

                                        // payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n> The pencil appears to be useless now... (ability consumed)\n\n--------\n\nUPDATE: \n`

                                        // payload += `You only have moments to make your decision. Unfortunately, the Captain also seems to notice your deliberation. He stops talking abruptly, his nervous demeanor turning into an eerie calmness as he smirks. Then he suddenly lunges towards you, his head mutating horrifically into that of an unknown species! You stumble back, but not fast enough—his razor sharp teeth sink deep into your neck [SAVAGED][-10hp] You manage to scream for half a second before the monster jerks its head abruptly to the side, instantly tearing your throat out…\n\n… For some reason, you can still hear yourself screaming. You look across to see your officer friend staring in shock at you. When you look down, you see you are enveloped in a warm, golden glow that appears to be coming from… the Golden Pencil you have stashed in your pocket! [RESURRECTED][IMMUNITY FOR ONE ROUND] In fact, when you touch your throat, it seems to have magically healed back together. Was this the power of the object from your homeworld?\n\nThe officer beside you is quick to react after that, and taking no chances this time, shoots the alien thrice. The body drops to the floor in a writhing mass of alien flesh, but the officer barely stops to look. He gives you a relieved shake of his head before turning back to the control panel to attempt to land the ship. He is eerily calm now, considering all the things that have happened so far. He delivers commands to the remaining Communications team with ease, before briskly telling you to brace yourself for the landing… `

                                        // if(currentState.poisoned == true){
                                        //     payload += `\n\n*The site of the bite, though healed, feels like it's on fire.* [Poisoned][-1hp]`
                                        // }

                                        // payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``
                                    }

                                })
                                
                                // Send payload
                                // member.send(payload)
                                message.channel.send("Round "+round+" Update: (Player #"+participants[memberId]+") "+member.displayName+`\n`+payload)
                            } else {
                                message.channel.send("Round "+round+" Update: (Player #"+participants[memberId]+") "+member.displayName+`\n`+`**THEY DIED x_x**`)
                            }
                        } else {
                            console.log("FAILED -- "+member.displayName)
                            message.channel.send("Round "+round+" Update failed for "+member.displayName)
                        }
                    })

                    message.reply("Test complete!")

                    break

                case '!bot so-r14':
                    console.log("LIVE Deploying '!bot so-r14'")
                    message.reply("LIVE Deploying '!bot so-r14'")

                    message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{

                        var payload = ``
                        var memberId = member.id
                        // CHANGE THE ROUND EVERY ROUND PLEASE.
                        const round = 14
                        var replyString
                        var currentState
                        var previousState
                        var outcomes = {
                            outcomes: [
                                {"range": [1, 6], "result": 0, "status": "PLAYED IT COOL", "message": `You brace yourself for impact! The ship lands violently on foreign soil. People, furniture, and aliens alike go flying across the room as the ship bounces once, then twice, before sliding to a jerky halt. You manage to hold on tight enough to emerge out of the landing virtually unscathed. Whew! Your officer friend staggers to his feet, before helping you up as well. “Let’s leave this cursed ship.”\n\nYou follow him out of the Communications Room and into the deserted corridor. If there were any other survivors aboard, you doubt there are many left now, if at all. Bruised and exhausted, you stumble behind your companion. He seems to know his way through the ship, and leads you through several rooms and corridors, all of which are in varying stages of carnage. Despite his injuries, he moves with ease. As you cross the common room of the ship, you cough violently into the helmet of your space suit… `},
                                {"range": [7, 15], "result": -2, "status": "TOOK A TUMBLE", "message": `You brace yourself for impact! The ship lands violently on foreign soil. People, furniture, and aliens alike go flying across the room as the ship bounces once, then twice, before sliding to a jerky halt. You try to hold on, but lose your grip at the last second, and make a rough tumble across the room [TUMBLED][-2hp]. Your officer friend staggers to his feet, before helping you up as well. “Let’s leave this cursed ship.”\n\nYou follow him out of the Communications Room and into the deserted corridor. If there were any other survivors aboard, you doubt there are many left now, if at all. Bruised and exhausted, you stumble behind your companion. He seems to know his way through the ship, and leads you through several rooms and corridors, all of which are in varying stages of carnage. Despite his injuries, he moves with ease. As you cross the common room of the ship, you cough violently into the helmet of your space suit… `},
                                {"range": [16, 20], "result": -5, "status": "SENT FLYING", "message": `You brace yourself for impact! The ship lands violently on foreign soil. People, furniture, and aliens alike go flying across the room as the ship bounces once, then twice, before sliding to a jerky halt. You didn’t get the chance to hold on-you are sent airborne amidst the chaos, and are buffeted by the debris that fly by [OBJECT COLLISION][-5hp]. Once the ship finally stops spinning, your officer friend staggers to his feet, before helping you up as well. “Let’s leave this cursed ship.”\n\nYou follow him out of the Communications Room and into the deserted corridor. If there were any other survivors aboard, you doubt there are many left now, if at all. Bruised and exhausted, you stumble behind your companion. He seems to know his way through the ship, and leads you through several rooms and corridors, all of which are in varying stages of carnage. Despite his injuries, he moves with ease. As you cross the common room of the ship, you cough violently into the helmet of your space suit… `},
                            ]
                        }
                        // console.log(participants[memberId])
                        if (!!participants[memberId] || participants[memberId] == 0){
                            
                            console.log("Exists -- "+member.displayName)
                            if(results.players[participants[memberId]].history.length >= round){
                                currentState = results.players[participants[memberId]].history[round - 1]
                                previousState = results.players[participants[memberId]].history[round - 2]
                                // console.log(currentState)
                                // console.log(currentState.health+`\n`)
                                var roundFormatted = (round).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                                var health = currentState.health
                                var status = ''

                                
                                outcomes.outcomes.forEach((outcome)=>{
                                    if( currentState.rollResult >= outcome.range[0] && currentState.rollResult <= outcome.range[1] ){
                                        status = outcome.status
                                        if(currentState.alive == false){
                                            status = "DEAD"
                                        }
                                        
                                        payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status

                                        if(currentState.alive == true){

                                            if( currentState.item == "pencil") {
                                                payload += `\n> You have a Golden Pencil!`
                                            }
    
                                            payload += `\n\n--------\n\nUPDATE: \n`
    
                                            payload += outcome.message
    
                                            if(currentState.poisoned == true){
                                                payload += `\n\n*You're coughing badly. Like pretty bad.* [Poisoned][-1hp]`
                                            }
    
                                            payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``

                                        } else if(currentState.alive == false){

                                            payload += `\n\n--------\n\nUPDATE: \n`
                                            
                                            // This checks if the player died from poison by checking if the roll result set them to 0 health. If it doesn't, then the player died to the poison.
                                            if (previousState.health - Math.abs(outcome.result) <= 0){
                                                console.log(member.displayName+" "+participants[memberId]+" Died to roll")
                                                console.log(previousState.health - Math.abs(outcome.result))
                                                if(outcome.result == -5){
                                                    payload += `You brace yourself for impact! The ship lands violently on foreign soil. People, furniture, and aliens alike go flying across the room as the ship bounces once, then twice, before sliding to a jerky halt. You didn’t get the chance to hold on-you are sent airborne amidst the chaos, and are buffeted by the debris that fly by [OBJECT COLLISION][-5hp]. However, when you land an excruciating pain suddenly lances through your stomach. Looking down, you see your hands stained red, and a wickedly sharp, jagged piece of glass and metal, broken from some of the debris, impaled through your abdomen. Panicking, you reach down and with both hands, attempt to yank it out despite your officer friend yelling at you to stop. The debris comes out of you, but so does an alarming flood of blood that pools onto the ground. The blood loss is too much. “Officer…” you whisper, “...I don’t feel so good…” You feel yourself pale and shiver, even as the world around you starts to spin and go white. The last thing you feel before everything fades away is your friend, gently lowering you to the ground… `
                                                }
                                            } else {
                                                console.log(member.displayName+" "+participants[memberId]+" Died to poison. Their previous health was: "+previousState.health)
                                                console.log(previousState.health - Math.abs(outcome.result))
                                                if(outcome.result == -2){
                                                    payload += `You brace yourself for impact! The ship lands violently on foreign soil. People, furniture, and aliens alike go flying across the room as the ship bounces once, then twice, before sliding to a jerky halt. You try to hold on, but lose your grip at the last second, and make a rough tumble across the room [TUMBLED][-2hp]. Your officer friend staggers to his feet, before helping you up as well. “Let’s leave this cursed ship.”\n\nYou  make to follow him out of the Communications Room when a hacking cough comes over you. He pauses to look back as your whole body is wracked with a violent fit, and you fall to your knees as you cough uncontrollably. You see blood speckled across the inside of your helmet. Panicking, you yank the helm from your head, just as a jolt of pain explodes in your stomach [POISONED][-1hp]. This time, you cough up a pool of blood as your lungs fill with fluid, along with something unnaturally green… You look up at your friend, even as you feel a strong wave of dizziness come over you. The last thing you feel before everything fades away is your friend, gently lowering you to the ground… `
                                                }
                                            }

                                            payload += `\n\n\n\n*Game over! Better luck next time!*\`\`\``

                                        }

                                    }
                                    else if(currentState.rollResult == "lowest"){
                                        // status = "DEAD"

                                        // payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`

                                        // payload += `The pirates’ attention turns in surprise to the two of you, as you stand panting at the door. Exhausted from your sudden sprint, neither of you were prepared for this. You exchange glances too late. After all you’d been through together, it was a little sad it would end like this.\n\nIt happened like in the movies. You heard the gunshots but nothing else, the sound ringing in your ears with an empty finality. You barely felt the pain to [Shot][`+outcome.result+`]. The world tilted and your knees hit the ground, a calming fog beginning to creep into all your senses. And as you lay on the cold floor, your vision slowly beginning to darken, you see your officer friend smile at you from where he lay, bleeding out. You think that at least, you didn’t die alone… \n\n\n\n*Game over! Better luck next time!*\`\`\``
                                    } else if(currentState.rollResult == "SAVED"){
                                        // status = "RESURRECTED"

                                        // payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n> The pencil appears to be useless now... (ability consumed)\n\n--------\n\nUPDATE: \n`

                                        // payload += `You only have moments to make your decision. Unfortunately, the Captain also seems to notice your deliberation. He stops talking abruptly, his nervous demeanor turning into an eerie calmness as he smirks. Then he suddenly lunges towards you, his head mutating horrifically into that of an unknown species! You stumble back, but not fast enough—his razor sharp teeth sink deep into your neck [SAVAGED][-10hp] You manage to scream for half a second before the monster jerks its head abruptly to the side, instantly tearing your throat out…\n\n… For some reason, you can still hear yourself screaming. You look across to see your officer friend staring in shock at you. When you look down, you see you are enveloped in a warm, golden glow that appears to be coming from… the Golden Pencil you have stashed in your pocket! [RESURRECTED][IMMUNITY FOR ONE ROUND] In fact, when you touch your throat, it seems to have magically healed back together. Was this the power of the object from your homeworld?\n\nThe officer beside you is quick to react after that, and taking no chances this time, shoots the alien thrice. The body drops to the floor in a writhing mass of alien flesh, but the officer barely stops to look. He gives you a relieved shake of his head before turning back to the control panel to attempt to land the ship. He is eerily calm now, considering all the things that have happened so far. He delivers commands to the remaining Communications team with ease, before briskly telling you to brace yourself for the landing… `

                                        // if(currentState.poisoned == true){
                                        //     payload += `\n\n*The site of the bite, though healed, feels like it's on fire.* [Poisoned][-1hp]`
                                        // }

                                        // payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``
                                    }

                                })
                                
                                // Send payload
                                member.send(payload)
                                message.channel.send("Round "+round+" Update sent successfully to (Player #"+participants[memberId]+") "+member.displayName)
                            } else {
                                // Alternative response if player has died previously.
                                message.channel.send("Round "+round+" Update was not sent because (Player #"+participants[memberId]+") "+member.displayName+" is **DEAD**")
                            }
                        } else {
                            console.log("FAILED -- "+member.displayName)
                            message.channel.send("Round "+round+" Update failed for "+member.displayName)
                        }
                    })

                    message.reply("LIVE Deploy complete!")

                    break
                }
                console.log(message.author.username)
            }
            
        })

        client.login(config.token);
})