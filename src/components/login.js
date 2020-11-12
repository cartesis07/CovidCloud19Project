import React from 'react';

import { signInWithGoogle } from "../services/firebase";
import { auth } from '../services/firebase';

import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap';

import './login.css';

export class LogIn extends React.Component{
    constructor(){
        super();
        this.state = {
            currentUser: null,
            visibility: false
        };
    }

    unsubscribeFromAuth = null;

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
            this.setState({ currentUser: user });
            this.setState({
                visibility: true
                }); 
        });
    }
    
    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return(
            <div className="row">
                <div className="block">
                {this.state.currentUser ? <Button size="lg" color="secondary" disabled="true">{this.state.currentUser.displayName}</Button> : null}
                </div>
                {this.state.currentUser ? <Button size="lg" color="danger" onClick={() => auth.signOut()}>Log Out</Button> : null}
                {!this.state.currentUser && this.state.visibility ? <Button size="sm" color="primary" onClick={signInWithGoogle}>
                    <img src="https://img.icons8.com/plasticine/2x/google-logo.png" alt="google icon" width="40" height="40"/>
                        &nbsp; Sign In with Google
                </Button> : null}
            </div>
        );
    }
}