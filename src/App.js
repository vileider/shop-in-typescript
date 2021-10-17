import React, { useState } from 'react';
import BottomLinks from './components/bottom-links';
import PickingPanel from './components/PickingPanel';
import { AllFruitsFromDatabase } from './components/reusableFunctions/AllFruitsFromDatabase';
import { GivesNumberOfRequiredList } from './components/reusableFunctions/GivesListNumber';
export const ProductContext = React.createContext()
export const UpdateContext = React.createContext()
export const RunCalback = React.createContext()

function App() {

  console.log('app zlo')
  const [loadListstate, setloadListstate] = useState(AllFruitsFromDatabase())

  const update = (newState, endpoint) => {
    setloadListstate(() => {
      let lls = loadListstate
      lls[GivesNumberOfRequiredList(endpoint)] = newState
      return lls
    }
    )
    console.log('app', newState[0].count)
  }
  const runCalbackInBasket = (calback) => {
    calback()
  }
  return (
    <>
      <div className="App">
        <button onClick={() => { console.log(loadListstate) }}>123</button>


        <button onClick={() => { setloadListstate(loadListstate) }}>1333</button>
        <ProductContext.Provider value={loadListstate}>
          <UpdateContext.Provider value={update}>
            <RunCalback.Provider value={runCalbackInBasket}>
              <PickingPanel />
            </RunCalback.Provider>
          </UpdateContext.Provider>
        </ProductContext.Provider>
        <BottomLinks />
      </div>

    </>
  );
}

export default App;
