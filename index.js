import DiscordJS, { Channel, Intents, MessageEmbed } from 'discord.js'
import express from 'express'
import bodyparser from 'body-parser'

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
})

const TOKEN = OTU1MjU5ODM4NzM5Mzk0NjUw.YjfFDQ.vQeHCpZ1AVKXJSJuHcN7mWUZuPY

client.login(TOKEN)

const app = express()
var port = 3000

app.use(bodyparser.json())


client.on('ready', () => {
    console.log('The bot is ready')
})

app.post('/post-endpoint', (request, response) => {
    const embed = {
        color: 0x99AAB5,
        title: request.body.title,
        author: {
            name: request.body.plrname,
            url: 'https://www.roblox.com/users/' + request.body.plrid + '/profile',
        },
        fields: [
            {
                name: request.body.question1,
                value: request.body.answer1,
                inline: true,
            },
            {
                name: request.body.question2,
                value: request.body.answer2,
                inline: true,
            },
        ],
        timestamp: new Date(),
    };
    
    response.send("Gotten POST request");
    client.channels.cache.get(request.body.channel).send({ embeds: [embed] }).then((msg) => {
        msg.react('✅');
        msg.react('⛔');
        let collector = msg.createReactionCollector();

        collector.on('collect', (reaction, user) => {
            if (user.username !== "SCPF || Application Bot") {
                if (reaction.emoji.name === '✅') {
                    msg.reactions.removeAll()
                    msg.edit("**Application accepted by " + "<@" + user.id + ">**");
                } else if (reaction.emoji.name === '⛔') {
                    msg.reactions.removeAll()
                    msg.edit("**Application denied by " + "<@" + user.id + ">**");
                };
            }
          });
    });
})

app.listen(port, function(){
    console.log(`started server at http://localhost:${port}`)
})
