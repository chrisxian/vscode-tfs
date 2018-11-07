import * as vscode from 'vscode'

import utils from './common'

/**
 * Execute a TFS command.
 */
export default function(command: string, isGlobal: boolean = false): void {
  if (!isGlobal && !utils.getCurrentFilePath()) {
    vscode.window.showErrorMessage('TFS: Either there is no current file opened or your current file has not been saved.')

    return
  }

  var itemspec = isGlobal ? utils.getCurrentWorkspacePath() : utils.getCurrentFilePath()
  require('../tfs/' + command)([itemspec])
}
