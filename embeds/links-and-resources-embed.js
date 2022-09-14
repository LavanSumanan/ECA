const { MessageEmbed } = require("discord.js");
const { ace } = require("../helpers/emojiConstants");

function makeLinksAndResourcesEmbeds() {
  let discordFriendsEmbed = new MessageEmbed();
  discordFriendsEmbed.setColor("#d2d26a");
  discordFriendsEmbed.setTitle("🥳 Discord Friends 🥳");
  discordFriendsEmbed.setDescription("Want more ACA? Join these servers!");
  discordFriendsEmbed.addField(
    "🌈 Waterloo A Cappella Club (UWACC) Discord",
    "https://discord.gg/JAgrDBCW9V"
  );
  discordFriendsEmbed.addField(
    "📜 UWACC Constitution",
    "https://docs.google.com/document/d/13xxjG7ktlbX-VS6ivFUALXCKDAE3xSj8gqP6z3SiI2U/edit"
  );
  discordFriendsEmbed.addField(
    "🇨🇦 Canada-wide A Cappella Discord",
    "https://discord.gg/awhMWhA6E8 (Ping schneids#7022 or DM if link is expired)"
  );
  discordFriendsEmbed.setFooter({
    text: "Ping or DM an exec if any link is expired!",
  });

  let aceResourcesEmbed = new MessageEmbed();
  aceResourcesEmbed.setColor("#61c9ca");
  aceResourcesEmbed.setTitle("❗ ACE Resources ❗");
  aceResourcesEmbed.setDescription("New to ACE? Check these out!");
  aceResourcesEmbed.addField(
    `${ace} New Member Guide`,
    "https://bit.ly/ACENewMemberGuide"
  );
  aceResourcesEmbed.addField(
    "⭐ ACE Spring 2022 Drive Folder",
    "https://www.tinyurl.com/aceMusicS22"
  );
  aceResourcesEmbed.addField(
    "📜 ACE Constitution",
    "https://docs.google.com/document/d/1WS-JciXUyZrRT-O-8MMsmFkzFNJg5Jt_zM32QiPrBm0/edit"
  );
  aceResourcesEmbed.addField(
    "🎵 SIB Download",
    "https://tinyurl.com/uwaccsibdownload"
  );
  aceResourcesEmbed.addField(
    "🎼 How to use Sib",
    "https://docs.google.com/document/d/1rAklgyv7GRIfIAZR0oSk9fnO6i6_xaGDYaRQs_Vf464/edit"
  );
  aceResourcesEmbed.addField("📆 ACE Calendar", "http://bit.ly/acecalendar");
  // aceResourcesEmbed.addField(
  //   "📽️ S22 BOT Slides",
  //   "https://bit.ly/S22ACEBOTSlides"
  // );
  // aceResourcesEmbed.addField(
  //   "⛑️ (Optional) COVID-19 Disclosure Form",
  //   "https://bit.ly/S22ACECovidDisclosure"
  // );
  aceResourcesEmbed.addField(
    "🎼 How to Read Sheet Music Video",
    "https://www.youtube.com/watch?v=MU3bNWWEGgA&ab_channel=ACE"
  );
  aceResourcesEmbed.addField(
    "🎙️ How to Record for Online ACE",
    "https://bit.ly/3NTZ8t7"
  );

  let socialEmbed = new MessageEmbed();
  socialEmbed.setColor("#65c063");
  socialEmbed.setTitle("📱 Socials 📱");
  socialEmbed.setDescription(
    "Like social media? Add your social media and then check out ours!"
  );
  // socialEmbed.addField(
  //   "📈 S22 Social Media Spreadsheet",
  //   "https://docs.google.com/spreadsheets/d/1tCDxhO5HMlj0Wd8LvGQUjzWrhs08qDXos_U1naRKJ9E/edit?usp=sharing"
  // );
  socialEmbed.addField("⏯️ YouTube", "https://www.youtube.com/c/UWACE");
  socialEmbed.addField("✨ Instagram", "https://www.instagram.com/uw_ace");
  socialEmbed.addField("💃 TikTok", "https://www.tiktok.com/@uw_ace");
  socialEmbed.addField("👤 Facebook", "https://www.facebook.com/uwaterlooace");
  socialEmbed.addField("🌐 Website", "http://www.uwacc.com/ace");

  let safetyResourcesEmbed = new MessageEmbed();
  safetyResourcesEmbed.setColor("#f0964d");
  safetyResourcesEmbed.setTitle("🦺 Safety Resources 🦺");
  safetyResourcesEmbed.setDescription(
    "Feel unsafe or have feedback? Check out these resources!"
  );
  safetyResourcesEmbed.addField(
    "🤫 Anonymous feedback",
    "Type /feedback in any channel of the server to give anonymous feedback through our discord bot"
  );
  safetyResourcesEmbed.addField(
    "💞 Ombudspeople",
    "We're currently looking for ombudspeople! So if you're interested in being an ombudsperson, let us know here: https://bit.ly/S22ACEOmbuds"
  );
  safetyResourcesEmbed.addField(
    "🏘️ Waterloo University and Community Resources doc",
    "https://docs.google.com/document/d/1EvJODav9CoHdxpbX-Bwe1Op2o82dKzihgKFWd0Rbc_k/edit?usp=sharing"
  );
  safetyResourcesEmbed.addField(
    "👷 UWACC Safety Team",
    `
  Reach out to them if you feel unsafe in ACE; expected response time is ~5 days
  - Tiffany Wang (tiffanywang#4878)
  - Sarah Cleghorn (Clegs#7263)
  - Elysia Wang (elysia#3990) (UWACC Chair)
  Safety Team Email: uwaccsafety@gmail.com
  `
  );

  let currentLinks = new MessageEmbed();
  currentLinks.setColor("#9480e6");
  currentLinks.setTitle(":bangbang: Current Topics :bangbang:");
  currentLinks.setDescription("Looking for something? It's probably here!");
  currentLinks.addField(
    "📆 ACE Calendar",
    "http://bit.ly/acecalendar"
  );
  currentLinks.addField(
    "⭐ ACE F22 Music Drive",
    "https://bit.ly/AceDriveFall22"
  );
  currentLinks.addField(
    "☎️ Call Sheet (In-Person)",
    "https://bit.ly/S22ACECallSheet"
  );
  currentLinks.addField(
    "🎙️ How to Record for Online ACE",
    "https://bit.ly/3NTZ8t7"
  );
  // currentLinks.addField(
  //   "📜🐿 History Recordings Submission Form",
  //   "https://forms.gle/2Xu92PPoFDXXq67W9"
  // );
  // currentLinks.addField(
  //   "📜🐿 History Solo Submission Form",
  //   "https://forms.gle/euTWHV6cwVEACb7W8"
  // );
  // currentLinks.addField(
  //   "🔥🎶 UWACC EOT CONCERT TICKETS",
  //   "https://tinyurl.com/uwacc-concert"
  // );
  // currentLinks.addField(
  //   "👩‍🦲🎮 Mii Recordings Submission Form",
  //   "https://forms.gle/oscRGif7xmM4Sqii7"
  // );
  currentLinks.addField(
      "📋 ACE Constitution",
      "https://bit.ly/ACEConstitution"
  );

  let embeds = [
    discordFriendsEmbed,
    aceResourcesEmbed,
    socialEmbed,
    safetyResourcesEmbed,
    currentLinks,
  ];

  return embeds;
}

module.exports = {
  makeLinksAndResourcesEmbeds: makeLinksAndResourcesEmbeds,
};
