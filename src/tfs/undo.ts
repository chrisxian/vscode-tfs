var tfs     = require('tfs'),
    vscode  = require('vscode');

/**
 * Undo current file pending changes.
 * 
 * @module  TFS Undo
 * @version 0.5.0
 * 
 * @param {Array} itemspec File(s) and folder(s) to undo.
 */
var undo = function(itemspec) {
  vscode.window.setStatusBarMessage('TFS: Undoing...');
  
  var callback = function(responseError, response) {
    if (responseError) {
      vscode.window.setStatusBarMessage(null);
      vscode.window.showErrorMessage('TFS: ' + responseError.error);
      return;
    }
    
    vscode.window.setStatusBarMessage('TFS: Undo successful.');
    
    vscode.window.showInformationMessage('TFS: Pending changes undone.');
  }
    
  tfs('undo', itemspec, null, callback);
};

module.exports = undo;
