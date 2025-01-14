const fs = require('fs/promises');
const path = require('path');

(async () => {
    try {
        const folderPath = path.join(__dirname, 'secret-folder');

    } catch (err) {
        console.error('Error reading:', err.message);
    }
});