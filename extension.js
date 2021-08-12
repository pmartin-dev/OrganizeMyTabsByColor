const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {
  let coloredTabs = [];

  let disposable = vscode.window.onDidChangeActiveTextEditor((e) => {
    const currentPath = vscode.workspace.asRelativePath(e.document.fileName);

    if (coloredTabs.includes(currentPath)) {
      updateColor("#EB4034");
    } else {
      updateColor(false);
    }
  });

  let disposable2 = vscode.commands.registerCommand(
    "colorMyTab.addColor",
    () => {
      let currentlyOpenTabfilePath =
        vscode.window.activeTextEditor.document.fileName;
      coloredTabs.push(currentlyOpenTabfilePath);
      updateColor("#EB4034");
      vscode.window.showInformationMessage("Tab colored!");
    }
  );

  let disposable3 = vscode.commands.registerCommand(
    "colorMyTab.removeColor",
    () => {
      let currentlyOpenTabfilePath =
        vscode.window.activeTextEditor.document.fileName;
      const indexToRemove = coloredTabs.indexOf(currentlyOpenTabfilePath);
      if (indexToRemove != -1) {
        coloredTabs.splice(indexToRemove, 1);
        updateColor(false);
        vscode.window.showInformationMessage("Color removed!");
      } else {
        vscode.window.showErrorMessage("This tab isn't colored");
      }
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(disposable2);
  context.subscriptions.push(disposable3);
}

const updateColor = (color) => {
  let currentColorCustomization = vscode.workspace
    .getConfiguration("workbench")
    .get("colorCustomizations");
  vscode.workspace.getConfiguration("workbench").update(
    "colorCustomizations",
    {
      ...currentColorCustomization,
      "tab.activeBorder": color,
    },
    1
  );
};

function deactivate() {
  updateColor(false);
}

module.exports = {
  activate,
  deactivate,
};
