const Discord = require('discord.js');
const discordClient = new Discord.Client();
const { TOKEN } = require('./config.json');
const fs = require('fs');
const article = fs.readFileSync("README.txt").toString();

const replies = require('./replies.json');


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}
const randomMessage = function(msgList){
    return msgList[getRandomInt(0, msgList.length)];
}

discordClient.on('ready', () => {
  console.log(`Logged in as ${discordClient.user.tag}!`);
});

discordClient.on('message', msg => {
	const {content, channel, author} = msg;
	const currentChannel = channel.name;
	const prefix = '<>';

	/*
	//테스트용
	if(author.username === 'fact'){
		console.log(content);
	}
	*/

	if(content.substring(0,2) === prefix){
		const commands = content.substring(2);
		if(commands === 'hellothisisverification'){
			channel.send('fact#4858(353467095876501504)');
		}
		return;
	}

    if(!currentChannel.includes('소라고동') && !currentChannel.includes('소라고둥') || author.bot ){
        return;
    }
    if(content.includes('도움말')){
        channel.send("\`\`\`"+article+"\`\`\`");
        return;
    }
    if(content.endsWith('?')){
        channel.send(randomMessage(replies));
    }else{
        channel.send('다시 한 번 물어봐.');
    }
});

discordClient.on("error", () => { console.log("error"); });

discordClient.login(TOKEN);