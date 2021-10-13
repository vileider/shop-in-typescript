import React, { useContext, useEffect } from 'react';
import { errorHandlerForUrlGenerator } from './reusableFunctions/ImgGenerator';
import '../styles/styles.css';
import { CustomFetch } from './reusableFunctions/CustomFetch';
import ProductListDisplay from './Generate_items_components/ProductListDisplay';
import { ProductContext, UpdateContext } from '../App';

export const GenerateSetOfItems = function ({
   //liftedChildState,
   setOfItemData,
   endpoint
}) {
   const productsFromContext = useContext(ProductContext)
   const liftedChildState = useContext(UpdateContext)

   console.log('generate zlo and.....', productsFromContext)
   // useEffect(() => {
   //    const pullsetOfItemDatabase = async () => {
   //       const data = await CustomFetch(endpoint, 'GET')
   //       liftedChildState(data)
   //       console.log(data)
   //    }
   //    setOfItemData ?? pullsetOfItemDatabase()
   // }, [liftedChildState])// eslint-disable-line react-hooks/exhaustive-deps


   const productListObject = (productsFromContext ?
      ProductListDisplay(liftedChildState, productsFromContext) : (
         <div className='productsOnListObject' >
            <div className='preparingComponentAnimation'>
               <img src={errorHandlerForUrlGenerator('gear')} alt='waitning animation' />
            </div>
         </div>
      )
   )
   return productListObject;
}

