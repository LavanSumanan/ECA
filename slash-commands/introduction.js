const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder } = require("@discordjs/builders");
const { ButtonStyle } = require("discord-api-types/v8");
const assert = require("assert");

// TODO: move to util file
class Signal extends EventEmitter {
  constructor() {
    super();
  }

  signal() {
    this.emit("signal")
  }

  waitForSignal(timeout=-1) {
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
    "text": "Welcome to ACE! Let me help you get started with some things",
    "roles": []
  },
  {
    "text": "What is your section?",
    "roles": ["Soprano", "Alto", "Tenor", "Bass"]
  }
]

module.exports = {
  level: "public",
  data: new SlashCommandBuilder()
    .setName("introduction")
    .setDescription("Introduce users to ACE! (And force them to get all the roles ofc ;) )")
    .setDefaultPermission(false),
  async execute(interaction) {
    let signal = new Signal()

    const collector = interaction.channel.createMessageComponentCollector({
      filter: i => i.startsWith(interaction.id.toString()),
      time: 15000
    })

    collector.on("collect", async i => {
      const { customId } = i
      const data = customId.split(":")[1].split(",")
      if (data.length > 1) {
        const [ rowIndex, index ] = data.map(parseInt)
        const roleNames = MESSAGES[rowIndex].roles
        const roles = roleNames.map(roleName => i.guild.roles.cache.find(role => role.name === roleName))

        for (const role of roles)
          await i.member.roles.remove(role)
        await i.member.roles.add(roles[index])
      }
      else {
        assert(data[0] === "next")
      }
    })

    collector.on("end", async i => {
      i.editReply("Introduction message timed out!")
    })

    for (let i = 0; i < MESSAGES.length; i++) {
      const { text, roles } = MESSAGES[i];
      let row
      if (roles.length === 0) {
        row = new ActionRowBuilder()
            .addComponents([new ButtonBuilder()
                .setCustomId(`${interaction.id}:next`)
                .setLabel("Next")
                .setStyle(ButtonStyle.Secondary)])
      }
      else {
        row = new ActionRowBuilder()
            .addComponents(roles.map((roleName, index) => {
              new ButtonBuilder()
                .setCustomId(`${interaction.id}:${i},${index}`)
                .setLabel(roleName)
                .setStyle(ButtonStyle.Primary)
            }))
      }

      if (i === 0)
        await interaction.reply({ content: text, ephemeral: true, components: row })
      else
        await interaction.editReply({ content: text, components: row })

      await signal.waitForSignal(30000)
    }

    collector.stop()
    await interaction.editReply("You're done!")
  },
};
