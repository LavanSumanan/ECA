const { makeAppreciateEmbed } = require("./appreciate-embed");
const { makeHelpFeedbackEmbed } = require("./help-feedback-embed");

const aceIconURL =
  "https://static.wixstatic.com/media/c564dd_738bdb48aa28415e985be672213f298c~mv2.png/v1/fill/w_254,h_402,al_c,q_85,usm_0.66_1.00_0.01/c564dd_738bdb48aa28415e985be672213f298c~mv2.webp";
const lebenIconURL =
  "https://cdn.discordapp.com/avatars/280871651065856001/297978618172a5aea8110ac43f8e89ee.png?size=4096";

function embedHandler(type, options) {
  let cleanedOptions;
  const color = options.color || "#00db80";
  const title = options.title || ""; // length 0 arguments should not be constructed in embed
  const url = options.url || "";
  const author = options.author || {
    name: "ECA",
    iconURL: aceIconURL,
    url: "https://www.uwacc.com/ace",
  };
  const description = options.description || "";
  const thumbnail = options.thumbnail || "";
  const fields = options.fields || "";
  const image = options.image || "";
  const footer =
    options.footer || "For help using ECA, type /help or contact #Leben3185";

  cleanedOptions = {
    color,
    title,
    url,
    author,
    description,
    thumbnail,
    fields,
    image,
    footer,
  };

  cleanedOptions = { ...options, ...cleanedOptions };

  switch (type) {
    case "appreciate":
      return makeAppreciateEmbed(cleanedOptions);
    case "help-feedback":
      return makeHelpFeedbackEmbed(cleanedOptions);
    default:
      return makeGenericEmbed(cleanedOptions);
  }
}

module.exports = {
  embedHandler: embedHandler,
};