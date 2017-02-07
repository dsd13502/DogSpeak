const mock = require('./lib');

mock({
  stuff: 'lol\n'
});

const fs = require('graceful-fs');

const readStream = fs.createReadStream('package.json');
readStream.on('error', err => console.error('error', err));
readStream.pipe(process.stdout);
