const fs = require('fs/promises');
const path = require('path');
const { createWriteStream, createReadStream } = require('fs');

fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true})
.then(async () => {
    const arrHtml = {
        index: await fs.readFile(path.join(__dirname, 'template.html'), 'utf-8')
    }
    const tags = (await fs.readdir(path.join(__dirname, 'components'))).map(elem => elem.split('.').slice(0, -1).join(''));

    for(let i = 0; i < tags.length; i++) {
        arrHtml[tags[i]] = await fs.readFile(path.join(__dirname, 'components', `${tags[i]}.html`), 'utf-8')
    }

    return arrHtml
})
.then(data => {
    const keys = Object.keys(data);
    let index = data.index;

    for(let i = 0; i < keys.length; i++) {
        if(keys[i] === 'index') continue;
        index = index.replace(`{{${keys[i]}}}`, data[keys[i]])
    }
    createWriteStream(path.join(__dirname, 'project-dist', 'index.html')).write(index);
})
.then(() => {
    const outToFile = createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
    fs.readdir(path.join(__dirname, 'styles'))
    .then(data => {
        data.forEach(item => {
            if(path.extname(item) === '.css'){
                let read = createReadStream(path.join(__dirname, 'styles', item), 'utf-8');
                read.on('data', data => {
                    outToFile.write(data);
                })
            };
        })
    })
})
.then (() => {
    fs.readdir(path.join(__dirname, 'assets'))
    .then(async data => {
        await fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true });

        data.forEach(async item => {
            await fs.mkdir(path.join(__dirname, 'project-dist', 'assets', item), { recursive: true })
            .then(() => {
                fs.readdir(path.join(__dirname, 'assets', item))
                .then(dataFolder => {
                    dataFolder.forEach(file => {
                       require('fs').copyFile(path.join(__dirname, 'assets', item, file), path.join(__dirname, 'project-dist', 'assets', item, file), () => {})
                    })
                })
            })
        })
    })
})