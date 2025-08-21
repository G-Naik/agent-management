const csv = require("csv-parser")
const fs = require("fs")

const parseCSV = (filepath) => {
    return new Promise((resolve, reject) => {
        const results = [] ; 
        fs.createReadStream(filepath)
        .pipe(csv())
        .on("data", (data) => {
            results.push({
                firstname : data.firstname,
                mobile : data.mobile,
                note : data.note
            })
        })
        .on("end",() => resolve(results))
        .on('error',() => reject);
    })
}

module.exports = parseCSV ; 