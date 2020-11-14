import './App.css';

import MyNavBar from "./components/mynavbar"
import { AlertInfo } from "./components/alertinfo"

import { Table1 } from "./components/table1"
import { Table2 } from "./components/table2"
import { Table3 } from "./components/table3"


//chart library to use : https://nivo.rocks/#/

function App() {
  return (
    <div className="App">
      <MyNavBar/>
      <header className="App-header">
      </header>
      <body className="Content">
        <Table1/>
        <Table2/>
        <Table3/>
      </body>
      <footer className="App-footer">
      <AlertInfo/>
      </footer>
    </div>
  );
}

export default App;
