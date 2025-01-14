const fs = require('fs');
const path = require('path');

const stylesFolderPath = path.join(__dirname, 'styles');
const bundleFilePath = path.join(__dirname, 'project-dist', 'bundle.css');

const bundleStream = fs.createWriteStream(bundleFilePath);

fs.readdir(stylesFolderPath, (err, files) => {
    if (err) {
        console.error('Error reading the styles folder:', err);
        return;
    }

    files.forEach(file => {
        const filePath = path.join(stylesFolderPath, file);

        if (path.extname(file) === '.css') {
            const readStream = fs.createReadStream(filePath, 'utf8');

            readStream.on('data', chunk => {
                bundleStream.write(chunk + '\n');
            });

            readStream.on('error', err => {
                console.error('Error reading CSS file:', err);
            });
        }
    });
});