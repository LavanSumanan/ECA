const {ButtonStyle} = require("discord-api-types/v8");
const crypto = require("crypto")
const assert = require("assert");
const EventEmitter = require("events");
// TODO: figure out imports???
const {SlashCommandBuilder, ActionRowBuilder, ButtonBuilder} = require("@discordjs/builders");
const {MessageActionRow, MessageButton, Message} = require("discord.js");
const {Base64} = require("js-base64")

// TODO: move to util file
class Signal extends EventEmitter {
    constructor() {
        super();
    }

    signal() {
        this.emit("signal")
    }

    waitForSignal(timeout = -1) {
        return new Promise((res, rej) => {
            let timeoutTimer = undefined;
            if (timeout !== -1) {
                timeoutTimer = setTimeout(() => {
                    rej("Timeout!")
                }, timeout)
            }

            this.once("signal", () => {
                if (timeoutTimer !== undefined)
                    clearTimeout(timeoutTimer)
                res()
            })
        })
    }
}

class StringPacketHandler {
    /**
     * Handles serialization and deserialization of packets in the form of strings.  Useful for discord ActionRow customIds.
     * Each StringPacketHandler object has an associated ID that it uses to tag its own packets.
     *
     * @param idSize Length of the ID (in bytes). The actual ID will be encoded in base64
     */
    constructor(idSize = 4) {
        this.id = crypto.randomBytes(idSize)
        // console.log(this.id)
        this.idB64 = Base64.encode(this.id.toString())
    }

    /**
     * Returns whether a given packet is associated with this handler
     * @param packet
     */
    isAssociated(packet) {
        return packet.startsWith(this.idB64 + ':')
    }

    /**
     * Serializes a packet
     * @param type A string denoting the type of the packet
     * @param args Any arguments to be supplied
     * @returns {string} The serialized packet
     */
    serialize(type, ...args) {
        return [this.id, type, ...args].map(x => Base64.encode(x.toString())).join(":")
    }


    /**
     * Deserializes a packet
     * @param packet A string packet.
     * @returns {object} An object with properties { type: string, args: string[] } containing the info of the packet
     */
    deserialize(packet) {
        if (!this.isAssociated(packet)) {
            throw new Error(`Packet ${packet} not associated with StringPacketHandler object`)
        }

        let [_, type, ...args] = packet.split(":").map(x => Base64.decode(x))
        return { type, args }
    }
}

// TODO: move to config
// TODO: check roles on startup
const MESSAGES = [
    {
        text: "Welcome to ACE! I'm ECA, the resident bot on this server, and I'm here to help you get started!\n" +
            "There are a couple of roles that you will want to get first so that you'll have access to the channels that you want and get notified when you need to be :smiley:\n\n" +
            "Lastly, if at any point you want/need to repeat this role selection process, you just need to type /introduction for this menu again.",
        roles: [ ]
    },
    {
        text: "First, what are your pronouns? (You may pick as many pronouns as you identify with)\n\n" +
            "If a button is:\n" +
            "* Gray: You do not have the role, clicking it will give you the role\n" +
            "* Blue: You have the role, clicking it will remove the role\n" +
            "When you're done, click 'Next' to go to the next page!",
        roles: [
            {
                label: "She/Her",
                name: "she/her"
            },
            {
                label: "They/Them",
                name: "they/them"
            },
            {
                label: "He/Him",
                name: "he/him"
            },
            {
                label: "Ask Me First!",
                name: "ask about my pronouns"
            }
        ]
    },
    {
        text: "Are you planning on attending ACE this term are just joining to check the club out?",
        roles: [
            {
                label: "I'm participating 😊",
                name: "ACE F22",
            },
            {
                label: "Just lurkin' 👀",
                name: "ACE",
            }
        ],
        verify: true // set this to true if the buttons are verification roles -- you can only add the role and adding it takes you to the next page
    },
    {
        text: "Will you be attending ACE in-person, online, or both? These roles give access to their respective channels " +
            "and also make it easier for execs and section leaders to notify you when needed :thumbsup:\n\n" +
            "_You may also skip this question if you aren't attending either._",
        roles: [
            {
                label: "In-Person",
                name: "In-Person ACE"
            },
            {
                label: "Online",
                name: "Online ACE"
            }
        ]
    },
    {
        text: "Next, what is your section? It's perfectly fine if you fall into multiple sections, or don't know yet!",
        roles: ["Soprano", "Alto", "Tenor", "Baritone", "Bass",
            {label: "Beatboxing", name: "Beatbox Bois"},
            {label: "I don't know my section", name: "To Be Determined"}
        ]
    },
    {
        text: "Are you interested in any of the following creative contributor roles? No worries if you don't have experience " +
            "and are just curious :cat_love:",
        roles: ["Arrangers", "Editors", "Mixers", "Choreo", "Video Editors"]
    },
    {
        text: "Are you interested in any of the following social activities?",
        roles: [
            {
                label: "Video Games",
                name: "Professional Gamer"
            },
            {
                label: "Board Games",
                name: "Board Gamer"
            }
        ]
    },
    {
        text: "Finally, if you would like to help with ECA, either as QA or directly contributing to the bot, " +
            "you may add this role for access to the bot channel :upside_down:",
        roles: [
            {
                label: "I want to help with the bot!",
                name: "potentially a robot -- investigate further (bot QA)"
            }
        ]
    }
]

