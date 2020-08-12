const Discord = require('discord.js'); 
const client = new Discord.Client();
  
client.on('ready', () => {   
  console.log(`Logged in as ${client.user.tag}!`); 
});  

const axios = require('axios');

const countries = require("./countries.json");
const url = 'https://api.covid19api.com/total/country/';
const WAKE_COMMAND = '!cases';

client.on('message', async (msg) => {


    if(msg.author.bot) return;
    
    
    
    let precautions = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setThumbnail('https://image.shutterstock.com/image-vector/stop-covid19-sign-symbol-vector-260nw-1666725613.jpg')
    .setAuthor('stay home stay safe')
    .setTitle('Precautions to take')
    .addFields
    (
    { name: 'Wash your hands regularly', value: 'Wash Your hands atleast 25 to 30 times so that you can keep the covid away' },
    { name: 'wear a mask', value: 'with a mask we can reduce the spread of covid. use a N-95 mask (Preferably) which does 95% of removal'},
    { name: 'Have a sanitizer all the time and use it properly', value:'Do as i say and you will survive this pandemic'}
    )
    .setURL('https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public')
    .setFooter('regards: covid bot');



    let prescriction = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setThumbnail('https://image.shutterstock.com/image-vector/stop-covid19-sign-symbol-vector-260nw-1666725613.jpg')
    .setAuthor('Be cool,Do home quarantine')
    .setDescription(' :arrow_right: if the patient has fever take DOLO 650 3 times a day 2 days = 6 tablets,'+
    '\n :arrow_right: if patient has cold use CETRIZINE - 1 tab after breakfast '+
    '\n :arrow_right: if patient has cough and throat pain use AZITHRAL - 1 tab after breakfast'+ 
    '\n :arrow_right: if patient has diarrhoea use SPORLAC - 2 tab a day 1 in the moring 1 at night'+ 
    '\n :arrow_right: take Vitamin C - 500mg daily 2'+
    '\n :arrow_right: take Vitamin D - 1 tablet once a week '+
    '\n :arrow_right: take Multi Vitamin -Zinc - 2 tab a day 1 in the moring 1 at night'+
    '\n :arrow_right: Take steam twice a day and add "Evion 400mg" or add pinch of turmeric and vicks.... etc'+
    '\n :arrow_right: Do Breathing exercises regularly'+
    '\n :arrow_right: Drink Plenty of warm water '+
    '\n :arrow_right: If your feeling uneasy, better to consult a Doctor'+
    '\n :arrow_right: Get well soon,' )
    .setFooter('Please,consult a Doctor before following the above recommendations')





    let help = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setThumbnail('https://image.shutterstock.com/image-vector/stop-covid19-sign-symbol-vector-260nw-1666725613.jpg')
    .setTitle('Help')
    .setDescription('1. if you are cured from covid and want to help some other people to get through it then type !become a donor' + 
    '\n 2. if you or someone is in need of a donor then type !need donors' +
    '\n 3. if you want to check the number of cases in some country type !cases <Country> ex :- !cases south-america'+
    '\n 4.if you want to find the map then type !covid map'+
    '\n 5.you can read more news here - https://binged.it/30ITLXY'+
    '\n 6. for gov guidelines - https://bit.ly/2DLoJpx'+
    '\n I am adding many features')


    let covid_map = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Covid Map link')
    .setURL('https://bing.com/covid/local/india')

    if(msg.content.includes('hi')||msg.content.includes('hello')||msg.content.includes('Hi')||msg.content.includes('Hello')||msg.content.includes('Good')||msg.content.includes('good')){
      msg.channel.send('Hello, How may i assist you '+'\nHave you done a covid test. If yes then is it positive or negative')
    }



    if(msg.content.includes('negative')||msg.content.includes('-ve')){
      msg.channel.send('i am glad to hear that your fine. stay safe, use these precautions',precautions)
    }else if(msg.content.includes('positive')||msg.content.includes('+ve')){
      msg.channel.send('do you have other health issues like High BP, Low BP, kidney problem,diabetes, etc', prescriction)
    }

    if(msg.content.includes('!become donor')){
      msg.channel.send('https://forms.gle/HHPDZXW9perbaV6k8' +' fill this form if you are only cured from covid and want to  help others in need')
    }
    else if(msg.content.includes('!need donors')){
      msg.channel.send('https://forms.gle/griYMN2LKXpFDzry6' + ' fill this form if you or other person need plasma to help fight covid')
    }
    else if(msg.content.includes('!help')||msg.content.includes('!Help')||msg.content.includes('help')||msg.content.includes('Help')){
      msg.channel.send(help)
    }else if(msg.content.includes('!covid map')||msg.content.includes('!Covid map')){
      msg.channel.send(covid_map);
    }



  const content = msg.content.split(/[ ,]+/);

  if(content[0] === WAKE_COMMAND){
    if(content.length > 2){
      msg.reply("Too many arguments...")
    }
    else if(content.length === 1){
      msg.reply("Not enough arguments")
    }
    else if(!countries[content[1]]){
      msg.reply("Wrong country format")
    }
    else{
      const slug = content[1]
      const payload = await axios.get(`${url}${slug}`)
      const covidData = payload.data.pop();
      msg.reply(`Confirmed: ${covidData.Confirmed}, Deaths: ${covidData.Deaths}, Recovered: ${covidData.Recovered}, Active: ${covidData.Active} `)
    }
  }
})



client.login(process.env.token);