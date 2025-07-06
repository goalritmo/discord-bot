const { welcomeChannelName } = require("../config/config.js");

module.exports = async (client, member) => {
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === welcomeChannelName
  );
  if (!channel) return;

  channel.send(
    `¡Hola ${member}, soy Baymax! 🤖 Estoy aquí para asistirte. ¡Bienvenido/a al servidor! 🎉`
  );
};
