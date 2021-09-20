import React, { useContext, useEffect } from 'react';
import { errorHandlerForUrlGenerator } from './reusableFunctions/ImgGenerator';
import '../styles/styles.css';
import { CustomFetch } from './reusableFunctions/CustomFetch';
import ProductListDisplay from './Generate_items_components/ProductListDisplay';
import { ThemeContext } from '../App';

export const GenerateSetOfItems = function ({
   liftedChildState,
   setOfItemData,
   endpoint
}) {
   const darkTheme = useContext(ThemeContext)

   console.log('generate zlo and.....', darkTheme)
   useEffect(() => {
      const pullsetOfItemDatabase = async () => {
         const data = await CustomFetch(endpoint, 'GET')
         liftedChildState(data)
         console.log(data)
      }
      setOfItemData ?? pullsetOfItemDatabase()
   }, [liftedChildState])// eslint-disable-line react-hooks/exhaustive-deps

   const productListObject = (setOfItemData ?
      ProductListDisplay(liftedChildState, setOfItemData) : (
         <div className='productsOnListObject' >
            <div className='preparingComponentAnimation'>
               <img src={errorHandlerForUrlGenerator('gear')} alt='waitning animation' />
            </div>
         </div>
      )
   )
   return productListObject;
}

