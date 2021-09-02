import React, { useState } from 'react';
import { AccesToServerPath } from '../../maintence/AccesToServerPath';
import { GenerateSetOfDinnerIngredients } from './GenerateSetOfDinnerIngredients';

export const PickingDinnerIngredientsPanel = function ({ liftedChildState, pickedParentIngredients }) {
    const [mainButtonContentVisibilityCheck,
        setMainButtonContentVisibilityCheck] = useState({
            vegAndFruit: false,
            chemicals: false,
            dinners: false,
            dairyWheatAndEggs: false,
            everythingElse: false
        })

    const mainButtonStateChange = (altName) => {
        let visibilityBase =
        {
            vegAndFruit: false,
            chemicals: false,
            dinners: false,
            dairyWheatAndEggs: false,
            everythingElse: false
        }
        visibilityBase[altName] = true
        return visibilityBase
    }

    const mainButtonClick = async (e) => {
        let alternativeNameInPromise = new Promise((resolve, reject) => {
            resolve(e.target.alt)
        })

        await alternativeNameInPromise.then(value => {
            setMainButtonContentVisibilityCheck(mainButtonStateChange(value))
        })
    }

    const mainTopicButton = (imageSource, altName) => {
        if (mainButtonContentVisibilityCheck[altName] === false) {
            return (<div className='mainTopicButton' onClick={(e) => { mainButtonClick(e) }}>
                <img src={imageSource} alt={altName} />
            </div >)
        } else {
            return (<div className='mainTopicChosenButton' >
                <img src={imageSource} alt={altName} />
            </div >)
        }
    }

    const imgUrlGenerator = (props) => {
        return require('../../images/' + props + '.png').default;
    }

    const mainTopicPanelSet = (<>
        <div className='dinnerPickingContainer'>
            <div className="dinnerProductCategoryChosingPanel">
                {mainTopicButton(imgUrlGenerator('veg-fruit'), 'vegAndFruit')}
                {mainTopicButton(imgUrlGenerator('chemicals'), 'chemicals')}
                {mainTopicButton(imgUrlGenerator('milkAndCheese'), 'dairyWheatAndEggs')}
                {mainTopicButton(imgUrlGenerator('everythingElse'), 'everythingElse')}
            </div>
        </div>

        <div className="productsOnListObject">
            {
                mainButtonContentVisibilityCheck.vegAndFruit &&
                <>
                    <GenerateSetOfDinnerIngredients
                        liftedChildState={liftedChildState}
                        pickedParentIngredients={pickedParentIngredients}
                        endpoint={`${AccesToServerPath()}vegAndFruit`} />
                </>
            }
            {
                mainButtonContentVisibilityCheck.chemicals &&
                <>
                    <GenerateSetOfDinnerIngredients
                        liftedChildState={liftedChildState}
                        pickedParentIngredients={pickedParentIngredients}
                        endpoint={`${AccesToServerPath()}chemicals`} />
                </>
            }
            {
                mainButtonContentVisibilityCheck.dairyWheatAndEggs &&
                <>
                    <GenerateSetOfDinnerIngredients
                        liftedChildState={liftedChildState}
                        pickedParentIngredients={pickedParentIngredients}
                        endpoint={`${AccesToServerPath()}dairyWheatAndEggs`} />
                </>
            }
            {
                mainButtonContentVisibilityCheck.everythingElse &&
                <>
                    <GenerateSetOfDinnerIngredients
                        liftedChildState={liftedChildState}
                        pickedParentIngredients={pickedParentIngredients}
                        endpoint={`${AccesToServerPath()}everythingElse`} />
                </>
            }
        </div></>)
    return <> {mainTopicPanelSet}</>
}

