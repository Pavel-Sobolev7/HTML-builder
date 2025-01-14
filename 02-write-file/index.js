const fs = require('fs');
const readLine = require('readline');

const filePath = './02-write-file/text.txt';
const writableStream = fs.createWriteStream(filePath, { flags: 'a' });

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Enter your text:');

rl.on('line', (input) => {
    if (input.trim() === 'cancel') {
        console.log('Goodbye !');
        rl.close();
    } else {
        writableStream.write(`${input}\n`);
        console.log('The text recorded. Enter text or "cancel" to exit');
    }
});

process.on('SIGINT', () => {
    console.log('\nGoodbye !');
    rl.close();
});
