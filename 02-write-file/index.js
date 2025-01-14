const fs = require('fs');
const readLine = require('readline');

const filePath = './02-write-file/text.txt';
const writableStream = fs.createWriteStream(filePath, { flags: 'a' });
