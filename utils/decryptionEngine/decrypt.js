const crypto = require('crypto');
const path = require('path');
const { readFile, writeFile, removeFile } =  require('../utils/fileSystem');
const { chunkify } = require('../utils/chunkify');
const public_folder = process.env.PWD;

const HORCRUXES = ["Tom Riddle's diary", "Marvolo Gaunt's Ring", "Salazar Slytherin's Locket", "Helga Hufflepuff's Cup", "Rowena Ravenclaw's Diadem", "Harry Potter", "Nagini the Snake"];


const deHorcruxify = async (folderPath, fileBlob, password) => {
  var cipher = crypto.createDecipher('aes-128-cbc', password);
  var decryptedBlob = cipher.update(fileBlob, 'hex', 'utf8') + cipher.final('utf8');

  await writeFile(folderPath + "/original.txt", decryptedBlob);
  console.log("\nTA DA!!!! your file is de-horcruxified!!!\n");
  return folderPath + "/original.txt";
}

const processFolder = async (folderPath) => {
  let fullBlob = "";

  for(const item of HORCRUXES){
    console.log(item);
    let fileName = folderPath + "/" + item;
    fullBlob += await readFile(fileName);
    await removeFile(fileName);
  }

  return fullBlob;
}

const eventHandler = async (folderName, password) => {
    const folderPath = `${public_folder}/public/${folderName}`
    const fullBlob = await processFolder(folderPath);
    console.log(fullBlob);
    const response = deHorcruxify(folderPath, fullBlob, password);
    return response;
}

module.exports = eventHandler;