import tfs from 'tfs'
import * as vscode from 'vscode'

/**
 * Get the list of pending changes for the entire workspace.
 */
export default function(itemspec: string[]): void {
  vscode.window.setStatusBarMessage(`TFS: Listing pending changes...`)

  // tslint:disable-next-line:no-any
  tfs('status', itemspec, { recursive: true }, (err: any, res: any) => {
    if (err) {
      vscode.window.setStatusBarMessage('')
      vscode.window.showErrorMessage(`TFS: ${err.error}`)

      return
    }

    vscode.window.setStatusBarMessage(`TFS: Pending changes successfully listed.`)

    if (!res.hasPendingChanges) {
      vscode.window.showInformationMessage(`TFS: ${err.error}`)

      return
    }

    const changes: string[] = []

    if (res.status.includedChanges.length) {
      changes.push('Included changes :')
      res.status.includedChanges
        // tslint:disable-next-line:no-any
        .forEach((change: any) => changes.push(`› ${change.fileName} [${change.action}]`))
    }

    if (res.status.detectedChanges.length) {
      changes.push('Detected changes :')
      res.status.detectedChanges
        // tslint:disable-next-line:no-any
        .forEach((change: any) => changes.push(`› ${change.fileName} [${change.action}]`))
    }

    vscode.window.showQuickPick(changes)
  })
}
