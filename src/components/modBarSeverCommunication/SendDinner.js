import React, { useState } from 'react';
import { AccesToServerPath } from '../../maintence/AccesToServerPath';


export const SendDinner = function ({ dinnerParentName, pickedParentIngredients }) {
    const [infoMessage, setInfoMessage] = useState(
        'Please Type Dinner Name, and choose ingredients'
    );

    const typedDataValidation = () => {
        return !dinnerParentName
            ? setInfoMessage('no dinner name')
            : pickedParentIngredients.length === 0
                ? setInfoMessage('no ingredients added')
                : (dinnerParentName && pickedParentIngredients.length > 0)
                    ? sendDinnerToDatabase()
                    : true;
    }

    const sendDinnerToDatabase = async () => {
        setInfoMessage('sending to server')
        const fetchTask = new Request(`${AccesToServerPath()}addDinner`,
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        "product": dinnerParentName,
                        "visibilityOnProductList": true,
                        "ingredients": pickedParentIngredients,
                        "ingredientsDeveloped": ""
                    }
                )
            });
        await fetch(fetchTask)
            .then(data => console.log('sending data', data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (<>
        {infoMessage}
        {infoMessage !== 'sending to server'
            && (<button className={'sendToServerButton'} onClick={() => {
                typedDataValidation()
            }}>Add Dinner</button>)
        }
    </>);
}

