import * as tfs from 'tfs'
import * as vscode from 'vscode'

export default function(itemspec: string[]): void {
  var promise = vscode.window.showInputBox({
    value: 'Comment...'
  })

  promise.then(function(checkinComment) {
    vscode.window.setStatusBarMessage('TFS: Checking In...')

    if (!checkinComment) {
      vscode.window.showWarningMessage('TFS: Your must enter a Check In comment.')
      return
    }

    var callback = function(responseError, response) {
      if (responseError) {
        vscode.window.setStatusBarMessage('')
        vscode.window.showErrorMessage('TFS: ' + responseError.error)

        return
      }

      vscode.window.setStatusBarMessage('TFS: ' + itemspec[0].substr(itemspec[0].lastIndexOf('/') + 1) + ' successfully checked in.')
      vscode.window.showInformationMessage(response.message)
    }

    tfs('checkin', itemspec, { comment: checkinComment }, callback)
  })
}
