import React, {useContext} from 'react';

import { signInWithGoogle } from "../services/firebase";
import { auth } from '../services/firebase';

import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap';

import './login.css';

import UserContext from '../userContext'
import { Update } from '@material-ui/icons';

export class LogIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentUser: null,
            visibility: false
        };
    }

    static contextType = UserContext

    unsubscribeFromAuth = null;

    updateuser(newuser){
        const {user, updateUser} = this.context
        updateUser(newuser)
    }

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(googleuser => {
            this.setState({ currentUser: googleuser });
            this.setState({
                visibility: true
            });
            this.updateuser(googleuser)
        });
    }
    
    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return(
            <div className="row">
                <div className="block">
                {this.state.currentUser ? <Button outline color="secondary" disabled="true">{this.state.currentUser.displayName}</Button> : null}
                </div>
                {this.state.currentUser ? <Button outline color="danger" onClick={() => auth.signOut()}>Log Out</Button> : null}
                {!this.state.currentUser && this.state.visibility ? <Button outline size="sm" color="primary" onClick={signInWithGoogle}>
                    <img src="https://img.icons8.com/plasticine/2x/google-logo.png" alt="google icon" width="40" height="40"/>
                        &nbsp; Sign In with Google
                </Button> : null}
            </div>
        );
    }
}