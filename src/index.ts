import { Context, Schema } from 'koishi'

export const name = 'loop-execute-cmd'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  // write your plugin here
}
