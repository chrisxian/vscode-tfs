export type CommandName = 'add' | 'checkin' | 'checkout' | 'get' | 'status' | 'undo'

export interface Command {
  name: CommandName
  label: string
  detail: string
  isGlobal: boolean
}
