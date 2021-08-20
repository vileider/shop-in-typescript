const express = require('express');
const router = express.Router()
const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);

const amendItemAtDatabase = async (itemForErase, callback) => {

    const PickDataFromDatabase = (_callback) => {
        fs.readFile('./database/vegAndFruitDatabase.json',
            'utf8',
            async (err, data) => {
                if (err) throw err;
                fileJson = await JSON.parse(data)
                await _callback(fileJson)
            })
    }

    const listOfDatabase = [
        {
            databaseName: 'vegAndFruit',
            databaseFileName: 'vegAndFruitDatabase.json'
        },
        {
            databaseName: 'chemicals',
            databaseFileName: 'chemicalsDatabase.json'
        },
        {
            databaseName: 'dairyWheatAndEggs',
            databaseFileName: 'dairyWheatAndEggsDatabase.json'
        },
        {
            databaseName: 'everythingElse',
            databaseFileName: 'everythingElseDatabase.json'
        },
        {
            databaseName: 'dinners',
            databaseFileName: 'dinnersDatabase.json'
        }
    ]
    const overwriteDatabase = async (databaseFileName, database) => {
        const buf = await writeFile(`./database/${databaseFileName}`
            , JSON.stringify(database, null, 2))
            .catch(er => {
                console.log(er);
            });
    }

    listOfDatabase.forEach(x => {
        fs.readFile(`./database/${x.databaseFileName}`,
            'utf8',
            async (err, data) => {
                if (err) throw err;
                let fileJson = await JSON.parse(data);
                if (fileJson.filter(x => x.product === itemForErase).length > 0) {
                    fileJson = fileJson.filter(x => x.product !== itemForErase);
                    await overwriteDatabase(`${x.databaseFileName}`, fileJson)
                    PickDataFromDatabase(callback)
                    console.log(`item: ${itemForErase}, deleted from ${x.databaseName},
                    DB lenght: ${fileJson.length}`);
                }
            })
    })

}




router.post('/', async (request, response) => {

    const callback = (data) => {
        response.send(JSON.stringify(data))
    }

    const dataFromClient = await request.body

    amendItemAtDatabase(dataFromClient.itemName, callback);

})

module.exports = router