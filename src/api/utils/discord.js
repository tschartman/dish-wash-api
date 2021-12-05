const Discord = require('discord.js');
const discord = new Discord.Client({intents: Discord.Intents.FLAGS.GUILDS});

module.exports = {

  login: function( callback ) {
    discord.login(process.env.BOT_TOKEN);
  },

  getDiscord: function() {
    return discord;
  }
};