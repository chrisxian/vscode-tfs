var tfs     = require('tfs'),
    vscode  = require('vscode');

/**
 * Checkout current file for edit.
 * 
 * @module  TFS Checkout
 * @version 0.5.0
 * 
 * @param {Array} itemspec File(s) and folder(s) to checkout.
 */
var checkout = function(itemspec) {
  var callback = function(responseError, response) {
    if (responseError) {
      return;
    }
    
    vscode.window.setStatusBarMessage('TFS: ' + itemspec[0].substr(itemspec[0].lastIndexOf('/') + 1) + ' has been automatically checked out for editing.');
  };
  
  tfs('checkout', itemspec, null, callback);
};

module.exports = checkout;
