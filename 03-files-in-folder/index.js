const fs = require('fs');
const path = require('path');
const { stdout } = process;
const url = path.join(__dirname, 'secret-folder');

fs.readdir(url, {withFileTypes: true}, (err, data) => {
    data.filter((elem) => elem.isFile()).forEach(el => {
    fs.stat(path.join(url, el.name), (err, file) => {
            let out = '';
            out += `${el.name} ${path.extname(el.name).slice(1)} ${Math.ceil(file.size/1024)}kb\n`;
            stdout.write(out);
        });
    })
})