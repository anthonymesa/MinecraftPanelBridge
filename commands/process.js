/*
 *  Author: Anthony Mesa
 *  Date: 14/12/2020
 * 
 */

 module.exports = {
	name: 'process',
	description: 'Processes new user, changing their nickname and giving them a role',
	args: false,
	execute(bot, msg, request_data, args) {
        msg.guild.members.fetch({ query: `${args[0]}`, limit: 1 })
            .then(function (response) {
                if(response.size){
                    console.log(response.user);
                } else {
                    msg.channel.send("User is not a Member of the server.");
                }
          });
	},
};
