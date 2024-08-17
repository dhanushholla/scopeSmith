const vscode = require('vscode');

function activate(context) {
    var isCollapsed = false;
    let previousDecorationType = vscode.window.createTextEditorDecorationType({
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
        border: '1px solid red'
    });

    let expandCommand = vscode.commands.registerCommand('extension.expand', function () {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            if (isCollapsed) {
                vscode.window.showInformationMessage('Expanding all code blocks');
                vscode.commands.executeCommand('editor.unfoldAll');
            } else {
                vscode.window.showInformationMessage('Closing all code blocks');
                vscode.commands.executeCommand('editor.foldAll');
            }
            isCollapsed = !isCollapsed;
        } else {
            vscode.window.showInformationMessage("Can't perform the action! Try again in the editor.");
        }
    });

    let nameBlockCommand = vscode.commands.registerCommand('extension.nameBlock', async function () {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const document = editor.document;
            const selection = editor.selection;
            const blockText = document.getText(selection);

            if (blockText.trim().length === 0) {
                vscode.window.showInformationMessage("Selection using mouse should be done before namimg blocks");
                return;
            }

            const blockName = await vscode.window.showInputBox({
                placeHolder: 'Enter a name for the selected block',
                prompt: 'Name your code block'
            });

            if (blockName) {
                editor.edit(editBuilder => {
                    editBuilder.insert(selection.start, `// Block: ${blockName}\n`);
                });

                vscode.window.showInformationMessage(`Block named: ${blockName}`);
            }
        } else {
            vscode.window.showInformationMessage("No active editor found --- Try again in editor later");
        }
    });

    let searchInBlockCommand = vscode.commands.registerCommand('extension.searchInBlock', async function () {
        const editor = vscode.window.activeTextEditor;

        if (editor && !isCollapsed) {
            const document = editor.document;
            const searchQuery = await vscode.window.showInputBox({
                placeHolder: 'Enter block name and search text (e.g., "BlockName:searchText")',
                prompt: 'Search within a named block'
            });

            if (searchQuery) {
                const [blockName, searchText] = searchQuery.split(':');

                if (!blockName || !searchText) {
                    vscode.window.showInformationMessage("Please enter a block name and search text separated by a colon.");
                    return;
                }

                const text = document.getText();
                const blockRegex = /\/\/ Block: ([^\n]+)\n([\s\S]*?)(?=\/\/ Block: |$)/g;
                let match;
                
                // Clear previous decorations
                editor.setDecorations(previousDecorationType, []);

                let decorations = [];
                let firstOccurrencePosition = null;

                function highlightOccurrences(text, blockStartIndex) {
                    let startIndex = 0;
                    let searchMatch;

                    while ((searchMatch = text.indexOf(searchText, startIndex)) !== -1) {
                        const matchStart = document.positionAt(blockStartIndex + searchMatch);
                        const matchEnd = document.positionAt(blockStartIndex + searchMatch + searchText.length);
                        decorations.push({ range: new vscode.Range(matchStart, matchEnd) });

                        if (!firstOccurrencePosition) {
                            firstOccurrencePosition = matchStart;
                        }
                        startIndex = searchMatch + searchText.length;
                    }
                }

                function processBlock(blockName, blockText, blockStartIndex) {
                    highlightOccurrences(blockText, blockStartIndex);

                    // Recursive search for nested blocks
                    let nestedBlockMatch;
                    const nestedBlockRegex = /\/\/ Block: ([^\n]+)\n([\s\S]*?)(?=\/\/ Block: |$)/g;
                    while ((nestedBlockMatch = nestedBlockRegex.exec(blockText)) !== null) {
                        if (nestedBlockMatch[1] === blockName) {
                            // Recursive search in nested block
                            processBlock(nestedBlockMatch[1], nestedBlockMatch[2], blockStartIndex + nestedBlockMatch.index);
                        }
                    }
                }

                while ((match = blockRegex.exec(text)) !== null) {
                    const blockNameInText = match[1];
                    const blockText = match[2];
                    const blockStartIndex = match.index + match[0].indexOf(blockText);

                    if (blockNameInText === blockName) {
                        processBlock(blockNameInText, blockText, blockStartIndex);
                    }
                }

                if (decorations.length > 0) {
                    editor.setDecorations(previousDecorationType, decorations);

                    // Scroll to the first found occurrence
                    if (firstOccurrencePosition) {
                        editor.revealRange(new vscode.Range(firstOccurrencePosition, firstOccurrencePosition), vscode.TextEditorRevealType.InCenter);
                    }

                    vscode.window.showInformationMessage(`Found ${decorations.length} occurrences of "${searchText}" in block "${blockName}".`);
                } else {
                    vscode.window.showInformationMessage(`No occurrences of "${searchText}" found in block "${blockName}".`);
                }
            }
        } else {
            vscode.window.showInformationMessage("No active editor found - Try toggleAllScopes before search.");
        }
    });

    context.subscriptions.push(expandCommand, nameBlockCommand, searchInBlockCommand);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};