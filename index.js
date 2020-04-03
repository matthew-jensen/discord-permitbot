require('dotenv').config();
require('http');
const axios = require('axios');


const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (msg.content === 'bing') {
    msg.reply('bong');

  } else if (msg.content.startsWith('!permit')) {
    const knowledgebank =process.env.KNOWLEDGEBANK;
    const author = msg.author;
    const i = msg.content.lastIndexOf('!permit');
    const search = msg.content.slice(i+1);
    console.log(i);
    console.log(search);
    axios.get(`${knowledgebank}api/lottery?search=${search}`)
        .then(response => {
            console.log(response)
            if(response.data.found === true) {
                msg.reply("Hey! This is what I found on the ${msg.content.slice(i+1)} permit:\n");
                msg.channel.send(`It starts in ${response.data.days_until_start}`);
                msg.channel.send(`It ends in ${response.data.days_until_end}`);
            } else {
                msg.reply(`Hey! I couldn't find any lottery related to ${msg.content.slice(i+1)}`);
                msg.channel.send(`Add it to my knowledgebank here: ${knowledgebank}`);

            }
        })
        .catch(err => {
            console.log(err);
        });
  }
});
