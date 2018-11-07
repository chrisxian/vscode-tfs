import * as tfs from 'tfs'
import * as vscode from 'vscode'

/**
 * Get latest version of files for the entire workspace.
 */
export default function(itemspec: string[]): void {
  vscode.window.setStatusBarMessage('TFS: Getting latest version...')

  var callback = function(responseError, response) {
    if (responseError) {
      vscode.window.setStatusBarMessage(null)
      vscode.window.showErrorMessage('TFS: ' + responseError.error)

      return
    }

    vscode.window.setStatusBarMessage('TFS: Get Latest Version successful.')

    if (!response.hasUpdated) {
      vscode.window.showInformationMessage('TFS: ' + response.message)

      return
    }

    vscode.window.showInformationMessage('TFS: Workspace files updated to the latest version.')
  }

  tfs('get', itemspec, {
    recursive: true
  }, callback)
}
