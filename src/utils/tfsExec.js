var utils  = require('./common'),
    vscode = require('vscode');

/**
 * Execute a TFS command.
 * 
 * @version 0.5.0
 * 
 * @param {String}  command  TFS command to execute
 * @param {Boolean} isGlobal Is this command for the entire workspace ?
 */
var tfsExec = function(command, isGlobal) {
  isGlobal = !!isGlobal;
  
  if (!isGlobal && !utils.getCurrentFilePath()) {
    vscode.window.showErrorMessage('TFS: Either there is no current file opened or your current file has not been saved.');
    return;
  }
  
  var itemspec = isGlobal ? utils.getCurrentWorkspacePath() : utils.getCurrentFilePath();
  require('../tfs/' + command)([itemspec]);
}

module.exports = tfsExec;
