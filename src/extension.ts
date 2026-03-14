import * as vscode from 'vscode'
import * as path from 'path'
import { OverrideRegistry } from './overrideRegistry'
import { scanCIMFiles } from './cimScanner'

const registry = new OverrideRegistry()
let internalNavigation = false

export async function activate(context: vscode.ExtensionContext) {

	console.log("Activated Extension");
    
    await scanCIMFiles(registry)

     if (internalNavigation) {
        console.log("Returned from here");
        return
    }

    vscode.window.onDidChangeActiveTextEditor(async (editor) => {

    if (!editor) return

    const document = editor.document

    const workspaceFolder = vscode.workspace.workspaceFolders?.[0]
    if (!workspaceFolder) return

    const relativePath = document.uri.fsPath
        .replace(workspaceFolder.uri.fsPath, "")
        .replace(/\\/g, "/")

    // check if file is a TARGET
    const source = registry.getSource(relativePath)

    if (source) {

        const action = await vscode.window.showWarningMessage(
            "Override exists for this page",
            "Open Override"
        )

        if (action === "Open Override") {

            const sourcePath = path.join(workspaceFolder.uri.fsPath, source)

            const doc = await vscode.workspace.openTextDocument(sourcePath)
            await vscode.window.showTextDocument(doc, { preview: false })
        }

        return
    }

    // check if file is SOURCE
    const target = registry.getTarget(relativePath)

    if (target) {

        const action = await vscode.window.showInformationMessage(
            "This is an override file",
            "Open Original"
        )

        if (action === "Open Original") {

            const targetPath = path.join(workspaceFolder.uri.fsPath, target)

            const doc = await vscode.workspace.openTextDocument(targetPath)
            await vscode.window.showTextDocument(doc, { preview: false })
        }
    }

})


// 	vscode.workspace.onDidOpenTextDocument(async (document) => {

//     const workspaceFolder = vscode.workspace.workspaceFolders?.[0]
//     if (!workspaceFolder) return

//     let relativePath = document.uri.fsPath
//         .replace(workspaceFolder.uri.fsPath, "")
//         .replace(/\\/g, "/")

//     // check if opened file is TARGET
//     const source = registry.getSource(relativePath)

//     if (source) {

//         const action = await vscode.window.showWarningMessage(
//             "⚠ Override exists for this page",
//             "Open Override"
//         )

//         if (action === "Open Override") {

//             internalNavigation = true
//             const sourcePath = path.join(workspaceFolder.uri.fsPath, source)

//             const doc = await vscode.workspace.openTextDocument(sourcePath)
//             await vscode.window.showTextDocument(doc)

//             internalNavigation = false
//         }

//         return
//     }

//     // check if opened file is SOURCE
//     const target = registry.getTarget(relativePath)

//     if (target) {

//         const action = await vscode.window.showInformationMessage(
//             "Original SAP MDK page exists",
//             "Open Original"
//         )

//         if (action === "Open Original") {

//             internalNavigation = true

//             const targetPath = path.join(workspaceFolder.uri.fsPath, target)

//             const doc = await vscode.workspace.openTextDocument(targetPath)
//             await vscode.window.showTextDocument(doc)

//             internalNavigation = false
//         }

//     }

// })

}

export function deactivate() {}