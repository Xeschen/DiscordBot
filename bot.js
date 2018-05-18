const Discord = require("discord.js");

const client = new Discord.Client();

const config = require("./auth.json");

client.on("ready", () => {
    console.log("I am ready!");
});

client.on("message", (message) => {
    if (message.content.substring(0,1) == '!') {
        var args = message.content.substring(1).split(' ');
        var cmd = args[0];
        
        switch(cmd){
            case '시작':
                message.channel.send("르니봇 가동 시작!");
                break;
                
            case 'roll':
                var req = args[1];
                
                if(req.split('d').length<2)
                    message.channel.send("잘못된 구문입니다.");
                else{
                    var diceNum = req.split('d')[0];
                    var diceSize = req.split('d')[1];
                    message.channel.send(diceNum+" 개의 "+diceSize+"면체 주사위");
                    var dices = 0;
                    var diceMessage = "";
                    for(var i=0; i<diceNum; i++){
                        var num = Math.floor(Math.random()*diceSize)+1;
                        dices += num;
                        diceMessage += (num + " + ");
                    }
                    message.channel.send(diceMessage+"= "+dices);                    
                }
                break;
                
            case '종료':
                message.channel.send("르니봇은 자러 가요!")
                    .then(client.destroy());
                break;
        }
    }
});

client.login(config.token);