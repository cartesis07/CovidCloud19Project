import './App.css';

import MyNavBar from "./components/mynavbar"
import { AlertInfo } from "./components/alertinfo"

//chart library to use : https://nivo.rocks/#/

function App() {
  return (
    <div className="App">
      <MyNavBar/>
      <header className="App-header">
      </header>
      <footer className="App-footer">
      <AlertInfo/>
      </footer>
    </div>
  );
}

export default App;
