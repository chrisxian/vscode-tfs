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
];

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
]);

// We sort the commands array by their label property
fullCommands.sort(function (commandA, commandB) {
  return (commandA.label < commandB.label) ? -1 : 1;
});

/**
 * Show a selectable list of available commands.
 *
 * @version 0.5.0
 */
function tfsList() {
  var isGlobal = !utils.getCurrentFilePath(),
      commands = isGlobal ? globalCommands : fullCommands,
      promise = vscode.window.showQuickPick(commands);

  promise.then(function(command) {
    if (!command) {
      return;
    }

    tfsExec(command.name, command.isGlobal);
  });
}

/**
 * Extension activation
 *
 * @version 0.5.3
 */
exports.activate = function(context) {
  // We automatically checkout (for edit) files when they're modified
  vscode.workspace.onDidChangeTextDocument(function() {
    if (vscode.window.activeTextEditor.document.isDirty) {
      return;
    }

    if (utils.getCurrentFilePath()) {
      tfsExec('checkout');
    }
  });

  // We link disposable commands
  var disposables = [
    vscode.commands.registerCommand('vscode-tfs.get',    function() { tfsExec('get', true); }),
    vscode.commands.registerCommand('vscode-tfs.list',   tfsList)/*,
    vscode.commands.registerCommand('vscode-tfs.status', function() { tfsExec('status', true); })*/
  ];

  context.subscriptions.concat(disposables);
}

exports.deactivate = function() {};
