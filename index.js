const { Telegraf, Markup } = require('telegraf')
const { massage } = require('telegraf/filters')

const dotenv = require('dotenv').config()
const text = require('./const')

const bot = new Telegraf(process.env.TOKEN)

bot.start(ctx => ctx.reply(`Hello ${ctx.from.first_name}`))
bot.help(ctx => ctx.reply(text.commands))
bot.command('date', async ctx => {
    const date = new Date()
    try{
        await ctx.replyWithHTML(`<b>${date}</b>`)
    }catch(e){
        console.log(e);
    }
})
bot.command('rnd', async ctx => {
	try {
		await ctx.replyWithHTML(
			'<b>Try to guess number from 0 to 3</b>',
			Markup.inlineKeyboard([
				[
					Markup.button.callback('0', 'btn0'),
					Markup.button.callback('1', 'btn1'),
				],
				[
					Markup.button.callback('2', 'btn2'),
					Markup.button.callback('3', 'btn3'),
				],
			])
		)
	} catch (error) {
		console.log(error)
	}
})



async function random(ctx, number) {
	try {
		const rnd = Math.floor(Math.random() * 4)
		if (rnd !== number) {
			await ctx.answerCbQuery()
			await ctx.replyWithHTML(
				`<b>Incorrect number! Correct number is: ${rnd} Try again(</b>`
			)
		}
		if (rnd === number) {
			await ctx.answerCbQuery()
			await ctx.replyWithHTML(`<b>You win! number was: ${rnd}</b>`)
		}
	} catch (e) {
		console.log(e)
	}
}

bot.action('btn0', ctx => random(ctx, 0))
bot.action('btn1', ctx => random(ctx, 1))
bot.action('btn2', ctx => random(ctx, 2))
bot.action('btn3', ctx => random(ctx, 3))

bot.launch()
