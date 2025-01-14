const fs = require('fs/promises');
const path = require('path');

async function copyDir() {
    try {
        const srcFolder = path.join(__dirname, 'files');
        const destFolder = path.join(__dirname, 'files-copy');

        await fs.rm(destFolder, { recursive: true, force: true });
        await fs.mkdir(destFolder, { recursive: true });

        const items = await fs.readdir(srcFolder, { withFileTypes: true });

        for (const item of items) {
            const srcPath = path.join(srcFolder, item.name);
            const destPath = path.join(destFolder, item.name);

            if (item.isDirectory()) {
                await copyDir(srcPath, destPath);
            } else if (item.isFile()) {
                await fs.copyFile(srcPath, destPath);
            }
        }
        console.log('Directory copied successfully!');
    } catch (err) {
        console.error('Error copying directory:', err.message);
    }
}

copyDir();