var fs = require('fs')
var path = require('path')
var mkdirp = require('mkdirp')

module.exports = {
    buildThem
}

function buildThem (inputDir, outputDir, templateFile, makeHs) {
    fs.readdir(inputDir, function (err, files) {
        if (err) throw err
        mkdirp.sync(outputDir)

        files.forEach(fileName => {
            var _path = path.join(inputDir, fileName)
            var baseName = path.basename(fileName, '.md')

            fs.readFile(_path, 'utf8', (err, file) => {
                if (err) throw err

                var outFileDir = outputDir + '/' + baseName
                mkdirp.sync(outFileDir)

                var hs = makeHs(file, baseName)

                var ws = fs.createWriteStream(outFileDir + '/index.html')
                var rs = fs.createReadStream(templateFile)

                rs.pipe(hs).pipe(ws)
            })
        })

    })
}

