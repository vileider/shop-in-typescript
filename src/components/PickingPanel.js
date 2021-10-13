import React from 'react';
import { useState } from 'react';
import '../styles/styles.css';
import { GenerateSetOfItems } from './GenerateSetOfItems';
import { Dinner } from './dinner';
import { Basket } from './basket';
import { ModBar } from './ModBar';
import { errorHandlerForUrlGenerator } from './reusableFunctions/ImgGenerator';
import { AccesToServerPath } from '../maintence/AccesToServerPath';


const PickingPanel = function () {
    console.log('panel zlo')
    const [vegAndFruitTransmitedData, setVegAndFruitTransmitedData] = useState()
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
    const [chemicalTransmitedData, setChemicalTransmitedData] = useState()
    const [dinnerTransmitedData, setDinnerTransmitedData] = useState()
    const [dairyWheatAndEggsTransmitedData, setDairyWheatAndEggsTransmitedData] = useState()
    const [everythingElseTransmitedData, setEverythingElseTransmitedData] = useState()

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

    const dataAvailabilityCheck = () => {
        const sourceArray = [
            vegAndFruitTransmitedData,
            chemicalTransmitedData,
            dairyWheatAndEggsTransmitedData,
            everythingElseTransmitedData
        ]
        let combinedArrays = []
        sourceArray.filter(x => Array.isArray(x))
            .forEach(y => combinedArrays = combinedArrays.concat(y))

        if (dinnerTransmitedData) {
            console.log('dinnerTD to true')
            try {
                if (combinedArrays.length > 0) {
                    console.log('lenght > 0')
                    if (vegAndFruitTransmitedData) {
                        const dinnerIngredients = dinnerTransmitedData
                            .map(x => x.ingredientsDeveloped).flat(1)


                        combinedArrays = combinedArrays.map(x => {

                            dinnerIngredients.forEach(y => {
                                if (x.product === y.product) {
                                    if (y.visibilityOnProductList === false) {
                                        x.count++
                                        y.visibilityOnProductList = true

                                    }
                                    x.visibilityOnProductList = false
                                }
                            })
                            return x
                        })
                    } else {
                        dinnerTransmitedData
                            .map(x => combinedArrays.push(x.ingredientsDeveloped))
                        return combinedArrays.flat(1)
                    }
                }
                else {
                    // if (combinedArrays.length === 0) {
                    //     dinnerTransmitedData.forEach(x => {
                    //         x.visibilityOnProductList === false &&
                    //             combinedArrays.push(x.ingredientsDeveloped)
                    //     })
                    //     console.log('equal 0', combinedArrays.length)
                    // }
                    // if (combinedArrays.length > 0) {
                    //     //console.log('array longer than 0')
                    //     dinnerTransmitedData.forEach(x => {

                    //         //console.table('dd', dinnerTransmitedData)
                    //     })
                    // }
                    //else return 0
                    //console.table('ca2', combinedArrays.flat(1))
                    return combinedArrays.flat(1)
                }
            } catch (e) {
                console.warn('array combining process has been interupted')
            }
        }
        return combinedArrays
    }

    const MainTopicPanelSet = (<>
        <div className='masterProductContainer'>
            <ModBar />
            <div className="productCategoryChosingPanel">
                {mainTopicButton(errorHandlerForUrlGenerator('veg-fruit'), 'vegAndFruit')}
                {mainTopicButton(errorHandlerForUrlGenerator('chemicals'), 'chemicals')}
                {mainTopicButton(errorHandlerForUrlGenerator('dinners'), 'dinners')}
                {mainTopicButton(errorHandlerForUrlGenerator('milkAndCheese'), 'dairyWheatAndEggs')}
                {mainTopicButton(errorHandlerForUrlGenerator('everythingElse'), 'everythingElse')}
            </div>

            <div className="productsOnListObject">
                {
                    mainButtonContentVisibilityCheck.vegAndFruit &&
                    <>
                        <GenerateSetOfItems liftedChildState={setVegAndFruitTransmitedData}
                            setOfItemData={vegAndFruitTransmitedData}
                            endpoint={`vegAndFruit`} />
                    </>
                }
                {
                    mainButtonContentVisibilityCheck.chemicals &&
                    <>
                        <GenerateSetOfItems liftedChildState={setChemicalTransmitedData}
                            setOfItemData={chemicalTransmitedData}
                            endpoint={`chemicals`} />
                    </>
                }
                {
                    mainButtonContentVisibilityCheck.dinners &&
                    <>
                        <Dinner liftedChildState={setDinnerTransmitedData}
                            setOfItemData={dinnerTransmitedData}
                            endpoint={`${AccesToServerPath()}dinners`} />
                    </>
                }
                {
                    mainButtonContentVisibilityCheck.dairyWheatAndEggs &&
                    <>
                        <GenerateSetOfItems liftedChildState={setDairyWheatAndEggsTransmitedData}
                            setOfItemData={dairyWheatAndEggsTransmitedData}
                            endpoint={`dairyWheatAndEggs`} />
                    </>
                }
                {
                    mainButtonContentVisibilityCheck.everythingElse &&
                    <>
                        <GenerateSetOfItems liftedChildState={setEverythingElseTransmitedData}
                            setOfItemData={everythingElseTransmitedData}
                            endpoint={`everythingElse`} />
                    </>
                }
            </div>
            <>
                <Basket dataFromParent={dataAvailabilityCheck()} />
            </>
        </div>
    </>
    )
    return MainTopicPanelSet;
}
export default PickingPanel;