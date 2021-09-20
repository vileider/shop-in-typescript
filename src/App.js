import React, { useState } from 'react';
import BottomLinks from './components/bottom-links';
import PickingPanel from './components/PickingPanel';
import { CustomFetch } from './components/reusableFunctions/CustomFetch';
import { AccesToServerPath } from './maintence/AccesToServerPath';

export const ThemeContext = React.createContext()

function App() {
  const loadListEndPoint = [
    'vegAndFruit',
    'chemicals',
    'dinners',
    'dairyWheatAndEggs',
    'everythingElse'];

  let loadList = [];

  // loadListEndPoint.forEach(async x => {
  //   const data = await CustomFetch(`${AccesToServerPath()}${x}`, 'GET')
  //   loadList.push(data)
  // })

  const [darkTheme, setDarkTheme] = useState(true)
  function toggleTheme() {
    setDarkTheme(prevDarkTheme => !prevDarkTheme)
  }

  return (
    <>
      <div className="App">
        <ThemeContext.Provider value={darkTheme}>
          {/* <button onClick={toggleTheme}>button button</button> */}
          <PickingPanel />
        </ThemeContext.Provider>
        <BottomLinks />
      </div>

    </>
  );
}

export default App;
