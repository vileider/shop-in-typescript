import React, { useState, useEffect } from 'react';
import { PickingDinnerIngredientsPanel } from './PickingDinnerIngredientsPanel'
import { SendDinner } from './SendDinner';

const createFieldsOfProductsArray = () => {
    let x = []
    for (let i = 0; i < 10; i++) {
        x.push({ id: i + 1, [`item${i + 1}`]: '' },)
    }
    return x
}

export const AddDinner = function () {
    const [dinnerName, setDinnerName] = useState()
    const [pickedIngredients, setPickedIngredients] = useState([])
    const [counter, setCounter] = useState(0)
    const [fieldsOfProducts, setFieldsOfProducts] = useState(createFieldsOfProductsArray())

    const changeObjectsForDinnerIngredients = (idForChange, value) => {
        setFieldsOfProducts(fieldsOfProducts.map(x => {
            return (
                x.id === idForChange
                    ? { id: x.id, [`item${x.id}`]: value }
                    : x
            )
        }
        ))
    }

    useEffect(() => {
        changeObjectsForDinnerIngredients(counter, pickedIngredients[counter - 1])
    }, [pickedIngredients])// eslint-disable-line react-hooks/exhaustive-deps

    const plusButtonAction = () => {
        setCounter(counter + 1)
    }

    const minusButtonAction = () => {
        setCounter(counter - 1)
    }

    const generateInputFields = () => {

        return (fieldsOfProducts.filter(y => y.id < counter + 1).map(x => {
            return (
                x.id !== 10
                    ?
                    <div key={`div${x.id}`} >
                        <input key={`input-${x.id}`} type='text' maxLength={8}
                            value={pickedIngredients[x.id - 1] || ''}
                            readOnly
                            disabledlo
                        />

                        <button key={`button${x.id}`} disabled={x.id !== counter}
                            onClick={(e) => { minusButtonAction(e) }}> -</button >

                        <button key={`button+${x.id}`}
                            disabled={x.id !== counter || x[`item${x.id}`] === ''}
                            onClick={(e) => { plusButtonAction(e) }}> +</button >
                        Please choose category and pick an item.
                    </div>

                    :
                    <div key={`div${x.id}`} >
                        <input key={`input${x.id}`} type='text' maxLength={8}
                            value={pickedIngredients[x.id - 1] || ''}
                            readOnly
                        />
                        <button key={`button${x.id}`} disabled={x.id !== counter}
                            onClick={(e) => { minusButtonAction(e) }}> -</button >
                    </div>
            )
        }

        ))
    }

    const addDinnerMenu = (<>
        <div className='addDinnerMenu'>
            <div className='panelsContainer'>
                <div className='inputPanel'>
                    <div className='nameOfAddedProduct'>
                        <div className='settingsTitle'>Dinner Name:</div>
                        <input type='text' maxLength={16} onChange={(e) => {
                            setDinnerName(e.target.value)
                        }} />
                    </div>

                    <button disabled={counter >= 1}
                        onClick={(e) => { plusButtonAction(e) }}> +</button >
                        Add ingrendient
                    {generateInputFields()}
                </div>
                <div className='infoPanel'>
                    <SendDinner dinnerParentName={dinnerName}
                        pickedParentIngredients={pickedIngredients} />
                </div>
            </div>
            {counter > 0 &&
                (!fieldsOfProducts[counter - 1][`item${counter}`]
                    && <PickingDinnerIngredientsPanel
                        liftedChildState={setPickedIngredients}
                        pickedParentIngredients={pickedIngredients} />)
            }
        </div>
    </>
    )
    return addDinnerMenu
}

