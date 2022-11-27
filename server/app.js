const express = require('express');
const multer = require('multer');
const path = require('path');
const validate = require('./validate');
const parser = require('./parser');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));

//загрузить на сервер
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'uploads/');
//     },

//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

//сохранить в буфер
const memoryStorage = multer.memoryStorage();

app.post('/upload-log-file', (req, res) => {

    let upload = multer({ storage: memoryStorage, fileFilter: validate.logFilter}).single('log_file');

    upload(req, res, function(err) {

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Пожалуйста загрузите файл формата .log');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        const parse = parser.parserLog(req)
        res.send(parse);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}...`));