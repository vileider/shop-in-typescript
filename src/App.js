import './styles/styles.css';
import BottomLinks from './components/bottom-links';
import PickingPanel from './components/PickingPanel';


function App() {
  return (
    <>
      <div className="App">
        <PickingPanel />

        <BottomLinks />
      </div>

    </>
  );
}

export default App;
