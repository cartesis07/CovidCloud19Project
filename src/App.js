import './App.css';
import React from 'react';

import MyNavBar from "./components/mynavbar"
import { AlertInfo } from "./components/alertinfo"

import { Home } from "./components/home"
import { Countries } from "./components/countries"
import { AddNews } from "./components/addnews"

import { NotFound } from "./components/notfound"

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { UserProvider } from './userContext'

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      user: null
    };
  }

  componentDidMount(){
  }

  updateUser = (newuser) => {
    this.setState({user: newuser})
  }

  render(){
    const user = this.state.user
    const updateUser = this.updateUser
    return (
      <BrowserRouter>
      <UserProvider value={{user,updateUser}}>
      <div className="App">
        <MyNavBar/>
        <header className="App-header">
        </header>
        <body className="Content">
          <Switch>  
            <Route exact path="/" component={Home}/>
            <Route path="/countries" component={Countries}/>
            <Route path="/add-news" component={AddNews}/>
            <Route path="*" component={NotFound} />
          </Switch>
        </body>
        <footer className="App-footer">
        <AlertInfo/>
        </footer>
      </div>
      </UserProvider>
      </BrowserRouter>
    );
  }

}

export default App;
