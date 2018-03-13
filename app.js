const express = require('express')
const app = express()

const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json')

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
    let quotes = new Array;
    let games = new Array;
    let purposes = new Array;
    let doomcounter = 0
    let messagesNuked = 1185;

    client.on('ready', () => {
        console.log('I am ready!');
        quotes.push(
        "I'm trying to play guitar with my mouth; alalalallala!", 
        "You can feed five Yinings with that rice.", 
        "There's a big 'ol mark on my leg.",
        "No! I don't like it. My soul is being harassed.",
        "Just grab my brain and put it into a robot.",
        "They took *imitates pipe inhale* the drug.",
        "*rotates wrists* Look at my nakedness!",
        "Season greetings, I’m Yining. I just wanted to draw a bird and whale living together in harmony while smoking a cigar.",
        "I WILL BE NEXT RONALD MCDONALD BITCHES, SUCK MY McCHICKEN WOOOO!",
        "I THINK A PIGEON JUST BODY SLAMMED INTO MY SHOE WTF!",
        "UHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH my butt is dead.",
        "I WILL BE THE BUTTT WHISPERE![sic]"
        );
        games.push(
            "Nothing",
            "Coldsteel the Hedgeheg",
            "with itself",
            "Chess",
            "Meme simulator 2017",
            "Pictionary",
            "Etch 'n' Sketch"
            );
        purposes.push(
            "To remind Sebastian that he **actually** spent time making a bot to return Yining quotes.",
            "To be a good robot and give you Yining quotes. lol.",
            "To pass butter...?"
        )
        console.log(quotes);
        let changeActivity = () => {client.user.setActivity(games[Math.floor(Math.random()*games.length)])};
        setTimeout(changeActivity, 6000);
        setInterval(changeActivity, 300000);
        //Sets avatar
        client.user.setAvatar('./avatar.jpg');
        //Post welcome message
        function postWelcome(){
            const welcomeChanneliD = "251329560619122690"
            const welcomeChannel = client.channels.get(welcomeChanneliD)
            const welcomeMessage = `:heavy_minus_sign: :heavy_minus_sign: 

            :pencil2: :white_circle: :regional_indicator_w: :regional_indicator_e: :regional_indicator_l: :regional_indicator_c: :regional_indicator_o: :regional_indicator_m: :regional_indicator_e: :pencil2: :white_circle: 


            \`\`\`Markdown

            Hey Drawers and Circlers!

            We hope you enjoy using the server, before you start participating in chat with others, please have a look at our rules and guidelines below!

            Happy chatting!

            - DC Executive Team


            Rules
            ======================
            [1]: Any form of harassment or offensive behaviour will not be tolerated.
            [2]: No explicit artwork unless otherwise approved by @execs and @moderators.
            [3]: No excessive spam of visuals and words.

            Community Guidelines
            ======================
            [1]: Be nice.
            [2]: Respect each other's opinions, art and each other.
            [3]: Be constructive in feedback (people have feelings too).
            [4]: If possible, keep your messages relevant to the corresponding text channel.


            *Want to know more? Visit us at https://www.facebook.com/groups/utsdrawingcircle/*

            \`\`\`

            :heavy_minus_sign: :heavy_minus_sign:`
            
            welcomeChannel.sendMessage(welcomeMessage)
        }
        //postWelcome()
        //Post Announcement
        function postAnnouncement() {
            const announcementChanneliD = "251704059587723264"
            const announcementChannel = client.channels.get(announcementChanneliD)
            const announcementMessage = `:rotating_light:**BZZZT**:rotating_light: \`\`\`404 ERROR! Life Drawing not found!\`\`\`
            \`Sorry\` @everyone! \`Life Drawing has been postponed this week to the:\` **7th September, Thursday**.
            \`DC's charming bot apologises for any inconvenience and hopes you have a great week!\`

            :robot: \`(this is me btw)\``
            announcementChannel.sendMessage(announcementMessage)
        }
        // postAnnouncement()
        });


        //Listeners
        // client.on('messageDelete', message => {
        //     doomcounter++
        //     console.log(doomcounter);
        // })

        //Bot commands
        // client.on('message', message => {
            
        //     // // The YOLO command
        //     // if (message.content.includes('!nuke')) {
        //     //     let channelId = message.channel.id;
        //     //     //console.log(channelId)
        //     //     message.channel.sendMessage("KABOOOOOOOOOOOM");
        //     //     let target = client.channels.get(channelId);
        //     //     target.fetchMessages({limit: 100})
        //     //         .then(message=>message.deleteAll())
        //     // }

        //     //The quotes
        //     if (message.content.includes('!quote')) {  
        //         let quote = quotes[Math.floor(Math.random()*quotes.length)];
        //         message.channel.sendMessage("```\"..."+quote+"\""+" - Yining Xia (c. 4000BC)```");
        //     }

        //     if (message.content.includes('!newestQuote')) {
        //         let quote = quotes[(quotes.length - 1)];
        //         message.channel.sendMessage("```\"..."+quote+"\""+" - Yining Xia (c. 4000BC)```");
        //     }

        //     //Help
        //     if (message.content === '!help') {
        //         message.author.sendMessage("Hi! For details regarding current and/or upcoming events, feel free to ask an Executive in the discord server or check out our Facebook page @ https://www.facebook.com/groups/utsdrawingcircle !")
        //     }

        //     //Lenny Face
        //     // if (message.content.includes("!lenny")) {
        //     //     message.reply("( ͡° ͜ʖ ͡°)");
        //     // }

        //     //Show Avatar
        //     // if (message.content.includes("!avatar")) {
        //     //     message.reply("Here's your avatar " + message.author.avatarURL);
        //     // }

        //     //Bonus: Purpose
        //     // if (message.content.toLowerCase() == 'what is your purpose dc bot?'){
        //     //     message.reply("To remind Sebastian that he **actually** spent time making a bot to return Yining quotes.");
        //     // }
        //     if (message.content.toLowerCase() == 'what is your purpose dc bot?'){
        //         let purpose = purposes[Math.floor(Math.random()*purposes.length)];
        //         message.reply(purpose);
        //     }

        //     //Rules

        // });

        client.login(config.token);
})