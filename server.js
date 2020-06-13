const express = require("express");
const app = express();
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
var data;
var correctnum;
let botid = "the discord id of your bot"
let discordbottoken = "the discord bot token"
const qdb = JSON.parse(fs.readFileSync("data/qdb.json", "utf8"));
let countdown = false;
function runq(message) {
  message.channel.send("Choosing a random question from the database!");
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  var randomint = getRandomInt(1, 1553);
  data = {
    type: "question",
    ts: "2018-07-25T01:04:53.926Z",
    totalTimeMs: 10000,
    timeLeftMs: 10000,
    questionId: 49711,
    question: qdb[randomint].question,
    category: "Culture",
    answers: [
      { answerId: 151244, text: qdb[randomint].answers[0].text },
      { answerId: 151245, text: qdb[randomint].answers[1].text },
      { answerId: 151246, text: qdb[randomint].answers[2].text }
    ],
    questionNumber: qdb[randomint].question_num,
    questionCount: 12,
    askTime: "2018-07-25T01:04:53.926Z",
    c: 6,
    sent: "2018-07-25T01:04:54.004Z"
  };

  countdown = true;
  message.channel.send({
    embed: {
      color: 0xffae24,
      title: `Practice Question - Difficulty: ${data.questionNumber}/${data.questionCount}`,
      description: `${data.question}`,
      fields: [
        {
          name: "Answer 1:",
          value: `${data.answers[0].text}`
        },
        { name: "Answer 2:", value: `${data.answers[1].text}` },
        { name: "Answer 3:", value: `${data.answers[2].text}` }
      ]
    }
  });

  for (let i = 0; i <= 2; i++) {
    console.log(i + "_" + qdb[randomint].answers[i].correct);

    if (qdb[randomint].answers[i].correct == true) {
      correctnum = i + 1;
    }
  }
  setTimeout(close => {
    message.channel.send(
      "The correct answer was: " + qdb[randomint].answers[correctnum - 1].text
    );
    countdown = false;
  }, 10000);
}
bot.on("message", message => {
  //handle answers
  if (countdown == true && message.author.id != botid) {
    console.log("Correct Answer: " + correctnum);
    if (message.content.includes("1")) {
      if (correctnum == 1) {
        message.channel.send("You are Correct!");
      } else {
        message.channel.send("Too bad, so sad. You are wrong!");
      }
    } else if (message.content.includes("2")) {
      if (correctnum == 2) {
        message.channel.send("You are Correct!");
      } else {
        message.channel.send("Too bad, so sad. You are wrong!");
      }
    } else if (message.content.includes("3")) {
      if (correctnum == 3) {
        message.channel.send("You are Correct!");
      } else {
        message.channel.send("Too bad, so sad. You are wrong!");
      }
    }
  }
  if (message.content.startsWith("!")) {
    //slices args and command away from prefix
    const args = message.content
      .slice(1)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();
    console.log(command);
    console.log(args);
    if (command == "quizme") {
      runq(message)
    }
    if(command == "fullgame"){ 
      message.channel.send("Starting game in 20 seconds!")
      let i = 1
      let intie = setInterval(run=>{
        message.channel.send("Full Game Practice! Question "+i+" out of 12")
        runq(message)
        i++
        if(i>12){
          clearInterval(intie)
        }
      },20000)
    } 
  }
});
bot.login(discordbottoken);
