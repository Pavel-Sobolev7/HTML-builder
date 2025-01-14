const fs = require('fs');
const path = require('path');

const stylesFolderPath = path.join(__dirname, 'styles');
const bundleFilePath = path.join(__dirname, 'project-dist', 'bundle.css');

const bundleStream = fs.createWriteStream(bundleFilePath);

