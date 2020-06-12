const crypto = require('crypto');
const path = require('path');
const { readFile, writeFile, ensureDirectory, removeFile } =  require('../utils/fileSystem');
const { chunkify } = require('../utils/chunkify');
const public_folder = process.env.PWD;

const HORCRUXES = ["Tom Riddle's diary", "Marvolo Gaunt's Ring", "Salazar Slytherin's Locket", "Helga Hufflepuff's Cup", "Rowena Ravenclaw's Diadem", "Harry Potter", "Nagini the Snake"];


const horcruxify = async (path, directory, fileBlob, password) => {
    var cipher = crypto.createCipher('aes-128-cbc', password);
    var encryptedBlob = cipher.update(fileBlob, 'utf8', 'hex') + cipher.final('hex');
    console.log(encryptedBlob);
    let chunks = chunkify(encryptedBlob, 7);
  
    await ensureDirectory(path, directory); //? need to make this directory unique

    for(var i = 0; i < 7; i++){
      await writeFile(path + `/${directory}/` + HORCRUXES[i] + ".txt", chunks[i]); //? here too make sync with above.
    }
    
    console.log("\nTA DA!!!! your file is horcruxified!!!\n");
    return `${path}/${directory}`;
}

const eventHandler = async (fileName, password) => {
    console.log(fileName);
    const filePath = `${public_folder}/public/${fileName}` // ?this needs to be changed.
    const content = await readFile(filePath);
    // console.log(content);
    const response = horcruxify(`${public_folder}/public`, `horcruxes-of-${fileName}`, content, password);
    await removeFile(filePath);
    return response;
}

module.exports = eventHandler;