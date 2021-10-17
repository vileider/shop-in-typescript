import React, { useState, useContext, useEffect } from 'react'
import { ProductContext } from '../App';


export const Basket = function (props) {

    const productsFromContext = useContext(ProductContext).flat(1)
    const [productsOnBasket, setProductsOnBasket] = useState(useContext(ProductContext).flat(1))
    const consolee = () => {
        console.log(productsFromContext, productsOnBasket)
    }

    console.log('basket zlo', useContext(ProductContext).flat(1), productsOnBasket, productsFromContext)

    const [basketClassName, setBasketClassName] = useState('productsOnBasketClosed')

    //productsOnBasket !== productsFromContext && setProductsOnBasket(productsFromContext)
    const ustawStan = () => {
        setProductsOnBasket(productsFromContext)
    }
    productsOnBasket !== productsFromContext && ustawStan()
    useEffect(() => {
        console.log('use effect')

    }, [productsOnBasket])
    const recipeFold = () => {
        (basketClassName === 'productsOnBasketHide')
            ? setBasketClassName('productsOnBasketObject')
            : (basketClassName === 'productsOnBasketClosed')
                ? setBasketClassName('productsOnBasketObject')
                : setBasketClassName('productsOnBasketHide')


    }


    //productsFromContext && runCalbackInBasket(test)
    const basketListDisplay = () => {
        try {
            // console.log('basket, data from parent', props.dataFromParent)
            return productsFromContext.filter(x => {
                return x.visibilityOnProductList === false;
            }).map(x => (<div className="productContainer" key={x.product}>
                <div className='productName'
                    key={'productSelection_' + x.product}
                    style={{ flex: '80%' }}>
                    {`${x.count}  ${x.product}`}
                </div>
                <div className="price" >{
                    (Math.round((x.price * x.count) * 100) / 100).toFixed(2)} {` £`} </div>
            </div>
            ))
        } catch (e) {
            if (e) {
                console.log('BASKET DONT HAVE ARRAY', e.message)
            }
        }
    }

    const basketSummary = () => {
        let count = 0
        try {
            productsFromContext.filter(x => {
                return x.visibilityOnProductList === false
            }).map(x => count += x.price * x.count)
            return count
        } catch (e) {
            if (e) {
                console.warn('basket summary dont have array')
                return count
            }
        }
    }

    return (<><div className='basketBackground' >
        <button onClick={ustawStan}>123</button>
        <div className={basketClassName}>

            {basketListDisplay()}

        </div>
        <img alt='recipe' className={`background${basketClassName}`}
            src={require('../images/paragon_2.png').default} />

    </div>
        <div className="basketSummary" onClick={() => { recipeFold() }}>
            {(Math.round(basketSummary() * 100) / 100).toFixed(2)}
        </div>
    </>
    )
}