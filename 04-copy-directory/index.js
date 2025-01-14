const fs = require('fs/promises');
const path = require('path');

async function copyDir() {
    try {
        const srcFolder = path.join(__dirname, 'files');
        const destFolder = path.join(__dirname, 'files-copy');


    } catch (err) {
        console.error('Error copying directory:', err.message);
    }
}