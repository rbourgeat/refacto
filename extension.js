const vscode = require('vscode');
const axios = require('axios');

function extractCode(str) {
    const start = str.indexOf('```');
    const end = str.indexOf('```', start + 3);
    if (start !== -1 && end !== -1) {
        let code = str.slice(start + 3, end);
        const firstNewLine = code.indexOf('\n');
        if (firstNewLine !== -1) {
            code = code.slice(firstNewLine + 1);
        }
        return code;
    }
    return str;
}

function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.refacto', async function () {
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            let document = editor.document;
            let selection = editor.selection;
            let selected_text = document.getText(selection);
            let config = vscode.workspace.getConfiguration('llama-cpp');
            let serverUrl = config.get('serverUrl');

            if (serverUrl) {
                let prompt = `<s>[INST] You are a developer who is working \
                on a project and wants to write the most beautiful code. \
                Refacto the following code: \
                \`\`\`${selected_text}\`\`\`[/INST]</s>`;

                vscode.window.withProgress({
                    location: vscode.ProgressLocation.Notification,
                    title: "Code refactoring in progress...",
                    cancellable: false
                }, async (progress) => {
                    try {
                        let response = await axios.post(serverUrl, {
                            prompt,
                            n_predict: -1,
                        })

                        vscode.window.showInformationMessage(`Response data content: ${JSON.stringify(response.data, null, 2)}`);

                        if (response.status === 200) {
                            if (response.data.content != "") {
                                editor.edit(editBuilder => {
                                    editBuilder.replace(selection, extractCode(response.data.content));
                                });
                            } else {
                                vscode.window.showErrorMessage('Llama cpp server send empty response...');
                            }
                        } else {
                            vscode.window.showErrorMessage('Llama cpp server connection error !');
                        }
                    } catch (error) {
                        vscode.window.showErrorMessage('An error occurred: ' + error);
                    }
                });
            } else {
                vscode.window.showErrorMessage(`You don't have the llama cpp server url set up !`);
            }
        }
    });
    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
