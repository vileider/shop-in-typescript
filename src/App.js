import React, { useState } from 'react';
import BottomLinks from './components/bottom-links';
import PickingPanel from './components/PickingPanel';
import { AllFruitsFromDatabase } from './components/reusableFunctions/AllFruitsFromDatabase';
export const ProductContext = React.createContext()
export const UpdateContext = React.createContext()


function App() {


  const [loadListstate, setloadListstate] = useState(AllFruitsFromDatabase())

  const update = (newState) => {
    setloadListstate(newState)
  }
  return (
    <>
      <div className="App">
        <button onClick={() => { console.log(loadListstate) }}>123</button>
        <button onClick={() => { console.log(setloadListstate(loadListstate[0])) }}>1333</button>
        <ProductContext.Provider value={loadListstate}>
          <UpdateContext.Provider value={update}>
            <PickingPanel />
          </UpdateContext.Provider>
        </ProductContext.Provider>
        <BottomLinks />
      </div>

    </>
  );
}

export default App;
