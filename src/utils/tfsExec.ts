import * as vscode from 'vscode'

import * as tfs from '../lib'
import utils from './common'

import { CommandName } from '../extension.d'

/**
 * Execute a TFS command.
 */
export default function(command: CommandName, isGlobal: boolean = false): void {
  if (!isGlobal && !utils.getCurrentFilePath()) {
    vscode.window.showErrorMessage(
      `TFS: Either there is no current file opened or your current file has not been saved.`)

    return
  }

  const itemspec = isGlobal ? utils.getCurrentWorkspacePath() : utils.getCurrentFilePath()

  tfs[command]([itemspec])
}
