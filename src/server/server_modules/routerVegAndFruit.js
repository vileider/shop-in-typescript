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
                response.json(fileJson)
                console.log('send from entry-point /vegAndfruit')
            }, 0);

        })
})

module.exports = router