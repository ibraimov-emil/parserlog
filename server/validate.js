const logFilter = function(req, file, cb) {
    if (!file.originalname.match(/\.(log)$/)) {
        req.fileValidationError = 'Только файлы формата: log!';
        return cb(new Error('Только файлы формата: log!'), false);
    }else{
        req.fileResult = "файл загружен";
        cb(null, true);
    }
};

exports.logFilter = logFilter;