/*
 *  Project: MinecraftPanelBridge
 *
 *  Author: Anthony Mesa
 *  Date: 14/12/2020
 * 
 */

// Get sensitive variables from file
const {
    global_prefix,
    discord_token,
    paypal_client_id,
    paypal_client_secret,
    database_user,
    database_password,
    database_host,
    database_port,
    database_db } = require('./res/config.json');

// non-api specific
const FileSystem = require('fs');
const trial_handler = require('./src/trial-handler');

// discord api
const Discord = require('discord.js');
const bot = new Discord.Client();

// postgres api
const {Client} = require('pg');
const pg_client = new Client({
    user: database_user,
    password: database_password,
    host: database_host,
    port: database_port,
    database: database_db
});

// get discord commands
bot.commands = new Discord.Collection();
const commandFiles = FileSystem.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	bot.commands.set(command.name, command);
}

bot.on('ready', () =>{
    console.log('BOT ONLINE');

    // check for recent payments
    // bot.setInterval(() => {
    //     trial_handler.updateTrials();
    // }, 5000);
})

bot.on('guildCreate', guild => {
})

function requestData(is_api_call){

    // this needs to be a database call

    if (is_api_call){
        return [ 'http://34.121.245.186/multicraft/api.php', 'admin', '3qf%ouTh$Fp$Eb' , '2'];
    } else {
        return [0];
    }
}

bot.on('message', msg => {
     // Ignore input if message doesnt start from global_prefix or originates from bot.
      if (!msg.content.startsWith(global_prefix) || msg.author.bot) return;

      const args = msg.content.slice(global_prefix.length).trim().split(/ +/);
      // Removes fist value from args (the command itsef) and assigns it to 'command_name' to leave only the args behind in the args array.
      const command_name = args.shift().toLowerCase();

      // if command doesnt exist, exit.
      if (!bot.commands.has(command_name)){
          return msg.channel.send('Command \'' + command_name + '\' does not exist...');
      };

      // get the command object
      const command = bot.commands.get(command_name);

      // if the command object's argument variable is true but no args are provided, return in error.
      if (command.args && !args.length){
          return msg.channel.send(`Necessary arguments missing after command \'${command_name}\', try again.`);
      }

      // run the executable command, and if the command error's out, write error.
      try{
          console.log('command processing');
          console.log(command);
          command.execute(bot, msg, requestData(command.multicraftApi), args);
      } catch (error) {
          console.error(error);
          msg.reply(`An unidentified error occured with command \'${command_name}\'. Please report this issue to our Github page at (url)`);
      }
})

bot.login(discord_token);
