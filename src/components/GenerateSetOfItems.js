import React, { useContext, useEffect } from 'react';
import { errorHandlerForUrlGenerator } from './reusableFunctions/ImgGenerator';
import '../styles/styles.css';
import ProductListDisplay from './Generate_items_components/ProductListDisplay';
import { ProductContext, UpdateContext } from '../App';
import { GivesNumberOfRequiredList } from './reusableFunctions/GivesListNumber';

export const GenerateSetOfItems = function ({ endpoint }) {

   const productsFromContext = useContext(ProductContext)
   const liftedChildState = useContext(UpdateContext)

   console.log('generate zlo and.....', endpoint, productsFromContext)

   const productListObject = (productsFromContext[GivesNumberOfRequiredList(endpoint)] ?
      ProductListDisplay(liftedChildState, productsFromContext[GivesNumberOfRequiredList(endpoint)]) : (
         <div className='productsOnListObject' >
            <div className='preparingComponentAnimation'>
               <img src={errorHandlerForUrlGenerator('gear')} alt='waitning animation' />
            </div>
         </div>
      )
   )
   return productListObject;
}

