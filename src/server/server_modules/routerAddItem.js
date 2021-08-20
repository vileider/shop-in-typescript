const express = require('express');
const router = express.Router()
const fs = require('fs');

router.post('/', async (request, response) => {

    const newProductName = request.body.productName
    const newProductPrice = request.body.productPrice
    const databasePath = request.body.productCategory
    response.send('ok')

    await fs.readFile(`./database/${databasePath}Database.json`,
        'utf8', (err, data) => {
            if (err) {
                console.log(err)
            }
            const readableDatabase = JSON.parse(data)

            readableDatabase.push({
                "product": newProductName,
                "visibilityOnProductList": true,
                "price": newProductPrice,
                "count": 0
            })

            fs.writeFile(`./database/${databasePath}Database.json`,
                JSON.stringify(readableDatabase, null, 2),
                (err) => {
                    if (err) throw err;
                    console.log(err)
                })
        })
})

module.exports = router