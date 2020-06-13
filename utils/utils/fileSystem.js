const { promises : fs} = require('fs');

const readFile = async (filePath, encoding = 'utf-8') => {
    
    try{
        const fileContent = await fs.readFile(filePath, encoding);
        return fileContent;
    } catch(err){
        console.log('file not found!!', err);
        return err;
    }
}

const writeToFile = async (fileNameWithPath, fileContent, encoding = 'utf-8') => {
    try{
        await fs.writeFile(fileNameWithPath, fileContent, encoding);
    } catch(err){
        console.log('an error occurred while writing to file', err);
        return err;
    }
    
}

const removeFile = async (filename) => {
    try{
        await fs.unlink(filename);
    } catch(err) {
        console.log('an error occurred while removing the file', err);
        return err;
    }
}

const removeFolder = async (folderPath) => {
    try{
        await fs.rmdir(folderPath, {recursive: true});
    } catch(err){
        console.log('an error occurred while deleting the folder', err);
        return err;
    }
}

const ensureDirectory = async (path, directory) => {
    try{
        const stats = await fs.stat(`${path}/${directory}`);
        if(!stats.isDirectory()){
            throw err;
        }
    } catch(err){
        await fs.mkdir(`${path}/${directory}`);
        console.log('folder not exists');
    }
}

module.exports = {
    readFile: readFile,
    writeFile: writeToFile,
    removeFile: removeFile,
    removeFolder: removeFolder,
    ensureDirectory: ensureDirectory,
}