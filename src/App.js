import React, { useState, useEffect } from 'react';
import BottomLinks from './components/bottom-links';
import PickingPanel from './components/PickingPanel';
import { AllFruitsFromDatabase } from './components/reusableFunctions/AllFruitsFromDatabase';
export const ProductContext = React.createContext()


function App() {
  const [loadListstate, setloadListstate] = useState(AllFruitsFromDatabase())


  return (
    <>
      <div className="App">
        <ProductContext.Provider value={loadListstate}>
          <PickingPanel />
        </ProductContext.Provider>
        <BottomLinks />
      </div>

    </>
  );
}

export default App;
