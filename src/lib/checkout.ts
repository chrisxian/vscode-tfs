import * as tfs from 'tfs'
import * as vscode from 'vscode'

/**
 * Checkout current file for edit.
 */
export default function(itemspec: string[]): void {
  var callback = function(responseError): void {
    if (responseError) {
      return
    }

    vscode.window.setStatusBarMessage('TFS: ' + itemspec[0].substr(itemspec[0].lastIndexOf('/') + 1) + ' has been automatically checked out for editing.')
  }

  tfs('checkout', itemspec, null, callback)
}
