import { useEffect } from 'react';
import { errorHandlerForUrlGenerator } from './reusableFunctions/ImgGenerator';
import '../styles/styles.css';
import gear from '../images/gear.png'
import { AccesToServerPath } from '../maintence/AccesToServerPath';
import { CustomFetch } from './reusableFunctions/CustomFetch';

export const GenerateSetOfItems = function ({
   liftedChildState,
   setOfItemData,
   endpoint
}) {
   useEffect(() => {
      const pullsetOfItemDatabase = async () => {
         const data = await CustomFetch(endpoint, 'GET')
         liftedChildState(data)
      }
      setOfItemData ?? pullsetOfItemDatabase()
   }, [liftedChildState, endpoint, setOfItemData])

   const deleteConfirmation = (itemName) => {
      let x = window.confirm(`Are You sure, You want to delete ${itemName}?`)
      x === true && removeItemFromDatabase(itemName)
   }

   const removeItemFromDatabase = async (itemName) => {
      const data = await CustomFetch(`${AccesToServerPath()}deleteItem`,
         'POST', { itemName: `${itemName}` })
      liftedChildState(data)
   }

   const productListDisplay = (
      generatedObjectForDisplay,
      visibilityOfEachListObjectUpdate,
      addToProductCount,
      addToProductCount2
   ) => {
      visibilityOfEachListObjectUpdate = (e, productObject) => {
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
      addToProductCount = async (e) => {
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
      addToProductCount2 = (productName) => {
         liftedChildState(
            setOfItemData.map(x => {
               x.product === productName && x.count++
               return x
            })
         )
      }
      generatedObjectForDisplay = setOfItemData.map(x => {
         if (x.visibilityOnProductList === true) {
            return (<div key={x.product}
               className={'normal'}
               onClick={(event) => {
                  visibilityOfEachListObjectUpdate(event, x.product);
               }}
               title={x.product}>
               <img className='productImage' src={errorHandlerForUrlGenerator(x.product)
               } alt={x.product} />
               <div className='productName' position="absolute">{x.product}</div>
               <img className='deleteProductImage' src={errorHandlerForUrlGenerator('delete')}
                  alt='delete Button' onClick={() => deleteConfirmation(x.product)
                  } />
            </div>
            )

         } else if (x.visibilityOnProductList === false) {
            return (<div key={x.product}
               className={'fade'}
               onClick={(event) => { addToProductCount(event) }}
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

   const productListObject = (setOfItemData ?
      productListDisplay() : (<div className='productsOnListObject' >
         <div className='preparingComponentAnimation'>
            <img src={gear} alt='waitning animation' />
         </div>
      </div>)
   )

   return productListObject

}

