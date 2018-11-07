import * as tfs from 'tfs'
import * as vscode from 'vscode'

export default function(itemspec: string[]): void {
  vscode.window.showInputBox({
    value: 'Comment...'
  })
    .then((checkinComment: string) => {
      vscode.window.setStatusBarMessage(`TFS: Checking In...`)

      if (!checkinComment) {
        vscode.window.showWarningMessage(`TFS: Your must enter a Check In comment.`)

        return
      }

      // tslint:disable-next-line:no-any
      tfs('checkin', itemspec, { comment: checkinComment }, (err: any, res: any) => {
        if (err) {
          vscode.window.setStatusBarMessage(``)
          vscode.window.showErrorMessage(`TFS: ${err.error}`)

          return
        }

        const fileName = itemspec[0].substr(itemspec[0].lastIndexOf('/') + 1)
        vscode.window.setStatusBarMessage(`TFS: ${fileName} successfully checked in.`)
        vscode.window.showInformationMessage(res.message)
      })
    })
}
