/*
 *  Author: Anthony Mesa
 *  Date: 14/12/2020
 * 
 */

 var fs = require('fs');
const path = require('path');

module.exports = {
	name: 'help',
    description: 'Extra info about commands to help debug issues.',
    args: true,
    
	execute(bot, msg, request_data, args) {
        var files = fs.readdirSync('./commands/');
        var commands_list = "";

        for (const file of files) {
            var command_name = file.substring(0, file.length - 3);
            commands_list += ("&" + command_name + "\n");
        }

        switch(`${args[0]}`) {
            case "list":
                msg.channel.send("Here are all commands we have so far... More are on the way!```" + commands_list + "```");
                break;
            case "change-prefix":
                msg.channel.send("The change-prefix command takes (1) argument, the character to be used as the new command prefix. e.g. ($, *, ^, !)");
                break;
            case "database":
                msg.channel.send("The database command takes (0) arguments. It does not work.")
                break;
            case "get-line":
                msg.channel.send("The get-line command takes (0) arguments. It returns the last command run on the server.")
                break;
            case "gm":
                msg.channel.send("The gm command takes (2) arguments, the mode for the target to become and the player target for that command. e.g.```&gm c DonchoCheese\n&gm a \"Soul Rabbit4433\"```")
                break;
            case "help":
                msg.channel.send("For maximum help, reach out to us on Github.").
                break;
            case "server-name":
                msg.channel.send("The server-name command takes (0) arguments. It returns the name of your Discord.")
                break;
            case "status":
                msg.channel.send("The status command takes (0) arguments. It returns whether the server is online or offline.")
                break;
            case "user-info":
                msg.channel.send("The user-info command takes (0) arguments. It returns the information of the user who runs this command.")
                break;
            case "whitelist-add":
                msg.channel.send("The whitelist-add command takes (1) argument, the username of the player to be whitelisted. A username that contains spaces must be surrounded in quotes. e.g. ```&whitelist-add \"Soul Rabbit4433\"```If that does not solve the issue, check your server logs for more info.");
                break;
            default:
                msg.channel.send("The help command requires a known command argument: e.g.```&help whitelist-add```To get a list of all commands available, run ```&help list```");
        }
	},
};