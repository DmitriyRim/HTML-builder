const fs = require('fs/promises');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true});
fs.readdir(path.join(__dirname, 'files'), {withFileTypes: true})
.then(data => {
    data.forEach(elem => {
        let from = path.join(__dirname, 'files', elem.name);
        let to =  path.join(__dirname, 'files-copy', elem.name);
        fs.copyFile( from, to, fs.constants.COPYFILE_FICLONE, err => {
            console.log(err);
        })
    })
})
