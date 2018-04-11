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
                    
                    case '!bot test so-r4':
                        console.log("TEST Deploying '!bot so-r4'")

                        message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{

                            var payload = ``
                            var memberId = member.id
                            // CHANGE THE ROUND EVERY ROUND PLEASE.
                            const round = 4
                            var replyString
                            var currentState
                            var outcomes = {
                                outcomes: [
                                    {"range": [1, 3], "result": -1, "status": "BREATHING HARD", "message": `You don’t bother to wait to find out what happened! You bolt for the nearest room you remember seeing before the lights went out. Your quick thinking and agility help you keep ahead of the stampeding crowd and to the doorway in time. You fling yourself inside and seal the door behind—you only to find you are not the only person in this room…\n\nTo your surprise, there is an Intergalactic Alliance officer standing before you, holding a torch in one hand and a firearm in the other. A crew of them had boarded the ship only the day before, but you hadn’t seen any until now. He offers you help with your injuries... but should you accept it?`},
                                    {"range": [4, 6], "result": 0, "status": "TRAMPLED", "message": `Everyone begins moving at once! Not wanting to find out the source of that scream, you bolt for the nearest room you remember seeing before the lights went out. Unfortunately, everyone else seems to be thinking the same. You are caught in the stampede of bodies, and shoved roughly into the wall as they surge past [Trampled][-1hp] Still, you manage to stumble to the doorway just in time. You fling yourself inside and seal the door behind—you only to find you are not the only person in this room…\n\nTo your surprise, there is an Intergalactic Alliance officer standing before you, holding a torch in one hand and a firearm in the other. A crew of them had boarded the ship only the day before, but you hadn’t seen any until now. He offers you help with your injuries... but should you accept it?`},
                                ]
                            }
                            // console.log(participants[memberId])
                            if (!!participants[memberId] || participants[memberId] == 0){
                                
                                console.log("Exists -- "+member.displayName)
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
                                            payload += `\n\n*You feel a bit sick* [Poisoned][-1hp]`
                                        }

                                        payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``
                                    }
                                    else if(currentState.rollResult == "lowest"){
                                        status = "DEAD"

                                        payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`

                                        payload += `The echoes of the corridor reveal your own scream. The corridor’s emergency beacon reveals a disfigured man, lumped over… approaching you. Bones extrude from the man’s arms, blackened and claw-like. The beacon flashes – every flash shows the figure closer and close than before. You hear several doors in the corridor close in succession… Just as you think you have enough time to turn and run, your legs are swept and you fall forward. As you try to bring yourself up, razor sharp claws embed themselves into your back and push you straight back down. The pressure intensifies and you feel your breath leaving you. The claws violently tear from your back. Your vision turns red. As you lie mangled on the floor, your last sight is that of a figure walking over you, further down into the blackness of the corridor… You try to scream for help, but nothing comes out… [Instant death][-25hp]\n\n\n\n*Game over! Better luck next time!*\`\`\``
                                    }

                                })
                                
                                // Send payload
                                // member.send(payload)
                                message.reply("Round "+round+" Update: "+member.displayName+`\n\n`+payload)
                            } else {
                                console.log("FAILED -- "+member.displayName)
                                message.reply("Round "+round+" Update failed for "+member.displayName)
                            }
                        })

                        message.reply("Test complete!")

                        break

                    case '!bot so-r4':
                        console.log("LIVE Deploying '!bot so-r4'")

                        message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{

                            var payload = ``
                            var memberId = member.id
                            // CHANGE THE ROUND EVERY ROUND PLEASE.
                            const round = 4
                            var replyString
                            var currentState
                            var outcomes = {
                                outcomes: [
                                    {"range": [1, 3], "result": -1, "status": "BREATHING HARD", "message": `You don’t bother to wait to find out what happened! You bolt for the nearest room you remember seeing before the lights went out. Your quick thinking and agility help you keep ahead of the stampeding crowd and to the doorway in time. You fling yourself inside and seal the door behind—you only to find you are not the only person in this room…\n\nTo your surprise, there is an Intergalactic Alliance officer standing before you, holding a torch in one hand and a firearm in the other. A crew of them had boarded the ship only the day before, but you hadn’t seen any until now. He offers you help with your injuries... but should you accept it?`},
                                    {"range": [4, 6], "result": 0, "status": "TRAMPLED", "message": `Everyone begins moving at once! Not wanting to find out the source of that scream, you bolt for the nearest room you remember seeing before the lights went out. Unfortunately, everyone else seems to be thinking the same. You are caught in the stampede of bodies, and shoved roughly into the wall as they surge past [Trampled][-1hp] Still, you manage to stumble to the doorway just in time. You fling yourself inside and seal the door behind—you only to find you are not the only person in this room…\n\nTo your surprise, there is an Intergalactic Alliance officer standing before you, holding a torch in one hand and a firearm in the other. A crew of them had boarded the ship only the day before, but you hadn’t seen any until now. He offers you help with your injuries... but should you accept it?`},
                                ]
                            }
                            // console.log(participants[memberId])
                            if (!!participants[memberId] || participants[memberId] == 0){
                                
                                console.log("Exists -- "+member.displayName)
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
                                            payload += `\n\n*You feel a bit sick* [Poisoned][1-hp]`
                                        }

                                        payload += `\n\n\n\n*Tune in again in the next three days for the next update!*\`\`\``
                                    }
                                    else if(currentState.rollResult == "lowest"){
                                        status = "DEAD"

                                        payload = `\`\`\`md\n**A SPACE ODDITY UPDATE**\n\n# EVENT: `+roundFormatted+` \n# HP: `+currentState.health+`/25\n# STATUS: `+status+`\n\n--------\n\nUPDATE: \n`

                                        payload += `The echoes of the corridor reveal your own scream. The corridor’s emergency beacon reveals a disfigured man, lumped over… approaching you. Bones extrude from the man’s arms, blackened and claw-like. The beacon flashes – every flash shows the figure closer and close than before. You hear several doors in the corridor close in succession… Just as you think you have enough time to turn and run, your legs are swept and you fall forward. As you try to bring yourself up, razor sharp claws embed themselves into your back and push you straight back down. The pressure intensifies and you feel your breath leaving you. The claws violently tear from your back. Your vision turns red. As you lie mangled on the floor, your last sight is that of a figure walking over you, further down into the blackness of the corridor… You try to scream for help, but nothing comes out… [Instant death][-25hp]\n\n\n\n*Game over! Better luck next time!*\`\`\``
                                    }

                                })
                                
                                // Send payload
                                member.send(payload)
                                message.reply("Round "+round+" Update sent successfully to "+member.displayName)
                            } else {
                                console.log("FAILED -- "+member.displayName)
                                message.reply("Round "+round+" Update failed for "+member.displayName)
                            }
                        })

                        message.reply("Deploy complete!")

                        break

                }
                console.log(message.author.username)
            }
            
        })

        client.login(config.token);
})