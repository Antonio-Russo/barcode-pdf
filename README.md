# Barcode Generator
## Experimental Feature

We are currently experimenting with the creation of an Electron app to provide a desktop interface for the barcode generator. This feature is still in development and may not be fully functional.
This is a simple barcode generator that creates a PDF with 40 random barcodes. The project was developed to facilitate the generation of barcodes for various purposes, such as product labeling or inventory management.

## Requirements

- **Node.js** (version 14 or later)
- **npm** (or **yarn** as an alternative)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Antonio-Russo/barcode-pdf.git
    cd barcode-generator
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

## Running Locally

To start the barcode generator locally, run the command:
```bash
npm start
```

## Cross-Platform Build

To create a cross-platform build, follow these steps. Note that if you want to generate a build for Windows, you cannot do it from a macOS operating system.

1. Install the dependencies:
    ```bash
    npm install
    ```

2. Install the build tools for Windows:
    ```bash
    npm install --global windows-build-tools
    ```

3. Generate the build:
    ```bash
    npm run build
    ```

## Contributing

If you would like to contribute to the project, feel free to open a pull request or report an issue in the GitHub repository.

## License

This project is distributed under the MIT license.

