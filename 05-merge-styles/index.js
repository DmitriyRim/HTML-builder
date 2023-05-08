const fs = require('fs/promises');
const path = require('path');
const { createReadStream, createWriteStream } = require('fs');
const output = createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(path.join(__dirname, 'styles'),{withFileTypes: true})
.then(data => {
    const fileNames = data.filter(elem => path.extname(elem.name) === '.css').map(elem => elem.name);
    fileNames.forEach(elem => {
        const readableStream = createReadStream(path.join(__dirname, 'styles', elem));
        readableStream.on('data', data => {
            output.write(data);
        })
    })
})
