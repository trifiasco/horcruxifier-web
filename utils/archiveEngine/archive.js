const fs = require('fs');
const archiver = require('archiver');
const { removeFolder, removeFile } = require('../utils/fileSystem');
const public_folder = process.env.PWD;

const HORCRUXES = ["Tom Riddle's diary", "Marvolo Gaunt's Ring", "Salazar Slytherin's Locket", "Helga Hufflepuff's Cup", "Rowena Ravenclaw's Diadem", "Harry Potter", "Nagini the Snake"];

const archiveHanlder = async (folderPath, fileExtension) => {
  const promise = await new Promise((resolve, reject) => {
    const archive = archiver('zip', {
      zlib: {level: 9}
    });

    const output = fs.createWriteStream(`${folderPath}.zip`);
    
    archive.on('error', function(err) {
      console.log('archiving error');
    });
    
    //on stream closed we can end the request
    archive.on('end', function() {
      console.log('Archive wrote %d bytes', archive.pointer());
      resolve();
    });

    output.on('end', () => {
      console.log('data has been drained!!');
      resolve();
    });

    output.on('close', () => {
    });
  
      //set the archive name
      // res.download('archived-horcruxes.zip');
    
      //this is the streaming magic
    archive.pipe(output);
    
      // var files = [__dirname + '/fixtures/file1.txt', __dirname + '/fixtures/file2.txt'];
    
    for(const item of HORCRUXES) {
      const fileName = `${folderPath}/${item}.${fileExtension}`;
      console.log(fileName);
      archive.file(fileName, { name: `${item}.${fileExtension}`});
    }
    
    //   var directories = [__dirname + '/fixtures/somedir']
    
    //   for(var i in directories) {
    //     archive.directory(directories[i], directories[i].replace(__dirname + '/fixtures', ''));
    //   }
    
    archive.finalize();
      
    //*********** finish ***********//

  }).catch(err => {throw(err)});

  return promise;
}

const removeFiles = async (folderPath, fileExtension) => {
  for(const item of HORCRUXES) {
    const fileName = `${folderPath}/${item}.${fileExtension}`;
    console.log(fileName);
    await removeFile(fileName);
  }
}

const eventHandler = async (res, folderPath, fileExtension) => {
    // const folderPath = `${public_folder}/public/${folderName}`
    await archiveHanlder(folderPath, fileExtension);
    await removeFiles(folderPath, fileExtension);
    await removeFolder(folderPath);
    return folderPath;
}

module.exports = eventHandler;


