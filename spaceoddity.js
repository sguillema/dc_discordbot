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

                    
                    case '!bot test so-r8':
                        console.log("TEST Deploying '!bot so-r8'")
                        message.reply("TEST Deploying '!bot so-r8'")

                        message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{

                            var payload = ``
                            var memberId = member.id
                            // CHANGE THE ROUND EVERY ROUND PLEASE.
                            const round = 8
                            var replyString
                            var currentState
                            var outcomes = {
                                outcomes: [
                                    {"range": [1, 5], "result": -2, "status": "FREAKING OUT", "message": `You are just a second too late in shouting a warning to your friend. He freezes, then staggers back just as the alien seems to come to life for one more desperate attack. It lunges for you. You try to run, but you’re just not fast enough [TRIPPED][-2hp]. You fall to the floor, but it seems at least your companion has finally snapped out of his horrified trance. He begins to shoot the creature, again and again, until it slumps, lifeless for sure this time, to the floor. The officer gives you an apologetic look and gives you a pat on the shoulder.\n\nUnnerved, you try to shake off what just happened and focus on getting out of here. As you turn to leave the corridor, a mysterious glow coming from the Lower Deck catches your eye. The warmth of the glow is strangely familiar. You point it out to your companion. He looks at you as if you’ve gone crazy, then shakes his head aggressively. He insists it is better to forget about it…`},
                                    {"range": [6, 10], "result": 0, "status": "WRECKED", "message": `The alien seems to come to life before your eyes for one last, desperate attack. Neither you nor your companion were fast enough to react. It lunges for you, sinking razor sharp claws around your legs [SLASHED][-8hp]. You cry out in pain and fall to the floor, but it seems at least your companion has finally snapped out of his horrified trance. He begins to shoot the creature, again and again, until it slumps, lifeless for sure this time, to the floor. The officer gives you an apologetic look and helps you stumble to your feet. \n\nUnnerved, you try to shake off what just happened and focus on getting out of here. As you turn to leave the corridor, a mysterious glow coming from the Lower Deck catches your eye. The warmth of the glow is strangely familiar. You point it out to your companion. He looks at you as if you’ve gone crazy, then shakes his head aggressively. He insists it is better to forget about it…`},
                                    {"range": [11, 15], "result": -2, "status": "FREAKING OUT", "message": `You are just a second too late in shouting a warning to your friend. He freezes, then staggers back just as the alien seems to come to life for one more desperate attack. It lunges for you. You try to run, but you’re just not fast enough [TRIPPED][-2hp]. You fall to the floor, but it seems at least your companion has finally snapped out of his horrified trance. He begins to shoot the creature, again and again, until it slumps, lifeless for sure this time, to the floor. The officer gives you an apologetic look and gives you a pat on the shoulder.\n\nUnnerved, you try to shake off what just happened and focus on getting out of here. As you turn to leave the corridor, a mysterious glow coming from the Lower Deck catches your eye. The warmth of the glow is strangely familiar. You point it out to your companion. He looks at you as if you’ve gone crazy, then shakes his head aggressively. He insists it is better to forget about it…`},
                                    {"range": [16, 20], "result": 0, "status": "HEART RACING", "message": `You act on instinct and shout a warning to your friend. You pull him back, just as the alien seems to come to life for one more desperate attack. Your warning serves you well. Your companion snaps out of his horrified trance and begins to shoot the creature, again and again, until it slumps, lifeless for sure this time, to the floor. The officer gives you a grateful look and gives you a pat on the shoulder.\n\nUnnerved, you try to shake off what just happened and focus on getting out of here. As you turn to leave the corridor, a mysterious glow coming from the Lower Deck catches your eye. The warmth of the glow is strangely familiar. You point it out to your companion. He looks at you as if you’ve gone crazy, then shakes his head aggressively. He insists it is better to forget about it…`},
                                ]
                            }
                            // console.log(participants[memberId])
                            if (!!participants[memberId] || participants[memberId] == 0){
                                
                                console.log("Exists -- "+member.displayName)
                                if(results.players[participants[memberId]].history.length >= round){
                                    currentState = results.players[participants[memberId]].history[round - 1]
                                    // console.log(currentState)
                                    // console.log(currentState.health+`\n`)
                                    var roundFormatted = (round).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                                    var health = currentState.health
                                    var status = ''
                                    
                                    
                                    outcomes.outcomes.forEach((outcome)=>{
                                        if( currentState.rollResult >= outcome.range[0] && currentState.rollResult <= outcome.range[1] ){
                                            status = outcome.status
                                            
                                            payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`
    
                                            payload += outcome.message
    
                                            if(currentState.poisoned == true){
                                                payload += `\n\n*You feel an ache in your limbs* [Poisoned][-1hp]`
                                            }
    
                                            payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``
                                        }
                                        else if(currentState.rollResult == "lowest"){
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

                    case '!bot so-r8':
                        console.log("LIVE Deploying '!bot so-r8'")
                        message.reply("LIVE Deploying '!bot so-r8'")

                        message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{

                            var payload = ``
                            var memberId = member.id
                            // CHANGE THE ROUND EVERY ROUND PLEASE.
                            const round = 8
                            var replyString
                            var currentState
                            var outcomes = {
                                outcomes: [
                                    {"range": [1, 5], "result": -2, "status": "FREAKING OUT", "message": `You are just a second too late in shouting a warning to your friend. He freezes, then staggers back just as the alien seems to come to life for one more desperate attack. It lunges for you. You try to run, but you’re just not fast enough [TRIPPED][-2hp]. You fall to the floor, but it seems at least your companion has finally snapped out of his horrified trance. He begins to shoot the creature, again and again, until it slumps, lifeless for sure this time, to the floor. The officer gives you an apologetic look and gives you a pat on the shoulder.\n\nUnnerved, you try to shake off what just happened and focus on getting out of here. As you turn to leave the corridor, a mysterious glow coming from the Lower Deck catches your eye. The warmth of the glow is strangely familiar. You point it out to your companion. He looks at you as if you’ve gone crazy, then shakes his head aggressively. He insists it is better to forget about it…`},
                                    {"range": [6, 10], "result": 0, "status": "WRECKED", "message": `The alien seems to come to life before your eyes for one last, desperate attack. Neither you nor your companion were fast enough to react. It lunges for you, sinking razor sharp claws around your legs [SLASHED][-8hp]. You cry out in pain and fall to the floor, but it seems at least your companion has finally snapped out of his horrified trance. He begins to shoot the creature, again and again, until it slumps, lifeless for sure this time, to the floor. The officer gives you an apologetic look and helps you stumble to your feet. \n\nUnnerved, you try to shake off what just happened and focus on getting out of here. As you turn to leave the corridor, a mysterious glow coming from the Lower Deck catches your eye. The warmth of the glow is strangely familiar. You point it out to your companion. He looks at you as if you’ve gone crazy, then shakes his head aggressively. He insists it is better to forget about it…`},
                                    {"range": [11, 15], "result": -2, "status": "FREAKING OUT", "message": `You are just a second too late in shouting a warning to your friend. He freezes, then staggers back just as the alien seems to come to life for one more desperate attack. It lunges for you. You try to run, but you’re just not fast enough [TRIPPED][-2hp]. You fall to the floor, but it seems at least your companion has finally snapped out of his horrified trance. He begins to shoot the creature, again and again, until it slumps, lifeless for sure this time, to the floor. The officer gives you an apologetic look and gives you a pat on the shoulder.\n\nUnnerved, you try to shake off what just happened and focus on getting out of here. As you turn to leave the corridor, a mysterious glow coming from the Lower Deck catches your eye. The warmth of the glow is strangely familiar. You point it out to your companion. He looks at you as if you’ve gone crazy, then shakes his head aggressively. He insists it is better to forget about it…`},
                                    {"range": [16, 20], "result": 0, "status": "HEART RACING", "message": `You act on instinct and shout a warning to your friend. You pull him back, just as the alien seems to come to life for one more desperate attack. Your warning serves you well. Your companion snaps out of his horrified trance and begins to shoot the creature, again and again, until it slumps, lifeless for sure this time, to the floor. The officer gives you a grateful look and gives you a pat on the shoulder.\n\nUnnerved, you try to shake off what just happened and focus on getting out of here. As you turn to leave the corridor, a mysterious glow coming from the Lower Deck catches your eye. The warmth of the glow is strangely familiar. You point it out to your companion. He looks at you as if you’ve gone crazy, then shakes his head aggressively. He insists it is better to forget about it…`},
                                ]
                            }
                            // console.log(participants[memberId])
                            if (!!participants[memberId] || participants[memberId] == 0){
                                
                                console.log("Exists -- "+member.displayName)
                                // This checks if the player has existence in this round (i.e. not dead from a previous round)
                                if(results.players[participants[memberId]].history.length >= round){
                                    currentState = results.players[participants[memberId]].history[round - 1]
                                    // console.log(currentState)
                                    // console.log(currentState.health+`\n`)
                                    var roundFormatted = (round).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                                    var health = currentState.health
                                    var status = ''
                                    
                                    
                                    outcomes.outcomes.forEach((outcome)=>{
                                        if( currentState.rollResult >= outcome.range[0] && currentState.rollResult <= outcome.range[1] ){
                                            status = outcome.status
                                            
                                            payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`

                                            payload += outcome.message

                                            if(currentState.poisoned == true){
                                                payload += `\n\n*You feel an ache in your limbs* [Poisoned][-1hp]`
                                            }

                                            payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``
                                        }
                                        else if(currentState.rollResult == "lowest"){
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