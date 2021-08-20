const express = require('express');
const router = express.Router()
const fs = require('fs');

router.post('/', async (request, response) => {
    let combinedArrays = []
    const conditionalData = request.body
    let dataForRespond = []
    // await setTimeout(() => {
    // }, 1000);
    await fs.readFile('./database/vegAndFruitDatabaseBackup.json',
        'utf8',
        (err, data) => {
            if (err) throw err;
            combinedArrays = combinedArrays.concat(JSON.parse(data))
            fs.readFile('./database/chemicalsDatabase.json',
                'utf8',
                (err, data) => {
                    if (err) throw err;
                    combinedArrays = combinedArrays.concat(JSON.parse(data))
                    fs.readFile('./database/dairyWheatAndEggsDatabase.json',
                        'utf8',
                        (err, data) => {
                            if (err) throw err;
                            combinedArrays = combinedArrays.concat(JSON.parse(data))
                            fs.readFile('./database/everythingElseDatabase.json',
                                'utf8',
                                (err, data) => {
                                    if (err) throw err;
                                    combinedArrays = combinedArrays.concat(JSON.parse(data))
                                    console.log('send from entry-point /maching', conditionalData)
                                    combinedArrays.forEach(x => {
                                        conditionalData.forEach(y => x.product === y
                                            && dataForRespond.push(x))
                                        dataForRespond = dataForRespond.map(x => {
                                            x.count = 1
                                            x.visibilityOnProductList = false
                                            return x
                                        })
                                    })
                                    response.json(dataForRespond)
                                }
                            )
                        }
                    )
                }
            )
        }
    )
}
)
module.exports = router