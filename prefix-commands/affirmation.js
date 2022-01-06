module.exports = {
  name: "affirmation",
  description: "Affirms people!",
  async execute() {},
};

/*
  // randomly dm everyone on a server
  const currentDate = new Date();
  var currMessage = currentDate.getTime();
  console.log(currMessage + " " + prevMessage);
  if (
    date.getDay() === 6 &&
    date.getHours() > 8 &&
    date.getHours() < 23 &&
    currMessage - prevMessage >= 10 //604800
  ) {
    console.log("we in bois");
    prevMessage = currentDate.getTime();
    message.guild.members.fetch().then((members) => {
      members.forEach((member) => {
        // prevent it from trying to send a message to itself
        if (member.id == process.env.BOT_OWNER) {
          member.send(
            "Hey! You're awesome! Thanks for being a part of the ACE community :)"
          );
        }
      });
    });
  }
*/
