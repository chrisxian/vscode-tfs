/* global console */

import * as tfs from 'tfs'
import * as vscode from 'vscode'

/**
 * Get the list of pending changes for the entire workspace.
 */
export default function(itemspec: string[]): void {
  vscode.window.setStatusBarMessage('TFS: Listing pending changes...')

  var callback = function(responseError, response) {
    if (responseError) {
      vscode.window.setStatusBarMessage(null)
      vscode.window.showErrorMessage('TFS: ' + responseError.error)
      return
    }

    vscode.window.setStatusBarMessage('TFS: Pending changes successfully listed.')

    if (!response.hasPendingChanges) {
      vscode.window.showInformationMessage('TFS: ' + response.message)

      return
    }

    var changes = []

    if (response.status.includedChanges.length) {
      changes.push('Included changes :')
      response.status.includedChanges.forEach(function(change) {
        changes.push('› ' + change.fileName + ' [' + change.action + ']')
      })
    }

    if (response.status.detectedChanges.length) {
      changes.push('Detected changes :')
      response.status.detectedChanges.forEach(function(change) {
        changes.push('› ' + change.fileName + ' [' + change.action + ']')
      })
    }

    var promise = vscode.window.showQuickPick(changes)

    promise.then(function() {

    })
  }

  tfs('status', itemspec, {
    recursive: true
  }, callback)
}

/* global console */

/*var statusManager = require('../utils/statusManager'),
    tfs           = require('tfs'),
    vscode        = require('vscode')*/

/**
 * Get the list of pending changes for the entire workspace.
 *
 * @module  TFS Status
 * @version 0.5.3
 *
 * @param {Array} itemspec File(s) and folder(s) to get status of.
 */
/*var status = function(itemspec) {
  vscode.window.setStatusBarMessage('TFS: Listing pending changes...')

  var callback = function(responseError, response) {
    if (responseError) {
      vscode.window.setStatusBarMessage(null)
      vscode.window.showErrorMessage('TFS: ' + responseError.error)
      return
    }

    vscode.window.setStatusBarMessage('TFS: Pending changes successfully listed.')

    if (!response.hasPendingChanges) {
      vscode.window.showInformationMessage('TFS: ' + response.message)
      return
    }

    var changes            = [],
        excludedChanges    = [],
        excludedFilesPaths = statusManager.list()

    if (response.status.includedChanges.length) {
      response.status.includedChanges.forEach(function(change) {
        if (excludedFilesPaths.indexOf(change.filePath) !== -1) {
          excludedChanges.push(change)
          return
        }

        changes.push({
          label:       change.fileName,
          detail:      change.filePath,
          description: change.action.toUpperCase(),
          action:      'exclude'
        })
      })

      if (changes.length) {
        changes.unshift({
          label:       '◊ INCLUDED CHANGES',
          description: '⏎ or click to exclude a file from the next checkin.',
          detail:      '‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾'
        })
      }
    }

    if (response.status.detectedChanges.length) {
      if (changes.length) {
        changes.push('')
      }

      changes.push({
        label:       '◊ DETECTED CHANGES (= out of TFS)',
        description: '⏎ or click to make TFS take into account this change.',
        detail:      '‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾'
      })

      response.status.detectedChanges.forEach(function(change) {
        changes.push({
          label:       change.fileName,
          detail:      change.filePath,
          description: change.action.toUpperCase(),
          action:      change.action
        })
      })
    }

    if (excludedChanges.length) {
      if (changes.length) {
        changes.push('')
      }

      changes.push({
        label:       '◊ EXCLUDED CHANGES',
        description: '⏎ or click to include a file to the next checkin.',
        detail:      '‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾'
      })

      excludedChanges.forEach(function(change) {
        changes.push({
          label:       change.fileName,
          detail:      change.filePath,
          description: change.action.toUpperCase(),
          action:      'include'
        })
      })
    }

    var promise = vscode.window.showQuickPick(changes)

    promise.then(function(change) {
      if (!change || !change.action) {
        status(itemspec)
        return
      }

      switch (change.action) {
        case 'exclude':
          statusManager.exclude(change.detail)
          break

        case 'include':
          statusManager.include(change.detail)
          break
      }

      status(itemspec)
    })
  }

  tfs('status', itemspec, {
    recursive: true
  }, callback)
}

module.exports = status*/
