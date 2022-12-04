import fs from 'fs';
import chalk from 'chalk';

function extractLink(text){
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s#?.].[^\s]*)\)/gm;
    const captures = [...text.matchAll(regex)];
    const results = captures.map(capture => ({[capture[1]]: capture[2]}));
    return results.length !== 0 ? results : 'Not links found on the file';
}

function getError(error){
    // console.log(error);
    throw new Error(chalk.red(error.code, 'Message of error...'));
}

async function getFile(pathFile){
    try{
        const enconding = 'utf-8'
        const text = await fs.promises.readFile(pathFile, enconding);
        return extractLink(text);
        // console.log(chalk.blue(text));
    }catch(error){
        getError(error);
    }   
}

// getFile('arquivos/texto.md');

export default getFile;

// function getFile(pathFile){
//     const enconding = 'utf-8'
//     fs.promises
//         .readFile(pathFile, enconding)
//         .then((text) => console.log(extractLink(text)))
//         .catch((error) => getError(error))
// }

// function getFile(pathFile){
//     const enconding = 'utf-8'
//     fs.readFile(pathFile, enconding, (error, text) =>
//     {
//         if(error){
//             getError(error);
//         }
//         console.log(chalk.blue(text));
//     })
// }


// /\[([^[\]]*?)\]\((https?:\/\/[^\s#?.].[^\s]*)\)/gm