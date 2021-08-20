import React, { useState } from 'react'
export const Basket = function (props) {
    const [basketClassName, setBasketClassName] = useState('productsOnBasketClosed')
    const recipeFold = () => {
        (basketClassName === 'productsOnBasketHide')
            ? setBasketClassName('productsOnBasketObject')
            : (basketClassName === 'productsOnBasketClosed')
                ? setBasketClassName('productsOnBasketObject')
                : setBasketClassName('productsOnBasketHide')


    }
    const basketListDisplay = () => {
        try {
            // console.log('basket, data from parent', props.dataFromParent)
            return props.dataFromParent.filter(x => {
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
            props.dataFromParent.filter(x => {
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