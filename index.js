require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");
const fs = require("fs");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

// Cargar eventos automáticamente
const eventFiles = fs.readdirSync("./events");
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  const eventName = file.split(".")[0];
  client.on(eventName, (...args) => event(client, ...args));
}

const sendRoleMessage = require("./commands/sendRoleMessage");

client.once("ready", () => {
  console.log(`Baymax activo como ${client.user.tag}`);

  // ⚠️ Reemplazá con el ID del canal donde querés que se publique
  const canalID = "1390810221563220019";

  sendRoleMessage.execute(client, canalID);
});

client.login(process.env.DISCORD_TOKEN);
