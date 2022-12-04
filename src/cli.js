import fs from 'fs';
import chalk from 'chalk';
import getFile from './index.js';
import checkedlist from './https-check.js'

const path = process.argv;

async function printList(check, result, file=''){
    if(check){
        console.log(
            chalk.green('List of links'), 
            chalk.black.bgBlue(file),
            await checkedlist(result));
    }else{
        console.log(
            chalk.green('List of links'), 
            chalk.black.bgBlue(file),
            result); 
    }
    
}

async function processText(args){
    const path = args[2];
    const check = args[3] === '--check';

    try{
        fs.lstatSync(path);
    }catch(error){
        if(error.code == 'ENOENT'){
            console.log(chalk.yellow('DIRECTORY OR FILE DOES NOT EXIST'));
            return;
        }
    }

    if(fs.lstatSync(path).isFile()){
        const result = await getFile(path);
        printList(check, result);
    }else if(fs.lstatSync(path).isDirectory()){
        const files = await fs.promises.readdir(path);
        files.forEach(async (file) => {
            const list = await getFile(`${path}/${file}`);
            printList(check, list, file);
        });
    }
}

processText(path);