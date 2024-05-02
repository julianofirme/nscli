# nscli

`nscli` is a Node.js CLI tool that allows you to easily run scripts defined in your package.json file. It provides a simple interface for selecting and executing scripts from the terminal.

## Installation

You can install `nscli` globally via npm to access it from anywhere in your terminal:

```bash
npm install -g nodescript-cli
```

## Usage

After installing `nscli`, you can run it in your terminal by typing `nscli` and pressing Enter. This will detect your preferred package manager based on the presence of lock file in the current directory.

`nscli` will then display a list of scripts defined in your package.json file. Use the arrow keys to navigate the list and press Enter to run the selected script.

## Example 

Let's say you have the following scripts defined in your package.json file:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "test": "jest",
    "build": "webpack"
  }
}
```

Running `nscli` in your terminal will present you with the following options:

```bash 
? Select a script to run: (Use arrow keys)
  start
> test
  build
```

Navigate the list using the arrow keys, then press Enter to run the selected script.

## Node.js Support

This package is compatible with Node versions higher than 16.x 

If you are experiencing compatibility issues with a specific version of Node.js, please open an issue so we can investigate and address the problem.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request on GitHub: nscli GitHub Repository

## License

This project is licensed under the MIT License - see the LICENSE file for details.

