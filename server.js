
const express = require('express');
const app = express();
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
var data;
var correctnum;
const qdb = JSON.parse(fs.readFileSync('data/qdb.json', 'utf8'));
var countdown = false;
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

bot.on('message', (message) => {
  
  if (countdown==true) {
    console.log(correctnum)
    if(message.content.includes("1")) {
    if (correctnum==1) {
    message.channel.send("Correct!")
    }else {
        message.channel.send("Rong boi!")

    }
    } else if(message.content.includes("2")) {
    if (correctnum==2) {
    message.channel.send("Correct!")
    }else {
        message.channel.send("Rong boi!")

    }
    } else if(message.content.includes("3")) {
    if (correctnum==3) {
    message.channel.send("Correct!")
    }else {
        message.channel.send("Rong boi!")

    }
    }
  }
   if (message.content.startsWith(config.prefix)) {
        //slices args and command away from prefix
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        console.log(command);
        console.log(args)
     if (command == "quizme") {
       message.channel.send("Choosing a random question from the Database of thousands of questions.");
        function getRandomInt(min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min)) + min; 
        }
        var randomint = getRandomInt(1,1553);
         data = {
          type: 'question',
          ts: '2018-07-25T01:04:53.926Z',
          totalTimeMs: 10000,
          timeLeftMs: 10000,
          questionId: 49711,
          question:     qdb[randomint].question,
          category: 'Culture',
          answers: 
          [ { answerId: 151244, text:qdb[randomint].answers[0].text},
           { answerId: 151245, text: qdb[randomint].answers[1].text},
           { answerId: 151246, text:qdb[randomint].answers[2].text} ],
          questionNumber: qdb[randomint].question_num,
          questionCount: 12,
          askTime: '2018-07-25T01:04:53.926Z',
          c: 6,
          sent: '2018-07-25T01:04:54.004Z' 
        }
         var goodgoogle = `[${data.question}](${('https://google.com/search?q='+data.question+' inanchor:"'+data.answers[0].text+'"'+'OR'+' inanchor:"'+data.answers[1].text+'"'+'OR'+' inanchor:"'+data.answers[2].text+'"').replace(/ /g,"%20")})`
  var cleanbing = "[Bing]("+("https://bing.com/search?q="+data.question).replace(/ /g,"%20")+")"
  var googleinline1= "["+data.answers[0].text+"]("+("https://google.com/search?q="+data.question+' inanchor:"'+data.answers[0].text+'"').replace(/ /g,"%20")+")";
  var googleinline2= "["+data.answers[1].text+"]("+("https://google.com/search?q="+data.question+' inanchor:"'+data.answers[1].text+'"').replace(/ /g,"%20")+")";
  var googleinline3= "["+data.answers[2].text+"]("+("https://google.com/search?q="+data.question+' inanchor:"'+data.answers[2].text+'"').replace(/ /g,"%20")+")";
  var binginline1= "[Bing]("+("https://bing.com/search?q="+data.question+' inanchor:"'+data.answers[0].text+'"').replace(/ /g,"%20")+")";;
  var binginline2= "[Bing]("+("https://bing.com/search?q="+data.question+' inanchor:"'+data.answers[1].text+'"').replace(/ /g,"%20")+")";;
  var binginline3= "[Bing]("+("https://bing.com/search?q="+data.question+' inanchor:"'+data.answers[2].text+'"').replace(/ /g,"%20")+")";;
       countdown = true; 
       message.channel.send({embed: {
    color: 0xffae24,
    title: `HQ Trivia Question ${data.questionNumber}/${data.questionCount}`,
    description:`${goodgoogle} **|** ${cleanbing}`,
    fields: [{
      name:"Answer 1 Links:",
      value: `${googleinline1} **|** ${binginline1}`
    },
             {
               name:"Answer 2 Links:",
               value: `${googleinline2} **|** ${binginline2}`               },
             {
               name:"Answer 3 Links:",
               value: `${googleinline3} **|** ${binginline3}`               }
            ]
  }});
     setTimeout(close=>{
       countdown=false
          for (var i=0; i<=2;i++) {
          console.log(i+"_"+qdb[randomint].answers[i].correct)
          
          if (qdb[randomint].answers[i].correct == true){
            correctnum=i+1;
            message.channel.send("The correct answer was: " +qdb[randomint].answers[i].text);
          }
        }  
                       
                       
                       },10000)
     }
};
});
bot.login(config.token);
