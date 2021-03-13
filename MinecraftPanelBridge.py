# MinecraftPanelBridge
# Author: Anthony Mesa
#================================

import discord
import json

# Get discord client
client = discord.Client()

# Get MinecraftPanelBridge sconfiguration data
with open('path') as config_file:
    config_data = json.load(config_file)

print(data)

# Define available commands
#================================

# Test command

@bot.command()
async def test(ctx):
    ctx.send('test')
    pass

bot.add_command(test)

#----------------------

# second test command

@bot.command()
async def test2(ctx):
    ctx.send('test2')
    pass

bot.add_command(test2)

# Define discord client events
#================================

@client.event
async def on_ready():
    print('Bot online: {0.user}'.format(client))

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if message.content.startswith('$hello'):
        await message.channel.send('Hello!')

# Run discord bot
#================================

client.run('NzMyNjcxMjAzMTUxNzA4MTgw.Xw3_Ow.BfTd-NAKmM-RlwkDM2SA2VrtZIg')
