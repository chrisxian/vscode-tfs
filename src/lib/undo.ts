import * as tfs from 'tfs'
import * as vscode from 'vscode'

/**
 * Undo current file pending changes.
 */
export default function(itemspec: string[]): void {
  vscode.window.setStatusBarMessage('TFS: Undoing...')

  var callback = function(responseError, response) {
    if (responseError) {
      vscode.window.setStatusBarMessage(null)
      vscode.window.showErrorMessage('TFS: ' + responseError.error)

      return
    }

    vscode.window.setStatusBarMessage('TFS: Undo successful.')

    vscode.window.showInformationMessage('TFS: Pending changes undone.')
  }

  tfs('undo', itemspec, null, callback)
}
