const Discord = require('discord.js');
const { measureMemory } = require('vm');
const { Server } = require('http');
const { settings } = require('cluster');
const { exists, Stats, stat } = require('fs');
const { error } = require('console');
const { removeListener, report } = require('process');
const client = new Discord.Client();

require('events').EventEmitter.defaultMaxListeners = 15;
const invitelink = 'https://discord.com/api/oauth2/authorize?client_id=708910787393224734&permissions=0&scope=bot'
var prefix = ":"
var server = undefined
client.setMaxListeners(0);
var servr = undefined
var rps = ["rock" , "paper" , "scissors" , "rock" , "paper" , "scissors" , "rock" , "paper" , "scissors"]
const permsArray = ["CREATE_INSTANT_INVITE", "MANAGE_CHANNELS", "MANAGE_WEBHOOKS", "READ_MESSAGE_HISTORY", "SEND MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "ADD_REACTIONS" ]
var flip = ["Pile", "Face"]

const array1 = ["Lose an arm", "Get a cat"]
const array2 = ["lose a leg", "Get a dog"]









client.on("ready", () => {
    console.log("ready to work")
    
    let guild = client.guilds.cache.get("734482258223693894")
    let channelf = guild.channels.cache.get("734487365455970365")
    channelf.bulkDelete(100)
    channelf.send(new Discord.MessageEmbed().setTitle("React to this message below to get verified or type :verify"))
    client.on("message", message => {
        if(message.author.bot && message.channel == channelf && message.author.id == "725004563534577824") {
            message.react("☑️")
            client.on("messageReactionAdd", async(reaction, user) => {
                if(!user.bot && reaction.emoji.name == "☑️" && reaction.message.channel.id == "734487365455970365") {
                    let member = reaction.message.guild.members.cache.get(user.id)
                    member.roles.add(reaction.message.guild.roles.cache.get("734504713302835251"))
                    member.roles.remove(reaction.message.guild.roles.cache.get("734504728251203614"))
                }
            })
        }
    })
})

client.on("message", message => {
    if(message.author.id == "462936081499684864" && message.content == ":setup") {
        let serverd = client.guilds.cache.get("734482258223693894")
        let channel = serverd.channels.cache.get("734487365455970365")
        channel.bulkDelete(100).catch(err => console.log("..."))
        channel.send(new Discord.MessageEmbed().setTitle("Please react to the message below to access the server or type :verify"))
        client.on("message", message => {
            if(message.author.bot && message.channel == channel) {
                message.react("☑️").catch(err => console.log("..."))
                let verM = message.id
                client.on("messageReactionAdd", async(reaction, user) => {
                    if(!user.bot && reaction.emoji.name == "☑️" && reaction.message.id == verM) {
                        let member = reaction.message.guild.members.cache.get(user.id)
                        member.roles.add(message.guild.roles.cache.get("734504713302835251")).catch(err => console.log("..."))
                        member.roles.remove(message.guild.roles.cache.get("734504728251203614")).catch(err => console.log("..."))
                    }
                })
            }
        })
    }
})

client.on("guildMemberAdd", member => {
    member.roles.add("734504728251203614")
    let chaine = member.guild.channels.cache.get("734483925270921286")
    if(chaine) {
        chaine.send(new Discord.MessageEmbed().setTitle("Member Joined\n\n Name: " + member.displayName + "\n Tag: " + member.user.discriminator).setColor("#03ff00").setImage(member.user.avatarURL({format: "jpg"})).setFooter("Member id: " + member.id)).catch(err => console.log("..."))
        return
    }
    
})

client.on("guildMemberRemove", member => {
    let chaine = member.guild.channels.cache.get("734483925270921286")
    if(chaine) {
        chaine.send(new Discord.MessageEmbed().setTitle("Member Left\n\n Name: " + member.displayName + "\n Tag: " + member.user.discriminator).setColor("#ff0000").setImage(member.user.avatarURL({format: "jpg"})).setFooter("Member id: " + member.id)).catch(err => console.log("..."))
        return
    }
    
})

//display server stats

client.on("message", message => {
    if(message.content == ":server stats") {
        message.guild.membecount = 0
        message.guild.channelcount = 0
        message.guild.botscount = 0
        message.guild.voicechannels = 0
        message.guild.rolescount = 0
        message.guild.modrole = 0
        message.guild.membermod = 0
        message.guild.members.cache.forEach(member => {
            if(!member.bot) {
                message.guild.membecount++
            }
        })
        message.guild.members.cache.forEach(member => {
            if(member.bot) {
                message.guild.botscount++
            }
        })
        message.guild.channels.cache.forEach(channel => {
            if(channel.type == "text") {
                message.guild.channelcount++
            }
        })
        message.guild.channels.cache.forEach(channel => {
            if(channel.type == "voice") {
                message.guild.voicechannels++
            }
        })
        message.guild.roles.cache.forEach(role => {
            if(role) {
                message.guild.rolescount++
            }
            if(role.permissions.has("ADMINISTRATOR")) {
                message.guild.modrole++
                
            }
        })
        message.channel.send(new Discord.MessageEmbed().setTitle("__**" + message.guild.name + "**__\n\n Members count: " + message.guild.membecount + "\n Text channels count: " + message.guild.channelcount + "\n Voice channels count: " + message.guild.voicechannels + "\n Roles count: " + message.guild.rolescount + "\n Moderator roles count: " + message.guild.modrole))
    }
})

//rock paper scissors with the bot

client.on("message", message=> {
    if(message.content.toLowerCase() == prefix + "rps" && !message.author.bot) {
        message.guild.player = message.member
        message.member.ongame = true
        message.guild.gamechannel = message.channel
        message.channel.send("what do you choose ?")
        
        client.on("message", message=> {
            let l = Math.random() * rps.length
            let choice = rps[Math.floor(l)]
            if(message.member == message.guild.player && message.channel == message.guild.gamechannel && message.member.ongame == true) {
                console.log("got here")
                if(message.content.toLowerCase() == "paper") {
                    if(choice == message.content.toLowerCase()) {
                        message.channel.send(new Discord.MessageEmbed().setTitle("**" + capitalise(choice) + "📝:** It's A Tie!"))
                    }
                    else if(choice == "rock") {
                        message.channel.send(new Discord.MessageEmbed().setTitle("**" + capitalise(choice) + "🛡️:** You won this round!"))
                    }
                    else {
                        message.channel.send(new Discord.MessageEmbed().setTitle("**" + capitalise(choice) + "✂️:** Haha I Won This Round"))
                    }
                    
                    
                    message.guild.player = undefined
                    message.member.ongame = undefined
                    message.guild.gamechannel = undefined
                    
                }
                else if(message.content.toLowerCase() == "rock") {
                    if(choice == message.content.toLowerCase()) {
                        message.channel.send(new Discord.MessageEmbed().setTitle("**" + choice + "🛡️:** It's A Tie!"))
                    }
                    else if(choice == "scissors") {
                        message.channel.send(new Discord.MessageEmbed().setTitle("**" + capitalise(choice) + "✂️:** You won this round!"))
                    }
                    else {
                        message.channel.send(new Discord.MessageEmbed().setTitle("**" + capitalise(choice) + "📝:** Haha I Won This Round"))
                    }
                    
                    
                    message.guild.player = undefined
                    message.member.ongame = undefined
                    message.guild.gamechannel = undefined
                    
                    
                }
                else if(message.content.toLowerCase() == "scissors") {
                    if(choice == message.content.toLowerCase()) {
                        message.channel.send(new Discord.MessageEmbed().setTitle("**" + capitalise(choice) + "✂️:** It's A Tie!"))
                    }
                    else if(choice == "paper") {
                        message.channel.send(new Discord.MessageEmbed().setTitle("**" + capitalise(choice) + "📝:** You won this round!"))
                    }
                    else {
                        message.channel.send(new Discord.MessageEmbed().setTitle("**" + capitalise(choice) + "🛡️:** Haha I Won This Round"))
                    }                   
                    message.guild.player = undefined
                    message.member.ongame = undefined
                    message.guild.gamechannel = undefined
                    
                    
                }
                
                
            }
        })
    }
})

//flip a coin command
client.on("message", message=> {
    if(message.content.toLowerCase() == prefix + "flip") {
        let h = Math.random() * 2        
        let coin = Math.floor(h)
        console.log(coin)
        message.channel.send(flip[coin])
    }

})


function capitalise(x) {    
    var o = x[0].toUpperCase()
    x = x.replace(x[0], o)
    return x
}

//verify command

client.on("message", message => {
    if(message.content.toLowerCase() == ":verify" && message.channel.id == "734487365455970365") {
        message.member.roles.remove(message.guild.roles.cache.get("734504728251203614")).catch(err => console.log(".."))
        message.member.roles.add(message.guild.roles.cache.get("734504713302835251")).catch(err => console.log(".."))        
    }
})

client.on("message", message => {
    if(!message.author.bot && message.channel.id == "734487365455970365") {
        message.delete().catch(err => console.log(".."))
    }
})




//giving roles at level
client.on("message", message => {
    if(message.content.startsWith("GG") && message.author.bot) {
        let x = message.content.substring(5 + message.member.id.length + 31)
        let xx = x.slice(0, x.indexOf("!"))
        if(xx == 10) {
            message.mentions.members.first().roles.add(message.guild.roles.cache.get("734755161204981870")).catch(err => console.log("..."))
            message.channel.send("You have been awarded the role " + message.guild.roles.cache.get("734784172631130132").name).catch(err => console.log("..."))
        }
        else if(xx == 20) {
            message.mentions.members.first().roles.add(message.guild.roles.cache.get("734951793632608369")).catch(err => console.log("..."))
        }
        else if(xx == 50) {
            message.mentions.members.first().roles.add(message.guild.roles.cache.get("734953552455401563")).catch(err => console.log("..."))
        }
    }    
})



client.on("message", message => {
    if(message.content.startsWith("https://discord.gg/")) {
        message.delete().catch(err => console.log("error preventing invite"))
    }
})

client.on("message", message => {
    if(message.content.startsWith(",,report")) {
        if(!message.guild.reports == true) {
            let reported = message.mentions.members.first()
        if(!reported) {
            message.channel.send("Tag the person you wanna report")
        }
        else {
            let reason = message.content.substring(12 + reported.id.length + 2) 
            if(!reason) {
                message.channel.send("No reason specified")
            }
            else {
                let Cguild = message.guild
                let Cchannel = message.channel
                let Sguild = client.guilds.cache.get("726870430807228446")
                let Schannel = Sguild.channels.cache.get("735069800614592542")
                Cguild.reports = true
                Schannel.bulkDelete(100)
                Schannel.send(new Discord.MessageEmbed().setTitle("User reported\n\n Reported user: " + reported.displayName + "\n\n Describtion: " + reason).setImage(reported.user.avatarURL({format: "jpg"})))
                client.on("message", message => {
                    if(message.author.id == "725004563534577824" && message.channel.id == "735069800614592542") {
                        message.react("☑️")
                        message.react("🚫")
                        message.react("⚠️")
                        client.on("messageReactionAdd", async(reaction, user)=> {
                            if(!user.bot && reaction.message.channel.id == "735069800614592542" && reaction.message.author.id == "725004563534577824") {
                                if(reaction.emoji.name == "☑️") {
                                    reaction.message.delete()
                                    let x = 0
                                    if(!x == 1) {
                                        Cchannel.send("Report closed with no action")
                                        x++
                                        Cguild.reports = false
                                        return
                                    }
                                    
                                }
                                else if(reaction.emoji.name == "🚫") {
                                    reported.kick()
                                    reaction.message.delete()
                                    let x = 0
                                    if(!x == 1) {
                                        Cchannel.send("The user reported has been kicked")
                                        x++
                                        Cguild.reports = false
                                        return
                                    }
                                    
                                    
                                }
                                else if(reaction.emoji.name == "⚠️") {
                                    reported.ban().catch(err => console.log("error") )
                                    reaction.message.delete().catch(err => console.log("error"))
                                    let x = 0
                                    if(!x == 1) {
                                        Cchannel.send("The user reported has been banned")
                                        x++
                                        Cguild.reports = false
                                        return
                                    }                                                                        
                                }
                            }
                        })
                    }
                })
            }            
            
        }
        }
        
    }
})







client.login(process.env.token)