const express = require('express');
const router = express.Router();
const multer = require('multer');
const encryptionEngine = require('../utils/encryptionEngine/encrypt');
const { removeFile } = require('../utils/utils/fileSystem');
const archive = require('../utils/archiveEngine/archive');

// let destinationFolder = 'horcruxes';
// const fileStorageFolderName = 'Voldemort';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public');
    },
    filename: (req, file, cb) => {
        cb(null, `Voldemort-${Date.now()}-${file.originalname}`); // Date.now() + '-' + file.originalname
    }
})


const upload = multer({storage: storage}).single('file');

router.get('/', (req, res, next) => {
    res.download(req.query.filename);
});

router.post('/', (req, res, next) => {
    console.log(req.file);

    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError){
            return res.status(500).json(err);
        }
        else if(err){
            return res.status(500).json(err);
        }
        
        const password = req.body.password
        const fileExtension = req.body.fileExtension;
        console.log('pass: ', password);
        console.log('fileExtension: ', fileExtension);
        const folderPath = await encryptionEngine(req.file.filename, password, fileExtension);
        const zipFile = await archive(res, folderPath, fileExtension) + '.zip'; // here 2nd argument of archive needs to be dynamic sync to encrypt module
        console.log('zip file name: ', zipFile);
        
        return res.status(200).send(zipFile);
    });
});

router.delete('/', (req, res, next) => {
    const filename = req.query.filename;
    removeFile(filename);
    res.status(200).send('Deleted');
});

module.exports = router;