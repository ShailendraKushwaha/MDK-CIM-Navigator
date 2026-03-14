import * as vscode from 'vscode'
import * as path from 'path'
import { OverrideRegistry } from './overrideRegistry'
import { scanCIMFiles } from './cimScanner'

const registry = new OverrideRegistry()

export async function activate(context: vscode.ExtensionContext) {

	console.log("Activated Extension");

    await scanCIMFiles(registry)


    vscode.workspace.onDidOpenTextDocument(async (document) => {

        const workspaceFolder = vscode.workspace.workspaceFolders?.[0]
        if (!workspaceFolder) return

        const relativePath = document.uri.fsPath.replace(workspaceFolder.uri.fsPath, "")

        const source = registry.getSource(relativePath)

        if (!source) return

        const action = await vscode.window.showInformationMessage(
            "MDK : Override file exists for this file",
            "Open Overridden file"
        )

        if (action === "Open Overridden file") {

            const sourcePath = path.join(workspaceFolder.uri.fsPath, source)

            const doc = await vscode.workspace.openTextDocument(sourcePath)
            await vscode.window.showTextDocument(doc)
        }

    })

}

export function deactivate() {}