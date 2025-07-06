module.exports = {
  name: "sendRoleMessage",
  execute: async (client, channelId) => {
    const channel = await client.channels.fetch(channelId);
    if (!channel) {
      console.error("Canal no encontrado");
      return;
    }

    const message = await channel.send(
      "**Reaccioná para obtener un rol:**\n\n" +
        "♟ = Rol Ajedrez\n" +
        "Ⓜ = Rol Análisis Matemático I"
    );

    try {
      await message.react("🔥");
      await message.react("💧");
    } catch (error) {
      console.error("Error al agregar reacciones:", error);
    }

    console.log("🆔 ID del mensaje:", message.id);
  },
};
