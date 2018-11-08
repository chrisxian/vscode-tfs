import * as fs from 'fs'

import * as vscode from 'vscode'

export default {
  /**
   * Check if a file exists.
   */
  fileExists: (filePath: string): boolean => {
    try {
      return fs.lstatSync(filePath).isFile()
    }
    catch (exception) {
      return false
    }
  },

  /**
   * Get the current opened file path.
   */
  getCurrentFilePath: (): string => {
    if (vscode.window.activeTextEditor === undefined) return ''
    const currentFilePath = vscode.window.activeTextEditor.document.uri.toString()
    if (currentFilePath.substr(0, 8) !== 'file:///') return ''

    // Remove the protocol part of the uri ("file:///")
    return decodeURIComponent(currentFilePath).substr(8)
  },

  /**
   * Get the current workspace path.
   */
  getCurrentWorkspacePath: (): string =>
    vscode.workspace.workspaceFolders !== undefined
      ? vscode.workspace.workspaceFolders[0].uri.fsPath
      : ''
}
