const express = require('express');
const router = express.Router();
const multer = require('multer');
const decryptionEngine = require('../utils/decryptionEngine/decrypt');
const { removeFile, removeFolder, ensureDirectory } = require('../utils/utils/fileSystem');

let destinationFolder = 'horcruxes';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `public/${destinationFolder}`);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({storage: storage}).array('file');

router.get('/', (req, res, next) => {
    res.download(req.query.filename);
});

router.post('/', async (req, res, next) => {
    console.log(req.file);
    destinationFolder = `Voldemort-${Date.now()}-horcruxes`;

    await ensureDirectory(`${process.env.PWD}/public/`, destinationFolder);
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError){
            return res.status(500).json(err);
        }
        else if(err){
            return res.status(500).json(err);
        }
        const password = req.body.password
        console.log('pass: ', password);
        const fileExtension = req.body.fileExtension;
        console.log('fileExtension: ', fileExtension);

        const fileName = await decryptionEngine(destinationFolder, password, fileExtension);
        return res.status(200).send(fileName);
    });
});

router.delete('/', async (req, res, next) => {
    const filename = req.query.filename;
    console.log(filename);
    await removeFile(filename);
    const parts = filename.split('/');
    const slicedParts = parts.slice(0, parts.length - 1);
    const directoryPath = slicedParts.join('/');
    console.log('directory path: ', directoryPath);
    removeFolder(directoryPath);
    res.status(200).send('Deleted');
})

module.exports = router;