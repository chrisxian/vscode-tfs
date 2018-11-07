import * as tfs from 'tfs'
import * as vscode from 'vscode'

export default function(itemspec: string[]): void {
  vscode.window.setStatusBarMessage('TFS: Adding...')

  var callback = function(responseError, response) {
    if (responseError) {
      vscode.window.setStatusBarMessage('')
      vscode.window.showErrorMessage('TFS: ' + responseError.error)
      return
    }

    vscode.window.setStatusBarMessage('TFS: ' + itemspec[0].substr(itemspec[0].lastIndexOf('/') + 1) + ' successfully added.')
    vscode.window.showInformationMessage('TFS: ' + itemspec[0].substr(itemspec[0].lastIndexOf('/') + 1) + ' successfully added.')
  }

  tfs('add', itemspec, null, callback)
}
