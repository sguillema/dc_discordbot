const express = require('express')
const app = express()

const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json')

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
    let games = new Array;
    let doomcounter = 0
    let messagesNuked = 1185;

    client.on('ready', () => {
        console.log('I am ready!');

        games.push(
            "Nothing",
            "Coldsteel the Hedgeheg",
            "with itself",
            "Chess",
            "Meme simulator 2017",
            "Pictionary",
            "Etch 'n' Sketch"
            );

        let changeActivity = () => {client.user.setActivity(games[Math.floor(Math.random()*games.length)])};
        setTimeout(changeActivity, 6000);
        setInterval(changeActivity, 300000);

        //Sets avatar
        // client.user.setAvatar('./avatar2.jpg');
        //Post welcome message
        // function postWelcome(){
        //     const welcomeChanneliD = "251329560619122690"
        //     const welcomeChannel = client.channels.get(welcomeChanneliD)
        //     const welcomeMessage = `:heavy_minus_sign: :heavy_minus_sign: 

        //     :pencil2: :white_circle: :regional_indicator_w: :regional_indicator_e: :regional_indicator_l: :regional_indicator_c: :regional_indicator_o: :regional_indicator_m: :regional_indicator_e: :pencil2: :white_circle: 


        //     \`\`\`Markdown

        //     Hey Drawers and Circlers!

        //     We hope you enjoy using the server, before you start participating in chat with others, please have a look at our rules and guidelines below!

        //     Happy chatting!

        //     - DC Executive Team


        //     Rules
        //     ======================
        //     [1]: Any form of harassment or offensive behaviour will not be tolerated.
        //     [2]: No explicit artwork unless otherwise approved by @execs and @moderators.
        //     [3]: No excessive spam of visuals and words.

        //     Community Guidelines
        //     ======================
        //     [1]: Be nice.
        //     [2]: Respect each other's opinions, art and each other.
        //     [3]: Be constructive in feedback (people have feelings too).
        //     [4]: If possible, keep your messages relevant to the corresponding text channel.


        //     *Want to know more? Visit us at https://www.facebook.com/groups/utsdrawingcircle/*

        //     \`\`\`

        //     :heavy_minus_sign: :heavy_minus_sign:`
            
        //     welcomeChannel.sendMessage(welcomeMessage)
        // }
        // //postWelcome()
        // //Post Announcement
        // function postAnnouncement() {
        //     const announcementChanneliD = "251704059587723264"
        //     const announcementChannel = client.channels.get(announcementChanneliD)
        //     const announcementMessage = `:rotating_light:**BZZZT**:rotating_light: \`\`\`404 ERROR! Life Drawing not found!\`\`\`
        //     \`Sorry\` @everyone! \`Life Drawing has been postponed this week to the:\` **7th September, Thursday**.
        //     \`DC's charming bot apologises for any inconvenience and hopes you have a great week!\`

        //     :robot: \`(this is me btw)\``
        //     announcementChannel.sendMessage(announcementMessage)
        // }
        // postAnnouncement()
        });

        /******************
         * Commands        
         ******************/
        client.on('message', message => {
            // 251342596494983168 spaceoddity
            // 424773922672738310 spaceoddity channnel
            // 251696919661903873 robot
            // 427773522194989056 secret
            // 420395515704770560 Akira's ID
            // 427768066974416896 test channel ID
            var spaceoddityMembers = "427407748410376192"
            var spaceoddityChannel = "424773922672738310"
            var secretMembers = "427773522194989056"

            var idMarcella = '235688549343559680'
            var idSebastian = '157392505032146945'
            var idAnita = '271286662993149954'

            var id = message.author.id
            var content = message.content.toLowerCase()

            switch(content) {
                case 'i love you dc bot':
                    message.reply('I love you too')
                    message.react('💖')
                    break

                case 'marcella is the best':
                    message.reply('I know right??')
                    break

                case 'sebastian is the best':
                    message.reply('I know right??')
                    break
            }

            if(id == idMarcella || id == idSebastian){
                switch (content) {

                    case 'hi bot':
                        message.reply('Hello to you too!')
                        message.react('👋')
                        break
                    
                    // case 'i love you dc bot':
                    //     message.reply('I love you too')
                    //     message.react('💖')
                    //     break

                    case '!help space-oddity':
                        message.author.send('Space Oddity, whachu wanna know?')
                        break

                    case '!gimme roles':
                        console.log(message.guild.roles)
                        message.reply("Check the server console")
                        break

                    case '!gimme space oddity members':
                        var reply = []
                        message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{
                            reply.push(member.displayName)
                        })
                        message.reply(reply.toString())
                        break

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

                    case '!gimme secret members':
                        var reply = []
                        message.guild.roles.get(secretMembers).members.forEach((member)=>{
                            reply.push(member.displayName)
                        })
                        message.reply(reply.toString())
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

                    case 'thanks':
                        message.reply('No worries')
                        break

                    case '!bot post channel intro':
                        client.channels.get(spaceoddityChannel).send(
                            `@Space Oddity\n\`The year is 2128, a year of great technological excitement and upheaval in the middle of the Greatest Space Age known to man. Continued environmental decline has forced humanity to embark on brave crusades off-world in search for greener pastures… including yourself. \n\nHumankind’s reach now expands across Solar Systems and has made contact with other civilisations, forming the Intergalactic Alliance. Armed with pencils, artefacts thought to channel a mystical force, we mark our new place in the galaxy. \n\nWhat awaits you in this world?\``
                        )
                        message.react('👌')
                        message.reply('Message posted to channel!')
                        break

                    case '!bot send intro message to members':
                        var payload = `*DC Space Oddity* \n\`\`\`md\nYou have a new message in your inbox!\n--------\n \n[Subject:][Welcome aboard!] \n[From:][The Captain] \n\nA good morning and welcome to all passengers aboard this flight. We have just confirmed a successful lift-off and hope you all enjoy the journey ahead. Should you have any inquiries along the way, please feel free to contact any of the staff onboard and we will help the best we can. \n\nI would also like to use this opportunity to inform you of a few things to be aware of on this journey. Firstly, you will find a supply of all emergency equipment in your rooms, including spare oxygen tanks, rations, and firearms. Please note that while they are there for your safety, they should only be used in an emergency. \n\nSecondly, this ship is carrying several containers of atmospheric gas sampled from the previous planet that may be harmful to the human species. While it is safely contained for the moment, it is well-advised to stay away from the Lower Deck of the ship. \n\nAnd thirdly, we are expecting a delegation of Intergalactic Alliance officials to arrive shortly before we land. Please do not be alarmed as we are just going through protocol procedures before landing in foreign territory.\n\nThank you again for joining us on this journey, and we wish you a safe flight.\n\nThe Captain\`\`\``
                        message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{
                            member.send(payload)
                        })
                        message.guild.roles.get(secretMembers).members.forEach((member)=>{
                            member.send(payload)
                        })
                        message.react('👌')
                        message.reply('Message sent to members!')
                        break
                        
                    case '!bot so-test':
                        console.log("Deploying '!SpaceOddity rnd0'")

                        var payload = `\`\`\`md\n**A SPACE ODDITY BEGINS...**\n\n# EVENT: 01 \n# HP: 25/25\n# STATUS: ALIVE\n\n--------\n\nUPDATE: \nIt is Day 23. Life aboard an Intergalactic ship is strange, but not terribly unfamiliar. The same meals are always served at the same times. You see the same people at the same places. You’ve made a few friends here and there, and even had a chat with the Captain every now and then. Life’s been nice... but you can’t wait to get off this ship. Somehow, something doesn’t feel quite right...\n\nYou are in the middle of eating lunch in the ship’s cafeteria when the floor begins to shake. No, not just the floor — the whole ship is trembling with alarming force. As one, you all look out the nearest bay window to see a massive asteroid hurtling straight for the wing of the ship! You barely have the time to throw yourselves to the floor before the rock collides...\n\n*Tune in again in the next three days for the next update!*\`\`\``

                        message.guild.roles.get(secretMembers).members.forEach((member)=>{
                            member.send(payload)
                        })
                        message.react('👌')
                        message.reply('Message sent to secret members!')
                        break

                    // case '!bot so-r1':
                    //     console.log("Deploying '!bot so-r1'")

                    //     var payload = `\`\`\`md\n**A SPACE ODDITY BEGINS...**\n\n# EVENT: 01 \n# HP: 25/25\n# STATUS: ALIVE\n\n--------\n\nUPDATE: \nIt is Day 23. Life aboard an Intergalactic ship is strange, but not terribly unfamiliar. The same meals are always served at the same times. You see the same people at the same places. You’ve made a few friends here and there, and even had a chat with the Captain every now and then. Life’s been nice... but you can’t wait to get off this ship. Somehow, something doesn’t feel quite right...\n\nYou are in the middle of eating lunch in the ship’s cafeteria when the floor begins to shake. No, not just the floor — the whole ship is trembling with alarming force. As one, you all look out the nearest bay window to see a massive asteroid hurtling straight for the wing of the ship! You barely have the time to throw yourselves to the floor before the rock collides...\n\n*Tune in again in the next three days for the next update!*\`\`\``

                    //     message.guild.roles.get(spaceoddityMembers).members.forEach((member)=>{
                    //         member.send(payload)
                    //     })
                    //     message.guild.roles.get(secretMembers).members.forEach((member)=>{
                    //         member.send(payload)
                    //     })
                    //     message.react('👌')
                    //     message.reply('Message sent to secret & spaceoddity members!')
                    //     break
                        
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

                }
                console.log(message.author.username)
            }
            
        })

        client.login(config.token);
})