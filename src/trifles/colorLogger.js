const morgan = require('morgan');
const chalk = require('chalk');

const greenHex = '#0f7300';
const blueHex = '#0095ff';
const brownHex = '#a36a14';
const whiteHex = '#ffffff';
const blackHex = '#000000';
const greyHex = '#dedede';

morgan.token('reqUrl', (req) => chalk.bgHex(greyHex).underline.italic.blue(` ${req.protocol}://${req.get('host')}${req.originalUrl} `));
morgan.token('reqBody', (req) => chalk.bgHex(whiteHex).italic.hex(blackHex)(req.body) || '');
morgan.token('method', (req) => {
    const { method } = req;
    if (method === 'GET') {
        return chalk.bgHex(blueHex).bold.hex(whiteHex)(` ${method} `);
    }
    if (method === 'POST') {
        return chalk.bgHex(greenHex).bold.hex(whiteHex)(` ${method} `);
    }
    if (method === 'PUT') {
        return chalk.bgHex(brownHex).bold.hex(whiteHex)(` ${method} `);
    }
    if (method === 'DELETE') {
        return chalk.bgRed.bold.hex(whiteHex)(` ${method} `);
    }
    return chalk.bgMagenta.bold.hex(whiteHex)(` ${method} `);
});

module.exports = morgan;
