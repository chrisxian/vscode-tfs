/* global decodeURIComponent */

import * as vscode from 'vscode'

export default {
  /**
   * Check if a file exists.
   */
  fileExists: function(filePath): boolean {
    try {
      return require('fs').lstatSync(filePath).isFile()
    }
    catch (exception) {
      return false
    }
  },

  /**
   * Get the current opened file path.
   */
  getCurrentFilePath: function(): string | false {
    if (!vscode.window.activeTextEditor) {
      return false
    }

    var currentFilePath = vscode.window.activeTextEditor.document.uri.toString()

    if (currentFilePath.substr(0, 8) !== 'file:///') {
      return false
    }

    currentFilePath = decodeURIComponent(currentFilePath).substr(8)

    return currentFilePath
  },

  /**
   * Get the current workspace path.
   */
  getCurrentWorkspacePath: function(): string {
    return vscode.workspace.rootPath
  }
}
