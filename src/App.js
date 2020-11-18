import './App.css';
import React from 'react';

import MyNavBar from "./components/mynavbar"
import { AlertInfo } from "./components/alertinfo"

import { Home } from "./components/home"
import { Countries } from "./components/countries"
import { AddNews } from "./components/addnews"

import { BrowserRouter, Route } from 'react-router-dom'

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
        <BrowserRouter>
          <Route exact path="/" component={Home}/>
          <Route path="/countries" component={Countries}/>
          <Route path="/add-news" component={AddNews}/>
        </BrowserRouter>
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
