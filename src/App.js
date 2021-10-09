import React, { useState } from 'react';
import BottomLinks from './components/bottom-links';
import PickingPanel from './components/PickingPanel';
import { CustomFetch } from './components/reusableFunctions/CustomFetch';
import { AccesToServerPath } from './maintence/AccesToServerPath';

export const ThemeContext = React.createContext()

function App() {
  console.log('zlo app')
  const loadListEndPoint = [
    'vegAndFruit',
    'chemicals',
    'dinners',
    'dairyWheatAndEggs',
    'everythingElse'];

  let loadList = [];
  const [loadListstate, setloadListstate] = useState([])

  loadListEndPoint.forEach(async x => {
    const data = await CustomFetch(`${AccesToServerPath()}${x}`, 'GET')
    loadList.push(data)
  })

  // function toggleTheme() {
  //   setDarkTheme(prevDarkTheme => !prevDarkTheme)
  // }

  return (
    <>
      <div className="App">
        <ThemeContext.Provider value={loadList}>
          {/* <button onClick={toggleTheme}>button button</button> */}
          <PickingPanel />
        </ThemeContext.Provider>
        <BottomLinks />
      </div>

    </>
  );
}

export default App;
