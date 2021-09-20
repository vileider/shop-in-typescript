import { useEffect } from 'react';
import './GenerateSetOfItems.css';
import gear from '../images/gear.png'
import { AccesToServerPath } from '../maintence/AccesToServerPath';
import { errorHandlerForUrlGenerator } from './reusableFunctions/ImgGenerator';

export const Dinner = function ({
    liftedChildState,
    setOfItemData,
    endpoint
}) {
    useEffect(() => {
        const pullsetOfItemDatabase = async () => {
            const fetchTask = new Request(endpoint, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            await fetch(fetchTask)
                .then(response => response.json())
                .then(data => liftedChildState(data))
                .catch((error) => {
                    console.error('Error:', error);
                });

        }

        setOfItemData ?? pullsetOfItemDatabase()

    }, [liftedChildState])// eslint-disable-line react-hooks/exhaustive-deps

    const deleteConfirmation = (itemName) => {
        let x = window.confirm(`Are You sure, You want to delete ${itemName}?`)
        x === true && removeItemFromDatabase(itemName)

    }

    const removeItemFromDatabase = async (itemName) => {
        const resolve = await fetch(`${AccesToServerPath()}deleteItem`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemName: `${itemName}` })
            })
        const data = await resolve.json()
        console.log(data)
        //liftedChildState(data)
        console.log(`remove item ${itemName}`)
    }

    const productListDisplay = (
        generatedObjectForDisplay,
        generatedObjectForFadeDisplay,
        visibilityOfEachListObjectUpdate,
        readIngredientsDataFromDatabase
    ) => {
        readIngredientsDataFromDatabase = async (demadedItems) => {

            const fetchTask = new Request(`${AccesToServerPath()}machingDinnerData`, {
                method: 'post',
                body: JSON.stringify(demadedItems),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return await fetch(fetchTask)
                .then(response => response.json())
                .catch((error) => {
                    console.error('Error:', error);
                });

        }

        visibilityOfEachListObjectUpdate = async (event, productObject, demandedItems) => {
            const ingredientsFromDatabase =
                await readIngredientsDataFromDatabase(demandedItems)
            liftedChildState((setOfItemData.map(x => {
                if (x.product === productObject) {
                    x.visibilityOnProductList = false;
                    x.ingredientsDeveloped = ingredientsFromDatabase
                    return x;
                } else {
                    return x;
                }
            })))
        }

        generatedObjectForDisplay =
            setOfItemData.filter(x => {
                return x.visibilityOnProductList === true;
            }).map(x => (<div key={x.product}
                className={'product-section-' + x.product}
                onClick={(event) => {
                    visibilityOfEachListObjectUpdate(event, x.product, x.ingredients);
                }}
                title={x.product}>
                <img src={errorHandlerForUrlGenerator(x.product)
                } alt={x.product} position="absolute" />
                <div className='productName' position="absolute">{x.product}</div>
                <img className='deleteProductImage' src={errorHandlerForUrlGenerator('delete')}
                    alt='delete Button' onClick={() => deleteConfirmation(x.product)
                    } />
            </div>
            ))
        return generatedObjectForDisplay;

    }

    const productListObject = (setOfItemData ?
        productListDisplay() : (<div className='productOnListObject' >
            <div className='preparingComponentAnimation'>
                <img src={gear} alt='waitning animation' />
            </div>
        </div>)
    )

    return productListObject

}

