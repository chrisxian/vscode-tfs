import * as tfs from 'tfs'
import * as vscode from 'vscode'

/**
 * Get latest version of files for the entire workspace.
 */
export default function(itemspec: string[]): void {
  vscode.window.setStatusBarMessage('TFS: Getting latest version...')

  // tslint:disable-next-line:no-any
  tfs('get', itemspec, { recursive: true }, (err: any, res: any) => {
    if (err) {
      vscode.window.setStatusBarMessage('')
      vscode.window.showErrorMessage(`TFS: ${err.error}`)

      return
    }

    vscode.window.setStatusBarMessage(`TFS: Get Latest Version successful.`)

    if (!res.hasUpdated) {
      vscode.window.showInformationMessage(`TFS: ${res.message}`)

      return
    }

    vscode.window.showInformationMessage(`TFS: Workspace files updated to the latest version.`)
  })
}
