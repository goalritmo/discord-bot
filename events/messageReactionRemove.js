const emojiRoleMap = require("../config/roles.js");
const { monitoredMessageID } = require("../config/config.js");

module.exports = async (client, reaction, user) => {
  if (user.bot) return;

  if (reaction.message.partial) await reaction.message.fetch();

  if (reaction.message.id !== monitoredMessageID) return;

  const roleID = emojiRoleMap[reaction.emoji.name];
  if (!roleID) return;

  const guild = reaction.message.guild;
  const member = await guild.members.fetch(user.id).catch(() => null);
  if (!member) return;

  await member.roles.remove(roleID).catch(console.error);
};
