var fs       = require('fs'),
    utils    = require('../utils/common');
    vscode   = require('vscode');

var vscodeTfsFilePath = vscode.workspace.rootPath + '/.vscodetfs';

/**
 * @type {Object}
 */
var statusManager = {
  /**
   * @todo Comment this function
   * 
   * @module  Utilities StatusManager
   * @version 0.5.3
   * 
   * @param {String} filePath Workspace file path
   */
  exclude: function(filePath) {
    // We create a .vscodetfs if it doesn't exist
    var vscodeTfsFile = vscode.workspace.rootPath + '/.vscodetfs';
    if (!utils.fileExists(vscodeTfsFilePath)) {
      fs.writeFile(vscodeTfsFilePath, JSON.stringify({
        excludedFiles: []
      }, null, 2), 'utf8');
    }
    
    var excludedFiles = statusManager.list();
    excludedFiles.push(filePath);
    statusManager.save(excludedFiles);
  },
  
  /**
   * @todo Comment this function
   * 
   * @module  Utilities StatusManager
   * @version 0.5.3
   * 
   * @param {String} filePath Workspace file path
   */
  include: function(filePath) {
    var excludedFiles = statusManager.list();
    excludedFiles.splice(excludedFiles.indexOf(filePath), 1);
    statusManager.save(excludedFiles);
  },
  
  /**
   * @todo Comment this function
   * 
   * @module  Utilities StatusManager
   * @version 0.5.3
   * 
   * @returns {Array} List of workspace file paths
   */
  list: function() {
    if (!utils.fileExists(vscodeTfsFilePath)) {
      return [];
    };
    
    var content = JSON.parse(fs.readFileSync(vscodeTfsFilePath, 'utf8'));
    return content.excludedFiles || [];
  },
  
  /**
   * @todo Comment this function
   * 
   * @module  Utilities StatusManager
   * @version 0.5.3
   * 
   * @param {Array} List of workspace file paths
   */
  save: function(excludedFiles) {
    fs.writeFile(vscodeTfsFilePath, JSON.stringify({
      excludedFiles: excludedFiles
    }, null, 2), 'utf8');
  }
}

module.exports = statusManager;
