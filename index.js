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

client.login(process.env.DISCORD_TOKEN);
