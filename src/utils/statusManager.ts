import * as fs from 'fs'
import * as vscode from 'vscode'

import utils from './common'

const vscodeTfsFilePath = `${vscode.workspace.workspaceFolders[0].uri}/.vscodetfs`

const statusManager = {
  exclude: (filePath: string): void => {
    // We create a .vscodetfs if it doesn't exist
    if (!utils.fileExists(vscodeTfsFilePath)) {
      fs.writeFileSync(vscodeTfsFilePath, JSON.stringify({ excludedFiles: [] }, null, 2), { encoding: 'utf8' })
    }

    const excludedFiles = statusManager.list()
    excludedFiles.push(filePath)
    statusManager.save(excludedFiles)
  },

  include(filePath: string): void {
    const excludedFiles = statusManager.list()
    excludedFiles.splice(excludedFiles.indexOf(filePath), 1)
    statusManager.save(excludedFiles)
  },

  list: (): string[] => {
    if (!utils.fileExists(vscodeTfsFilePath)) return []

    const content = JSON.parse(fs.readFileSync(vscodeTfsFilePath, 'utf8'))

    return content.excludedFiles !== undefined ? content.excludedFiles : []
  },

  save: (excludedFiles: string[]): void => {
    fs.writeFileSync(vscodeTfsFilePath, JSON.stringify({ excludedFiles }, null, 2), 'utf8')
  },
}

export default statusManager
