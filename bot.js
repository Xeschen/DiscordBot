
const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./auth.json");

client.on("ready", () => {
    console.log("I am ready!");
});

var record = 0;
var anchorId = 0;
var msgAry;

function msgPrint(message, messages){
    msgAry = Array.from(messages.values());
    console.log(msgAry);
    var startTime = new Date(msgAry[messages.size-2]['createdTimestamp']);
    var endTime = new Date(msgAry[1]['createdTimestamp']);
    
    message.channel.send("시작 시각: " + startTime);
    for(var i=messages.size-2; i>0; i--){
        var nickname = msgAry[i]['member']['nickname'];
        var content = msgAry[i]['content'];
        if(msgAry[i]['author']['username'] == 'Runi_bot')
            nickname = 'Runi_bot';
        if(msgAry[i]['attachments'].size > 0){
            contents = Array.from(msgAry[i]['attachments']);
            var arr = [];
            for(var j=0; j<contents.length; j++){
                var filename = contents[j][1]['filename'];
                arr.push(filename);
            }
            content = arr.join(", ");
        }
        message.channel.send(nickname + " : " + content);
    }
    message.channel.send("종료 시각: " + endTime);
    
    for(var i=messages.size-2; i>0; i--){
        if(msgAry[i]['attachments'].size > 0){
            contents = Array.from(msgAry[i]['attachments']);
            for(var j=0; j<contents.length; j++){
                var filename = contents[j][1]['filename'];
                var fileurl = contents[j][1]['url'];
                message.channel.send("첨부파일: "+filename);
                message.channel.send({
                    files: [fileurl]
                })
            }
        }
    }
}

client.on("message", (message) => {
    if (message.content.substring(0,1) == '!') {
        var args = message.content.substring(1).split(' ');
        var cmd = args[0];
        
        switch(cmd){
            case '생존':
                message.channel.send("르니봇 가동중!");
                break;
                
                
            case 'roll':{
                var req = args.slice(1);
                req = req.join(' ');
//                console.log(req);
                var diceRegex = /([0-9]+)[d]([0-9]+)(([+|-])([0-9]+))?([\s]+[t][e][s][t][\s]+([0-9]+))?/g;
                if(diceRegex.test(req) == false)
                    message.channel.send("잘못된 구문입니다.");
                else{
                    var diceComp = req.split(diceRegex);
                    var diceNum = diceComp[1];
                    var diceSize = diceComp[2];
                    var diceAdd;
                    if(diceComp[3]){
                        if(diceComp[4] == '+')
                            diceAdd = parseInt(diceComp[5]);
                        else
                            diceAdd = 0 - parseInt(diceComp[5]);
                    }
                    else
                        diceAdd = 0;
                    var test;
                    if(diceComp[7])
                        test = diceComp[7];
//                    message.channel.send(diceComp);
                    
                    if(!test){
                        var dices = 0;
                        var diceMessage = "";
                        for(var i=0; i<diceNum-1; i++){
                            var num = Math.floor(Math.random()*diceSize)+1;
                            dices += num;
                            diceMessage += (num + " + ");
                        }
                        var num = Math.floor(Math.random()*diceSize)+1;
                        dices += num;
                        diceMessage += num;
                        if(diceAdd){
                            diceMessage += (" (" + diceComp[4] + " " + diceComp[5] +")");
                            dices += diceAdd;
                        }
                        message.channel.send(diceMessage+" = "+dices);
                    }
                    else{
                        var success = 0;
                        var diceMessage = "";
                        for(var i=0; i<diceNum-1; i++){
                            var num = Math.floor(Math.random()*diceSize)+1+diceAdd;
                            if(num >= test)
                                success += 1;
                            diceMessage += (num + ", ");
                        }
                        var num = Math.floor(Math.random()*diceSize)+1+diceAdd;
                        if(num >= test)
                            success += 1;
                        diceMessage += (num + " ==> " + success + "개 성공");
                        message.channel.send(diceMessage);
                    }
                }
                break;}

            case '녹화':
                if(record == 0){
                    record = 1;
                    message.channel.send("Opfert eure Herzen! 지금부터 녹화를 시작합니다.")
                    anchorId = message.id;
                    console.log(anchorId);
                }
                else{
                    message.channel.send("이미 녹화중입니다!");
                }
                break;
                
            case '마무리':
                var msgrcd;
                message.channel.fetchMessages({after: anchorId})
                    .then(messages => msgPrint(message, messages));
                
                anchorId = 0;
                record = 0;
                break;
                
            case '종료':
                message.channel.send("르니봇은 자러 가요!")
                    .then(client.destroy());
                break;
        }
    }
});

client.login(config.token);