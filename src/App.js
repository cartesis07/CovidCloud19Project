import './App.css';
import React from 'react';

import MyNavBar from "./components/mynavbar"
import { AlertInfo } from "./components/alertinfo"

import { Table1 } from "./components/table1"
import { Table2 } from "./components/table2"
import { Table3 } from "./components/table3"
import { Table4 } from "./components/table4"

import { ScrollTopButton } from "./components/scrolltopbutton"

class App extends React.Component {

  constructor(){
    super();
  }

  componentDidMount(){

  }

  render(){
    return (
      <div className="App">
        <MyNavBar/>
        <header className="App-header">
        </header>
        <body className="Content">
          <Table1/>
          <Table2/>
          <Table3/>
          <Table4/>
        </body>
        <footer className="App-footer">
        <ScrollTopButton/>
        <AlertInfo/>
        </footer>
      </div>
    );
  }

}

export default App;
