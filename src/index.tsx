import { Context, Schema } from 'koishi'
import {} from '@satorijs/element'

export const name = 'loop-execute-cmd'

export interface Config {
  maxTime: number
  sleepTime: number
}

export const Config: Schema<Config> = Schema.object({
  maxTime: Schema.number().default(10).description('最大执行次数').min(5).max(25),
  sleepTime: Schema.number().default(100).description('每次执行间隔时间/ms'),
})

export function apply(ctx: Context, cfg: Config) {
  const logger = ctx.logger('loop-execute-cmd')
  ctx.command('for <time: number> <cmd: text>', '循环执行命令，若为小数则向下取整')
    .alias('loop')
    .example('for 5 echo hello 输出5次 hello')
    .action(async ({ session }, time, cmd) => {
      const timeNum = Number(time)

      if (isNaN(timeNum) || timeNum <= 0) {
        await session.send('执行次数必须是大于0的数字！')
        return
      }

      const regex1 = /for*/
      const regex2 = /loop*/
      if (regex1.test(cmd) || regex2.test(cmd)) {
        await session.send('命令中不能包含for或loop关键字！')
        return
      }

      if (timeNum > cfg.maxTime) {
        await session.send(`执行次数不能大于${cfg.maxTime}！`)
        return
      }

      const t = Math.floor(timeNum)
      const s = cfg.sleepTime
      for (let i = 0; i < t; i++) {
        try {
          await session.send(<execute>{cmd}</execute>)
          await ctx.sleep(s)
        }catch (e) {
          logger.error(e)
        }
      }
    })
}
