import * as tfs from 'tfs'
import * as vscode from 'vscode'

/**
 * Checkout current file for edit.
 */
export default function(itemspec: string[]): void {
  // tslint:disable-next-line:no-any
  tfs('checkout', itemspec, null, (err: any) => {
    if (err) return

    const fileName = itemspec[0].substr(itemspec[0].lastIndexOf('/') + 1)
    vscode.window.setStatusBarMessage(`TFS: ${fileName} has been automatically checked out for editing.`)
  })
}
