import * as tfs from 'tfs'
import * as vscode from 'vscode'

export default function(itemspec: string[]): void {
  vscode.window.setStatusBarMessage('TFS: Adding...')

  // tslint:disable-next-line:no-any
  tfs('add', itemspec, null, (err: any) => {
    if (err) {
      vscode.window.setStatusBarMessage('')
      vscode.window.showErrorMessage(`TFS: ${err.error}`)

      return
    }

    const fileName = itemspec[0].substr(itemspec[0].lastIndexOf('/') + 1)
    vscode.window.setStatusBarMessage(`TFS: ${fileName} successfully added.`)
    vscode.window.showInformationMessage(`TFS: ${fileName} successfully added.`)
  })
}
