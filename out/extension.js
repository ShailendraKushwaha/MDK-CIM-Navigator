"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const overrideRegistry_1 = require("./overrideRegistry");
const cimScanner_1 = require("./cimScanner");
const registry = new overrideRegistry_1.OverrideRegistry();
let internalNavigation = false;
async function activate(context) {
    console.log("Activated Extension");
    await (0, cimScanner_1.scanCIMFiles)(registry);
    if (internalNavigation) {
        console.log("Returned from here");
        return;
    }
    vscode.window.onDidChangeActiveTextEditor(async (editor) => {
        if (!editor)
            return;
        const document = editor.document;
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder)
            return;
        const relativePath = document.uri.fsPath
            .replace(workspaceFolder.uri.fsPath, "")
            .replace(/\\/g, "/");
        // check if file is a TARGET
        const source = registry.getSource(relativePath);
        if (source) {
            const action = await vscode.window.showWarningMessage("Override exists for this page", "Open Override");
            if (action === "Open Override") {
                const sourcePath = path.join(workspaceFolder.uri.fsPath, source);
                const doc = await vscode.workspace.openTextDocument(sourcePath);
                await vscode.window.showTextDocument(doc, { preview: false });
            }
            return;
        }
        // check if file is SOURCE
        const target = registry.getTarget(relativePath);
        if (target) {
            const action = await vscode.window.showInformationMessage("This is an override file", "Open Original");
            if (action === "Open Original") {
                const targetPath = path.join(workspaceFolder.uri.fsPath, target);
                const doc = await vscode.workspace.openTextDocument(targetPath);
                await vscode.window.showTextDocument(doc, { preview: false });
            }
        }
    });
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
function deactivate() { }
//# sourceMappingURL=extension.js.map