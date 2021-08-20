const express = require('express');
const router = express.Router()
const fs = require('fs');

router.get('/', async (request, response) => {
    fs.readFile('./database/vegAndFruitDatabase.json',
        'utf8',
        (err, data) => {

            if (err) throw err;
            setTimeout(() => {
                fileJson = JSON.parse(data)
                //console.log(fileJson)
                response.json(fileJson)

                console.log('send from entry-point /vegAndfruit')

            }, 500);

        })
})

module.exports = router