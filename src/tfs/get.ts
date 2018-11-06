var tfs     = require('tfs'),
    vscode  = require('vscode');

/**
 * Get latest version of files for the entire workspace.
 * 
 * @module  TFS Get
 * @version 0.5.0
 * 
 * @param {Array} itemspec File(s) and folder(s) to get latest version of.
 */
var get = function(itemspec) {
  vscode.window.setStatusBarMessage('TFS: Getting latest version...');
  
  var callback = function(responseError, response) {
    if (responseError) {
      vscode.window.setStatusBarMessage(null);
      vscode.window.showErrorMessage('TFS: ' + responseError.error);
      return;
    }
    
    vscode.window.setStatusBarMessage('TFS: Get Latest Version successful.');
      
    if (!response.hasUpdated) {
      vscode.window.showInformationMessage('TFS: ' + response.message);
      return;
    }
    
    vscode.window.showInformationMessage('TFS: Workspace files updated to the latest version.');
  };
    
  tfs('get', itemspec, {
    recursive: true
  }, callback);
};

module.exports = get;
