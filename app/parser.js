const parserLog = function (req) {

    const data = req.file.buffer.toString()
    const lines = data.split(/\r?\n/)
    let errorCount = 0

    const isError = (line) => {
        return line.includes('ERROR')
    }

    lines.forEach(line => {
        if (isError(line)) {
            errorCount++
        } 
    })
    return req.resParsLog = errorCount.toString()
};
exports.parserLog = parserLog;