const FINISH_MESSAGE = "You're done!\n\n" +
    "**P.S.:** If you also want a more comprehensive guide to ACE, click this link: " +
    "https://docs.google.com/document/d/1v7NUd1QDrWDGLXOU0k4eDKnZiCNv5ZQEOKMVBp86Ipw/edit#heading=h.9nufb2prdd34";

/**
 * Generates an array of ActionRow objects out of a list of components.  If there are more than 5 components, then they
 * get split into rows of at most 5
 *
 * @param components
 */
function createComponentArray(components) {
    assert(components.length <= 25, "Discord supports at most 25 components")

    let chunks = []
    for (let i = 0; i < components.length; i += 5) {
        chunks.push(components.slice(i, i + 5))
    }

    return chunks.map(row => {
        return new MessageActionRow()
            .addComponents(...row)
    })
}

/**
 * Returns an object that can be passed into interaction.reply, editReply, update, etc.
 *
 * @param handler Packet handler
 * @param interaction The interaction context
 * @param messageIndex Index of the message to render
 * @param initial Boolean: whether this is the initial message object.  if it is, then ephemeral: true will be added
 * to the return
 */
function renderMessage(handler, interaction, messageIndex, initial) {
    let {text, roles: roleNames} = MESSAGES[messageIndex]
    const roleObjects = roleNames.map(obj => {
        const name = obj.name || obj
        const label = obj.label || name
        const roleObject = interaction.guild.roles.cache.find(role => role.name === name)

        return {name, label, id: roleObject.id}
    })
    const memberRoles = interaction.member.roles.cache
    const verify = MESSAGES[messageIndex].verify || false

    // create buttons
    let buttons = roleObjects.map(role => {
        let btn = new MessageButton()
            .setCustomId(handler.serialize("add", role.id))
            .setLabel(role.label)
            .setStyle(ButtonStyle.Secondary)

        if (!verify && memberRoles.find(r => r.id === role.id)) { // if verify is false, to toggle the role
            btn = btn.setStyle(ButtonStyle.Primary)
                .setCustomId(handler.serialize("clear", role.id))
        }
        else if (verify) {
            btn = btn.setStyle(ButtonStyle.Success)
                .setCustomId(handler.serialize("verify", role.id))
        }

        return btn
    })
    if (!verify) {
        buttons.push(
            new MessageButton()
                .setCustomId(handler.serialize("next"))
                .setLabel(messageIndex < MESSAGES.length - 1 ? "Next" : "Finish")
                .setStyle(ButtonStyle.Success),
        )
    }

    // create component array
    let components = createComponentArray(buttons)

    let ret = {
        content: text,
        components
    }
    if (initial) {
        ret.ephemeral = true
    }
    return ret
}

module.exports = {
    level: "public",
    data: new SlashCommandBuilder()
        .setName("introduction")
        .setDescription("Introduce users to ACE! (And force them to get all the roles ofc ;) )"),
    async execute(interaction) {
        let messageIndex = 0
        let handler = new StringPacketHandler()

        const collector = interaction.channel.createMessageComponentCollector({
            filter: i => handler.isAssociated(i.customId),
            time: 5 * 60 * 1000  // 5 minutes
        })

        // Set up collectors
        collector.on("collect", async i => {
            // console.log('thing happened!', i.customId)

            const {type, args} = handler.deserialize(i.customId)

            // handle packet
            if (type === "add" || type === "verify") {
                await i.member.roles.add(args)
            }
            if (type === "next" || type === "verify") {
                messageIndex++
            }
            if (type === "clear") {
                await i.member.roles.remove(args)
            }

            // render next message or end
            if (messageIndex < MESSAGES.length) {
                await i.update(renderMessage(handler, i, messageIndex, false))
            } else {
                collector.stop("finish")
            }
        })

        collector.on("end", async (_, reason) => {
            if (reason === "finish") {
                await interaction.editReply({content: FINISH_MESSAGE, components: []})
            } else {
                await interaction.editReply({
                    content: "An error occurred with the introduction.  Maybe it timed out?",
                    components: []
                })
            }
        })

        // initial reply
        await interaction.reply(renderMessage(handler, interaction, messageIndex, true))
    },
};
