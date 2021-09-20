import React from "react";
import { AccesToServerPath } from "../../maintence/AccesToServerPath";
import { CustomFetch } from "../reusableFunctions/CustomFetch";
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
    setOfItemData: ArrayTypes[]
) => {
    const deleteConfirmation = (itemName: string) => {
        let x = window.confirm(`Are You sure, You want to delete ${itemName}?`)
        x === true && removeItemFromDatabase(itemName)
    }

    const removeItemFromDatabase = async (itemName: string) => {
        const data = await CustomFetch(`${AccesToServerPath()}deleteItem`,
            'POST', { itemName: `${itemName}` })
        liftedChildState(data)
    }
    let visibilityOfEachListObjectUpdate = (e: React.ChangeEvent<HTMLSelectElement>, productObject: string) => {
        liftedChildState((setOfItemData.map(x => {
            if (x.product === productObject) {
                x.visibilityOnProductList = false;
                x.count++
                return x;
            } else {
                return x;
            }
        })))
    }
    let addToProductCount = async (e: EtargetAltType) => {
        let alternativeNameInPromise = new Promise((resolve, reject) => {
            resolve(e.target.alt)
        })
        await alternativeNameInPromise.then(value => {
            liftedChildState(
                setOfItemData.map(x => {
                    x.product === value && x.count++
                    return x
                })
            )
        })
    }
    let addToProductCount2 = (productName: string) => {
        liftedChildState(
            setOfItemData.map(x => {
                x.product === productName && x.count++
                return x
            })
        )
    }
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
                    onClick={() => { addToProductCount2(x.product) }}>{x.product}</div>
                <div className='productCounter' >{x.count}</div>
            </div>
            )
        }
        return x
    }
    )
    return generatedObjectForDisplay;
}
export default ProductListDisplay

