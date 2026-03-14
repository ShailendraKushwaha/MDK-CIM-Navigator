import * as vscode from 'vscode'
import * as fs from 'fs'
// import * as path from 'path'
import { OverrideRegistry } from './overrideRegistry'

export async function scanCIMFiles(registry: OverrideRegistry) {

    registry.clear()

    const files = await vscode.workspace.findFiles("**/*.cim")

    for (const file of files) {

        const content = fs.readFileSync(file.fsPath, "utf8")

        try {

            const json = JSON.parse(content)

            console.log(json);

            if (!json.IntegrationPoints) continue

            for (const item of json.IntegrationPoints) {

                const source = item.Source
                const target = item.Target

                if (source && target) {
                    registry.add(target, source)
                }
            }

        } catch (err) {
            console.log("Invalid CIM file:", file.fsPath)
        }
    }
}