const fs = require('fs');
const readline = require('node:readline');
const path = require('path');
const { stdin: input, stdout } = process;

const rl = readline.createInterface({ input });
const fileWrite = fs.createWriteStream(path.join(__dirname, 'lesson2.txt'));

stdout.write("Введите текст: ");
rl.on('line', (answer) => {
    if(answer.toLowerCase() === 'exit') {
        stdout.write("До свидания.");
        rl.close();
    }
    fileWrite.write(answer + '\n');
});
process.on("SIGINT", ()=> {
    stdout.write("\nДо свидания.\n");
    rl.close();
})
