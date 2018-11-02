/* global decodeURIComponent */

var vscode = require('vscode');

var common = {
  /**
   * Check if a file exists.
   *
   * @module  Common Utilities
   * @version 0.5.3
   *
   * @param  {String}  filePath    File path
   * @return {Boolean}             Return TRUE if file exists
   */
  fileExists: function(filePath) {
    try {
      if (require('fs').lstatSync(filePath).isFile()) {
        return true;
      }

      return false;
    }
    catch (exception) {
      return false;
    }
  },
  
  /**
   * Get the current opened file path.
   * 
   * @module  Common Utilities
   * @version 0.5.0
   * 
   * @return {String} File path
   */
  getCurrentFilePath: function() {
    if (!vscode.window.activeTextEditor) {
      return false;
    }
    
    var currentFilePath = vscode.window.activeTextEditor.document.uri.toString();

    if (currentFilePath.substr(0, 8) !== 'file:///') {
      return false;
    }
    
    currentFilePath = decodeURIComponent(currentFilePath).substr(8);
    
    return currentFilePath;
  },
  
  /**
   * Get the current workspace path.
   * 
   * @module  Common Utilities
   * @version 0.5.0
   * 
   * @return {String} Directory path
   */
  getCurrentWorkspacePath: function() {
    return vscode.workspace.rootPath;
  } 
};

module.exports = common;
