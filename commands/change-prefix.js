/*
 *  Author: Anthony Mesa
 *  Date: 14/12/2020
 * 
 */

 module.exports = {
	name: 'change-prefix',
    description: 'Sets command prefix to character supplied by user.',
    args: true,
    
	execute(bot, msg, request_data, args) {
        msg.channel.send(`Prefix set: ${args[0]}`);
	},
};