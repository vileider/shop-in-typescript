import React, { useState } from 'react';

export const AddItem = function () {
    const [itemMenuState, setItemMenuState] = useState({
        productName: '',
        productCategory: '',
        productPrice: ''
    })
    const [infoMessage, SetInfoMessage] = useState('please fill all fields')
    const itemMenuStateChange = (name, catgory, price) => {
        let itemMenu = {
            productName: name, productCategory: catgory, productPrice: price
        }
        setItemMenuState(itemMenu)
    }
    const addItemToDatabase = async () => {
        SetInfoMessage('sending to server')
        const fetchTask = new Request('addItem',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(itemMenuState)
            });
        await fetch(fetchTask)
            .then(data => console.log('sending data', data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const typedDataValidation = () => {
        (itemMenuState.productName === '' ||
            itemMenuState.productCategory === '' ||
            itemMenuState.productPrice === '')
            ? SetInfoMessage('all fields required')
            : addItemToDatabase()

    }

    const addItemMenu = (
        <>
            <div className='addItemMenu'>
                <div className='nameOfAddedProduct'>
                    <div className='settingsTitle'>Product Name:</div>
                    <input type='text' maxLength={16} onChange={(e) => {
                        itemMenuStateChange(e.target.value,
                            itemMenuState.productCategory,
                            itemMenuState.productPrice)
                    }} />
                </div>

                <div className='categoryOfAddedProduct'>
                    <div className='settingsTitle'>Category:</div>
                    <div onChange={(e) => {
                        itemMenuStateChange(itemMenuState.productName,
                            e.target.value,
                            itemMenuState.productPrice)
                    }}><label>
                            <input type='radio' value='/vegAndFruit' onChange={e => { }}
                                checked={itemMenuState.productCategory === '/vegAndFruit'} />Veg and Fruits</label><br />
                        <label><input type='radio' value='/chemicals' onChange={e => { }}
                            checked={itemMenuState.productCategory === '/chemicals'} />Chemicals</label><br />
                        <label><input type='radio' value='/dairyWheatAndEggs' onChange={e => { }}
                            checked={itemMenuState.productCategory === '/dairyWheatAndEggs'} />Dairy</label><br />
                        <label><input type='radio' value='/everythingElse' onChange={e => { }}
                            checked={itemMenuState.productCategory === '/everythingElse'} />Everything else</label><br />
                    </div>

                    <div className='priceOfAddedProduct'>
                        <div className='settingsTitle'>Price:</div>
                        <input type='text' maxLength={3} size='1' onChange={(e) => {
                            itemMenuStateChange(itemMenuState.productName,
                                itemMenuState.productCategory,
                                e.target.value)
                        }} />
                    </div>

                </div >
                {(infoMessage !== 'sending to server') &&
                    <button onTouchStart={() => typedDataValidation()}>ADD</button>}

            </div>
            <div className='infoPanel'>{infoMessage}</div>
        </>
    )
    return addItemMenu
}