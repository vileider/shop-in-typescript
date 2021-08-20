const express = require('express');
const router = express.Router()
const fs = require('fs');

router.get('/vAF', async (request, response) => {
    await fs.readFile('./database/vegAndFruitDatabaseBackup.json',
        'utf8',
        (err, data) => {
            if (err) throw err;
            let fileJsonBackup = JSON.parse(data);
            fs.writeFile('./database/vegAndFruitDatabase.json',
                JSON.stringify(fileJsonBackup, null, 2),
                (err) => {
                    if (err) throw err;
                    console.log('log server reset vegAndFruit database', fileJsonBackup);
                    response.send('log server reset vegAndFruit database');
                }
            )
        })
})

module.exports = router