import * as tfs from 'tfs'
import * as vscode from 'vscode'

/**
 * Get the list of pending changes for the entire workspace.
 */
export default function(itemspec: string[]): void {
  vscode.window.setStatusBarMessage('TFS: Listing pending changes...')

  var callback = function(responseError, response) {
    if (responseError) {
      vscode.window.setStatusBarMessage(null)
      vscode.window.showErrorMessage('TFS: ' + responseError.error)
      return
    }

    vscode.window.setStatusBarMessage('TFS: Pending changes successfully listed.')

    if (!response.hasPendingChanges) {
      vscode.window.showInformationMessage('TFS: ' + response.message)

      return
    }

    var changes = []

    if (response.status.includedChanges.length) {
      changes.push('Included changes :')
      response.status.includedChanges.forEach(function(change) {
        changes.push('› ' + change.fileName + ' [' + change.action + ']')
      })
    }

    if (response.status.detectedChanges.length) {
      changes.push('Detected changes :')
      response.status.detectedChanges.forEach(function(change) {
        changes.push('› ' + change.fileName + ' [' + change.action + ']')
      })
    }

    var promise = vscode.window.showQuickPick(changes)

    promise.then(function() {

    })
  }

  tfs('status', itemspec, {
    recursive: true
  }, callback)
}
