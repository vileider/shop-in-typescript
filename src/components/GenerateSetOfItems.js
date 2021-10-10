import React, { useContext, useEffect } from 'react';
import { errorHandlerForUrlGenerator } from './reusableFunctions/ImgGenerator';
import '../styles/styles.css';
import { CustomFetch } from './reusableFunctions/CustomFetch';
import ProductListDisplay from './Generate_items_components/ProductListDisplay';
import { ProductContext } from '../App';

export const GenerateSetOfItems = function ({
   liftedChildState,
   setOfItemData,
   endpoint
}) {
   const productsFromContext = useContext(ProductContext)

   console.log('generate zlo and.....', productsFromContext[0])
   // useEffect(() => {
   //    const pullsetOfItemDatabase = async () => {
   //       const data = await CustomFetch(endpoint, 'GET')
   //       liftedChildState(data)
   //       console.log(data)
   //    }
   //    setOfItemData ?? pullsetOfItemDatabase()
   // }, [liftedChildState])// eslint-disable-line react-hooks/exhaustive-deps


   const productListObject = (productsFromContext[0] ?
      ProductListDisplay(liftedChildState, productsFromContext[0]) : (
         <div className='productsOnListObject' >
            <div className='preparingComponentAnimation'>
               <img src={errorHandlerForUrlGenerator('gear')} alt='waitning animation' />
            </div>
         </div>
      )
   )
   return productListObject;
}

