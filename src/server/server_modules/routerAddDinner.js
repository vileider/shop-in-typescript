const express = require('express');
const router = express.Router()
const fs = require('fs');

router.post('/', async (request, response) => {

    const dinnerFromUser = request.body
    response.send('ok')

    await fs.readFile(`./database/dinnersDatabase.json`,
        'utf8', (err, data) => {
            if (err) {
                console.log(err)
            }
            const readableDatabase = JSON.parse(data)

            readableDatabase.push(dinnerFromUser)
            fs.writeFile(`./database/dinnersDatabase.json`,
                JSON.stringify(readableDatabase, null, 2),
                (err) => {
                    if (err) throw err;
                    console.log(err)
                })
            console.log(dinnerFromUser.product, 'added')
        })
})

module.exports = router