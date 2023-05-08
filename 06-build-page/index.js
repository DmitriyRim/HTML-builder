const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, () => {
    fs.readdir(path.join(__dirname, 'project-dist'), (err, data) => {
        data.forEach(item => {
            fs.unlink(path.join(__dirname, 'project-dist', item), () => {});
        });

        fs.readdir(path.join(__dirname, 'assets'), (err, data) => {
            fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, () => {
                data.forEach(item => {
                    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', item), { recursive: true }, () =>{
                        fs.readdir(path.join(__dirname, 'assets', item), (err, dataFolder) => {
                            dataFolder.forEach(file => {
                                fs.copyFile(path.join(__dirname, 'assets', item, file), path.join(__dirname, 'project-dist', 'assets', item, file), () => {})
                            })
                        })
                    });
                })
            })
    
        });
    
        const buildIndex = fs.createWriteStream(path.join(__dirname,'project-dist', 'index.html') , 'utf-8');
        fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, template) => {
            fs.readFile(path.join(__dirname, 'components','header.html'), 'utf-8', (err, header) => {
                fs.readFile(path.join(__dirname, 'components','footer.html'), 'utf-8', (err, footer) => {
                    fs.readFile(path.join(__dirname, 'components','articles.html'), 'utf-8', (err, articles) => {
                        fs.readFile(path.join(__dirname, 'components','about.html'), 'utf-8', (err, about) => {
                            template = template.replace('{{header}}', header);
                            template = template.replace('{{footer}}', footer);
                            template = template.replace('{{articles}}', articles);
                            template = template.replace('{{about}}', about);
                            buildIndex.write(template);
                        });
                    });
                });
            });
        });
    
        const outToFile = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
        fs.readdir(path.join(__dirname, 'styles'), (err, data) => {
            data.forEach(item => {
                if(path.extname(item) === '.css'){
                    let read = fs.createReadStream(path.join(__dirname, 'styles', item), 'utf-8');
                    read.on('data', data => {
                        outToFile.write(data);
                    })
                };
            })
        })
    });
})