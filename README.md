# Refacto

Refacto is a Visual Studio Code extension that allows you to refactor your code using an **local AI model**. The extension sends your selected code to a server running the Llama CPP model, which returns a refactored version of your code.

## Features

- **Refactor Selected Code**: Simply select the code you want to refactor, right-click, and choose "✨ Refacto selected code" from the context menu.

## Installation

1. Install Visual Studio Code 1.50.0 or higher
2. Launch Code
3. From the command palette `Ctrl-Shift-P` (Windows, Linux) or `Cmd-Shift-P` (OSX)
4. Select `Install Extension`
5. Choose the extension `refacto`
6. Reload Visual Studio Code

## Usage

1. Select the code you want to refactor.
2. Right-click and choose "✨ Refacto selected code" from the context menu.
3. The refactored code will replace your selected code.

## Configuration

- `llama-cpp.serverUrl`: URL of the Llama CPP server. Default is `http://127.0.0.1:8080/completion`.

## Contributing

If you find any bugs or have a feature request, please open an issue on [github](https://github.com/rbourgeat/refacto)!

## License

[MIT](https://github.com/rbourgeat/refacto/blob/main/LICENSE)