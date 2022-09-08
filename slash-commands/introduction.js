const {ButtonStyle} = require("discord-api-types/v8");
const crypto = require("crypto")
const assert = require("assert");
const EventEmitter = require("events");
// TODO: figure out imports???
const {SlashCommandBuilder, ActionRowBuilder, ButtonBuilder} = require("@discordjs/builders");
const {MessageActionRow, MessageButton, Message} = require("discord.js");

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

// TODO: move to config
// TODO: check roles on startup
const MESSAGES = [
    {
        text: "Welcome to ACE! Let me help you get started!",
        roles: []
    },
    {
        text: "First, what is your section?",
        roles: ["Soprano", "Alto", "Tenor", "Baritone", "Bass", {
            label: "Beatboxing",
            name: "Beatbox Bois"
        }, {label: "I don't know my section", name: "To Be Determined"}]
    },
    {
        text: "What are your pronouns?",
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
        text: "CC placeholder text",
        roles: ["Arrangers", "Editors", "Mixers", "Choreo", "Video Editors"]
    },
    {
        text: "Social role placeholder text",
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
        text: "Hybrid aca placeholder text",
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
        text: "Bot",
        roles: [
            {
                label: "I want to help with the bot!",
                name: "potentially a robot -- investigate further (bot QA)"
            }
        ]
    }
]

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
 * Returns an object { content, components } that
 *
 * @param secret The customId property is used to relay button information, and they are prefixed with a secret value
 * so that the correct collector is called.
 * @param interaction The interaction context
 * @param messageIndex Index of the message to render
 * @param initial Boolean: whether this is the initial message object.  if it is, then ephemeral: true will be added
 * to the return
 */
function renderMessage(secret, interaction, messageIndex, initial) {
    let {text, roles: roleNames} = MESSAGES[messageIndex]
    const roleObjects = roleNames.map(obj => {
        const name = obj.name || obj
        const label = obj.label || name
        const roleObject = interaction.guild.roles.cache.find(role => role.name === name)

        return {name, label, id: roleObject.id}
    })
    const memberRoles = interaction.member.roles.cache

    // create buttons
    let buttons = roleObjects.map(role => {
        let btn = new MessageButton()
            .setCustomId(`${secret}:${role.id}`)
            .setLabel(role.label)
            .setStyle(ButtonStyle.Primary)

        if (memberRoles.find(r => r.id === role.id)) {
            btn = btn.setStyle(ButtonStyle.Danger)
                .setCustomId(`${secret}:clear,${role.id}`)
        }

        return btn
    })
    buttons.push(
        new MessageButton()
            .setCustomId(`${secret}:next`)
            .setLabel(messageIndex < MESSAGES.length - 1 ? "Next" : "Finish")
            .setStyle(ButtonStyle.Success),
    )
    // if (roleNames.length > 0) {
    //     buttons.push(new MessageButton()
    //         .setCustomId(`${secret}:clear,${roleObjects.map(role => role.id).join(",")}`)
    //         .setLabel("Clear Roles")
    //         .setStyle(ButtonStyle.Danger)
    //     )
    //     console.log(buttons[buttons.length - 1])
    // }

    // create component array
    let components = createComponentArray(buttons)

    // // update text with roles if needed
    // if (roles.length > 0) {
    //     text += '\n\nRoles:'
    // }

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
        .setDescription("Introduce users to ACE! (And force them to get all the roles ofc ;) )")
        .setDefaultMemberPermissions(0),
    async execute(interaction) {
        const secret = crypto.randomBytes(4).toString("hex")
        const collector = interaction.channel.createMessageComponentCollector({
            filter: i => i.customId.startsWith(secret),
            time: 5 * 60 * 1000  // 5 minutes
        })

        let messageIndex = 0

        // Set up collectors
        collector.on("collect", async i => {
            // console.log('thing happened!', i.customId)

            const {customId} = i
            const payload = customId.split(":")[1]

            if (!isNaN(parseInt(payload))) { // have a snowflake, add role
                await i.member.roles.add(payload)
            } else if (payload === "next") {
                messageIndex++
            } else { // clear
                const data = payload.split(",")
                assert(data.shift() === "clear")
                await i.member.roles.remove(data)
            }

            if (messageIndex < MESSAGES.length) {
                await i.update(renderMessage(secret, i, messageIndex, false))
            } else {
                collector.stop("finish")
            }
        })

        collector.on("end", async (_, reason) => {
            if (reason === "finish") {
                await interaction.editReply({content: "You're done!", components: []})
            } else {
                await interaction.editReply({
                    content: "An error occured with the introduction.  Maybe it timed out?",
                    components: []
                })
            }
        })

        // initial reply
        await interaction.reply(renderMessage(secret, interaction, messageIndex, true))
    },
};
