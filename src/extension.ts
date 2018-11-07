import * as vscode from 'vscode'

import utils from './utils/common'
import tfsExec from './utils/tfsExec'

import { Command } from './extension.d'

const globalCommands: Command[] = [
  {
    name: 'get',
    label: 'Get',
    detail: 'Get the latest version of files for the entire workspace.',
    isGlobal: true
  },
  {
    name: 'status',
    label: 'Status',
    detail: 'Show pending changes for the entire workspace.',
    isGlobal: true
  }
]

const fullCommands: Command[] = globalCommands.concat([
  {
    name: 'add',
    label: 'Add',
    detail: 'Adds current file to TFS.',
    isGlobal: false
  },
  {
    name: 'checkin',
    label: 'CheckIn',
    detail: 'Adds current file to TFS.',
    isGlobal: false
  },
  {
    name: 'undo',
    label: 'Undo',
    detail: 'Undo current file pending changes.',
    isGlobal: false
  }
])

// We sort the commands array by their label property
fullCommands.sort((commandA: Command, commandB: Command) => (commandA.label < commandB.label) ? -1 : 1)

/**
 * Show a selectable list of available commands.
 */
function tfsList(): void {
  const isGlobal = utils.getCurrentFilePath().length === 0
  const commands = isGlobal ? globalCommands : fullCommands

  vscode.window.showQuickPick(commands)
    .then((command: Command) => tfsExec(command.name, command.isGlobal))
}

/**
 * Extension activation
 */
export function activate(context: vscode.ExtensionContext): void {
  // We automatically checkout (for edit) files when they're modified
  vscode.workspace.onDidChangeTextDocument(() => {
    if (vscode.window.activeTextEditor.document.isDirty) {
      return
    }

    if (utils.getCurrentFilePath()) {
      tfsExec('checkout')
    }
  })

  // We link disposable commands
  const disposables = [
    vscode.commands.registerCommand('vscode-tfs.get', () => tfsExec('get', true)),
    vscode.commands.registerCommand('vscode-tfs.list', tfsList)
  ]

  context.subscriptions.concat(disposables)
}

// tslint:disable-next-line:no-empty
export function deactivate(): void {}
