const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const bwipjs = require('bwip-js');

// Funzione per ottenere il percorso di salvataggio dei dati dell'app
function getAppDataPath() {
    switch (process.platform) {
        case "darwin": {
            return path.join(process.env["HOME"], "Desktop");
        }
        case "win32": {
            return path.join(process.env.APPDATA);
        }
        case "linux": {
            return path.join(process.env["HOME"]);
        }
        default: {
            console.log("Piattaforma non supportata!");
            process.exit(1);
        }
    }
}

const generatePDF = async () => {

    console.log("Generazione PDF in corso...");

    // Ottieni la cartella corrente
    const currentDirectory = getAppDataPath(); 
    const randomSuffix = Math.floor(Math.random() * 100000);
    const fileName = `codici_a_barre_${randomSuffix}.pdf`;

    // Percorso completo del file PDF da creare
    const filePath = path.join(currentDirectory, fileName);

    const doc = new PDFDocument({ size: 'A4', layout: 'portrait' });
    const outputStream = fs.createWriteStream(filePath);
    doc.pipe(outputStream);

    const columns = 4, rows = 10, marginX = 40, marginY = 40;
    const barcodeWidth = 120, barcodeHeight = 50, spacingX = 140, spacingY = 70;

    const generateBarcode = async (text) => {
        return new Promise((resolve, reject) => {
            bwipjs.toBuffer({
                bcid: 'code128',
                text: text,
                scale: 3,
                height: 15,
                includetext: true,
                textxalign: 'center'
            }, (err, buffer) => err ? reject(err) : resolve(buffer));
        });
    };

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const x = marginX + col * spacingX;
            const y = marginY + row * spacingY;
            const code = Math.floor(Math.random() * 10000000000).toString();

            try {
                const barcodeBuffer = await generateBarcode(code);
                doc.image(barcodeBuffer, x, y, { width: barcodeWidth, height: barcodeHeight });
            } catch (error) {
                return `Errore  PDF: ${error.message}`;
            }
        }
    }

    doc.end();
    return `✅ PDF generato in: ${filePath}`;
};

module.exports = { generatePDF };