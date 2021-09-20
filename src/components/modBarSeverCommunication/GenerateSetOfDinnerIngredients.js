import { useEffect, useState } from 'react';
import '../../styles/styles.css';
import gear from '../../images/gear.png'
import { errorHandlerForUrlGenerator } from '../reusableFunctions/ImgGenerator';

export const GenerateSetOfDinnerIngredients = function ({
   liftedChildState,
   pickedParentIngredients,
   endpoint
}) {
   const [ingredientsFromDatabase, setIngredientsFromDatabase] = useState()
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
            .then(data => setIngredientsFromDatabase(data))
            .catch((error) => {
               console.error('Error:', error);
            });
      }
      ingredientsFromDatabase ?? pullsetOfItemDatabase()

   }, [ingredientsFromDatabase])// eslint-disable-line react-hooks/exhaustive-deps

   const productListDisplay = (
      generatedObjectForDisplay,
      visibilityOfEachListObjectUpdate,
      pickedItemForDinnerUpdate
   ) => {
      pickedItemForDinnerUpdate = (item) => {
         liftedChildState([...pickedParentIngredients, item])
      }
      visibilityOfEachListObjectUpdate = (productObject) => {
         setIngredientsFromDatabase(ingredientsFromDatabase.map(x => {
            if (x.product === productObject) {
               pickedItemForDinnerUpdate(x.product)
               return x;
            } else {
               return x;
            }
         }))
      }

      generatedObjectForDisplay = ingredientsFromDatabase.map(x => {
         if (!pickedParentIngredients.some(y => y === x.product)) {
            return (<div key={x.product}
               className={'product-section-' + x.product}
               onClick={() => {
                  visibilityOfEachListObjectUpdate(x.product);
               }}
               title={x.product}>
               <img src={errorHandlerForUrlGenerator(x.product)
               } alt={x.product} />
               <div className='productName'>{x.product}</div>
            </div>
            )
         }
         return null;
      })
      return generatedObjectForDisplay;
   }

   const productListObject = (ingredientsFromDatabase ?
      productListDisplay() : (<div className='productsOnListObject' >
         <div className='preparingComponentAnimation'>
            <img src={gear} alt='waitning animation' />
         </div>
      </div>)
   )

   return productListObject

}

