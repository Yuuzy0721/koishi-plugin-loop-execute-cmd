import { Context, Schema } from 'koishi'
import {} from '@satorijs/element'

export const name = 'loop-execute-cmd'

export const dependency = ['@satorijs/element']

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export const usage = '## 这里看着好空，写点东西在这^^'

export function apply(ctx: Context) {
  ctx.command('for <time: number> <cmd: text>', '循环执行命令')
    .example('for 5 echo hello 输出5次 hello')
    .action(async ({ session }, time, cmd) => {
      const timeNum = Number(time)
      if (isNaN(timeNum) || timeNum <= 0) {
        await session.send('执行次数必须是大于0的数字！')
        return
      }
      const t = Math.floor(timeNum)
      for (let i = 0; i < t; i++) {
        await session.send(<execute>{cmd}</execute>)
      }
    })
}
