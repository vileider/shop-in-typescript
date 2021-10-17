import React, { useState } from "react";
import { AccesToServerPath } from "../../maintence/AccesToServerPath";
import { CustomFetch } from "../reusableFunctions/CustomFetch";
import { GivesNumberOfRequiredList } from "../reusableFunctions/GivesListNumber";
import { errorHandlerForUrlGenerator } from "../reusableFunctions/ImgGenerator";


interface ArrayTypes {
    product: string
    visibilityOnProductList: boolean
    count: number
    price: number
}
interface EtargetAltType {
    target: any;
}


export const ProductListDisplay = (
    liftedChildState: CallableFunction,
    setOfItemData: ArrayTypes[],
    endpoint: string,

) => {
    const [reRender, setReRender] = useState(0)

    const deleteConfirmation = (itemName: string) => {
        let x = window.confirm(`Are You sure, You want to delete ${itemName}?`)
        x === true && removeItemFromDatabase(itemName)
    }

    const removeItemFromDatabase = async (itemName: string) => {
        const data = await CustomFetch(`${AccesToServerPath()}deleteItem`,
            'POST', { itemName: `${itemName}` })
        liftedChildState(data, endpoint)
    }
    let visibilityOfEachListObjectUpdate = (e: React.ChangeEvent<HTMLSelectElement>, productObject: string) => {
        liftedChildState((setOfItemData.map(x => {
            if (x.product === productObject) {
                x.visibilityOnProductList = false;
                setReRender(Math.random())
                console.log('Count1243', x.count, 'state', reRender, setOfItemData[GivesNumberOfRequiredList(endpoint)].count)
                x.count++
                //setReRender(Math.random())

                return x;
            } else {
                return x;
            }
        })), endpoint)
    }
    let addToProductCount = async (e: EtargetAltType) => {


        let alternativeNameInPromise = new Promise((resolve, reject) => {
            resolve(e.target.alt)
        })
        await alternativeNameInPromise.then(value => {
            liftedChildState(
                setOfItemData.map(x => {
                    if (x.product === value) {
                        x.product === value && x.count++
                        setReRender(Math.random())
                        return x
                    } else {
                        return x

                    }

                })
                , endpoint)
        })
    }
    // let addToProductCount2 = (productName: string) => {
    //     liftedChildState(
    //         setOfItemData.map(x => {
    //             x.product === productName && x.count++
    //             setReRender(x.count)
    //             console.log('Count2', x.count)
    //             return x
    //         })
    //         , endpoint)
    // }
    const generatedObjectForDisplay = setOfItemData.map(x => {
        if (x.visibilityOnProductList === true) {
            return (<div key={x.product}
                className={'normal'}
                onClick={(e: React.ChangeEvent<any>) => visibilityOfEachListObjectUpdate(e, x.product)}
                //onClick={(e: React.ChangeEvent<any>) => visibilityOfEachListObjectUpdate(e, x.product)}
                title={x.product}>
                <img className='productImage' src={errorHandlerForUrlGenerator(x.product)
                } alt={x.product} />
                <div className='productName'
                //position="absolute"
                >{x.product}</div>
                <img className='deleteProductImage' src={errorHandlerForUrlGenerator('delete')}
                    alt='delete Button' onClick={() => deleteConfirmation(x.product)
                    } />
            </div>
            )

        } else if (x.visibilityOnProductList === false) {
            return (<div key={x.product}
                className={'fade'}
                onClick={(e: React.ChangeEvent<any>) => { addToProductCount(e) }}
                title={x.product}>
                <img src={errorHandlerForUrlGenerator(x.product)}
                    alt={x.product}
                />
                <div className='productName'
                //onClick={() => { addToProductCount2(x.product) }}
                >{x.product}</div>
                <div className='productCounter' >{x.count}</div>
            </div>
            )
        }
        return x
    }
    )
    return (<>

        {generatedObjectForDisplay}
    </>)
}
export default ProductListDisplay

