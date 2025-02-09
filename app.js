import { Telegraf, Markup } from 'telegraf'

console.log('Hi')

//t.me/veryimpressedbot
const token = '8199334409:AAEHDox0co4WwTugQP6ZdYV5qltLOJr1k5Q'
const webAppUrl = 'APP REMOTE URL'

const bot = new Telegraf(token)

bot.on('text', async (ctx) => {
  console.log(ctx);
  let dots =['.','.','.'];
  let stopDots=false
  const msgWait = await ctx.telegram.sendMessage(ctx.message.chat.id, `${dots.join('')}`)
  //console.log(msgWait)
  setTimeout(async()=>{

    //ctx.telegram.deleteMessage(msgWait.chat.id,msgWait.message_id);
    //await ctx.telegram.sendMessage(ctx.message.chat.id, `Дублирую текст (с задержкой) (через sendMessage): ${ctx?.update?.message?.text}`)
    
    //console.log('msgWait.chat.id',msgWait.chat.id)
    let dots =[];
    stopDots=true
    console.log('Дублирую текст с задержкой',`stopDots=${stopDots}`)
    await ctx.telegram.editMessageText(msgWait.chat.id,msgWait.message_id,null,`Дублирую текст (с задержкой) (через editMessageText): ${ctx?.update?.message?.text}`)
    stopDots=true
    
    //await ctx.reply(`Дублирую текст (с задержкой) (через reply): ${ctx?.update?.message?.text}`)
  },2000)

  while (stopDots==false){
    console.log(dots,`stopDots=${stopDots}`)
    if(dots.length==3){dots=['.']}else{dots.push('.')}
    if(stopDots!=true){await showDots()}
  }

  async function showDots(){
    console.log('showDots',dots)
    let res=new Promise((resolve, reject) => {
      if(stopDots!=true){
    setTimeout(async()=>{
      if(stopDots!=true){resolve(await ctx.telegram.editMessageText(msgWait.chat.id,msgWait.message_id,null,`${dots.join('')}`))}else(resolve())
    },50)
  }
  });
    return res;
  }
  /*ctx.reply(
    `Дублирую текст (без задержки): ${ctx?.update?.message?.text}`, 
    
  )*/
})

bot.command('start', (ctx) => {
  ctx.reply(
    `О боже! Я тупой бот и я работаю!!!!${ctx.payload}`,
    /*Markup.inlineKeyboard([
      Markup.button.webApp(
        'Открыть мини-приложение',
        `${webAppUrl}?ref=${ctx.payload}` // Здесь в параметре ref передаем реферала в мини-приложение
      ),
    ])*/
  )
})

bot.command('say', (ctx) => {
    console.log(ctx)
    ctx.reply(
      `метод say ${ctx}`,
      /*Markup.inlineKeyboard([
        Markup.button.webApp(
          'Открыть мини-приложение',
          `${webAppUrl}?ref=${ctx.payload}` // Здесь в параметре ref передаем реферала в мини-приложение
        ),
      ])*/
    )
  })

bot.launch()