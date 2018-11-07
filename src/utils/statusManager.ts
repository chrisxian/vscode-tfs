import * as fs from 'fs'
import * as vscode from 'vscode'

import utils from './common'

var vscodeTfsFilePath = vscode.workspace.rootPath + '/.vscodetfs'

const StatusManager = {
  exclude: (filePath: string): void => {
    // We create a .vscodetfs if it doesn't exist
    var vscodeTfsFile = vscode.workspace.rootPath + '/.vscodetfs'
    if (!utils.fileExists(vscodeTfsFilePath)) {
      fs.writeFileSync(vscodeTfsFilePath, JSON.stringify({ excludedFiles: [] }, null, 2), { encoding: 'utf8' })
    }

    var excludedFiles = StatusManager.list()
    excludedFiles.push(filePath)
    StatusManager.save(excludedFiles)
  },

  include(filePath: string): void {
    var excludedFiles = StatusManager.list()
    excludedFiles.splice(excludedFiles.indexOf(filePath), 1)
    StatusManager.save(excludedFiles)
  },

  list: (): any[] => {
    if (!utils.fileExists(vscodeTfsFilePath)) {
      return []
    }

    var content = JSON.parse(fs.readFileSync(vscodeTfsFilePath, 'utf8'))

    return content.excludedFiles || []
  },

  save: (excludedFiles): void => {
    fs.writeFileSync(vscodeTfsFilePath, JSON.stringify({ excludedFiles }, null, 2), 'utf8')
  },
}

export default StatusManager
