import * as tfs from 'tfs'
import * as vscode from 'vscode'

/**
 * Undo current file pending changes.
 */
export default function(itemspec: string[]): void {
  vscode.window.setStatusBarMessage(`TFS: Undoing...`)

  // tslint:disable-next-line:no-any
  tfs('undo', itemspec, null, (err: any) => {
    if (err) {
      vscode.window.setStatusBarMessage('')
      vscode.window.showErrorMessage(`TFS: ${err.error}`)

      return
    }

    vscode.window.setStatusBarMessage(`TFS: Undo successful.`)

    vscode.window.showInformationMessage(`TFS: Pending changes undone.`)
  })
}
