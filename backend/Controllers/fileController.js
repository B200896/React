const multer=require('multer')
const path=require('path')
const pdfparse=require('pdf-parse')
const fs = require('fs')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({ storage: storage }).single('pdfFile');

exports.uploadFile = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send('Error uploading file: ' + err.message);
        }

        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }       
        console.log('File uploaded:', req.file);
        const filePath=`./uploads/${req.file.filename}`
        let databuffer=fs.readFile(filePath)
        pdfparse(databuffer)
        .then((data)=>{
            res.status(200).json({
                message:'File uploaded Successfully',
                text:data.text
            })
            console.log(data.text)
        })
        .catch((error)=>{
            res.status(500).json({ error: 'Error processing PDF' });
            console.error(error);
        })
        // res.send('File uploaded successfully!');

    });
};  