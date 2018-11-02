/* global console */

var tfs     = require('tfs'),
    vscode  = require('vscode');

/**
 * @todo Add a description
 * 
 * @module  TFS Add
 * @version 0.5.0
 * 
 * @param {Array} itemspec File(s) and folder(s) to add.
 */
var add = function(itemspec) {
  vscode.window.setStatusBarMessage('TFS: Adding...');
  
  var callback = function(responseError, response) {
    if (responseError) {
      vscode.window.setStatusBarMessage();
      vscode.window.showErrorMessage('TFS: ' + responseError.error);
      return;
    }
    
    vscode.window.setStatusBarMessage('TFS: ' + itemspec[0].substr(itemspec[0].lastIndexOf('/') + 1) + ' successfully added.');
      
    vscode.window.showInformationMessage('TFS: ' + itemspec[0].substr(itemspec[0].lastIndexOf('/') + 1) + ' successfully added.');
  };
    
  tfs('add', itemspec, null, callback);
}

module.exports = add;
