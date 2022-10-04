const Discord = require('discord.js');
const discordClient = new Discord.Client();

const { TOKEN } = require('./config.json');
const fs = require('fs');
const article = fs.readFileSync("README.md").toString();

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

	
	//테스트용
	// if(author.username === 'fact'){
	// 	console.log(content);
	// }
	

	if(content.substring(0,2) === prefix){
		const command = content.substring(2);
		
		if(command === 'hellothisisverification'){
			channel.send();
			return;
		}

		if(command === '도움말'){
			channel.send("\`\`\`"+article+"\`\`\`");
			return;
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
	const unified_emoji_ranges = ['\ud83c[\udf00-\udfff]','\ud83d[\udc00-\ude4f]','\ud83d[\ude80-\udeff]'];

	const reg = new RegExp(`^(${unified_emoji_ranges.join('|')})`, 'g');

	if(content.match(reg) || content.startsWith('<:')){ // 이모티콘
		return;
	}

	if(content.length === 1){ // 1글자
		return;
	}

    if(content.endsWith('?')){
		let tempReplies = replies;
		if(['되', '된', '될', '됨', '됩', '됫', '됬', '돼', '됀', '됄', '됌', '됍', '됐', '됐'].some((word)=>content.includes(word))){
			tempReplies = [...tempReplies, '안돼.', '안.돼.'];
		} 
        channel.send(randomMessage(tempReplies));
    }else{
        channel.send('다시 한 번 물어봐.');
    }
});

discordClient.on("error", () => { console.log("error"); });

discordClient.login(TOKEN);