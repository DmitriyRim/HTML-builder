const fs = require('fs/promises');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true })
.then(() => {
    fs.readdir(path.join(__dirname, 'files-copy'))
    .then(data => {
        data.forEach(item => {
            fs.unlink(path.join(__dirname, 'files-copy', item));
        })
    })
    fs.readdir(path.join(__dirname, 'files'))
    .then(data => {
        data.forEach(item => {
            fs.copyFile(path.join(__dirname, 'files', item), path.join(__dirname, 'files-copy', item))
        })
    })
    
})