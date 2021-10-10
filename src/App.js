import React, { useState, useEffect } from 'react';
import BottomLinks from './components/bottom-links';
import PickingPanel from './components/PickingPanel';
import { loadList } from './components/reusableFunctions/AllFruitsFromDatabase';
export const ThemeContext = React.createContext()


function App() {
  const [loadListstate, setloadListstate] = useState(loadList)
  console.log('zlo app', loadListstate)

  return (
    <>
      <div className="App">
        <ThemeContext.Provider value={loadListstate}>
          {/* <button onClick={toggleTheme}>button button</button> */}
          <PickingPanel />
        </ThemeContext.Provider>
        <BottomLinks />
      </div>

    </>
  );
}

export default App;
