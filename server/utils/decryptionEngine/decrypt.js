const crypto = require('crypto');
const path = require('path');
const { readFile, writeFile, removeFile } =  require('../utils/fileSystem');
const { chunkify } = require('../utils/chunkify');
const public_folder = process.env.PWD;

const HORCRUXES = ["Tom Riddle's diary", "Marvolo Gaunt's Ring", "Salazar Slytherin's Locket", "Helga Hufflepuff's Cup", "Rowena Ravenclaw's Diadem", "Harry Potter", "Nagini the Snake"];


const deHorcruxify = async (folderPath, fileBlob, password, fileExtension) => {
  var cipher = crypto.createDecipher('aes-128-cbc', password);
  var decryptedBlob = cipher.update(fileBlob, 'hex', 'binary') + cipher.final('binary');

  await writeFile(`${folderPath}/original.${fileExtension}`, decryptedBlob, 'binary');
  console.log("\nTA DA!!!! your file is de-horcruxified!!!\n");
  return `${folderPath}/original.${fileExtension}`
}

const processFolder = async (folderPath, fileExtension) => {
  let fullBlob = "";

  for(const item of HORCRUXES){
    let fileName = `${folderPath}/${item}.${fileExtension}`//folderPath + "/" + item; // needs to add the extension
    fullBlob += await readFile(fileName, 'binary');
    await removeFile(fileName);
  }

  return fullBlob;
}

const eventHandler = async (folderName, password, fileExtension) => {
    const folderPath = `${public_folder}/public/${folderName}`
    const fullBlob = await processFolder(folderPath, fileExtension);
    const response = deHorcruxify(folderPath, fullBlob, password, fileExtension);
    return response;
}

module.exports = eventHandler;