# TFS extension for Visual Studio Code

[![The MIT License](https://img.shields.io/badge/license-MIT-orange.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Visual Studio Marketplace](https://vsmarketplacebadge.apphb.com/installs-short/ivangabriele.vscode-tfs.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=ivangabriele.vscode-tfs)
[![Travis](https://img.shields.io/travis/ivangabriele/vscode-tfs.svg?style=flat-square)](https://travis-ci.org/ivangabriele/vscode-tfs)
[![David](https://img.shields.io/david/ivangabriele/vscode-tfs.svg?style=flat-square)](https://david-dm.org/ivangabriele/vscode-tfs?type=dev)
[![David](https://img.shields.io/david/dev/ivangabriele/vscode-tfs.svg?style=flat-square)](https://david-dm.org/ivangabriele/vscode-tfs?type=dev)

**Visual Studio Code Team Foundation Server integration**

---

## Important !

> **You MUST have a Visual Studio with Team Foundation Server features to be able to use this extension.**

## Installation

1. Open up VS Code
2. Type **`F1`**
3. Type `ext` in command palette.
4. Select `Extensions: Install Extension` and hit **`ENTER`**
5. Type `tfs`
6. Select **`TFS`** extension and hit **`ENTER`**

## Usage

Hit **`Alt + T`** to list available commands for the current edited file.

## Features

- **Automatic Checkout (for Edit)** when a file is modified.

### List of available commands

- **Add**
- **Checkin**
- **Get (entire workspace)**
- **Status (Pending Changes)**
- **Undo**

## Issues

Please report any issue or comment [here](https://github.com/ivangabriele/vscode-tfs/issues).

## Contribute

To be able to contribute to TFS development, you need to be at ease with **Typescript** and **Git**.

    git clone https://github.com/ivangabriele/vscode-tfs.git
    cd vscode-tfs
    npm install
    npm install grunt-cli -g

The last command create a `pre-commit` hook to ensure that you don't commit anything if tests fail.

## Roadmap

1. Customizable TF.exe path (in order to fix mutiple TFS versions issues)
2. File name in status bar message (when suitable)
3. **Exclude** workspace setting
4. **Checkin multiple files**

#### Links

- [TFS extension on Github](https://github.com/ivangabriele/vscode-tfs)
- [TFS extension on Visual Studio Market Place](https://marketplace.visualstudio.com/items/ivangabriele.vscode-tfs)
- [MIT Licence](https://github.com/ivangabriele/vscode-tfs/blob/master/LICENCE)
